import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Token is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find signature by token
    const { data: signature, error: fetchError } = await supabase
      .from('manifesto_signatures')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (fetchError || !signature) {
      console.warn(`Invalid token attempted: ${token}`);
      return new Response(
        JSON.stringify({ error: 'invalid_token', message: 'Token invalide ou expiré' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }

    // Check if already verified
    if (signature.verified) {
      return new Response(
        JSON.stringify({ success: true, message: 'already_verified', email: signature.email }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Check if token expired
    if (new Date(signature.token_expires_at) < new Date()) {
      console.warn(`Expired token attempted: ${token} for ${signature.email}`);
      return new Response(
        JSON.stringify({ error: 'expired_token', message: 'Le lien de vérification a expiré' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 410 
        }
      );
    }

    // Verify signature
    const { error: updateError } = await supabase
      .from('manifesto_signatures')
      .update({ 
        verified: true,
        verification_token: null,
        token_expires_at: null
      })
      .eq('id', signature.id);

    if (updateError) {
      throw updateError;
    }

    console.log(`Signature verified successfully for: ${signature.email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'verified',
        email: signature.email 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to verify signature' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
