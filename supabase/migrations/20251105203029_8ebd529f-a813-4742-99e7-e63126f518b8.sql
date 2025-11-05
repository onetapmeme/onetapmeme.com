-- Table for memes created by users
CREATE TABLE IF NOT EXISTS public.memes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  template_name TEXT,
  accessories JSONB,
  background TEXT,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for meme votes/likes
CREATE TABLE IF NOT EXISTS public.meme_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meme_id UUID REFERENCES public.memes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(meme_id, user_id)
);

-- Table for user XP and levels
CREATE TABLE IF NOT EXISTS public.user_xp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  memes_created INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  votes_received INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Function to calculate user level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level = floor(sqrt(xp / 100)) + 1
  RETURN FLOOR(SQRT(xp::FLOAT / 100.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to update level when XP changes
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = calculate_level(NEW.total_xp);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_level_trigger
BEFORE UPDATE OF total_xp ON public.user_xp
FOR EACH ROW
EXECUTE FUNCTION update_user_level();

-- RLS Policies
ALTER TABLE public.memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meme_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;

-- Memes policies
CREATE POLICY "Memes are viewable by everyone"
ON public.memes FOR SELECT
USING (true);

CREATE POLICY "Users can create their own memes"
ON public.memes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memes"
ON public.memes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memes"
ON public.memes FOR DELETE
USING (auth.uid() = user_id);

-- Meme votes policies
CREATE POLICY "Votes are viewable by everyone"
ON public.meme_votes FOR SELECT
USING (true);

CREATE POLICY "Users can vote on memes"
ON public.meme_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their votes"
ON public.meme_votes FOR DELETE
USING (auth.uid() = user_id);

-- User XP policies
CREATE POLICY "XP is viewable by everyone"
ON public.user_xp FOR SELECT
USING (true);

CREATE POLICY "Users can update their own XP"
ON public.user_xp FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own XP"
ON public.user_xp FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_memes_user_id ON public.memes(user_id);
CREATE INDEX idx_memes_created_at ON public.memes(created_at DESC);
CREATE INDEX idx_meme_votes_meme_id ON public.meme_votes(meme_id);
CREATE INDEX idx_meme_votes_user_id ON public.meme_votes(user_id);
CREATE INDEX idx_user_xp_user_id ON public.user_xp(user_id);
CREATE INDEX idx_user_xp_level ON public.user_xp(level DESC);
CREATE INDEX idx_user_xp_total_xp ON public.user_xp(total_xp DESC);