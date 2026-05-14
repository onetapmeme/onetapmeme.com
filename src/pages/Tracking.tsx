import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PackageCheck, Stethoscope, Scissors, Sparkles, Truck, Check,
} from "lucide-react";

const STAGES = [
  { id: "received", label: "Reçu", icon: PackageCheck, desc: "Colis réceptionné, carte vérifiée et photographiée." },
  { id: "expertise", label: "Expertise", icon: Stethoscope, desc: "Diagnostic sous lumière contrôlée et microscope." },
  { id: "surgery", label: "Chirurgie en cours", icon: Scissors, desc: "Intervention 1Tap par notre restaurateur expert." },
  { id: "finalisation", label: "Finalisation", icon: Sparkles, desc: "Contrôle qualité, photos finales, mise en pochette scellée." },
  { id: "shipped", label: "Expédié", icon: Truck, desc: "Renvoi en colis blindé et assuré." },
] as const;

// Demo data — 3 fictional active dossiers
const DEMO: Record<string, { card: string; tcg: string; pack: string; stageIndex: number; updatedAt: string }> = {
  "CS-A7K2X9": { card: "Dracaufeu Base Set", tcg: "Pokémon", pack: "Surgery Pack", stageIndex: 2, updatedAt: "Aujourd'hui, 14:23" },
  "CS-LU8P3M": { card: "Luffy OP01 Leader", tcg: "One Piece", pack: "Full Restoration", stageIndex: 4, updatedAt: "Hier, 17:50" },
  "CS-MEW001": { card: "Mew Promo Holo", tcg: "Pokémon", pack: "Deep Clean", stageIndex: 0, updatedAt: "Il y a 1 h" },
};

const Tracking = () => {
  const [ref, setRef] = useState("");
  const [active, setActive] = useState<keyof typeof DEMO | null>(null);
  const [error, setError] = useState("");

  const lookup = () => {
    const k = ref.trim().toUpperCase();
    if (DEMO[k]) {
      setActive(k as keyof typeof DEMO);
      setError("");
    } else {
      setActive(null);
      setError("Référence introuvable. Essayez une référence de démo : CS-A7K2X9, CS-LU8P3M ou CS-MEW001.");
    }
  };

  const dossier = active ? DEMO[active] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Suivi de <span className="text-accent">dossier</span>
            </h1>
            <p className="text-muted-foreground">Saisissez votre référence pour voir où en est votre carte.</p>
          </header>

          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <div className="flex-1">
                <Label>Référence dossier</Label>
                <Input
                  placeholder="Ex. CS-A7K2X9"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && lookup()}
                />
              </div>
              <Button onClick={lookup} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Rechercher
              </Button>
            </div>
            {error && <p className="text-destructive text-sm mt-3">{error}</p>}
          </Card>

          {dossier && active && (
            <Card className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Référence</p>
                  <p className="font-mono font-bold text-lg text-foreground">{active}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Dernière mise à jour</p>
                  <p className="font-medium text-foreground">{dossier.updatedAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 rounded bg-muted/40">
                <div><p className="text-xs text-muted-foreground">Carte</p><p className="font-bold">{dossier.card}</p></div>
                <div><p className="text-xs text-muted-foreground">TCG</p><p className="font-bold">{dossier.tcg}</p></div>
                <div><p className="text-xs text-muted-foreground">Forfait</p><p className="font-bold">{dossier.pack}</p></div>
              </div>

              <ol className="relative">
                {STAGES.map((s, i) => {
                  const Icon = s.icon;
                  const done = i < dossier.stageIndex;
                  const current = i === dossier.stageIndex;
                  return (
                    <li key={s.id} className="flex gap-4 pb-6 last:pb-0 relative">
                      {i < STAGES.length - 1 && (
                        <span className={`absolute left-5 top-10 bottom-0 w-0.5 ${done ? "bg-accent" : "bg-border"}`} />
                      )}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                        done ? "bg-accent border-accent text-accent-foreground"
                        : current ? "border-accent text-accent bg-background animate-pulse"
                        : "border-border text-muted-foreground bg-background"
                      }`}>
                        {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className={`font-bold ${current ? "text-accent" : done ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.label}
                          {current && <span className="ml-2 text-xs bg-accent/15 text-accent px-2 py-0.5 rounded">EN COURS</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Card>
          )}

          {!dossier && (
            <Card className="p-6 bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-3">
                <strong className="text-foreground">Démo :</strong> essayez ces références pour visualiser le dashboard.
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(DEMO).map((k) => (
                  <Button key={k} variant="outline" size="sm" onClick={() => { setRef(k); setTimeout(lookup, 0); }}>
                    {k}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;
