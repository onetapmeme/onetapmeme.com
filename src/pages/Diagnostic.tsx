import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Upload, Check, ChevronRight, ChevronLeft, FileImage } from "lucide-react";

type Photos = { recto?: File; verso?: File; corners?: File };
const CARES = [
  { id: "clean", label: "Nettoyage de surface" },
  { id: "whitening", label: "Whitening (correction des bords)" },
  { id: "pressing", label: "Pressage de précision" },
  { id: "decurving", label: "Redressage (De-curving)" },
];

const STEPS = ["Photos", "Carte", "Soins", "Contact"] as const;

const PhotoSlot = ({
  label, value, onChange,
}: { label: string; value?: File; onChange: (f?: File) => void }) => (
  <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-accent transition aspect-[3/4] bg-muted/40">
    {value ? (
      <>
        <img src={URL.createObjectURL(value)} alt={label} className="w-full h-full object-cover rounded" />
        <span className="text-xs mt-2 text-muted-foreground">{label} ✓</span>
      </>
    ) : (
      <>
        <FileImage className="w-8 h-8 text-muted-foreground mb-2" />
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground mt-1">Cliquer pour ajouter</span>
      </>
    )}
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onChange(e.target.files?.[0])}
    />
  </label>
);

const Diagnostic = () => {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<Photos>({});
  const [cardType, setCardType] = useState<string>("");
  const [cardName, setCardName] = useState("");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [cares, setCares] = useState<string[]>([]);
  const [defects, setDefects] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleCare = (id: string) =>
    setCares((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!email || !name) {
      toast({ title: "Champs manquants", description: "Nom et email sont requis.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    // Simulated edge confirmation
    await new Promise((r) => setTimeout(r, 800));
    toast({
      title: "Diagnostic envoyé ✓",
      description: `Confirmation envoyée à ${email}. Nous revenons vers vous sous 24 h avec un devis personnalisé.`,
    });
    setSubmitting(false);
    setStep(0);
    setPhotos({}); setCardType(""); setCardName(""); setEstimatedValue("");
    setCares([]); setDefects(""); setName(""); setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Formulaire de <span className="text-accent">diagnostic</span>
            </h1>
            <p className="text-muted-foreground">Quelques minutes pour obtenir votre devis personnalisé.</p>
          </header>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`flex flex-col items-center ${i <= step ? "text-accent" : "text-muted-foreground"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 ${
                    i < step ? "bg-accent border-accent text-accent-foreground"
                    : i === step ? "border-accent text-accent" : "border-border"
                  }`}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-xs mt-1">{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-accent" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <Card className="p-6 md:p-8 bg-card border-border">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Photos de votre carte</h2>
                <p className="text-sm text-muted-foreground mb-4">Lumière naturelle de préférence, sans flash direct.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PhotoSlot label="Recto" value={photos.recto} onChange={(f) => setPhotos({ ...photos, recto: f })} />
                  <PhotoSlot label="Verso" value={photos.verso} onChange={(f) => setPhotos({ ...photos, verso: f })} />
                  <PhotoSlot label="Coins" value={photos.corners} onChange={(f) => setPhotos({ ...photos, corners: f })} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Informations de la carte</h2>
                <div>
                  <Label>Nom de la carte</Label>
                  <Input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ex. Dracaufeu Base Set" />
                </div>
                <div>
                  <Label>Type de carte</Label>
                  <Select value={cardType} onValueChange={setCardType}>
                    <SelectTrigger><SelectValue placeholder="Choisir un TCG" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pokemon">Pokémon</SelectItem>
                      <SelectItem value="onepiece">One Piece</SelectItem>
                      <SelectItem value="lorcana">Lorcana</SelectItem>
                      <SelectItem value="magic">Magic: The Gathering</SelectItem>
                      <SelectItem value="yugioh">Yu-Gi-Oh!</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Valeur estimée</Label>
                  <Select value={estimatedValue} onValueChange={setEstimatedValue}>
                    <SelectTrigger><SelectValue placeholder="Choisir une fourchette" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50">Moins de 50 €</SelectItem>
                      <SelectItem value="50-200">50 € — 200 €</SelectItem>
                      <SelectItem value="200-1000">200 € — 1 000 €</SelectItem>
                      <SelectItem value="1000-5000">1 000 € — 5 000 €</SelectItem>
                      <SelectItem value="5000+">Plus de 5 000 €</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Type de soin souhaité</h2>
                <p className="text-sm text-muted-foreground mb-2">Cochez tous les soins envisagés (un expert validera après diagnostic).</p>
                <div className="space-y-3">
                  {CARES.map((c) => (
                    <label key={c.id} className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:border-accent transition">
                      <Checkbox checked={cares.includes(c.id)} onCheckedChange={() => toggleCare(c.id)} />
                      <span className="font-medium">{c.label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Label>Défauts visibles (optionnel)</Label>
                  <Textarea value={defects} onChange={(e) => setDefects(e.target.value)} placeholder="Décrivez ce que vous voyez : rayures, whitening, pliures…" rows={3} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Vos coordonnées</h2>
                <div>
                  <Label>Nom complet *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Vous recevrez sous 24 h un devis personnalisé et le guide d'expédition sécurisé.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              <Button variant="outline" onClick={prev} disabled={step === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Suivant <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Upload className="w-4 h-4 mr-2" /> {submitting ? "Envoi…" : "Envoyer le diagnostic"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Diagnostic;
