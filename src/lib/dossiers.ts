// Local-only dossier registry (demo / pre-backend). Persists in localStorage so
// a freshly submitted diagnostic can be retrieved on the Tracking page.

export type DossierStatus =
  | "pending_review"   // diagnostic envoyé, en attente d'évaluation par l'équipe
  | "approved"         // diagnostic validé, paiement requis
  | "rejected"         // diagnostic refusé
  | "paid"             // paiement effectué, en attente d'expédition par le client
  | "received"         // colis reçu en atelier
  | "in_surgery"       // intervention en cours
  | "shipped";         // renvoyé

export interface Dossier {
  ref: string;
  pack: string;          // ex: "clean" | "pro" | "full"
  packLabel: string;     // libellé affichage
  packPrice: string;     // ex: "39 €"
  cardName?: string;
  tcg?: string;
  estimatedValue?: string;
  cares: string[];
  defects?: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: DossierStatus;
}

const KEY = "cardsurgery_dossiers";

function readAll(): Record<string, Dossier> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(d: Record<string, Dossier>) {
  localStorage.setItem(KEY, JSON.stringify(d));
}

export function generateRef(): string {
  const r = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CS-${r}`;
}

export function createDossier(d: Omit<Dossier, "ref" | "createdAt" | "updatedAt" | "status">): Dossier {
  const all = readAll();
  const ref = generateRef();
  const now = new Date().toISOString();
  const dossier: Dossier = {
    ...d,
    ref,
    createdAt: now,
    updatedAt: now,
    status: "pending_review",
  };
  all[ref] = dossier;
  writeAll(all);
  return dossier;
}

export function getDossier(ref: string): Dossier | null {
  return readAll()[ref.trim().toUpperCase()] || null;
}

export function updateDossierStatus(ref: string, status: DossierStatus): Dossier | null {
  const all = readAll();
  const r = ref.trim().toUpperCase();
  if (!all[r]) return null;
  all[r] = { ...all[r], status, updatedAt: new Date().toISOString() };
  writeAll(all);
  return all[r];
}

export function listMyRefs(email?: string): string[] {
  const all = readAll();
  const refs = Object.keys(all);
  if (!email) return refs;
  return refs.filter((r) => all[r].email.toLowerCase() === email.toLowerCase());
}

export const PACKS: Record<string, { label: string; price: string; priceCents: number }> = {
  clean: { label: "Surface Clean & Polish", price: "19 €", priceCents: 1900 },
  pro: { label: "Professional Restoration", price: "39 €", priceCents: 3900 },
  full: { label: "Full Surgery", price: "95 €", priceCents: 9500 },
};
