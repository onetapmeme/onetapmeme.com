import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Stethoscope, Scissors, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    id: "deep-clean",
    name: "Deep Clean",
    icon: Sparkles,
    price: "29 €",
    tagline: "Nettoyage de surface premium",
    features: [
      "Élimination des impuretés et résidus",
      "Polissage doux non-invasif",
      "Photos avant / après HD",
      "Retour sleeve + toploader",
      "Délai : 7 jours",
    ],
    highlight: false,
  },
  {
    id: "surgery",
    name: "Surgery Pack",
    icon: Scissors,
    price: "59 €",
    tagline: "L'intervention 1Tap signature",
    features: [
      "Tout du Deep Clean",
      "Whitening des 4 bords",
      "Pressage de précision micro-pliures",
      "Diagnostic sous microscope",
      "Délai : 10 jours",
    ],
    highlight: true,
  },
  {
    id: "full",
    name: "Full Restoration",
    icon: Stethoscope,
    price: "129 €",
    tagline: "Restauration complète & expertise",
    features: [
      "Tout du Surgery Pack",
      "De-curving & remise à plat",
      "Restauration coins & arêtes",
      "Pré-grading visuel détaillé",
      "Retour express assuré 5 000 €",
      "Délai : 14 jours",
    ],
    highlight: false,
  },
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
                      <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.tagline}</p>
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
                        ? "w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "w-full"
                    }
                    variant={p.highlight ? "default" : "outline"}
                  >
                    <Link to="/diagnostic">Choisir ce forfait</Link>
                  </Button>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10 max-w-3xl mx-auto">
            Les tarifs s'entendent par carte, hors frais de retour. Forfaits indicatifs : un devis personnalisé
            est établi après le diagnostic 1Tap. Nous garantissons l'esthétique mais le grade final dépend
            exclusivement des organismes de certification.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
