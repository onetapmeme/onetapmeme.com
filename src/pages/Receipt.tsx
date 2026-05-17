import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, ShieldCheck, FileText } from "lucide-react";
import { getDossierRemote, PACKS, type Dossier } from "@/lib/dossiers";

const fmt = (cents: number) =>
  (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const Receipt = () => {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!ref) { setLoading(false); return; }
      try {
        const d = await getDossierRemote(ref);
        setDossier(d);
      } finally {
        setLoading(false);
      }
    })();
  }, [ref]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 px-4 text-center">Chargement…</main>
        <Footer />
      </div>
    );
  }

  if (!dossier) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 px-4">
          <div className="container mx-auto max-w-xl">
            <Card className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Reçu introuvable</h1>
              <p className="text-muted-foreground mb-4">
                Aucun dossier ne correspond à cette référence.
              </p>
              <Button asChild>
                <Link to="/tracking"><ArrowLeft className="w-4 h-4 mr-2" /> Suivi de dossier</Link>
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paid = !!dossier.paidAt;
  const packCents = PACKS[dossier.pack]?.priceCents ?? 0;
  const insCents = dossier.insuranceCents ?? 0;
  const totalCents = packCents + insCents;

  return (
    <div className="min-h-screen bg-background print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="pt-28 pb-16 px-4 print:pt-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-4 print:hidden">
            <Button asChild variant="ghost">
              <Link to={`/tracking?ref=${dossier.ref}`}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour au suivi
              </Link>
            </Button>
            <Button onClick={() => window.print()} className="glossy-btn text-accent-foreground border-0">
              <Printer className="w-4 h-4 mr-2" /> Imprimer / PDF
            </Button>
          </div>

          <Card className="p-6 md:p-10 print:shadow-none print:border-0">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1 text-accent">
                  <FileText className="w-5 h-5" />
                  <p className="text-xs uppercase tracking-wider font-bold">Reçu CardSurgery</p>
                </div>
                <h1 className="text-2xl font-bold">Dossier {dossier.ref}</h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Émis le {new Date(dossier.paidAt ?? dossier.updatedAt).toLocaleString("fr-FR")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Statut</p>
                <p className={`font-bold ${paid ? "text-accent" : "text-muted-foreground"}`}>
                  {paid ? "PAYÉ ✓" : dossier.status.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Client</p>
                <p className="font-semibold">{dossier.name}</p>
                <p className="text-muted-foreground text-xs">{dossier.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Carte</p>
                <p className="font-semibold">{dossier.cardName ?? "—"}</p>
                <p className="text-muted-foreground text-xs uppercase">{dossier.tcg ?? ""}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Désignation</th>
                    <th className="text-right p-3 font-semibold w-24">Qté</th>
                    <th className="text-right p-3 font-semibold w-32">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">
                      <p className="font-semibold">{dossier.packLabel}</p>
                      <p className="text-xs text-muted-foreground">Forfait restauration</p>
                    </td>
                    <td className="p-3 text-right font-mono">1</td>
                    <td className="p-3 text-right font-mono">{fmt(packCents)}</td>
                  </tr>
                  {insCents > 0 && (
                    <tr className="border-t border-border">
                      <td className="p-3">
                        <p className="font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                          Assurance Ad Valorem
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dossier.insuranceTier ?? "Tier auto"}
                          {dossier.insuranceCapCents
                            ? ` — couverture jusqu'à ${fmt(dossier.insuranceCapCents)}`
                            : ""}
                          {dossier.insuranceMultiLeg ? " — facturée ×2 (deux trajets)" : ""}
                        </p>
                      </td>
                      <td className="p-3 text-right font-mono">
                        {dossier.insuranceMultiLeg ? 2 : 1}
                      </td>
                      <td className="p-3 text-right font-mono">{fmt(insCents)}</td>
                    </tr>
                  )}
                  {dossier.declaredValueCents != null && (
                    <tr className="border-t border-border text-xs text-muted-foreground">
                      <td className="p-3" colSpan={2}>Valeur déclarée de la carte</td>
                      <td className="p-3 text-right font-mono">{fmt(dossier.declaredValueCents)}</td>
                    </tr>
                  )}
                  {dossier.shippingCarrier && (
                    <tr className="border-t border-border text-xs text-muted-foreground">
                      <td className="p-3" colSpan={2}>Transporteur</td>
                      <td className="p-3 text-right font-mono uppercase">{dossier.shippingCarrier}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-foreground bg-muted/30">
                    <td className="p-3 font-bold" colSpan={2}>Total TTC</td>
                    <td className="p-3 text-right font-bold text-lg font-mono">{fmt(totalCents)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-4">
              <p>
                <span className="font-semibold text-foreground">Politique de remboursement :</span>{" "}
                100 % avant diagnostic ; 100 % moins 10 € de frais d'expertise après diagnostic et avant
                réception en atelier ; non remboursable une fois en chirurgie.
              </p>
              {dossier.stripeSessionId && (
                <p className="font-mono break-all text-[10px] opacity-70">
                  Réf. transaction : {dossier.stripeSessionId}
                </p>
              )}
              <p className="opacity-70">
                CardSurgery — restauration professionnelle de cartes TCG. Document généré automatiquement.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Receipt;
