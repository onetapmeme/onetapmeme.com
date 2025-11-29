import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Max 10 crafts per window
const RATE_WINDOW = 3600000; // 1 hour in milliseconds

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

interface CraftRequest {
  itemIds: string[];
}

const RARITY_HIERARCHY = [
  'Common',
  'Uncommon', 
  'Rare',
  'Epic',
  'Legendary',
  'Legendary+',
  'Mythic'
];

const CRAFT_RECIPES = [
  { from: 'Common', to: 'Uncommon', required: 3 },
  { from: 'Uncommon', to: 'Rare', required: 3 },
  { from: 'Rare', to: 'Epic', required: 3 },
  { from: 'Epic', to: 'Legendary', required: 3 },
  { from: 'Legendary', to: 'Legendary+', required: 3 },
  { from: 'Legendary+', to: 'Mythic', required: 3 },
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit
    if (!checkRateLimit(user.id)) {
      console.log(`Rate limit exceeded for user ${user.id}`);
      return new Response(
        JSON.stringify({ error: 'Too many crafting attempts. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { itemIds }: CraftRequest = await req.json();

    if (!itemIds || itemIds.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No items provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Crafting request from user ${user.id} with ${itemIds.length} items`);

    // Fetch the items
    const { data: items, error: fetchError } = await supabase
      .from('player_inventory')
      .select('*')
      .in('id', itemIds)
      .eq('user_id', user.id);

    if (fetchError || !items) {
      console.error('Error fetching items:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate items belong to user and have same rarity
    if (items.length !== itemIds.length) {
      return new Response(
        JSON.stringify({ error: 'Some items not found or do not belong to you' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const rarity = items[0].drop_rarity;
    if (!items.every(item => item.drop_rarity === rarity)) {
      return new Response(
        JSON.stringify({ error: 'All items must have the same rarity' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find craft recipe
    const recipe = CRAFT_RECIPES.find(r => r.from === rarity);
    if (!recipe) {
      return new Response(
        JSON.stringify({ error: 'Cannot craft items of this rarity' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (items.length !== recipe.required) {
      return new Response(
        JSON.stringify({ error: `Need exactly ${recipe.required} items of ${rarity} rarity` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Delete the used items
    const { error: deleteError } = await supabase
      .from('player_inventory')
      .delete()
      .in('id', itemIds);

    if (deleteError) {
      console.error('Error deleting items:', deleteError);
      return new Response(
        JSON.stringify({ error: 'Failed to delete items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new item with upgraded rarity
    const rarityIcons = {
      'Uncommon': '💎',
      'Rare': '🔷',
      'Epic': '🔮',
      'Legendary': '⚡',
      'Legendary+': '🌟',
      'Mythic': '👑'
    };

    const newItem = {
      user_id: user.id,
      drop_name: `Crafted ${recipe.to} Item`,
      drop_icon: rarityIcons[recipe.to as keyof typeof rarityIcons] || '✨',
      drop_rarity: recipe.to,
      rank_name: 'Crafted',
      is_equipped: false
    };

    const { data: craftedItem, error: insertError } = await supabase
      .from('player_inventory')
      .insert(newItem)
      .select()
      .single();

    if (insertError || !craftedItem) {
      console.error('Error creating crafted item:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create crafted item' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully crafted ${recipe.to} item for user ${user.id}`);

    // Award XP for crafting
    await supabase.rpc('increment_user_xp', {
      user_id_param: user.id,
      xp_amount: recipe.required * 5
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        craftedItem,
        message: `Successfully crafted ${recipe.to} item!`,
        xpEarned: recipe.required * 5
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
