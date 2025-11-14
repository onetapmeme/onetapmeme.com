-- Fix memes table: Make user_id NOT NULL and add foreign key constraint
-- This prevents RLS bypass through NULL user_ids

-- First, make user_id NOT NULL
ALTER TABLE public.memes 
ALTER COLUMN user_id SET NOT NULL;

-- Add foreign key constraint to ensure referential integrity
ALTER TABLE public.memes 
ADD CONSTRAINT fk_memes_user 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_memes_user_id ON public.memes(user_id);