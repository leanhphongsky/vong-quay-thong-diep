-- ============================================================
-- VÒNG QUAY THÔNG ĐIỆP — Supabase Database Setup
-- Chạy toàn bộ file này trong Supabase SQL Editor
-- ============================================================

-- 1. Bảng profiles (hồ sơ người dùng)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username      TEXT DEFAULT '',
  streak_count  INTEGER DEFAULT 0,
  last_spin_date DATE,
  total_spins   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng spin_history (lịch sử quay)
CREATE TABLE IF NOT EXISTS public.spin_history (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_id  INTEGER NOT NULL,
  spin_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bật Row Level Security
ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spin_history ENABLE ROW LEVEL SECURITY;

-- 4. Policies cho profiles
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 5. Policies cho spin_history
CREATE POLICY "history_select" ON public.spin_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "history_insert" ON public.spin_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Trigger tự tạo profile khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
