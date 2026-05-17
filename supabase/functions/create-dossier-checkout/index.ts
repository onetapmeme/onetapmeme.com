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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
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
    if (!returnUrl || typeof returnUrl !== "string") throw new Error("Invalid returnUrl");

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
