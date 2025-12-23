import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per window
const RATE_WINDOW = 60000; // 1 minute in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429 
      }
    );
  }

  try {
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

    return new Response(
      JSON.stringify(contractConfig),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch contract configuration' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});