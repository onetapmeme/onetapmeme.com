import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
import { Upload, Check, ChevronRight, ChevronLeft, FileImage, Mail, Info, Copy } from "lucide-react";
import { incrementSavedCards } from "@/hooks/useSavedCardsCounter";
import { createDossier, PACKS } from "@/lib/dossiers";
import { supabase } from "@/integrations/supabase/client";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

function validateImage(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) return "Format invalide : PNG, JPG, JPEG ou WebP uniquement.";
  if (file.size > MAX_SIZE) return "Fichier trop volumineux : 5 Mo maximum.";
  return null;
}

type Photos = { recto?: File; verso?: File; corners?: File };
const CARES = [
  { id: "clean", label: "Nettoyage de surface" },
  { id: "whitening", label: "Whitening (correction des bords)" },
  { id: "pressing", label: "Pressage de précision" },
  { id: "decurving", label: "Redressage (De-curving)" },
];

const STEPS = ["Forfait", "Photos", "Carte", "Soins", "Contact"] as const;

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
      accept="image/png,image/jpeg,image/jpg,image/webp"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (!f) return onChange(undefined);
        const err = validateImage(f);
        if (err) {
          toast({ title: "Image refusée", description: err, variant: "destructive" });
          e.target.value = "";
          return;
        }
        onChange(f);
      }}
    />
  </label>
);

const Diagnostic = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialPack = params.get("pack") && PACKS[params.get("pack")!] ? params.get("pack")! : "";

  const [step, setStep] = useState(initialPack ? 1 : 0);
  const [pack, setPack] = useState<string>(initialPack);
  const [photos, setPhotos] = useState<Photos>({});
  const [cardType, setCardType] = useState<string>("");
  const [cardName, setCardName] = useState("");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [cares, setCares] = useState<string[]>([]);
  const [defects, setDefects] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [createdRef, setCreatedRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialPack) setPack(initialPack);
  }, [initialPack]);

  const toggleCare = (id: string) =>
    setCares((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const next = () => {
    if (step === 0 && !pack) {
      toast({ title: "Forfait requis", description: "Choisissez un forfait pour continuer.", variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!email || !name) {
      toast({ title: "Champs manquants", description: "Nom et email sont requis.", variant: "destructive" });
      return;
    }
    if (createAccount && password.length < 8) {
      toast({ title: "Mot de passe trop court", description: "8 caractères minimum.", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    if (createAccount) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/tracking` },
      });
      if (error && !/already/i.test(error.message)) {
        toast({ title: "Création du compte impossible", description: error.message, variant: "destructive" });
        setSubmitting(false);
        return;
      }
    }

    const packInfo = PACKS[pack];
    const dossier = createDossier({
      pack,
      packLabel: packInfo.label,
      packPrice: packInfo.price,
      cardName,
      tcg: cardType,
      estimatedValue,
      cares,
      defects,
      email,
      name,
    });

    incrementSavedCards(1);
    setCreatedRef(dossier.ref);
    setSubmitting(false);
  };

  if (createdRef) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-8 md:p-10 text-center border-2 border-accent">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Diagnostic transmis ✓</h1>
              <p className="text-muted-foreground mb-6">
                Votre dossier a bien été reçu par notre équipe. Un chirurgien analyse vos photos et vous
                répond sous 24 h ouvrées par e-mail.
              </p>

              <div className="bg-secondary/50 rounded-lg p-5 mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Votre numéro de dossier</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl font-bold text-foreground">{createdRef}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(createdRef);
                      toast({ title: "Copié", description: "Numéro de dossier copié." });
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Conservez précieusement ce numéro : il vous permet de suivre votre dossier et de procéder
                  au paiement une fois le diagnostic validé.
                </p>
              </div>

              <div className="text-left bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90">
                  <strong>Aucun paiement n'est demandé à ce stade.</strong> Le paiement du forfait
                  <em> {PACKS[pack]?.label} ({PACKS[pack]?.price})</em> ne sera effectué qu'après
                  validation du diagnostic par nos équipes. Vous recevrez un e-mail récapitulatif à{" "}
                  <span className="font-medium">{email}</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link to="/home">Retour à l'accueil</Link>
                </Button>
                <Button asChild className="glossy-btn text-accent-foreground border-0">
                  <Link to={`/tracking?ref=${createdRef}`}>
                    Suivre mon dossier
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                <h2 className="text-xl font-bold mb-2">Choisissez votre forfait</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Un expert pourra ajuster ce choix après évaluation. Aucun paiement n'est demandé maintenant.
                </p>
                <div className="grid gap-3">
                  {Object.entries(PACKS).map(([id, p]) => (
                    <label
                      key={id}
                      className={`flex items-center justify-between p-4 rounded border-2 cursor-pointer transition ${
                        pack === id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pack"
                          checked={pack === id}
                          onChange={() => setPack(id)}
                          className="accent-[hsl(var(--accent))]"
                        />
                        <div>
                          <p className="font-bold text-foreground">{p.label}</p>
                          <p className="text-xs text-muted-foreground">Forfait {id}</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-foreground">{p.price}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  <Link to="/pricing" className="text-accent hover:underline">
                    Voir le détail des forfaits →
                  </Link>
                </p>
              </div>
            )}

            {step === 1 && (
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

            {step === 2 && (
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

            {step === 3 && (
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

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-2">Vos coordonnées</h2>
                <p className="text-sm text-muted-foreground -mt-2">
                  Nous utilisons votre e-mail pour vous transmettre le diagnostic validé et le numéro de dossier.
                </p>
                <div>
                  <Label>Nom complet *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                </div>

                <label className="flex items-start gap-3 p-3 rounded border border-border cursor-pointer hover:border-accent transition">
                  <Checkbox checked={createAccount} onCheckedChange={(c) => setCreateAccount(!!c)} className="mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Créer un compte CardSurgery (optionnel)</p>
                    <p className="text-muted-foreground text-xs">
                      Retrouvez tous vos dossiers, suivez l'avancement et accédez à votre historique de restaurations.
                    </p>
                  </div>
                </label>

                {createAccount && (
                  <div>
                    <Label>Mot de passe (8 caractères min.)</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={64} />
                  </div>
                )}

                <div className="bg-primary/5 border border-primary/20 rounded p-3 text-xs text-foreground/90 flex gap-2">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Aucun paiement n'est requis à ce stade.</strong> Le paiement du forfait s'effectuera
                    dans l'onglet <Link to="/tracking" className="text-accent hover:underline">Suivi de dossier</Link>{" "}
                    une fois votre diagnostic validé par nos équipes.
                  </span>
                </div>
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
                  <Mail className="w-4 h-4 mr-2" /> {submitting ? "Envoi…" : "Envoyer le diagnostic"}
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
