-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  xp_reward integer NOT NULL DEFAULT 0,
  rarity text NOT NULL DEFAULT 'common',
  category text NOT NULL,
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create ranks configuration table
CREATE TABLE IF NOT EXISTS public.ranks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  min_xp integer NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  rank_index integer NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements"
ON public.achievements FOR SELECT
USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ranks (public read)
CREATE POLICY "Anyone can view ranks"
ON public.ranks FOR SELECT
USING (true);

-- Insert default ranks
INSERT INTO public.ranks (name, min_xp, icon, color, rank_index) VALUES
  ('Rookie', 0, '🎯', '#9CA3AF', 0),
  ('Private', 100, '🔰', '#3B82F6', 1),
  ('Corporal', 300, '⚔️', '#10B981', 2),
  ('Sergeant', 700, '🎖️', '#F59E0B', 3),
  ('Lieutenant', 1500, '💎', '#8B5CF6', 4),
  ('Captain', 3000, '👑', '#EF4444', 5),
  ('Major', 6000, '⭐', '#EC4899', 6),
  ('Colonel', 10000, '🏆', '#F97316', 7),
  ('General', 20000, '👨‍✈️', '#DC2626', 8),
  ('Legend', 50000, '💀', '#7C3AED', 9)
ON CONFLICT (rank_index) DO NOTHING;

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, xp_reward, rarity, category, requirement_type, requirement_value) VALUES
  ('First Steps', 'Complete your first tap', '👣', 10, 'common', 'gameplay', 'clicks', 1),
  ('Sharpshooter', 'Reach 100 clicks', '🎯', 50, 'common', 'gameplay', 'clicks', 100),
  ('Warrior', 'Reach 500 clicks', '⚔️', 150, 'uncommon', 'gameplay', 'clicks', 500),
  ('Master Tapper', 'Reach 1000 clicks', '💎', 300, 'rare', 'gameplay', 'clicks', 1000),
  ('Legend', 'Reach 5000 clicks', '🏆', 1000, 'legendary', 'gameplay', 'clicks', 5000),
  ('XP Collector', 'Earn 500 XP', '⭐', 100, 'uncommon', 'progression', 'xp', 500),
  ('Rising Star', 'Earn 2000 XP', '🌟', 300, 'rare', 'progression', 'xp', 2000),
  ('Elite Player', 'Earn 10000 XP', '💫', 1500, 'epic', 'progression', 'xp', 10000)
ON CONFLICT DO NOTHING;