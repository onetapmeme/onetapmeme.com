import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PackageCheck, Stethoscope, Scissors, Sparkles, Truck, Check, Hourglass,
  CreditCard, XCircle, Loader2,
} from "lucide-react";
import { getDossierRemote, type Dossier, type DossierStatus } from "@/lib/dossiers";

const STAGES: { id: DossierStatus; label: string; icon: typeof PackageCheck; desc: string }[] = [
  { id: "pending_review", label: "Diagnostic en évaluation", icon: Hourglass, desc: "Nos chirurgiens analysent vos photos et établissent un devis." },
  { id: "approved", label: "Diagnostic validé — paiement requis", icon: CreditCard, desc: "Le forfait a été confirmé. Procédez au paiement pour activer la prise en charge." },
  { id: "paid", label: "Paiement reçu — en attente d'envoi", icon: Truck, desc: "Expédiez votre carte selon les instructions sécurisées fournies." },
  { id: "received", label: "Reçu en atelier", icon: PackageCheck, desc: "Colis réceptionné, carte vérifiée et photographiée." },
  { id: "in_surgery", label: "Chirurgie en cours", icon: Scissors, desc: "Intervention CardSurgery par notre restaurateur expert." },
  { id: "shipped", label: "Expédié", icon: Sparkles, desc: "Renvoi en colis blindé et assuré." },
];

const statusOrder: DossierStatus[] = ["pending_review", "approved", "paid", "received", "in_surgery", "shipped"];

const Tracking = () => {
  const [params] = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") || "");
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async (value?: string) => {
    const k = (value ?? ref).trim().toUpperCase();
    if (!k) return;
    setLoading(true); setError("");
    try {
      const d = await getDossierRemote(k);
      if (d) { setDossier(d); setError(""); }
      else { setDossier(null); setError("Référence introuvable. Vérifiez votre numéro ou contactez-nous."); }
    } catch (e: any) {
      setError(e?.message || "Erreur lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.get("ref")) lookup(params.get("ref")!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageIndex = dossier ? statusOrder.indexOf(dossier.status) : -1;
  const isRejected = dossier?.status === "rejected";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Suivi de <span className="text-accent">dossier</span>
            </h1>
            <p className="text-muted-foreground">
              Saisissez votre numéro de dossier pour suivre l'évaluation, procéder au paiement et expédier votre carte.
            </p>
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
              <Button onClick={() => lookup()} disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Rechercher"}
              </Button>
            </div>
            {error && <p className="text-destructive text-sm mt-3">{error}</p>}
          </Card>

          {dossier && (
            <Card className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Référence</p>
                  <p className="font-mono font-bold text-lg text-foreground">{dossier.ref}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Dernière mise à jour</p>
                  <p className="font-medium text-foreground">{new Date(dossier.updatedAt).toLocaleString("fr-FR")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 rounded bg-muted/40">
                <div><p className="text-xs text-muted-foreground">Carte</p><p className="font-bold">{dossier.cardName || "—"}</p></div>
                <div><p className="text-xs text-muted-foreground">TCG</p><p className="font-bold">{dossier.tcg || "—"}</p></div>
                <div><p className="text-xs text-muted-foreground">Forfait</p><p className="font-bold">{dossier.packLabel} <span className="text-accent">({dossier.packPrice})</span></p></div>
              </div>

              {dossier.status === "pending_review" && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30 flex gap-3">
                  <Hourglass className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <p className="font-bold text-foreground">Diagnostic en cours d'évaluation</p>
                    <p className="text-sm text-muted-foreground">
                      Notre équipe analyse vos photos sous 24 h ouvrées et vous adressera la validation par e-mail.
                      Le paiement ne sera proposé qu'après approbation du diagnostic.
                    </p>
                  </div>
                </div>
              )}

              {dossier.status === "approved" && (
                <div className="mb-6 p-4 rounded-lg bg-accent/10 border-2 border-accent flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-3">
                    <CreditCard className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Diagnostic validé ✓</p>
                      <p className="text-sm text-muted-foreground">
                        Le forfait <strong>{dossier.packLabel}</strong> ({dossier.packPrice}) est confirmé.
                        Procédez au paiement pour réserver l'intervention.
                      </p>
                    </div>
                  </div>
                  <Button asChild className="glossy-btn text-accent-foreground border-0 whitespace-nowrap">
                    <Link to={`/payment?ref=${dossier.ref}`}>
                      <CreditCard className="w-4 h-4 mr-2" /> Procéder au paiement
                    </Link>
                  </Button>
                </div>
              )}

              {dossier.status === "paid" && (
                <div className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/40 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-3">
                    <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Paiement reçu — préparez votre envoi</p>
                      <p className="text-sm text-muted-foreground">Consultez les instructions d'expédition sécurisées.</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="whitespace-nowrap">
                    <Link to={`/payment?ref=${dossier.ref}`}>Voir les instructions d'envoi</Link>
                  </Button>
                </div>
              )}

              {isRejected && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/40 flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">Diagnostic refusé</p>
                    <p className="text-sm text-muted-foreground">
                      Notre équipe a estimé qu'aucune intervention n'apporterait de bénéfice mesurable.
                      Vous avez reçu un e-mail détaillé. Aucun frais n'est dû.
                    </p>
                    {dossier.adminNotes && (
                      <p className="text-sm text-foreground/80 mt-2 italic">« {dossier.adminNotes} »</p>
                    )}
                  </div>
                </div>
              )}

              {!isRejected && (
                <ol className="relative">
                  {STAGES.map((s, i) => {
                    const Icon = s.icon;
                    const done = i < stageIndex;
                    const current = i === stageIndex;
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
              )}
            </Card>
          )}

          {!dossier && !loading && (
            <Card className="p-6 bg-secondary/30">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Pas encore de dossier ?</strong>{" "}
                <Link to="/pricing" className="text-accent hover:underline">Débutez une opération de restauration →</Link>
              </p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;
