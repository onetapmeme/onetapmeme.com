import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FROM = "CardSurgery <onboarding@resend.dev>";
const SUPPORT = "contact@cardsurgery.com";

type Kind = "received" | "approved" | "rejected" | "paid" | "shipped";

function htmlFor(kind: Kind, d: any) {
  const head = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5efe7;padding:24px;color:#2a1d14;">
      <div style="max-width:560px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e7d9c8;">
        <div style="background:linear-gradient(135deg,#5a3a25,#c98a5c);padding:22px;color:#fff;">
          <h1 style="margin:0;font-size:22px;letter-spacing:.5px;">CardSurgery</h1>
          <p style="margin:4px 0 0;opacity:.9;font-size:13px;">La précision chirurgicale dont vos précieuses cartes ont besoin.</p>
        </div>
        <div style="padding:24px;line-height:1.55;font-size:15px;">`;
  const foot = `
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0 12px"/>
        <p style="font-size:12px;color:#7b6957;">
          Dossier : <strong style="font-family:monospace">${d.ref}</strong> · Forfait : ${d.pack_label} (${d.pack_price})<br/>
          Une question ? <a href="mailto:${SUPPORT}" style="color:#a35b2e;">${SUPPORT}</a>
        </p>
      </div></div></div>`;

  const refLine = `<p style="margin:0 0 10px"><strong>Numéro de dossier :</strong> <code style="background:#f5efe7;padding:3px 6px;border-radius:4px;">${d.ref}</code></p>`;

  switch (kind) {
    case "received":
      return head + `
        <h2 style="margin:0 0 12px;color:#5a3a25;">Votre demande a bien été reçue ✓</h2>
        ${refLine}
        <p>Bonjour ${d.name},</p>
        <p>Merci pour votre confiance. Nous avons bien reçu vos photos et les détails de la carte
        <strong>${d.card_name ?? "à diagnostiquer"}</strong>. Un chirurgien analyse votre dossier et
        vous répondra <strong>sous 24 h ouvrées</strong>.</p>
        <p><strong>Aucun paiement n'est requis à ce stade.</strong> Le règlement du forfait
        <em>${d.pack_label}</em> ne sera demandé qu'après validation du diagnostic.</p>
        <p>Vous pouvez suivre votre dossier ici :<br/>
        <a href="https://cardsurgery.com/tracking?ref=${d.ref}" style="color:#a35b2e;">cardsurgery.com/tracking?ref=${d.ref}</a></p>
        ${foot}`;
    case "approved":
      return head + `
        <h2 style="margin:0 0 12px;color:#5a3a25;">Diagnostic validé — paiement disponible</h2>
        ${refLine}
        <p>Bonjour ${d.name}, votre diagnostic est validé. Le forfait <strong>${d.pack_label}</strong>
        (${d.pack_price}) est confirmé. Vous pouvez maintenant procéder au paiement, qui débloquera
        les instructions d'expédition sécurisées.</p>
        <p><a href="https://cardsurgery.com/payment?ref=${d.ref}" style="display:inline-block;background:#c98a5c;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">Procéder au paiement</a></p>
        ${foot}`;
    case "rejected":
      return head + `
        <h2 style="margin:0 0 12px;color:#a3402e;">Diagnostic refusé</h2>
        ${refLine}
        <p>Bonjour ${d.name}, après analyse de vos photos, notre équipe a estimé qu'une intervention
        n'apporterait pas de bénéfice mesurable sur cette carte. Aucun frais ne vous sera facturé.</p>
        ${d.admin_notes ? `<p><strong>Note de l'expert :</strong> ${d.admin_notes}</p>` : ""}
        ${foot}`;
    case "paid":
      return head + `
        <h2 style="margin:0 0 12px;color:#5a3a25;">Paiement reçu — préparez votre envoi</h2>
        ${refLine}
        <p>Bonjour ${d.name}, votre paiement de <strong>${d.pack_price}</strong> a bien été reçu.
        Préparez votre envoi en respectant nos consignes :</p>
        <ul>
          <li>Sleeve + toploader + sac antistatique</li>
          <li>Enveloppe matelassée ou colis carton renforcé</li>
          <li>Envoi recommandé R2 / R3, Chronopost ou UPS selon valeur</li>
          <li>Mentionnez votre dossier <code>${d.ref}</code> sur l'étiquette</li>
        </ul>
        <p>L'adresse de l'atelier vous est communiquée sur votre page de suivi :<br/>
        <a href="https://cardsurgery.com/payment?ref=${d.ref}" style="color:#a35b2e;">cardsurgery.com/payment?ref=${d.ref}</a></p>
        ${foot}`;
    case "shipped":
      return head + `
        <h2 style="margin:0 0 12px;color:#5a3a25;">Votre carte est en route ✈️</h2>
        ${refLine}
        <p>Bonjour ${d.name}, votre carte restaurée a été expédiée en colis blindé et assuré.
        Vous recevrez le numéro de suivi du transporteur séparément.</p>
        ${foot}`;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { ref, kind } = await req.json();
    if (!ref || !kind) throw new Error("Missing ref or kind");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: dossier, error } = await supabase
      .from("dossiers").select("*").eq("ref", String(ref).toUpperCase().trim()).maybeSingle();
    if (error || !dossier) throw new Error("Dossier not found");

    const subjects: Record<Kind, string> = {
      received: `Dossier ${dossier.ref} reçu — CardSurgery`,
      approved: `Dossier ${dossier.ref} validé — Paiement disponible`,
      rejected: `Dossier ${dossier.ref} — Diagnostic refusé`,
      paid: `Dossier ${dossier.ref} — Paiement confirmé, préparez l'envoi`,
      shipped: `Dossier ${dossier.ref} — Votre carte est en route`,
    };

    const html = htmlFor(kind as Kind, dossier);

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [dossier.email],
        subject: subjects[kind as Kind],
        html,
        reply_to: SUPPORT,
      }),
    });
    const out = await resp.json();
    if (!resp.ok) throw new Error(out.message || "Resend error");

    return new Response(JSON.stringify({ ok: true, id: out.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
