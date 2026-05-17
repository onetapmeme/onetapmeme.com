import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, FileText, Loader2, ArrowRight } from "lucide-react";
import { getDossierRemote, type Dossier } from "@/lib/dossiers";

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";
  const sessionId = params.get("session_id") || "";
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [polling, setPolling] = useState(true);

  // Poll the dossier for up to ~30s; the webhook flips status to "paid".
  useEffect(() => {
    if (!ref) return;
    let cancelled = false;
    let attempts = 0;
    const tick = async () => {
      attempts += 1;
      try {
        const d = await getDossierRemote(ref);
        if (cancelled) return;
        if (d) setDossier(d);
        if (d && (d.status === "paid" || d.status === "received" || d.status === "in_surgery" || d.status === "shipped")) {
          setPolling(false);
          return;
        }
      } catch {/* swallow */}
      if (attempts < 15 && !cancelled) {
        setTimeout(tick, 2000);
      } else {
        setPolling(false);
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [ref]);

  const confirmed = dossier && dossier.status !== "approved" && dossier.status !== "pending_review";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-xl">
          <Card className="p-8 text-center">
            {polling && !confirmed ? (
              <>
                <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
                <h1 className="text-2xl font-bold mb-2">Confirmation du paiement…</h1>
                <p className="text-muted-foreground text-sm">
                  Stripe nous transmet la confirmation. Cela prend quelques secondes.
                </p>
              </>
            ) : confirmed ? (
              <>
                <div className="w-14 h-14 rounded-full bg-accent/15 text-accent mx-auto mb-4 flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Paiement confirmé ✓</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Votre dossier <span className="font-mono font-bold">{ref}</span> est enregistré comme payé.
                  Préparez votre envoi en suivant les instructions de tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button asChild size="lg" className="glossy-btn text-accent-foreground border-0">
                    <Link to={`/tracking?ref=${ref}`}>
                      Suivre mon dossier <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to={`/receipt?ref=${ref}`}>
                      <FileText className="w-4 h-4 mr-2" /> Voir / télécharger le reçu
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">Paiement en attente</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Nous n'avons pas encore reçu la confirmation. Si vous avez été débité, votre dossier sera mis à jour sous peu.
                </p>
                <Button asChild>
                  <Link to={`/tracking?ref=${ref}`}>Aller au suivi</Link>
                </Button>
              </>
            )}
            {sessionId && (
              <p className="text-[10px] text-muted-foreground/60 mt-6 font-mono break-all">
                Session : {sessionId}
              </p>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutReturn;
