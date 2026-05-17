import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
import {
  INSURANCE_TIERS,
  MAX_INSURED_VALUE,
  computeInsurance,
  packTotalEuros,
} from "@/lib/insurance";

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

const PLANS = [
  {
    id: "clean",
    name: "Surface Clean & Polish",
    level: "Standard",
    icon: Sparkles,
    price: "19 €",
    basePriceEuros: 19,
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
    defaultDeclared: 100,
  },
  {
    id: "pro",
    name: "Professional Restoration",
    level: "Avancé",
    icon: Scissors,
    price: "39 €",
    basePriceEuros: 39,
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
    defaultDeclared: 400,
  },
  {
    id: "full",
    name: "Full Surgery & Grading",
    level: "Premium",
    icon: Stethoscope,
    price: "95 €",
    basePriceEuros: 95,
    tagline: "Restauration complète + soumission grading",
    baseDays: 14,
    features: [
      "Tout du forfait Avancé",
      "Restauration coins & arêtes",
      "Polissage expert haute valeur",
      "De-curving & remise à plat",
      "Pré-grading visuel détaillé",
      "Soumission accompagnée chez PCA / CCC / Collect Aura",
      "Double assurance aller-retour + transit grading",
    ],
    highlight: false,
    defaultDeclared: 1000,
  },
] as const;

const SLIDER_STOPS = [50, 200, 500, 1000, 2000, 5000];

const formatEuros = (n: number) =>
  n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

const PackInsuranceConfigurator = ({
  pack,
  basePriceEuros,
  defaultDeclared,
}: {
  pack: "clean" | "pro" | "full";
  basePriceEuros: number;
  defaultDeclared: number;
}) => {
  const [declared, setDeclared] = useState<number>(defaultDeclared);
  const ins = useMemo(() => computeInsurance(pack, declared), [pack, declared]);
  const total = useMemo(() => packTotalEuros(pack, declared), [pack, declared]);

  return (
    <div className="mt-4 mb-4 rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-semibold text-foreground/90">
          Valeur estimée de votre carte
        </Label>
        <span className="text-sm font-mono font-bold text-foreground">
          {formatEuros(declared)}
        </span>
      </div>

      <Slider
        value={[declared]}
        min={0}
        max={MAX_INSURED_VALUE}
        step={50}
        onValueChange={(v) => setDeclared(v[0] ?? 0)}
      />

      <div className="flex flex-wrap gap-1.5">
        {SLIDER_STOPS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setDeclared(v)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
              declared === v
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-muted-foreground hover:border-accent/60"
            }`}
          >
            {formatEuros(v)}
          </button>
        ))}
      </div>

      <div className="pt-2 border-t border-border/60 space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Forfait base</span>
          <span className="font-mono">{formatEuros(basePriceEuros)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Assurance Ad Valorem{ins.multiLeg ? " (×2 trajets)" : ""}
          </span>
          <span className="font-mono">
            {ins.feeEuros > 0 ? `+ ${formatEuros(ins.feeEuros)}` : "incluse"}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-border/40">
          <span className="text-sm font-semibold text-foreground">Total</span>
          <span className="text-xl font-bold text-foreground">
            {formatEuros(total)}
          </span>
        </div>
        <p className="text-[10.5px] leading-snug text-muted-foreground/90 flex items-start gap-1.5 pt-1">
          <ShieldCheck className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
          <span>
            Inclut la protection Ad Valorem sécurisée (normes La Poste /
            Chronopost) jusqu'à {formatEuros(ins.tier.capEuros)}
            {ins.multiLeg && " — couverture doublée pour les deux trajets (atelier ↔ grading)"}.
          </span>
        </p>
      </div>
    </div>
  );
};

const Pricing = () => {
  // Full Surgery wizard state (grading partner)
  const [provider, setProvider] = useState<Provider>("pca");
  const [fullDeclared, setFullDeclared] = useState<number>(1000);

  const fullSurgery = PLANS[2];
  const totalDays = fullSurgery.baseDays + GRADING_PROVIDERS[provider].extraDays;
  const fullIns = useMemo(() => computeInsurance("full", fullDeclared), [fullDeclared]);
  const estimatedTotal = useMemo(() => packTotalEuros("full", fullDeclared), [fullDeclared]);

  const buildFullSurgeryLink = () => {
    const params = new URLSearchParams({
      pack: "full",
      grading: provider,
      declared: String(fullDeclared || 0),
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
              Trois niveaux d'intervention, transport assuré Ad Valorem (normes La Poste / Chronopost) calculé
              en temps réel selon la valeur déclarée de votre carte.
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
                  <ul className="space-y-2 mb-2 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {!isFull && (
                    <>
                      <PackInsuranceConfigurator
                        pack={p.id as "clean" | "pro"}
                        basePriceEuros={p.basePriceEuros}
                        defaultDeclared={p.defaultDeclared}
                      />
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
                    </>
                  )}
                  {isFull && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
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
                Configurez la soumission grading et la valeur déclarée. L'assurance Ad Valorem
                est doublée pour couvrir intégralement les deux trajets (atelier ↔ grading).
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
                  <div className="flex items-center justify-between mb-1.5">
                    <Label className="text-sm font-semibold">
                      Valeur estimée de votre carte
                    </Label>
                    <span className="text-sm font-mono font-bold text-foreground">
                      {formatEuros(fullDeclared)}
                    </span>
                  </div>
                  <Slider
                    value={[fullDeclared]}
                    min={0}
                    max={MAX_INSURED_VALUE}
                    step={50}
                    onValueChange={(v) => setFullDeclared(v[0] ?? 0)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Calcul automatique du palier Ad Valorem (×2 trajets pour Full Surgery).
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
                    {fullIns.tier.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supplément :{" "}
                    <span className="font-semibold text-foreground">
                      {fullIns.feeEuros > 0 ? `+ ${formatEuros(fullIns.feeEuros)}` : "inclus"}
                    </span>
                    {fullIns.multiLeg && " (×2 trajets)"}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-accent mb-1">
                    Total indicatif
                  </p>
                  <p className="text-2xl font-bold text-foreground">{formatEuros(estimatedTotal)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hors frais de soumission grading partenaire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-secondary/30 border border-border">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Inclut la protection Ad Valorem sécurisée (normes La Poste / Chronopost) jusqu'à{" "}
                  {formatEuros(fullIns.tier.capEuros)}, doublée pour couvrir les deux trajets
                  atelier ↔ partenaire de grading.
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

          {/* INSURANCE TIER MATRIX */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-center mb-2 text-foreground">
              Grille d'assurance Ad Valorem
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
              Tarifs alignés sur les grilles standard La Poste Colissimo Ad Valorem et Chronopost Ad Valorem.
              Forfait Full Surgery : tarif doublé (atelier ↔ grading).
            </p>
            <Card className="border-border overflow-hidden">
              <div className="grid grid-cols-3 px-4 py-3 bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                <span>Palier</span>
                <span className="text-center">Valeur déclarée</span>
                <span className="text-right">Coût (1 trajet)</span>
              </div>
              {INSURANCE_TIERS.map((t) => (
                <div
                  key={t.index}
                  className="grid grid-cols-3 px-4 py-3 border-t border-border text-sm items-center"
                >
                  <span className="font-semibold text-foreground">Tier {t.index}</span>
                  <span className="text-center text-foreground/90">
                    Jusqu'à {formatEuros(t.capEuros)}
                  </span>
                  <span className="text-right font-bold text-foreground">
                    + {formatEuros(t.feeEuros)}
                  </span>
                </div>
              ))}
            </Card>
          </section>

          {/* DISCLAIMER */}
          <div className="mt-12 max-w-3xl mx-auto p-4 rounded-lg border border-border bg-secondary/30 flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              CardSurgery optimise la condition physique et l'<em>Eye-Appeal</em> de vos cartes.
              Le grade final attribué reste à la discrétion exclusive des organismes de certification
              (PCA, CCC, Collect Aura). Les paliers d'assurance respectent les grilles publiques
              Ad Valorem des transporteurs sélectionnés.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
