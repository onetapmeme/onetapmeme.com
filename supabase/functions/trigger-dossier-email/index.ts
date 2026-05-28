// Public-callable wrapper. The frontend can request an email for a dossier
// without being able to control recipient or template data — both are derived
// server-side from the dossier row in the database. The actual email send is
// delegated to send-transactional-email using the service-role key.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_KINDS = new Set([
  "received",
  "approved",
  "rejected",
  "paid",
  "shipped",
  "admin-new",
]);

// Kinds that send customer-facing status updates or notify admins.
// These require an authenticated admin caller — only "received" remains
// open so the anonymous diagnostic submission flow can send the initial
// confirmation right after dossier creation.
const ADMIN_ONLY_KINDS = new Set([
  "approved",
  "rejected",
  "paid",
  "shipped",
  "admin-new",
]);

// Per-IP rate limit to prevent abusive email flooding.
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
    const { ref, kind } = await req.json();
    if (!ref || typeof ref !== "string" || !/^[A-Z0-9-]{4,40}$/i.test(ref)) {
      throw new Error("Invalid ref");
    }
    if (!ALLOWED_KINDS.has(kind)) throw new Error("Invalid kind");

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Admin-only kinds: require a valid JWT belonging to a user with the
    // `admin` role. Without this, anyone knowing a dossier ref could spoof
    // status updates (approved/rejected/shipped/paid) to customers.
    if (ADMIN_ONLY_KINDS.has(kind)) {
      const authHeader = req.headers.get("Authorization") || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : "";
      if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: userRes, error: userErr } = await sb.auth.getUser(token);
      const uid = userRes?.user?.id;
      if (userErr || !uid) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: isAdmin, error: roleErr } = await sb.rpc("has_role", {
        _user_id: uid,
        _role: "admin",
      });
      if (roleErr || !isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: row, error } = await sb
      .from("dossiers")
      .select(
        "ref, name, email, pack_label, pack_price, card_name, tcg, estimated_value, cares, defects, photos, admin_notes, return_carrier, return_tracking_number",
      )
      .eq("ref", String(ref).toUpperCase().trim())
      .maybeSingle();

    if (error || !row) {
      return new Response(JSON.stringify({ error: "Dossier not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let templateName: string;
    let recipientEmail: string;
    let templateData: Record<string, unknown>;

    if (kind === "admin-new") {
      templateName = "admin-new-dossier";
      recipientEmail = "contact@cardsurgery.com";
      templateData = {
        ref: row.ref,
        customerName: row.name,
        customerEmail: row.email,
        packLabel: row.pack_label,
        cardName: row.card_name ?? "",
        tcg: row.tcg ?? "",
        declaredValue: row.estimated_value ?? "",
        cares: row.cares ?? [],
        defects: row.defects ?? "",
        photosCount: Array.isArray(row.photos) ? row.photos.length : 0,
      };
    } else {
      templateName = `dossier-${kind}`;
      recipientEmail = row.email;
      templateData = {
        name: row.name,
        ref: row.ref,
        packLabel: row.pack_label,
        packPrice: row.pack_price,
        cardName: row.card_name ?? "",
        adminNotes: row.admin_notes ?? "",
        carrier: row.return_carrier ?? "",
        tracking: row.return_tracking_number ?? "",
      };
    }

    const { error: invokeErr } = await sb.functions.invoke("send-transactional-email", {
      body: {
        templateName,
        recipientEmail,
        idempotencyKey: `${templateName}-${row.ref}`,
        templateData,
      },
    });
    if (invokeErr) throw invokeErr;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("trigger-dossier-email error:", e?.message);
    return new Response(
      JSON.stringify({ error: e?.message || "Internal error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
