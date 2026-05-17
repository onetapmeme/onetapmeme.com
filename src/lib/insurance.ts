// Ad Valorem shipping insurance pricing engine.
// Tiers aligned with standard French carrier grids (La Poste Colissimo
// Ad Valorem & Chronopost Ad Valorem) — figures expressed in euros.

export interface InsuranceTier {
  index: number;
  capEuros: number; // upper bound (inclusive) of declared value
  feeEuros: number; // single-leg insurance fee
  label: string;
}

export const INSURANCE_TIERS: InsuranceTier[] = [
  { index: 1, capEuros: 200,  feeEuros: 4.90,  label: "Tier 1 — jusqu'à 200 €" },
  { index: 2, capEuros: 500,  feeEuros: 9.90,  label: "Tier 2 — jusqu'à 500 €" },
  { index: 3, capEuros: 1000, feeEuros: 19.90, label: "Tier 3 — jusqu'à 1 000 €" },
  { index: 4, capEuros: 2000, feeEuros: 39.90, label: "Tier 4 — jusqu'à 2 000 €" },
  { index: 5, capEuros: 5000, feeEuros: 79.90, label: "Tier 5 — jusqu'à 5 000 €" },
];

export const MAX_INSURED_VALUE = 5000;

export function tierForValue(declaredEuros: number): InsuranceTier {
  const v = Math.max(0, Math.min(MAX_INSURED_VALUE, declaredEuros));
  return INSURANCE_TIERS.find((t) => v <= t.capEuros) ?? INSURANCE_TIERS[INSURANCE_TIERS.length - 1];
}

// Each pack ships with a baseline tier already included in its base price.
export const PACK_BASELINE_TIER: Record<string, number> = {
  clean: 1, // 19 €  → Tier 1 included
  pro:   2, // 39 €  → Tier 2 included
  full:  2, // 95 €  → Tier 2 included (multi-leg doubled below)
};

// Full Surgery ships Customer → Atelier → Grading → Customer:
// two insured cycles. Other packs ship a single round-trip.
export const PACK_MULTI_LEG: Record<string, boolean> = {
  clean: false,
  pro:   false,
  full:  true,
};

export interface InsuranceBreakdown {
  declaredEuros: number;
  tier: InsuranceTier;
  baselineTier: InsuranceTier;
  feeEuros: number;          // extra fee added on top of the base pack price
  totalInsuranceEuros: number; // raw insurance cost for the selected tier (incl. doubling)
  multiLeg: boolean;
}

const PACK_PRICES_EUROS: Record<string, number> = {
  clean: 19,
  pro: 39,
  full: 95,
};

export function computeInsurance(pack: string, declaredEuros: number): InsuranceBreakdown {
  const tier = tierForValue(declaredEuros);
  const baselineIdx = PACK_BASELINE_TIER[pack] ?? 1;
  const baseline = INSURANCE_TIERS[baselineIdx - 1];
  const multiLeg = !!PACK_MULTI_LEG[pack];

  // Delta in fee compared to the baseline the pack already covers.
  const rawDelta = Math.max(0, tier.feeEuros - baseline.feeEuros);
  const feeEuros = multiLeg ? rawDelta * 2 : rawDelta;
  const totalInsuranceEuros = multiLeg ? tier.feeEuros * 2 : tier.feeEuros;

  return {
    declaredEuros,
    tier,
    baselineTier: baseline,
    feeEuros: round2(feeEuros),
    totalInsuranceEuros: round2(totalInsuranceEuros),
    multiLeg,
  };
}

export function packTotalEuros(pack: string, declaredEuros: number): number {
  const base = PACK_PRICES_EUROS[pack] ?? 0;
  const ins = computeInsurance(pack, declaredEuros);
  return round2(base + ins.feeEuros);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}
