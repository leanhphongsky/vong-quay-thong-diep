// ============================================================
// STORAGE & SUPABASE SYNC SERVICE (Hỗ trợ Nhật Ký & Note)
// ============================================================

const STORAGE_KEYS = {
  USER:    'vqtd_user',
  HISTORY: 'vqtd_history',
  STREAK:  'vqtd_streak',
};

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
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
  localStorage.removeItem(STORAGE_KEYS.STREAK);
}

function getLocalHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || []; }
  catch { return []; }
}

function saveLocalHistory(hist) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(hist));
}

function getLocalStreak() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.STREAK)) || { count: 0, lastDate: null }; }
  catch { return { count: 0, lastDate: null }; }
}

function saveLocalStreak(streak) {
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
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
}

// ---- Sync Data With Supabase ----
async function syncDataFromSupabase(userId) {
  if (!sbClient || !userId || userId === 'guest') return;

  try {
    const { data: historyData, error: hErr } = await sbClient
      .from('spin_history')
      .select('message_id, spin_date')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!hErr && historyData) {
      const localHist = getLocalHistory();
      const formatted = historyData.map(item => {
        const existing = localHist.find(l => l.date === item.spin_date);
        return {
          date: item.spin_date,
          messageId: item.message_id,
          note: existing?.note || '',
          actionDone: existing?.actionDone || false
        };
      });
      saveLocalHistory(formatted);
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
      });
    }
  } catch (err) {
    console.warn("Lỗi sync từ Supabase:", err);
  }
}

async function recordSpinToCloud(messageId) {
  const user = getLocalUser();
  const today = getTodayStr();

  let history = getLocalHistory();
  if (!history.find(h => h.date === today)) {
    history.unshift({ date: today, messageId, note: '', actionDone: false });
    saveLocalHistory(history);
  }

  const yesterday = getYesterdayStr();
  let streak = getLocalStreak();
  if (streak.lastDate !== today) {
    if (streak.lastDate === yesterday) {
      streak.count++;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    saveLocalStreak(streak);
  }

  if (sbClient && user && user.id && user.id !== 'guest') {
    try {
      await sbClient.from('spin_history').insert({
        user_id: user.id,
        message_id: messageId,
        spin_date: today
      });

      await sbClient.from('profiles').update({
        streak_count: streak.count,
        last_spin_date: today,
        total_spins: history.length
      }).eq('id', user.id);
    } catch (err) {
      console.error("Ghi nhận lên Supabase gặp lỗi:", err);
    }
  }

  return { history, streak };
}

// Lưu nhật ký / cảm nhận cá nhân
function saveMessageNote(dateStr, noteText, actionDone = null) {
  const history = getLocalHistory();
  const item = history.find(h => h.date === dateStr);
  if (item) {
    item.note = noteText;
    if (actionDone !== null) item.actionDone = actionDone;
    saveLocalHistory(history);
  }
}

// ---- Compatibility Functions ----
function getUser() { return getLocalUser(); }
function saveUser(u) { saveLocalUser(u); }
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
