// Shipping / delivery options for dossier submission + Stripe checkout.
// `hand_delivery_strasbourg` bypasses postal logistics: customer brings the
// cards in person to the Strasbourg workshop and picks them up the same way.

export interface ShippingOption {
  id: string;
  label: string;
  priceCents: number;
  isHandDelivery?: boolean;
  area?: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "colissimo", label: "La Poste — Colissimo Ad Valorem", priceCents: 0 },
  { id: "chronopost", label: "Chronopost Ad Valorem", priceCents: 0 },
  { id: "recommande", label: "Lettre recommandée R2 / R3", priceCents: 0 },
  { id: "mondial-relay", label: "Mondial Relay assuré", priceCents: 0 },
  {
    id: "hand_delivery_strasbourg",
    label: "Remise en main propre (Strasbourg)",
    priceCents: 0,
    isHandDelivery: true,
    area: "Strasbourg",
  },
];

export const isHandDelivery = (id?: string | null) =>
  id === "hand_delivery_strasbourg";
