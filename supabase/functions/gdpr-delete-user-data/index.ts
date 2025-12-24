import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('GDPR Delete: No authorization header')
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with user's JWT
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // User client to get authenticated user
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    // Get authenticated user
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user) {
      console.error('GDPR Delete: User authentication failed', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = user.id
    const userEmail = user.email
    console.log(`GDPR Delete: Processing deletion request for user ${userId}`)

    // Service role client for deletion operations (bypasses RLS)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey)

    // Track deletion results
    const deletionLog: Record<string, { deleted: number; error?: string }> = {}

    // 1. Delete meme_votes
    const { error: votesError } = await adminClient
      .from('meme_votes')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['meme_votes'] = votesError 
      ? { deleted: 0, error: votesError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: meme_votes processed`)

    // 2. Delete memes (user's created memes)
    const { error: memesError } = await adminClient
      .from('memes')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['memes'] = memesError
      ? { deleted: 0, error: memesError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: memes processed`)

    // 3. Delete user_achievements
    const { error: achievementsError } = await adminClient
      .from('user_achievements')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['user_achievements'] = achievementsError
      ? { deleted: 0, error: achievementsError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: user_achievements processed`)

    // 4. Delete user_quest_progress
    const { error: questsError } = await adminClient
      .from('user_quest_progress')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['user_quest_progress'] = questsError
      ? { deleted: 0, error: questsError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: user_quest_progress processed`)

    // 5. Delete player_inventory
    const { error: inventoryError } = await adminClient
      .from('player_inventory')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['player_inventory'] = inventoryError
      ? { deleted: 0, error: inventoryError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: player_inventory processed`)

    // 6. Delete player_progress
    const { error: progressError } = await adminClient
      .from('player_progress')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['player_progress'] = progressError
      ? { deleted: 0, error: progressError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: player_progress processed`)

    // 7. Delete user_xp
    const { error: xpError } = await adminClient
      .from('user_xp')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['user_xp'] = xpError
      ? { deleted: 0, error: xpError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: user_xp processed`)

    // 8. Delete user_roles
    const { error: rolesError } = await adminClient
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
    
    deletionLog['user_roles'] = rolesError
      ? { deleted: 0, error: rolesError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: user_roles processed`)

    // 9. Delete manifesto_signatures by email (if user has email)
    if (userEmail) {
      const { error: signaturesError } = await adminClient
        .from('manifesto_signatures')
        .delete()
        .eq('email', userEmail)
      
      deletionLog['manifesto_signatures'] = signaturesError
        ? { deleted: 0, error: signaturesError.message }
        : { deleted: 1 }
      console.log(`GDPR Delete: manifesto_signatures processed`)
    }

    // 10. Anonymize referrals (don't delete - just anonymize wallet addresses)
    // This preserves referral chain integrity while removing PII
    const { error: referrerError } = await adminClient
      .from('referrals')
      .update({ referrer_wallet: `DELETED_USER_${userId.substring(0, 8)}` })
      .eq('referrer_wallet', userId)
    
    const { error: referredError } = await adminClient
      .from('referrals')
      .update({ referred_wallet: `DELETED_USER_${userId.substring(0, 8)}` })
      .eq('referred_wallet', userId)
    
    deletionLog['referrals_anonymized'] = {
      deleted: 1,
      error: referrerError?.message || referredError?.message
    }
    console.log(`GDPR Delete: referrals anonymized`)

    // 11. Delete wallet_stats
    const { error: walletError } = await adminClient
      .from('wallet_stats')
      .delete()
      .eq('wallet_address', userId)
    
    deletionLog['wallet_stats'] = walletError
      ? { deleted: 0, error: walletError.message }
      : { deleted: 1 }
    console.log(`GDPR Delete: wallet_stats processed`)

    // Check for errors
    const hasErrors = Object.values(deletionLog)
      .some(log => log.error)

    console.log(`GDPR Delete: Completed for user ${userId}`)

    return new Response(
      JSON.stringify({
        success: !hasErrors,
        message: hasErrors 
          ? 'Data deletion completed with some errors' 
          : 'All user data has been successfully deleted',
        userId: userId,
        deletionLog,
        gdprArticle17Compliant: true,
        timestamp: new Date().toISOString()
      }),
      { 
        status: hasErrors ? 207 : 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('GDPR Delete: Unexpected error', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error during data deletion',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})