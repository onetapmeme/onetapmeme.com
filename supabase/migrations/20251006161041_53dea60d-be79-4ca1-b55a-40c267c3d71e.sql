-- Create table for player inventory (drops collected)
CREATE TABLE public.player_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  drop_name TEXT NOT NULL,
  drop_icon TEXT NOT NULL,
  drop_rarity TEXT NOT NULL,
  rank_name TEXT NOT NULL,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_equipped BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.player_inventory ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own inventory" 
ON public.player_inventory 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own inventory" 
ON public.player_inventory 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inventory" 
ON public.player_inventory 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own inventory" 
ON public.player_inventory 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_player_inventory_user_id ON public.player_inventory(user_id);
CREATE INDEX idx_player_inventory_equipped ON public.player_inventory(user_id, is_equipped) WHERE is_equipped = true;