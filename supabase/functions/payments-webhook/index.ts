// Stripe webhook handler. Confirms the dossier as paid on checkout.session.completed.
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

let _sb: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_sb) {
    _sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _sb;
}

async function handleCheckoutCompleted(session: any) {
  const dossierRef = session?.metadata?.dossierRef;
  const sessionId = session?.id;
  if (!dossierRef) {
    console.warn("checkout.session.completed without dossierRef metadata, session:", sessionId);
    return;
  }
  if (session?.payment_status !== "paid") {
    console.log("session not paid yet, skipping:", sessionId, session?.payment_status);
    return;
  }

  const sb = getSupabase();
  const { data, error } = await sb.rpc("confirm_dossier_payment", {
    ref_param: dossierRef,
    stripe_session_id_param: sessionId,
  });
  if (error) {
    console.error("confirm_dossier_payment RPC failed:", error);
    throw error;
  }
  console.log("Dossier confirmed paid:", dossierRef, "session:", sessionId, "row:", (data as any)?.ref);
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook invalid env query param:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);
    console.log("Webhook event:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutCompleted(event.data.object);
        break;
      default:
        console.log("Unhandled event:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("Webhook error:", e?.message, e);
    return new Response("Webhook error", { status: 400 });
  }
});
