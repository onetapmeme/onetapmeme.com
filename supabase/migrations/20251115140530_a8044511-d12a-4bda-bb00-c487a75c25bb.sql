-- Fix meme_votes table: Make user_id NOT NULL
-- This prevents RLS bypass through NULL user_ids
ALTER TABLE public.meme_votes 
ALTER COLUMN user_id SET NOT NULL;

-- Add foreign key constraint for meme_votes
ALTER TABLE public.meme_votes 
ADD CONSTRAINT fk_meme_votes_user 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add index for better performance on meme_votes user_id lookups
CREATE INDEX IF NOT EXISTS idx_meme_votes_user_id ON public.meme_votes(user_id);

-- Fix user_xp table: Make user_id NOT NULL
-- This prevents RLS bypass through NULL user_ids
ALTER TABLE public.user_xp 
ALTER COLUMN user_id SET NOT NULL;

-- Add foreign key constraint for user_xp
ALTER TABLE public.user_xp 
ADD CONSTRAINT fk_user_xp_user 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add unique constraint to ensure one XP record per user
ALTER TABLE public.user_xp 
ADD CONSTRAINT unique_user_xp_user_id UNIQUE (user_id);

-- Add index for better performance on user_xp user_id lookups
CREATE INDEX IF NOT EXISTS idx_user_xp_user_id ON public.user_xp(user_id);

-- Add database-level email length constraint to manifesto_signatures
ALTER TABLE public.manifesto_signatures 
ADD CONSTRAINT check_email_length CHECK (char_length(email) <= 255);