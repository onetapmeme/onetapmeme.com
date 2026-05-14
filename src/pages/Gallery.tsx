import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/cards/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Cat = "Tous" | "Pokémon" | "One Piece" | "Lorcana" | "Magic";
const CATS: Cat[] = ["Tous", "Pokémon", "One Piece", "Lorcana", "Magic"];

// Placeholder visuals — using a neutral SVG generator so the slider works out of the box.
const ph = (label: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'><rect width='600' height='800' fill='${color}'/><text x='50%' y='50%' font-family='sans-serif' font-size='42' fill='white' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  )}`;

const PROJECTS: { id: string; cat: Exclude<Cat, "Tous">; title: string; subtitle: string; before: string; after: string }[] = [
  { id: "1", cat: "Pokémon", title: "Dracaufeu Base Set", subtitle: "Whitening + nettoyage de surface", before: ph("AVANT — Dracaufeu", "#7a6a55"), after: ph("APRÈS — Dracaufeu", "#3a2f24") },
  { id: "2", cat: "One Piece", title: "Luffy OP01 Leader", subtitle: "Pressage de précision", before: ph("AVANT — Luffy", "#7a5b55"), after: ph("APRÈS — Luffy", "#2d2018") },
  { id: "3", cat: "Lorcana", title: "Elsa First Chapter", subtitle: "De-curving complet", before: ph("AVANT — Elsa", "#5a6f7a"), after: ph("APRÈS — Elsa", "#1f2a33") },
  { id: "4", cat: "Magic", title: "Black Lotus Reprint", subtitle: "Surface deep clean", before: ph("AVANT — Lotus", "#6a6055"), after: ph("APRÈS — Lotus", "#1a1814") },
  { id: "5", cat: "Pokémon", title: "Mew Promo Holo", subtitle: "Whitening 4 bords", before: ph("AVANT — Mew", "#806a85"), after: ph("APRÈS — Mew", "#2a1f33") },
  { id: "6", cat: "One Piece", title: "Zoro Romance Dawn", subtitle: "Restauration complète", before: ph("AVANT — Zoro", "#6f5a4a"), after: ph("APRÈS — Zoro", "#1f1814") },
];

const Gallery = () => {
  const [cat, setCat] = useState<Cat>("Tous");
  const items = cat === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Galerie <span className="text-accent">avant / après</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Glissez la poignée centrale pour révéler la restauration. Chaque projet est documenté en haute définition.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map((c) => (
              <Button
                key={c}
                variant={cat === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCat(c)}
                className={cat === c ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
              >
                {c}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <Card key={p.id} className="p-4 bg-card border-border">
                <BeforeAfterSlider before={p.before} after={p.after} alt={p.title} />
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">{p.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{p.cat}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.subtitle}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
