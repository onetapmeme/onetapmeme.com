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
      console.error('GDPR Export: No authorization header')
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
      console.error('GDPR Export: User authentication failed', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = user.id
    const userEmail = user.email
    console.log(`GDPR Export: Processing export request for user ${userId}`)

    // Service role client for reading all user data (bypasses RLS)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey)

    // Collect all user data
    const exportData: Record<string, unknown> = {
      exportMetadata: {
        exportDate: new Date().toISOString(),
        gdprArticle15Compliant: true,
        dataSubject: {
          userId: userId,
          email: userEmail,
        },
        dataController: '1Tap Token',
        purpose: 'GDPR Article 15 - Right of Access'
      },
      userData: {}
    }

    // 1. Player Progress
    const { data: playerProgress } = await adminClient
      .from('player_progress')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      playerProgress: playerProgress || [] 
    }
    console.log(`GDPR Export: player_progress - ${playerProgress?.length || 0} records`)

    // 2. Player Inventory
    const { data: playerInventory } = await adminClient
      .from('player_inventory')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      playerInventory: playerInventory || [] 
    }
    console.log(`GDPR Export: player_inventory - ${playerInventory?.length || 0} records`)

    // 3. User XP
    const { data: userXp } = await adminClient
      .from('user_xp')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      userXp: userXp || [] 
    }
    console.log(`GDPR Export: user_xp - ${userXp?.length || 0} records`)

    // 4. User Achievements
    const { data: userAchievements } = await adminClient
      .from('user_achievements')
      .select('*, achievements(*)')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      userAchievements: userAchievements || [] 
    }
    console.log(`GDPR Export: user_achievements - ${userAchievements?.length || 0} records`)

    // 5. User Quest Progress
    const { data: questProgress } = await adminClient
      .from('user_quest_progress')
      .select('*, daily_quests(*)')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      questProgress: questProgress || [] 
    }
    console.log(`GDPR Export: user_quest_progress - ${questProgress?.length || 0} records`)

    // 6. Memes created by user
    const { data: memes } = await adminClient
      .from('memes')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      memesCreated: memes || [] 
    }
    console.log(`GDPR Export: memes - ${memes?.length || 0} records`)

    // 7. Meme Votes
    const { data: memeVotes } = await adminClient
      .from('meme_votes')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      memeVotes: memeVotes || [] 
    }
    console.log(`GDPR Export: meme_votes - ${memeVotes?.length || 0} records`)

    // 8. User Roles
    const { data: userRoles } = await adminClient
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      userRoles: userRoles || [] 
    }
    console.log(`GDPR Export: user_roles - ${userRoles?.length || 0} records`)

    // 9. Manifesto Signatures (by email)
    if (userEmail) {
      const { data: manifestoSignatures } = await adminClient
        .from('manifesto_signatures')
        .select('id, email, signed_at, verified, created_at')
        .eq('email', userEmail)
      exportData.userData = { 
        ...exportData.userData as object, 
        manifestoSignatures: manifestoSignatures || [] 
      }
      console.log(`GDPR Export: manifesto_signatures - ${manifestoSignatures?.length || 0} records`)
    }

    // 10. Referrals (as referrer or referred)
    const { data: referralsAsReferrer } = await adminClient
      .from('referrals')
      .select('*')
      .eq('referrer_wallet', userId)
    
    const { data: referralsAsReferred } = await adminClient
      .from('referrals')
      .select('*')
      .eq('referred_wallet', userId)
    
    exportData.userData = { 
      ...exportData.userData as object, 
      referrals: {
        asReferrer: referralsAsReferrer || [],
        asReferred: referralsAsReferred || []
      }
    }
    console.log(`GDPR Export: referrals - ${(referralsAsReferrer?.length || 0) + (referralsAsReferred?.length || 0)} records`)

    // 11. Wallet Stats
    const { data: walletStats } = await adminClient
      .from('wallet_stats')
      .select('*')
      .eq('wallet_address', userId)
    exportData.userData = { 
      ...exportData.userData as object, 
      walletStats: walletStats || [] 
    }
    console.log(`GDPR Export: wallet_stats - ${walletStats?.length || 0} records`)

    console.log(`GDPR Export: Completed for user ${userId}`)

    return new Response(
      JSON.stringify(exportData, null, 2),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="gdpr-data-export-${userId.substring(0, 8)}-${new Date().toISOString().split('T')[0]}.json"`
        } 
      }
    )

  } catch (error) {
    console.error('GDPR Export: Unexpected error', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error during data export',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})