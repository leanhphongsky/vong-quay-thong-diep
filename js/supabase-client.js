// ============================================================
// SUPABASE CLIENT CONFIGURATION
// ============================================================

const SUPABASE_URL = "https://dtsuyhfzhltsetjbowdl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8TYj1RBPPBwJjA1blo1ZfQ_QSY0W8oS";

// Khởi tạo Supabase client từ CDN (window.supabase)
let sbClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn("Supabase SDK chưa được tải, sử dụng chế độ local storage dự phòng.");
}
