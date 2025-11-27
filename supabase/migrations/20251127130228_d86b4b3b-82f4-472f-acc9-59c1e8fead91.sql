-- Fix nullable user_id in meme_votes table (Security Issue: MISSING_RLS)
-- Delete any orphaned votes without a user_id (if any exist)
DELETE FROM public.meme_votes WHERE user_id IS NULL;

-- Make user_id NOT NULL to enforce RLS policies
ALTER TABLE public.meme_votes ALTER COLUMN user_id SET NOT NULL;

-- Add index for performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_meme_votes_user_id ON public.meme_votes(user_id);