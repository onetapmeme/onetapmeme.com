-- Create daily_quests table to store available quests
CREATE TABLE IF NOT EXISTS public.daily_quests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirement_type TEXT NOT NULL, -- 'clicks', 'drops', 'login', 'share'
  requirement_value INTEGER NOT NULL,
  xp_reward INTEGER NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_quest_progress table to track user progress
CREATE TABLE IF NOT EXISTS public.user_quest_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quest_id UUID NOT NULL REFERENCES public.daily_quests(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  claimed BOOLEAN NOT NULL DEFAULT false,
  quest_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, quest_id, quest_date)
);

-- Enable RLS
ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quest_progress ENABLE ROW LEVEL SECURITY;

-- Policies for daily_quests (everyone can view)
CREATE POLICY "Anyone can view daily quests"
ON public.daily_quests
FOR SELECT
USING (true);

-- Policies for user_quest_progress
CREATE POLICY "Users can view their own quest progress"
ON public.user_quest_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quest progress"
ON public.user_quest_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quest progress"
ON public.user_quest_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- Function to update quest progress timestamp
CREATE OR REPLACE FUNCTION public.update_quest_progress_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.completed = true AND OLD.completed = false THEN
    NEW.completed_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_user_quest_progress_timestamp
BEFORE UPDATE ON public.user_quest_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_quest_progress_timestamp();

-- Insert default daily quests
INSERT INTO public.daily_quests (title, description, requirement_type, requirement_value, xp_reward, icon) VALUES
('Click Master', 'Click 100 times in the Tap-to-Earn game', 'clicks', 100, 500, '🖱️'),
('Lucky Dropper', 'Collect 3 drops of any rarity', 'drops', 3, 300, '🎁'),
('Daily Login', 'Just login to complete this quest!', 'login', 1, 100, '✨'),
('Engagement Expert', 'Complete 2 other daily quests', 'complete_quests', 2, 400, '🏆');