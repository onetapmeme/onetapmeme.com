import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Stethoscope,
  Scissors,
  Sparkles,
  ShieldCheck,
  Award,
  ExternalLink,
  Info,
} from "lucide-react";

type Provider = "pca" | "ccc" | "aura";

const GRADING_PROVIDERS: Record<
  Provider,
  { name: string; url: string; extraDays: number; tagline: string }
> = {
  pca: {
    name: "PCA",
    url: "https://pcagrade.com/fr/",
    extraDays: 30,
    tagline: "Référence française du grading TCG",
  },
  ccc: {
    name: "CCC",
    url: "https://cccgrading.com/fr/",
    extraDays: 25,
    tagline: "Grading rapide & précis (France)",
  },
  aura: {
    name: "Collect Aura",
    url: "https://www.collectaura.com",
    extraDays: 21,
    tagline: "Slabs premium nouvelle génération",
  },
};

// Indicative third-party submission rates (replace with real grids when available)
const GRADING_RATES: {
  provider: Provider;
  tiers: { label: string; price: string; turnaround: string }[];
}[] = [
  {
    provider: "pca",
    tiers: [
      { label: "Standard (≤ 200 €)", price: "20 €", turnaround: "60 j" },
      { label: "Premium (≤ 1 000 €)", price: "40 €", turnaround: "45 j" },
      { label: "Luxe (≤ 5 000 €)", price: "90 €", turnaround: "30 j" },
    ],
  },
  {
    provider: "ccc",
    tiers: [
      { label: "Classique", price: "18 €", turnaround: "45 j" },
      { label: "Express", price: "35 €", turnaround: "25 j" },
      { label: "Haute valeur", price: "80 €", turnaround: "20 j" },
    ],
  },
  {
    provider: "aura",
    tiers: [
      { label: "Slab Standard", price: "25 €", turnaround: "40 j" },
      { label: "Slab Signature", price: "50 €", turnaround: "30 j" },
      { label: "Slab Vault", price: "120 €", turnaround: "21 j" },
    ],
  },
];

const PLANS = [
  {
    id: "clean",
    name: "Surface Clean & Polish",
    level: "Standard",
    icon: Sparkles,
    price: "19 €",
    tagline: "Nettoyage léger & brillance",
    baseDays: 7,
    features: [
      "Nettoyage de surface premium",
      "Polissage doux non-invasif",
      "Restitution de la brillance d'origine",
      "Photos avant / après HD",
      "Retour sleeve + toploader",
      "Renvoi sous assurance + suivi inclus",
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Professional Restoration",
    level: "Avancé",
    icon: Scissors,
    price: "39 €",
    tagline: "Micro-rayures & whitening des bords",
    baseDays: 10,
    features: [
      "Tout du forfait Standard",
      "Correction des micro-rayures",
      "Traitement du blanchiment des bords",
      "Pressage de précision micro-pliures",
      "Diagnostic sous microscope",
      "Couverture assurance haute valeur incluse",
    ],
    highlight: true,
  },
  {
    id: "full",
    name: "Full Surgery & Grading",
    level: "Premium",
    icon: Stethoscope,
    price: "95 €",
    tagline: "Restauration complète + soumission grading",
    baseDays: 14,
    features: [
      "Tout du forfait Avancé",
      "Restauration coins & arêtes",
      "Polissage expert haute valeur",
      "De-curving & remise à plat",
      "Pré-grading visuel détaillé",
      "Soumission accompagnée chez PCA / CCC / Collect Aura",
      "Colis entièrement assurés selon la valeur déclarée",
    ],
    highlight: false,
  },
] as const;

const Pricing = () => {
  // Full Surgery wizard state
  const [provider, setProvider] = useState<Provider>("pca");
  const [declaredValue, setDeclaredValue] = useState<string>("");

  const declared = Number.parseFloat(declaredValue.replace(",", ".")) || 0;

  // Insurance tier (simple matrix — adjusted manually by admin afterwards)
  const insuranceTier = useMemo(() => {
    if (declared >= 5000) return { label: "Tier 5 — Vault (≥ 5 000 €)", fee: 45 };
    if (declared >= 2000) return { label: "Tier 4 — Premium (2 000 – 5 000 €)", fee: 25 };
    if (declared >= 500) return { label: "Tier 3 — Standard+ (500 – 2 000 €)", fee: 12 };
    if (declared >= 100) return { label: "Tier 2 — Standard (100 – 500 €)", fee: 6 };
    return { label: "Tier 1 — Base (< 100 €)", fee: 0 };
  }, [declared]);

  const fullSurgery = PLANS[2];
  const totalDays = fullSurgery.baseDays + GRADING_PROVIDERS[provider].extraDays;
  const estimatedTotal = 95 + insuranceTier.fee;

  const buildFullSurgeryLink = () => {
    const params = new URLSearchParams({
      pack: "full",
      grading: provider,
      declared: String(declared || 0),
    });
    return `/diagnostic?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Nos <span className="text-accent">forfaits</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trois niveaux d'intervention pour s'adapter à l'état et à la valeur de votre carte.
              Devis transparent avant toute manipulation, colis assurés à l'aller comme au retour.
            </p>
          </header>

          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((p) => {
              const Icon = p.icon;
              const isFull = p.id === "full";
              return (
                <Card
                  key={p.id}
                  className={`relative p-6 border-2 flex flex-col ${
                    p.highlight ? "border-accent shadow-xl scale-[1.02]" : "border-border"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      LE PLUS DEMANDÉ
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">{p.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {p.level} — {p.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{p.price}</span>
                    <span className="text-muted-foreground text-sm"> / carte</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Délai laboratoire : <span className="font-semibold text-foreground">{p.baseDays} jours</span>
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {!isFull && (
                    <Button
                      asChild
                      className={
                        p.highlight
                          ? "w-full glossy-btn text-accent-foreground border-0"
                          : "w-full"
                      }
                      variant={p.highlight ? "default" : "outline"}
                    >
                      <Link to={`/diagnostic?pack=${p.id}`}>
                        Débuter une opération de restauration
                      </Link>
                    </Button>
                  )}
                  {isFull && (
                    <p className="text-xs text-center text-muted-foreground">
                      ↓ Configurez votre soumission grading ci-dessous
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          {/* FULL SURGERY WIZARD */}
          <section className="mt-14">
            <Card className="p-6 md:p-8 border-2 border-accent/40 bg-background/60 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">
                  Wizard Full Surgery + Grading
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Configurez la soumission grading et la valeur déclarée pour calculer
                automatiquement les délais et le palier d'assurance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-sm font-semibold">Partenaire de grading</Label>
                  <Select value={provider} onValueChange={(v) => setProvider(v as Provider)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(GRADING_PROVIDERS) as Provider[]).map((k) => (
                        <SelectItem key={k} value={k}>
                          {GRADING_PROVIDERS[k].name} — {GRADING_PROVIDERS[k].tagline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <a
                    href={GRADING_PROVIDERS[provider].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    Voir le site officiel <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <Label htmlFor="declared" className="text-sm font-semibold">
                    Valeur déclarée de la carte (€)
                  </Label>
                  <Input
                    id="declared"
                    type="number"
                    min={0}
                    step="10"
                    placeholder="ex : 750"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Sert au calcul du palier d'assurance. Ajustable manuellement par notre équipe après diagnostic.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Délai total estimé
                  </p>
                  <p className="text-2xl font-bold text-foreground">{totalDays} j</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fullSurgery.baseDays} j atelier + {GRADING_PROVIDERS[provider].extraDays} j {GRADING_PROVIDERS[provider].name}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                    Palier d'assurance
                  </p>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {insuranceTier.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Frais supplémentaire : <span className="font-semibold text-foreground">+ {insuranceTier.fee} €</span>
                  </p>
                </div>
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-accent mb-1">
                    Total indicatif
                  </p>
                  <p className="text-2xl font-bold text-foreground">{estimatedTotal} €</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hors frais de soumission grading (voir matrice ci-dessous)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-secondary/30 border border-border">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Colis entièrement assurés par nos soins en fonction de la valeur déclarée
                  de la carte, à l'aller comme au retour.
                </p>
              </div>

              <Button
                asChild
                className="w-full glossy-btn text-accent-foreground border-0"
                size="lg"
              >
                <Link to={buildFullSurgeryLink()}>
                  Démarrer Full Surgery + {GRADING_PROVIDERS[provider].name}
                </Link>
              </Button>
            </Card>
          </section>

          {/* GRADING RATES MATRIX (replaces "options à la carte") */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-center mb-2 text-foreground">
              Tarifs de soumission grading (partenaires)
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
              Grilles indicatives publiques des trois partenaires de grading que nous accompagnons.
              Tarifs et délais réels sujets aux conditions de l'opérateur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GRADING_RATES.map((row) => {
                const p = GRADING_PROVIDERS[row.provider];
                return (
                  <Card key={row.provider} className="p-5 border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-foreground">{p.name}</h3>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline inline-flex items-center gap-1"
                      >
                        Officiel <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{p.tagline}</p>
                    <ul className="space-y-2">
                      {row.tiers.map((t) => (
                        <li
                          key={t.label}
                          className="flex items-center justify-between text-sm border-b border-border last:border-none pb-1.5"
                        >
                          <div>
                            <p className="text-foreground font-medium">{t.label}</p>
                            <p className="text-xs text-muted-foreground">Retour ~ {t.turnaround}</p>
                          </div>
                          <span className="font-bold text-foreground">{t.price}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* DISCLAIMER */}
          <div className="mt-12 max-w-3xl mx-auto p-4 rounded-lg border border-border bg-secondary/30 flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              CardSurgery optimise la condition physique et l'<em>Eye-Appeal</em> de vos cartes.
              Le grade final attribué reste à la discrétion exclusive des organismes de certification
              (PCA, CCC, Collect Aura). Les tarifs partenaires affichés sont indicatifs et peuvent
              évoluer selon leurs grilles officielles.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
