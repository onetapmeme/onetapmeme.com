// Create embedded checkout session for a dossier.
// Line items: pack price + optional insurance tier price (quantity 1 or 2 for full pack).
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_PACKS = new Set(["pack_clean", "pack_pro", "pack_full"]);
const INSURANCE_LOOKUPS: Record<number, string> = {
  1: "insurance_tier_1",
  2: "insurance_tier_2",
  3: "insurance_tier_3",
  4: "insurance_tier_4",
  5: "insurance_tier_5",
};

// Allow-list of origins permitted as Stripe return_url destinations. Prevents
// an attacker-supplied returnUrl from turning a successful payment into an
// open redirect to a phishing page.
const ALLOWED_RETURN_ORIGINS = [
  "https://cardsurgery.com",
  "https://www.cardsurgery.com",
  "https://cardsurgery.lovable.app",
  "https://id-preview--e486c79e-94e6-41dc-adb7-6b234d6fbfab.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function isAllowedReturnUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const origin = `${u.protocol}//${u.host}`;
    if (ALLOWED_RETURN_ORIGINS.includes(origin)) return true;
    // Allow lovable preview subdomains for this project.
    if (u.host.endsWith(".lovable.app") || u.host.endsWith(".lovableproject.com")) return true;
    return false;
  } catch {
    return false;
  }
}

// Per-IP rate limit so attackers can't flood Stripe API quotas via this
// public endpoint.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RL_MAX = 10;
const RL_WINDOW_MS = 60_000;
function allow(ip: string): boolean {
  const now = Date.now();
  const r = rateLimit.get(ip);
  if (!r || now > r.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return true;
  }
  if (r.count >= RL_MAX) return false;
  r.count++;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return new Response(JSON.stringify({ error: "Rate limited" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }


  try {
    const body = await req.json();
    const {
      packPriceId,
      insuranceTierIndex,
      insuranceQuantity,
      dossierRef,
      customerEmail,
      returnUrl,
      environment,
    } = body ?? {};

    if (!ALLOWED_PACKS.has(packPriceId)) throw new Error("Invalid packPriceId");
    if (!dossierRef || typeof dossierRef !== "string" || !/^[A-Z0-9-]{4,40}$/i.test(dossierRef)) {
      throw new Error("Invalid dossierRef");
    }
    if (environment !== "sandbox" && environment !== "live") throw new Error("Invalid environment");
    if (!returnUrl || typeof returnUrl !== "string" || !isAllowedReturnUrl(returnUrl)) {
      throw new Error("Invalid returnUrl");
    }

    const env: StripeEnv = environment;
    const stripe = createStripeClient(env);

    // Resolve pack price
    const packPrices = await stripe.prices.list({ lookup_keys: [packPriceId], limit: 1 });
    if (!packPrices.data.length) throw new Error("Pack price not found in Stripe");

    const lineItems: any[] = [
      { price: packPrices.data[0].id, quantity: 1 },
    ];

    // Resolve optional insurance tier
    let insLookup: string | null = null;
    if (insuranceTierIndex && Number.isInteger(insuranceTierIndex)) {
      insLookup = INSURANCE_LOOKUPS[insuranceTierIndex as number] ?? null;
    }
    if (insLookup) {
      const qty = insuranceQuantity === 2 ? 2 : 1;
      const insPrices = await stripe.prices.list({ lookup_keys: [insLookup], limit: 1 });
      if (insPrices.data.length) {
        lineItems.push({ price: insPrices.data[0].id, quantity: qty });
      }
    }

    // Resolve / create customer with metadata to make later lookups searchable
    let customerId: string | undefined;
    if (customerEmail && typeof customerEmail === "string") {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (existing.data.length) {
        customerId = existing.data[0].id;
      } else {
        const created = await stripe.customers.create({
          email: customerEmail,
          metadata: { dossierRef },
        });
        customerId = created.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(customerId && { customer: customerId }),
      metadata: {
        dossierRef,
        insuranceTierIndex: String(insuranceTierIndex ?? ""),
        insuranceQuantity: String(insuranceQuantity ?? 1),
      },
      payment_intent_data: {
        metadata: { dossierRef },
      },
    });

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e: any) {
    console.error("create-dossier-checkout error:", e?.message, e);
    return new Response(
      JSON.stringify({ error: e?.message || "Internal error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
