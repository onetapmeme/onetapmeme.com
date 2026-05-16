import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Stethoscope, Scissors, Sparkles, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    id: "clean",
    name: "Surface Clean & Polish",
    level: "Standard",
    icon: Sparkles,
    price: "19 €",
    tagline: "Nettoyage léger & brillance",
    features: [
      "Nettoyage de surface premium",
      "Polissage doux non-invasif",
      "Restitution de la brillance d'origine",
      "Photos avant / après HD",
      "Retour sleeve + toploader",
      "Délai : 7 jours",
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
    features: [
      "Tout du forfait Standard",
      "Correction des micro-rayures",
      "Traitement du blanchiment des bords",
      "Pressage de précision micro-pliures",
      "Diagnostic sous microscope",
      "Délai : 10 jours",
    ],
    highlight: true,
  },
  {
    id: "full",
    name: "Full Surgery",
    level: "Premium",
    icon: Stethoscope,
    price: "95 €",
    tagline: "Restauration complète & polissage expert",
    features: [
      "Tout du forfait Avancé",
      "Restauration coins & arêtes",
      "Polissage expert haute valeur",
      "De-curving & remise à plat",
      "Pré-grading visuel détaillé",
      "Retour express assuré",
      "Délai : 14 jours",
    ],
    highlight: false,
  },
];

const OPTIONS = [
  { name: "Redressage (De-curving)", price: "9 €" },
  { name: "Retrait de colle / résidus", price: "9 €" },
  { name: "Expertise pré-grading", price: "15 €" },
];

const Pricing = () => {
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
              Devis transparent avant toute manipulation.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((p) => {
              const Icon = p.icon;
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
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.level} — {p.tagline}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">{p.price}</span>
                    <span className="text-muted-foreground text-sm"> / carte</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={
                      p.highlight
                        ? "w-full glossy-btn text-accent-foreground border-0"
                        : "w-full"
                    }
                    variant={p.highlight ? "default" : "outline"}
                  >
                    <Link to={`/diagnostic?pack=${p.id}`}>Débuter une opération de restauration</Link>
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* OPTIONS */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-center mb-2 text-foreground">Options à la carte</h2>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Ajoutez ces interventions complémentaires à n'importe quel forfait.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {OPTIONS.map((o) => (
                <Card key={o.name} className="p-5 flex items-center justify-between border-border">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{o.name}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{o.price}</span>
                </Card>
              ))}
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-3xl mx-auto">
            Les tarifs s'entendent par carte, hors frais de retour. Forfaits indicatifs : un devis personnalisé
            est établi après le diagnostic. La technologie CardSurgery désigne le geste de précision réalisé par notre
            expert restaurateur. Nous garantissons l'esthétique mais le grade final dépend exclusivement des
            organismes de certification.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
