import { supabase } from "@/integrations/supabase/client";

export interface BookingSlot {
  ref: string;
  name: string;
  email: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  dossierRef?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
}

// Mon–Thu only, 10:00 to 17:30 every 30min
export const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

export function isBookableDay(d: Date): boolean {
  const day = d.getDay(); // 0=Sun, 1..4 = Mon..Thu
  return day >= 1 && day <= 4;
}

const fmtDate = (d: Date) => d.toISOString().slice(0, 10);

export async function listTakenSlots(from: Date, to: Date): Promise<Set<string>> {
  const { data, error } = await supabase.rpc("list_taken_slots", {
    from_date: fmtDate(from),
    to_date: fmtDate(to),
  });
  if (error) throw error;
  const set = new Set<string>();
  for (const row of data ?? []) set.add(`${row.booking_date}|${row.booking_time}`);
  return set;
}

export async function createBookingSlot(input: {
  name: string;
  email: string;
  date: Date;
  time: string;
  dossierRef?: string;
}): Promise<string> {
  const { data, error } = await supabase.rpc("create_booking_slot", {
    name_param: input.name,
    email_param: input.email,
    booking_date_param: fmtDate(input.date),
    booking_time_param: input.time,
    dossier_ref_param: input.dossierRef ?? null,
  });
  if (error) throw error;
  return data as string;
}

function mapRow(r: any): BookingSlot {
  return {
    ref: r.ref,
    name: r.name,
    email: r.email,
    bookingDate: r.booking_date,
    bookingTime: r.booking_time,
    dossierRef: r.dossier_ref,
    status: r.status,
    notes: r.notes,
    createdAt: r.created_at,
  };
}

export async function adminListBookings(): Promise<BookingSlot[]> {
  const { data, error } = await supabase
    .from("booking_slots")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function adminUpdateBookingStatus(ref: string, status: string, notes?: string) {
  const patch: any = { status };
  if (notes !== undefined) patch.notes = notes;
  const { error } = await supabase.from("booking_slots").update(patch).eq("ref", ref);
  if (error) throw error;
}

// Pricing -------------------------------------------------------------------

export interface ServicePricing {
  id: string;
  packKey: string;
  label: string;
  priceCents: number;
  turnaroundDays: number | null;
  description: string | null;
  features: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface GradingPricing {
  id: string;
  partner: string;
  tierLabel: string;
  minValueCents: number;
  maxValueCents: number | null;
  priceCents: number;
  turnaroundDays: number | null;
  isActive: boolean;
  sortOrder: number;
}

export async function listServicePricing(): Promise<ServicePricing[]> {
  const { data, error } = await supabase
    .from("service_pricing")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({
    id: r.id,
    packKey: r.pack_key,
    label: r.label,
    priceCents: r.price_cents,
    turnaroundDays: r.turnaround_days,
    description: r.description,
    features: r.features ?? [],
    sortOrder: r.sort_order,
    isActive: r.is_active,
  }));
}

export async function listGradingPricing(): Promise<GradingPricing[]> {
  const { data, error } = await supabase
    .from("grading_pricing")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({
    id: r.id,
    partner: r.partner,
    tierLabel: r.tier_label,
    minValueCents: r.min_value_cents,
    maxValueCents: r.max_value_cents,
    priceCents: r.price_cents,
    turnaroundDays: r.turnaround_days,
    isActive: r.is_active,
    sortOrder: r.sort_order,
  }));
}

export async function adminUpsertServicePricing(row: Partial<ServicePricing> & { id?: string }) {
  const payload: any = {
    pack_key: row.packKey,
    label: row.label,
    price_cents: row.priceCents,
    turnaround_days: row.turnaroundDays,
    description: row.description,
    features: row.features ?? [],
    sort_order: row.sortOrder ?? 0,
    is_active: row.isActive ?? true,
  };
  if (row.id) {
    const { error } = await supabase.from("service_pricing").update(payload).eq("id", row.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("service_pricing").insert(payload);
    if (error) throw error;
  }
}

export async function adminUpsertGradingPricing(row: Partial<GradingPricing> & { id?: string }) {
  const payload: any = {
    partner: row.partner,
    tier_label: row.tierLabel,
    min_value_cents: row.minValueCents ?? 0,
    max_value_cents: row.maxValueCents,
    price_cents: row.priceCents,
    turnaround_days: row.turnaroundDays,
    sort_order: row.sortOrder ?? 0,
    is_active: row.isActive ?? true,
  };
  if (row.id) {
    const { error } = await supabase.from("grading_pricing").update(payload).eq("id", row.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("grading_pricing").insert(payload);
    if (error) throw error;
  }
}

export async function adminDeletePricing(table: "service_pricing" | "grading_pricing", id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}
