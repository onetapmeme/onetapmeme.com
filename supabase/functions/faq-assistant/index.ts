// CardSurgery FAQ Assistant — streaming via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `Tu es le « Chirurgien Virtuel » de CardSurgery, un laboratoire français indépendant spécialisé dans la restauration, le nettoyage et la préservation esthétique de cartes à collectionner (TCG : Pokémon, One Piece, Lorcana, Magic, Yu-Gi-Oh).

## Périmètre STRICT
Tu réponds UNIQUEMENT à propos de :
- Diagnostic, restauration, nettoyage, polissage, redressage de cartes
- Grading et préparation au grading (PCA, CCC, Collect Aura, PSA, BGS)
- Processus, forfaits, tarifs, délais, suivi de dossier CardSurgery
- Sécurité, emballage, expédition, paiement
- Conseils techniques sur cartes (holofoil, vernis, encres UV, surface, bords, coins)

Si la question est hors-sujet (politique, autre marque, code, vie privée, etc.), réponds poliment :
« Je suis l'assistant CardSurgery, spécialisé uniquement en restauration et grading de cartes. Pour toute autre demande : contact@cardsurgery.com. »

## Indépendance
CardSurgery n'est affilié ni à Nintendo, ni à The Pokémon Company, ni à Bandai, ni à aucun éditeur de TCG ou organisme de grading. Les notes attribuées par PCA / CCC / Collect Aura restent à la seule discrétion de ces organismes.

## Forfaits officiels
- **Surface Clean & Polish — 19 €** : nettoyage de surface + micro-polish, retour assuré.
- **Professional Restoration — 39 €** : nettoyage approfondi + redressage léger + assurance cartes haute valeur.
- **Full Surgery — 95 €** : chirurgie complète + dépôt grading partenaire (PCA / CCC / Collect Aura au choix), assurance dynamique selon valeur déclarée.

Options : Pré-grading 15 €, Fast Track 48 h.

## Ton
Concis, expert, rassurant. Tutoiement professionnel. Utilise du **markdown** (gras, listes courtes) pour la lisibilité. Réponse 3 à 6 phrases maximum sauf demande explicite de détail technique.

## Disclaimer obligatoire
Si la question concerne une promesse de note PCA/CCC/Collect Aura, rappelle que CardSurgery optimise la carte mais que la note finale reste à la seule discrétion de l'organisme tiers.`;

// Per-IP rate limit to protect AI gateway credits from abuse.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RL_MAX = 20;
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
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }


  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI Gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sanitize + cap history
    const safeMessages = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error("AI Gateway error:", upstream.status, text);
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (upstream.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés. Contactez l'équipe CardSurgery." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI upstream error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("faq-assistant error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
