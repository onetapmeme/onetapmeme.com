import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin, ShieldCheck, Package, ArrowLeft, Check, Info } from "lucide-react";
import { getDossierRemote, confirmPayment, sendDossierEmail, type Dossier } from "@/lib/dossiers";

const Payment = () => {
  const [params] = useSearchParams();
  const refParam = params.get("ref") || "";
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    (async () => {
      if (refParam) {
        try { setDossier(await getDossierRemote(refParam)); }
        catch { setDossier(null); }
      }
    })();
  }, [refParam]);

  const fakePay = async () => {
    if (!dossier) return;
    if (dossier.status !== "approved") {
      toast({
        title: "Paiement indisponible",
        description: "Le diagnostic doit être validé avant tout paiement.",
        variant: "destructive",
      });
      return;
    }
    setPaying(true);
    try {
      const u = await confirmPayment(dossier.ref);
      setDossier(u);
      sendDossierEmail(u.ref, "paid");
      toast({ title: "Paiement confirmé ✓", description: "Vous pouvez maintenant expédier votre carte." });
    } catch (e: any) {
      toast({ title: "Échec du paiement", description: e?.message || "Réessayez.", variant: "destructive" });
    } finally {
      setPaying(false);
    }
  };

  if (!refParam || !dossier) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Dossier introuvable</h1>
              <p className="text-muted-foreground mb-6">
                Saisissez votre numéro de dossier dans le suivi pour accéder au paiement.
              </p>
              <Button asChild>
                <Link to="/tracking"><ArrowLeft className="w-4 h-4 mr-2" /> Aller au suivi de dossier</Link>
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const showShipping = dossier.status === "paid" || dossier.status === "received" ||
                       dossier.status === "in_surgery" || dossier.status === "shipped";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button asChild variant="ghost" className="mb-4">
            <Link to={`/tracking?ref=${dossier.ref}`}><ArrowLeft className="w-4 h-4 mr-2" /> Retour au suivi</Link>
          </Button>

          <Card className="p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Dossier</p>
                <p className="font-mono font-bold text-lg">{dossier.ref}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Forfait</p>
                <p className="font-bold">{dossier.packLabel}</p>
                <p className="text-accent font-bold">{dossier.packPrice}</p>
              </div>
            </div>

            {/* Order breakdown */}
            {(() => {
              const baseCents = (() => {
                const m = /([\d.,]+)/.exec(dossier.packPrice || "");
                return m ? Math.round(parseFloat(m[1].replace(",", ".")) * 100) : 0;
              })();
              const insCents = dossier.insuranceCents ?? 0;
              const totalCents = baseCents + insCents;
              const fmt = (c: number) =>
                (c / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
              return (
                <div className="mb-5 rounded-lg border border-border bg-secondary/30 p-4 text-sm">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Récapitulatif
                  </p>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Service ({dossier.packLabel})</span>
                    <span className="font-mono">{fmt(baseCents)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">
                      Assurance Ad Valorem
                      {dossier.insuranceMultiLeg ? " (×2 trajets)" : ""}
                      {dossier.insuranceCapCents
                        ? ` — jusqu'à ${fmt(dossier.insuranceCapCents)}`
                        : ""}
                    </span>
                    <span className="font-mono">
                      {insCents > 0 ? `+ ${fmt(insCents)}` : "incluse"}
                    </span>
                  </div>
                  {dossier.declaredValueCents != null && (
                    <div className="flex justify-between py-1 text-xs text-muted-foreground">
                      <span>Valeur déclarée</span>
                      <span className="font-mono">{fmt(dossier.declaredValueCents)}</span>
                    </div>
                  )}
                  {dossier.shippingCarrier && (
                    <div className="flex justify-between py-1 text-xs text-muted-foreground">
                      <span>Transporteur</span>
                      <span className="font-mono uppercase">{dossier.shippingCarrier}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 mt-1 border-t border-border">
                    <span className="font-semibold text-foreground">Total à régler</span>
                    <span className="font-bold text-foreground text-lg">{fmt(totalCents)}</span>
                  </div>
                </div>
              );
            })()}

            {dossier.status === "pending_review" && (
              <div className="p-4 bg-primary/10 border border-primary/30 rounded flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Votre diagnostic est encore en cours d'évaluation. Le paiement sera débloqué dès qu'un chirurgien
                  aura validé votre dossier (sous 24 h ouvrées).
                </p>
              </div>
            )}

            {dossier.status === "approved" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-accent" /> Paiement du forfait
                </h1>
                <p className="text-muted-foreground text-sm">
                  Le diagnostic est validé. Réglez le forfait pour réserver l'intervention.
                  Le paiement est sécurisé et déclenche immédiatement les instructions d'expédition.
                </p>

                <div className="rounded-lg border-2 border-dashed border-border p-6 text-center bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">Montant à régler</p>
                  <p className="text-4xl font-bold text-foreground mb-4">{dossier.packPrice}</p>
                  <Button
                    onClick={fakePay}
                    disabled={paying}
                    size="lg"
                    className="glossy-btn text-accent-foreground border-0"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {paying ? "Traitement…" : "Payer maintenant"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Paiement sécurisé. Module bancaire en cours d'intégration ; cette démo simule l'encaissement.
                  </p>
                </div>
              </div>
            )}

            {showShipping && (
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 text-accent">
                  <Check className="w-5 h-5" />
                  <span className="font-bold">Paiement reçu ({dossier.packPrice})</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-accent" /> Instructions d'expédition
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Préparez soigneusement votre envoi en respectant ces consignes pour garantir la sécurité de votre carte.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <Card className="p-4 border-border">
                      <Package className="w-5 h-5 text-accent mb-2" />
                      <p className="font-bold text-sm mb-1">Conditionnement</p>
                      <p className="text-xs text-muted-foreground">
                        Sleeve + toploader + sac antistatique, le tout dans une enveloppe matelassée ou un colis carton renforcé.
                      </p>
                    </Card>
                    <Card className="p-4 border-border">
                      <ShieldCheck className="w-5 h-5 text-accent mb-2" />
                      <p className="font-bold text-sm mb-1">Envoi recommandé</p>
                      <p className="text-xs text-muted-foreground">
                        Toujours en <strong>suivi & assurance</strong>. Recommandé R2 (≤ 458 €) ou R3 (≤ 3 050 €) selon la valeur déclarée.
                      </p>
                    </Card>
                  </div>

                  <Card className="p-5 bg-primary/5 border-primary/30">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground mb-1">Adresse d'expédition</p>
                        <p className="text-sm text-muted-foreground">
                          <em>Adresse de l'atelier à communiquer prochainement.</em><br />
                          Vous la recevrez par e-mail dans les minutes qui suivent ce paiement, ainsi qu'une étiquette
                          de retour pré-affranchie (selon options).
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mentionnez impérativement votre numéro de dossier <strong className="text-foreground font-mono">{dossier.ref}</strong>{" "}
                      sur l'étiquette d'envoi.
                    </p>
                  </Card>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Transporteurs recommandés</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="text-accent">▸</span><span><strong>La Poste — Lettre Recommandée R2/R3</strong> : économique, suivi + assurance.</span></li>
                    <li className="flex items-start gap-2"><span className="text-accent">▸</span><span><strong>Chronopost Classic</strong> : 24/48 h, suivi GPS, assurance optionnelle jusqu'à 5 000 €.</span></li>
                    <li className="flex items-start gap-2"><span className="text-accent">▸</span><span><strong>Mondial Relay Insured</strong> : point relais, économique pour cartes &lt; 500 €.</span></li>
                    <li className="flex items-start gap-2"><span className="text-accent">▸</span><span><strong>UPS / DHL Express</strong> : haute valeur (&gt; 3 000 €), traçabilité internationale.</span></li>
                  </ul>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to={`/tracking?ref=${dossier.ref}`}>Retour au suivi de mon dossier</Link>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
