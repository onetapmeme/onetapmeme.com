-- Add foreign key constraint to player_inventory table for data integrity
ALTER TABLE public.player_inventory
ADD CONSTRAINT player_inventory_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Add comment explaining the constraint
COMMENT ON CONSTRAINT player_inventory_user_id_fkey ON public.player_inventory IS 'Ensures inventory items are linked to valid users and automatically deleted when users are removed';