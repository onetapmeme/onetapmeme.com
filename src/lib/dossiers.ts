// Server-backed dossier helpers. All persistence is in Supabase; this module
// only wraps the RPCs / storage uploads to keep call sites tidy.

import { supabase } from "@/integrations/supabase/client";

export type DossierStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "paid"
  | "received"
  | "in_surgery"
  | "shipped";

export interface DossierPhoto { slot: string; url: string; }

export interface Dossier {
  ref: string;
  pack: string;
  packLabel: string;
  packPrice: string;
  cardName?: string;
  tcg?: string;
  estimatedValue?: string;
  cares: string[];
  defects?: string;
  email: string;
  name: string;
  photos: DossierPhoto[];
  status: DossierStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  declaredValueCents?: number | null;
  insuranceTier?: string | null;
  insuranceCents?: number | null;
  insuranceCapCents?: number | null;
  insuranceMultiLeg?: boolean;
  shippingCarrier?: string | null;
  paymentLinkUrl?: string | null;
  paymentLinkExpiresAt?: string | null;
  paidAt?: string | null;
  validatedAt?: string | null;
  returnCarrier?: string | null;
  returnTrackingNumber?: string | null;
  stripeSessionId?: string | null;
}

export const PACKS: Record<string, { label: string; price: string; priceCents: number }> = {
  clean: { label: "Surface Clean & Polish", price: "19 €", priceCents: 1900 },
  pro: { label: "Professional Restoration", price: "39 €", priceCents: 3900 },
  full: { label: "Full Surgery", price: "95 €", priceCents: 9500 },
};

function mapRow(r: any): Dossier {
  return {
    ref: r.ref,
    pack: r.pack,
    packLabel: r.pack_label,
    packPrice: r.pack_price,
    cardName: r.card_name ?? undefined,
    tcg: r.tcg ?? undefined,
    estimatedValue: r.estimated_value ?? undefined,
    cares: r.cares ?? [],
    defects: r.defects ?? undefined,
    email: r.email,
    name: r.name,
    photos: r.photos ?? [],
    status: r.status,
    adminNotes: r.admin_notes ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    declaredValueCents: r.declared_value_cents ?? null,
    insuranceTier: r.insurance_tier ?? null,
    insuranceCents: r.insurance_cents ?? null,
    insuranceCapCents: r.insurance_cap_cents ?? null,
    insuranceMultiLeg: !!r.insurance_multi_leg,
    shippingCarrier: r.shipping_carrier ?? null,
    paymentLinkUrl: r.payment_link_url ?? null,
    paymentLinkExpiresAt: r.payment_link_expires_at ?? null,
    paidAt: r.paid_at ?? null,
    validatedAt: r.validated_at ?? null,
    returnCarrier: r.return_carrier ?? null,
    returnTrackingNumber: r.return_tracking_number ?? null,
  };
}

export async function uploadDossierPhoto(file: File, slot: string): Promise<DossierPhoto> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}-${slot}.${ext}`;
  const { error } = await supabase.storage.from("dossier-photos").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("dossier-photos").getPublicUrl(path);
  return { slot, url: data.publicUrl };
}

export async function createDossierRemote(input: {
  email: string; name: string; pack: string;
  cardName?: string; tcg?: string; estimatedValue?: string;
  cares: string[]; defects?: string; photos: DossierPhoto[];
  declaredValueCents?: number | null;
  insuranceTier?: string | null;
  insuranceCents?: number | null;
  insuranceCapCents?: number | null;
  insuranceMultiLeg?: boolean;
  shippingCarrier?: string | null;
}): Promise<string> {
  const p = PACKS[input.pack];
  const { data, error } = await supabase.rpc("create_dossier", {
    email_param: input.email,
    name_param: input.name,
    pack_param: input.pack,
    pack_label_param: p.label,
    pack_price_param: p.price,
    card_name_param: input.cardName ?? null,
    tcg_param: input.tcg ?? null,
    estimated_value_param: input.estimatedValue ?? null,
    cares_param: input.cares as any,
    defects_param: input.defects ?? null,
    photos_param: input.photos as any,
    declared_value_cents_param: input.declaredValueCents ?? null,
    insurance_tier_param: input.insuranceTier ?? null,
    insurance_cents_param: input.insuranceCents ?? null,
    insurance_cap_cents_param: input.insuranceCapCents ?? null,
    insurance_multi_leg_param: input.insuranceMultiLeg ?? false,
    shipping_carrier_param: input.shippingCarrier ?? null,
  } as any);
  if (error) throw error;
  return data as string;
}

export async function getDossierRemote(ref: string): Promise<Dossier | null> {
  const { data, error } = await supabase.rpc("get_dossier_by_ref", {
    ref_param: ref,
  });
  if (error) throw error;
  if (!data) return null;
  return mapRow(data);
}

export async function adminListDossiers(statusFilter?: DossierStatus): Promise<Dossier[]> {
  const { data, error } = await supabase.rpc("admin_list_dossiers", {
    status_filter: statusFilter ?? null,
  });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function adminUpdateStatus(
  ref: string, status: DossierStatus, notes?: string,
): Promise<Dossier> {
  const { data, error } = await supabase.rpc("admin_update_dossier_status", {
    ref_param: ref, status_param: status, notes_param: notes ?? null,
  });
  if (error) throw error;
  return mapRow(data);
}

export async function confirmPayment(ref: string): Promise<Dossier> {
  const { data, error } = await supabase.rpc("confirm_dossier_payment", { ref_param: ref });
  if (error) throw error;
  return mapRow(data);
}

export async function sendDossierEmail(
  ref: string,
  kind: "received" | "approved" | "rejected" | "paid" | "shipped",
) {
  try {
    await supabase.functions.invoke("send-dossier-email", { body: { ref, kind } });
  } catch (e) {
    console.warn("send-dossier-email failed", e);
  }
}

export async function listMyDossiers(): Promise<Dossier[]> {
  const { data, error } = await supabase
    .from("dossiers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function adminValidateDossier(
  ref: string,
  opts: { notes?: string; overridePackPrice?: string; overrideInsuranceCents?: number } = {},
): Promise<Dossier> {
  const { data, error } = await supabase.rpc("admin_validate_dossier", {
    ref_param: ref,
    notes_param: opts.notes ?? null,
    override_pack_price_param: opts.overridePackPrice ?? null,
    override_insurance_cents_param: opts.overrideInsuranceCents ?? null,
  } as any);
  if (error) throw error;
  return mapRow(data);
}

export async function adminMarkShipped(
  ref: string, carrier: string, tracking: string,
): Promise<Dossier> {
  const { data, error } = await supabase.rpc("admin_mark_shipped", {
    ref_param: ref, carrier_param: carrier, tracking_param: tracking,
  } as any);
  if (error) throw error;
  return mapRow(data);
}

export const STATUS_LABEL_FR: Record<DossierStatus, string> = {
  pending_review: "Demande envoyée",
  received: "Diagnostic en cours",
  approved: "Prêt pour paiement",
  paid: "Paiement reçu",
  in_surgery: "Chirurgie en cours",
  shipped: "Expédiée",
  rejected: "Refusée",
};

export const STATUS_STEP_INDEX: Record<DossierStatus, number> = {
  pending_review: 0,
  received: 1,
  approved: 2,
  paid: 3,
  in_surgery: 3,
  shipped: 4,
  rejected: -1,
};

export const WORKFLOW_STEPS = [
  "Demande envoyée",
  "Diagnostic en cours",
  "Prêt pour paiement",
  "Chirurgie en cours",
  "Expédiée",
];

