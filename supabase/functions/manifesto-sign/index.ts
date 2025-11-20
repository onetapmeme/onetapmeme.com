import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 signatures per window
const RATE_WINDOW = 3600000; // 1 hour

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

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // Score threshold for reCAPTCHA v3
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  // Rate limiting check
  if (!checkRateLimit(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429 
      }
    );
  }

  try {
    const { email, recaptchaToken } = await req.json();

    // Validate input
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Verify reCAPTCHA
    if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
      console.warn(`CAPTCHA verification failed for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'CAPTCHA verification failed' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403 
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate verification token
    const verificationToken = crypto.randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Insert signature with verification token
    const { error } = await supabase
      .from('manifesto_signatures')
      .insert({ 
        email: email.trim().toLowerCase(),
        verified: false,
        verification_token: verificationToken,
        token_expires_at: tokenExpiresAt.toISOString()
      });

    if (error) {
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'already_signed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 409 
          }
        );
      }
      throw error;
    }

    // Send verification email
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const verificationUrl = `${req.headers.get('origin')}/manifesto/verify?token=${verificationToken}`;
    
    try {
      await resend.emails.send({
        from: 'OneTap Manifesto <onboarding@resend.dev>',
        to: [email.trim().toLowerCase()],
        subject: 'Confirmez votre signature du Manifeste OneTap',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(59, 130, 246, 0.2); }
                .header { background: linear-gradient(135deg, #3b82f6 0%, #ff8c42 100%); padding: 32px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
                .content { padding: 32px; }
                .content p { line-height: 1.6; color: #e0e0e0; margin: 16px 0; }
                .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #ff8c42 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 24px 0; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); transition: transform 0.3s; }
                .cta-button:hover { transform: translateY(-2px); }
                .footer { padding: 24px 32px; text-align: center; color: #888; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.1); }
                .token-box { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 16px; margin: 16px 0; font-family: monospace; word-break: break-all; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎮 Manifeste OneTap</h1>
                </div>
                <div class="content">
                  <p>Merci d'avoir signé notre Manifeste !</p>
                  <p>Pour confirmer votre signature, cliquez sur le bouton ci-dessous :</p>
                  <center>
                    <a href="${verificationUrl}" class="cta-button">✓ Confirmer ma signature</a>
                  </center>
                  <p style="margin-top: 32px; color: #aaa; font-size: 14px;">
                    Ou copiez ce lien dans votre navigateur :
                  </p>
                  <div class="token-box">${verificationUrl}</div>
                  <p style="color: #ff8c42; font-size: 14px; margin-top: 24px;">
                    ⚠️ Ce lien expire dans 24 heures
                  </p>
                </div>
                <div class="footer">
                  Si vous n'avez pas signé le manifeste, ignorez cet email.<br>
                  OneTap - Révolutionner le Gaming
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log(`Verification email sent to: ${email}`);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the request if email fails, signature is saved
    }

    console.log(`Manifesto signature pending verification for: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Vérifiez votre email pour confirmer' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error signing manifesto:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to sign manifesto' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
