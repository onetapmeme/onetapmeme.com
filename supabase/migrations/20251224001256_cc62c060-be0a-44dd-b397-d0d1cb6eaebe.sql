-- Create SECURITY DEFINER function to toggle item equipment status
-- This is the secure alternative to allowing direct UPDATE on player_inventory
CREATE OR REPLACE FUNCTION public.toggle_item_equipped(item_id_param uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  item_owner_id uuid;
  new_equipped_status boolean;
BEGIN
  -- Check authentication
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Verify ownership of the item
  SELECT user_id INTO item_owner_id
  FROM public.player_inventory
  WHERE id = item_id_param;
  
  IF item_owner_id IS NULL THEN
    RAISE EXCEPTION 'Item not found';
  END IF;
  
  IF item_owner_id != current_user_id THEN
    RAISE EXCEPTION 'Not authorized to modify this item';
  END IF;
  
  -- Toggle the equipped status (only this field, nothing else)
  UPDATE public.player_inventory
  SET is_equipped = NOT is_equipped
  WHERE id = item_id_param AND user_id = current_user_id
  RETURNING is_equipped INTO new_equipped_status;
  
  RETURN new_equipped_status;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.toggle_item_equipped(uuid) TO authenticated;