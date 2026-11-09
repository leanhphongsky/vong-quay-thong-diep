// ============================================================
// STORAGE: Quản lý dữ liệu người dùng (localStorage)
// ============================================================

const STORAGE_KEYS = {
  USER:    'vqtd_user',
  HISTORY: 'vqtd_history',
  STREAK:  'vqtd_streak',
};

// ---- User ----
function getUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)); }
  catch { return null; }
}
function saveUser(user) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}
function clearUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// ---- History ----
function getHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || []; }
  catch { return []; }
}
function addToHistory(messageId) {
  const today = getTodayStr();
  const history = getHistory();
  // Don't duplicate same day
  if (!history.find(h => h.date === today)) {
    history.unshift({ date: today, messageId });
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }
  return history;
}

// ---- Today's spin ----
function getTodaySpin() {
  const history = getHistory();
  const today   = getTodayStr();
  return history.find(h => h.date === today) || null;
}
function hasSpunToday() {
  return getTodaySpin() !== null;
}

// ---- Streak ----
function getStreak() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.STREAK)) || { count: 0, lastDate: null }; }
  catch { return { count: 0, lastDate: null }; }
}
function updateStreak() {
  const today     = getTodayStr();
  const yesterday = getYesterdayStr();
  const streak    = getStreak();

  if (streak.lastDate === today) return streak; // already updated today

  if (streak.lastDate === yesterday) {
    streak.count++;
  } else if (streak.lastDate !== today) {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  return streak;
}

// ---- Helpers ----
function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-11-09"
}
function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ---- Seconds until midnight reset ----
function secondsUntilMidnight() {
  const now  = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

// ---- Unique messages count ----
function uniqueMessagesCount() {
  const ids = new Set(getHistory().map(h => h.messageId));
  return ids.size;
}
