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

async function sendPaidEmail(dossierRef: string, sessionId: string) {
  const sb = getSupabase();
  // Read dossier row to populate template props (mirrors src/lib/dossiers.ts mapping).
  const { data: row, error } = await sb
    .from("dossiers")
    .select("ref, name, email, pack, pack_label, pack_price, card_name, admin_notes, return_carrier, return_tracking_number")
    .eq("ref", dossierRef)
    .maybeSingle();
  if (error || !row?.email) {
    console.warn("sendPaidEmail: dossier lookup failed", dossierRef, error?.message);
    return;
  }
  const templateData = {
    name: row.name,
    ref: row.ref,
    packLabel: row.pack_label,
    packPrice: row.pack_price,
    cardName: row.card_name ?? "",
    adminNotes: row.admin_notes ?? "",
    carrier: row.return_carrier ?? "",
    tracking: row.return_tracking_number ?? "",
  };
  try {
    const { error: invokeErr } = await sb.functions.invoke("send-transactional-email", {
      body: {
        templateName: "dossier-paid",
        recipientEmail: row.email,
        // Idempotent on (ref, sessionId) so duplicate webhook deliveries don't double-send.
        idempotencyKey: `dossier-paid-${row.ref}-${sessionId}`,
        templateData,
      },
    });
    if (invokeErr) console.warn("dossier-paid email invoke error:", invokeErr.message);
  } catch (e: any) {
    console.warn("dossier-paid email invoke threw:", e?.message);
  }
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

  // Fire-and-forget customer "Paiement reçu" email. Failures are logged but never block the 200.
  await sendPaidEmail(dossierRef, sessionId);
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
