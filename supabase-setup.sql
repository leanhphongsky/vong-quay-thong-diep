-- ============================================================
-- VÒNG QUAY THÔNG ĐIỆP — SUPABASE DATABASE SETUP SCRIPT
-- ============================================================
-- Hướng dẫn: 
-- 1. Mở trang Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Chọn dự án: dtsuyhfzhltsetjbowdl
-- 3. Nhấn vào mục "SQL Editor" ở menu bên trái
-- 4. Tạo "New Query", dán toàn bộ nội dung file này và nhấn "Run" (hoặc Ctrl + Enter)
-- ============================================================

-- ── 1. CẤP QUYỀN TRUY CẬP SCHEMA PUBLIC CHO CÁC ROLE ──
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- ── 2. BẢNG PROFILES (HỒ SƠ NGƯỜI DÙNG) ──
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username      TEXT DEFAULT '',
  streak_count  INTEGER DEFAULT 0,
  last_spin_date DATE,
  total_spins   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. BẢNG SPIN_HISTORY (LỊCH SỬ QUAY CỦA TỪNG NGƯỜI) ──
CREATE TABLE IF NOT EXISTS public.spin_history (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_id  INTEGER NOT NULL,
  spin_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  note        TEXT DEFAULT '',
  action_done BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Thêm cột nếu bảng đã tồn tại từ trước
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='spin_history' AND column_name='note') THEN
    ALTER TABLE public.spin_history ADD COLUMN note TEXT DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='spin_history' AND column_name='action_done') THEN
    ALTER TABLE public.spin_history ADD COLUMN action_done BOOLEAN DEFAULT false;
  END IF;
END $$;

-- ── 4. BẢNG CONFESSIONS (HÒM THƯ TÂM SỰ GỬI ĐẾN SUNNY) ──
CREATE TABLE IF NOT EXISTS public.confessions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name  TEXT DEFAULT 'Ẩn danh',
  sender_email TEXT DEFAULT '',
  category     TEXT DEFAULT 'Bình an nội tâm',
  content      TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  read         BOOLEAN DEFAULT false,
  pinned       BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. BẬT ROW LEVEL SECURITY (RLS) ──
ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spin_history  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.confessions   ENABLE ROW LEVEL SECURITY;

-- ── 6. RLS POLICIES CHO PROFILES ──
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ── 7. RLS POLICIES CHO SPIN_HISTORY ──
DROP POLICY IF EXISTS "history_select" ON public.spin_history;
DROP POLICY IF EXISTS "history_insert" ON public.spin_history;
DROP POLICY IF EXISTS "history_update" ON public.spin_history;

CREATE POLICY "history_select" ON public.spin_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "history_insert" ON public.spin_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "history_update" ON public.spin_history FOR UPDATE USING (auth.uid() = user_id);

-- ── 8. RLS POLICIES CHO CONFESSIONS (TÂM SỰ) ──
DROP POLICY IF EXISTS "confessions_insert_all" ON public.confessions;
DROP POLICY IF EXISTS "confessions_select_all" ON public.confessions;
DROP POLICY IF EXISTS "confessions_update_all" ON public.confessions;
DROP POLICY IF EXISTS "confessions_delete_all" ON public.confessions;

-- Cho phép tất cả người dùng (kể cả khách / anon) gửi tâm sự
CREATE POLICY "confessions_insert_all" ON public.confessions FOR INSERT WITH CHECK (true);
-- Cho phép đọc / quản trị tâm sự
CREATE POLICY "confessions_select_all" ON public.confessions FOR SELECT USING (true);
CREATE POLICY "confessions_update_all" ON public.confessions FOR UPDATE USING (true);
CREATE POLICY "confessions_delete_all" ON public.confessions FOR DELETE USING (true);

-- ── 9. TRIGGER TỰ ĐỘNG TẠO PROFILE KHI ĐĂNG KÝ TÀI KHOẢN MỚI ──
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, streak_count, total_spins)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
    0,
    0
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Cấp lại quyền lần cuối để chắc chắn không bị thiếu privilege
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
