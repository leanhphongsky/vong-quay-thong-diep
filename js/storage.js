// ============================================================
// STORAGE & SUPABASE SYNC SERVICE (Hỗ trợ Nhật Ký & Note)
// ============================================================

const STORAGE_KEYS = {
  USER:        'vqtd_user',
  HISTORY:     'vqtd_history',
  STREAK:      'vqtd_streak',
  CONFESSIONS: 'vqtd_confessions'
};

// ---- Dynamic User-Scoped Cache Keys ----
function getUserHistoryKey(u) {
  const user = u || getLocalUser();
  if (user && user.id && user.id !== 'guest') {
    return `${STORAGE_KEYS.HISTORY}_${user.id}`;
  }
  return `${STORAGE_KEYS.HISTORY}_guest`;
}

function getUserStreakKey(u) {
  const user = u || getLocalUser();
  if (user && user.id && user.id !== 'guest') {
    return `${STORAGE_KEYS.STREAK}_${user.id}`;
  }
  return `${STORAGE_KEYS.STREAK}_guest`;
}

// ---- Local Cache Helpers ----
function getLocalUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)); }
  catch { return null; }
}

function saveLocalUser(user) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

function clearLocalUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

function getLocalHistory(userId) {
  try {
    const key = userId ? `${STORAGE_KEYS.HISTORY}_${userId}` : getUserHistoryKey();
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) || [];
    // Fallback cho dữ liệu cũ chưa gắn prefix nếu là khách
    const legacy = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (legacy && (!userId || userId === 'guest')) return JSON.parse(legacy) || [];
    return [];
  } catch {
    return [];
  }
}

function saveLocalHistory(hist, userId) {
  const key = userId ? `${STORAGE_KEYS.HISTORY}_${userId}` : getUserHistoryKey();
  localStorage.setItem(key, JSON.stringify(hist));
}

function getLocalStreak(userId) {
  try {
    const key = userId ? `${STORAGE_KEYS.STREAK}_${userId}` : getUserStreakKey();
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    const legacy = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (legacy && (!userId || userId === 'guest')) return JSON.parse(legacy);
    return { count: 0, lastDate: null };
  } catch {
    return { count: 0, lastDate: null };
  }
}

function saveLocalStreak(streak, userId) {
  const key = userId ? `${STORAGE_KEYS.STREAK}_${userId}` : getUserStreakKey();
  localStorage.setItem(key, JSON.stringify(streak));
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function secondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

// ---- Supabase Auth Wrappers ----
async function getCurrentUser() {
  if (sbClient) {
    try {
      const { data: { session } } = await sbClient.auth.getSession();
      if (session && session.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0]
        };
        saveLocalUser(u);
        return u;
      }
    } catch (_) {}
  }
  return getLocalUser();
}

async function loginWithEmail(email, password) {
  if (sbClient) {
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email.split('@')[0]
    };
    saveLocalUser(user);
    await syncDataFromSupabase(user.id);
    return user;
  }
  throw new Error("Supabase chưa được cấu hình!");
}

async function registerWithEmail(name, email, password) {
  if (sbClient) {
    const { data, error } = await sbClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) throw error;
    if (data.user) {
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: name || data.user.email.split('@')[0]
      };
      saveLocalUser(user);
      return user;
    }
  }
  throw new Error("Supabase chưa được cấu hình!");
}

async function logoutUser() {
  if (sbClient) {
    try { await sbClient.auth.signOut(); } catch (e) { console.error(e); }
  }
  clearLocalUser();
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('vqtd_admin_session');
  }
}

// ---- Sync Data With Supabase ----
async function syncDataFromSupabase(userId) {
  if (!sbClient || !userId || userId === 'guest') return;

  try {
    const { data: historyData, error: hErr } = await sbClient
      .from('spin_history')
      .select('message_id, spin_date, note, action_done')
      .eq('user_id', userId)
      .order('spin_date', { ascending: false });

    if (!hErr && historyData) {
      const localHist = getLocalHistory(userId);
      const formatted = historyData.map(item => {
        const existing = localHist.find(l => l.date === item.spin_date);
        return {
          date: item.spin_date,
          messageId: item.message_id,
          note: item.note || existing?.note || '',
          actionDone: item.action_done !== undefined ? !!item.action_done : (existing?.actionDone || false)
        };
      });
      saveLocalHistory(formatted, userId);
    } else if (hErr) {
      console.warn("Lỗi sync spin_history từ Supabase:", hErr.message);
    }

    const { data: profile, error: pErr } = await sbClient
      .from('profiles')
      .select('streak_count, last_spin_date')
      .eq('id', userId)
      .single();

    if (!pErr && profile) {
      saveLocalStreak({
        count: profile.streak_count || 0,
        lastDate: profile.last_spin_date || null
      }, userId);
    } else if (pErr) {
      console.warn("Lỗi sync profile từ Supabase:", pErr.message);
    }
  } catch (err) {
    console.warn("Lỗi sync từ Supabase:", err);
  }
}

async function recordSpinToCloud(messageId) {
  const user = getLocalUser();
  const today = getTodayStr();
  const userId = user?.id;

  let history = getLocalHistory(userId);
  if (!history.find(h => h.date === today)) {
    history.unshift({ date: today, messageId, note: '', actionDone: false });
    saveLocalHistory(history, userId);
  }

  const yesterday = getYesterdayStr();
  let streak = getLocalStreak(userId);
  if (streak.lastDate !== today) {
    if (streak.lastDate === yesterday) {
      streak.count++;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    saveLocalStreak(streak, userId);
  }

  if (sbClient && user && user.id && user.id !== 'guest') {
    try {
      const { error: insErr } = await sbClient.from('spin_history').insert({
        user_id: user.id,
        message_id: messageId,
        spin_date: today
      });
      if (insErr) console.warn("Lỗi lưu spin_history lên Cloud:", insErr.message);

      const { error: profErr } = await sbClient.from('profiles').upsert({
        id: user.id,
        streak_count: streak.count,
        last_spin_date: today,
        total_spins: history.length
      });
      if (profErr) console.warn("Lỗi lưu profile lên Cloud:", profErr.message);
    } catch (err) {
      console.error("Ghi nhận lên Supabase gặp lỗi:", err);
    }
  }

  return { history, streak };
}

// Lưu nhật ký / cảm nhận cá nhân
async function saveMessageNote(dateStr, noteText, actionDone = null) {
  const user = getLocalUser();
  const userId = user?.id;
  const history = getLocalHistory(userId);
  const item = history.find(h => h.date === dateStr);
  if (item) {
    item.note = noteText;
    if (actionDone !== null) item.actionDone = actionDone;
    saveLocalHistory(history, userId);
  }

  // Đồng bộ note lên Cloud nếu có tài khoản
  if (sbClient && user && user.id && user.id !== 'guest') {
    try {
      const updatePayload = { note: noteText };
      if (actionDone !== null) updatePayload.action_done = !!actionDone;
      await sbClient
        .from('spin_history')
        .update(updatePayload)
        .eq('user_id', user.id)
        .eq('spin_date', dateStr);
    } catch (e) {
      console.warn("Lưu note lên Supabase gặp lỗi:", e);
    }
  }
}

// Trả về thông tin trạng thái kết nối Cloud
function getCloudConnectionInfo() {
  const user = getLocalUser();
  const isGuest = !user || !user.id || user.id === 'guest';
  return {
    isConfigured: !!sbClient,
    isGuest,
    user: isGuest ? null : user,
    projectUrl: typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : ''
  };
}

// ---- Compatibility Functions ----
function getUser() { return getLocalUser(); }
function saveUser(u) {
  saveLocalUser(u);
  if (sbClient && u && u.id && u.id !== 'guest') {
    sbClient.from('profiles').upsert({
      id: u.id,
      display_name: u.name,
      updated_at: new Date().toISOString()
    }).then(() => {}).catch(e => console.warn('Lỗi tự động lưu tên profile lên Cloud:', e));
  }
}
function clearUser() { clearLocalUser(); }
function getHistory() { return getLocalHistory(); }
function getStreak() { return getLocalStreak(); }
function getTodaySpin() {
  const history = getLocalHistory();
  return history.find(h => h.date === getTodayStr()) || null;
}
function hasSpunToday() { return getTodaySpin() !== null; }
function uniqueMessagesCount() {
  const ids = new Set(getLocalHistory().map(h => h.messageId));
  return ids.size;
}

// ============================================================
// HÒM THƯ TÂM SỰ ĐẾN SUNNY & QUẢN TRỊ ADMIN
// ============================================================

function getLocalConfessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFESSIONS)) || [];
  } catch {
    return [];
  }
}

function saveLocalConfessions(list) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFESSIONS, JSON.stringify(list));
  } catch (e) {
    console.error('Không thể lưu tâm sự vào local:', e);
  }
}

/**
 * Gửi tâm sự của người dùng đến Sunny
 */
async function sendConfessionToSunny({ senderName, senderEmail, category, content, isAnonymous }) {
  if (!content || !content.trim()) {
    throw new Error('Vui lòng nhập nội dung tâm sự.');
  }

  const confession = {
    id: 'cf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    senderName: isAnonymous ? 'Ẩn danh' : (senderName?.trim() || 'Người bạn bình an'),
    senderEmail: senderEmail ? senderEmail.trim() : '',
    category: category || 'Bình an nội tâm',
    content: content.trim(),
    isAnonymous: !!isAnonymous,
    read: false,
    pinned: false,
    createdAt: new Date().toISOString()
  };

  // 1. Lưu local cache ngay lập tức
  const list = getLocalConfessions();
  list.unshift(confession);
  saveLocalConfessions(list);

  // 2. Đồng bộ lên Supabase nếu có client kết nối
  if (sbClient) {
    try {
      await sbClient.from('confessions').insert({
        sender_name: confession.senderName,
        sender_email: confession.senderEmail,
        category: confession.category,
        content: confession.content,
        is_anonymous: confession.isAnonymous,
        read: false,
        pinned: false
      });
    } catch (err) {
      console.warn('Lưu tâm sự lên Supabase gặp lỗi, đã lưu cục bộ:', err);
    }
  }

  return { success: true, confession };
}

/**
 * Kiểm tra xem người dùng hiện tại có quyền Admin (Sunny) không
 */
function isAdminUser(user) {
  if (sessionStorage.getItem('vqtd_admin_session') === 'true') {
    return true;
  }
  if (!user) return false;
  if (user.id === 'admin' || user.role === 'admin') return true;
  if (user.email) {
    const email = user.email.toLowerCase().trim();
    if (email.includes('sunny') || email.includes('admin') || email === 'chuyengiatamlysunny@gmail.com') {
      return true;
    }
  }
  if (user.name) {
    const name = user.name.toLowerCase().trim();
    if (name === 'sunny' || name === 'admin') return true;
  }
  return false;
}

/**
 * Mở khóa phiên Admin (cho phép đăng nhập nhanh quyền Admin của Sunny)
 */
function setAdminSession(active = true) {
  if (active) {
    sessionStorage.setItem('vqtd_admin_session', 'true');
  } else {
    sessionStorage.removeItem('vqtd_admin_session');
  }
}

/**
 * Lấy danh sách tâm sự dành riêng cho Admin Sunny
 */
async function getConfessionsForAdmin() {
  let localList = getLocalConfessions();

  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('confessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        // Hợp nhất dữ liệu cloud và local
        const mergedMap = new Map();
        localList.forEach(item => mergedMap.set(item.id, item));
        data.forEach(item => {
          const formatted = {
            id: item.id,
            senderName: item.sender_name || 'Ẩn danh',
            senderEmail: item.sender_email || '',
            category: item.category || 'Bình an',
            content: item.content || '',
            isAnonymous: !!item.is_anonymous,
            read: !!item.read,
            pinned: !!item.pinned,
            createdAt: item.created_at || new Date().toISOString()
          };
          mergedMap.set(item.id, formatted);
        });
        localList = Array.from(mergedMap.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        saveLocalConfessions(localList);
      }
    } catch (e) {
      console.warn('Lấy tâm sự từ Supabase:', e);
    }
  }

  return localList;
}

/**
 * Đánh dấu đã đọc / chưa đọc
 */
async function markConfessionRead(id, isRead = true) {
  const list = getLocalConfessions();
  const target = list.find(c => c.id === id);
  if (target) {
    target.read = isRead;
    saveLocalConfessions(list);
  }
  if (sbClient) {
    try {
      await sbClient.from('confessions').update({ read: isRead }).eq('id', id);
    } catch (_) {}
  }
}

/**
 * Ghim / Bỏ ghim tâm sự
 */
async function toggleConfessionPin(id) {
  const list = getLocalConfessions();
  const target = list.find(c => c.id === id);
  if (target) {
    target.pinned = !target.pinned;
    saveLocalConfessions(list);
    if (sbClient) {
      try {
        await sbClient.from('confessions').update({ pinned: target.pinned }).eq('id', id);
      } catch (_) {}
    }
    return target.pinned;
  }
  return false;
}

/**
 * Xóa tâm sự
 */
async function deleteConfession(id) {
  let list = getLocalConfessions();
  list = list.filter(c => c.id !== id);
  saveLocalConfessions(list);
  if (sbClient) {
    try {
      await sbClient.from('confessions').delete().eq('id', id);
    } catch (_) {}
  }
}
