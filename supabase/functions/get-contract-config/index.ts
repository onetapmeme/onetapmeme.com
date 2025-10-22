import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching contract configuration');

    // Contract configuration - verified and documented in legal/AUDIT.md
    const contractConfig = {
      address: '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
      symbol: 'ONETAP',
      decimals: 18,
      chainId: '0x2105', // Base Mainnet (8453 in decimal)
      chainName: 'Base',
      blockExplorer: 'https://basescan.org',
      rpcUrl: 'https://mainnet.base.org',
      logoUrl: 'https://storage.googleapis.com/gpt-engineer-file-uploads/bzha1MKxKTbCseyWzTBWNn1IviE2/uploads/1760711243340-onetap_new_logo.png',
    };

    console.log('Successfully retrieved contract configuration');

    return new Response(
      JSON.stringify(contractConfig),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error fetching contract configuration:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch contract configuration' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
