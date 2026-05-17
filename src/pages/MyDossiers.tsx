import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listMyDossiers, STATUS_LABEL_FR, STATUS_STEP_INDEX, WORKFLOW_STEPS, type Dossier } from "@/lib/dossiers";
import { Loader2, Package, CreditCard, Truck, FileSearch, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const STEP_ICONS = [FileSearch, FileSearch, CreditCard, Package, Truck];

function Timeline({ status }: { status: Dossier["status"] }) {
  const current = STATUS_STEP_INDEX[status];
  const rejected = status === "rejected";
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {WORKFLOW_STEPS.map((label, i) => {
          const Icon = STEP_ICONS[i];
          const done = !rejected && i < current;
          const active = !rejected && i === current;
          return (
            <div key={label} className="flex-1 flex flex-col items-center text-center min-w-0">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all
                  ${active ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30 scale-110" : done ? "bg-accent/80 text-accent-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {done ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs leading-tight ${active ? "text-accent font-semibold" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {rejected && (
        <div className="mt-3 flex items-center justify-center gap-2 text-destructive text-sm">
          <XCircle className="w-4 h-4" /> Dossier refusé
        </div>
      )}
    </div>
  );
}

export default function MyDossiers() {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listMyDossiers()
      .then(setDossiers)
      .catch((e) => toast.error(e.message ?? "Impossible de charger vos dossiers"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mes dossiers — Card Surgery</title>
        <meta name="description" content="Suivez l'état de vos cartes confiées à Card Surgery." />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 sm:mb-12 text-center sm:text-left">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Mes <span className="text-accent">dossiers</span>
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto sm:mx-0">
              Suivez chaque étape de la restauration de vos cartes en temps réel.
            </p>
          </header>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          ) : dossiers.length === 0 ? (
            <Card className="text-center py-12 sm:py-16">
              <CardContent>
                <FileSearch className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-semibold mb-2">Aucun dossier pour l'instant</p>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Lancez votre première demande d'analyse — vous ne payez qu'après validation par notre équipe.
                </p>
                <Button asChild className="glossy-btn text-accent-foreground border-0">
                  <Link to="/diagnostic">Démarrer une analyse</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {dossiers.map((d) => (
                <Card key={d.ref} className="overflow-hidden border-border/60 hover:border-accent/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg font-mono tracking-wide truncate">
                          {d.ref}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {d.packLabel} · {d.cardName || "Carte non spécifiée"}
                        </p>
                      </div>
                      <Badge
                        variant={d.status === "rejected" ? "destructive" : "secondary"}
                        className="self-start sm:self-auto whitespace-nowrap"
                      >
                        {STATUS_LABEL_FR[d.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Timeline status={d.status} />

                    {d.status === "approved" && (
                      <div className="mt-5 rounded-lg border border-accent/30 bg-accent/5 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-sm">
                          <div className="font-semibold text-foreground">Prêt pour paiement</div>
                          <div className="text-muted-foreground text-xs sm:text-sm">
                            Votre dossier a été validé. Réglez pour démarrer l'intervention.
                          </div>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="glossy-btn text-accent-foreground border-0 w-full sm:w-auto"
                        >
                          <Link to={d.paymentLinkUrl || `/payment?ref=${d.ref}`}>
                            <CreditCard className="w-4 h-4 mr-1.5" /> Payer maintenant
                          </Link>
                        </Button>
                      </div>
                    )}

                    {(d.status === "paid" || d.status === "in_surgery") && (
                      <div className="mt-5 rounded-lg border border-border bg-muted/30 p-3 sm:p-4 text-sm">
                        <div className="font-semibold mb-1">Instructions d'expédition</div>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          Envoyez votre carte en colis assuré et suivi à l'adresse fournie par email.
                          Pensez à inclure votre numéro de dossier <span className="font-mono text-foreground">{d.ref}</span>.
                        </p>
                      </div>
                    )}

                    {d.status === "shipped" && d.returnTrackingNumber && (
                      <div className="mt-5 rounded-lg border border-accent/30 bg-accent/5 p-3 sm:p-4 text-sm">
                        <div className="font-semibold flex items-center gap-2">
                          <Truck className="w-4 h-4" /> Carte expédiée
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                          Transporteur : <span className="text-foreground">{d.returnCarrier}</span>
                          <br />
                          N° de suivi : <span className="font-mono text-foreground">{d.returnTrackingNumber}</span>
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Créé le {new Date(d.createdAt).toLocaleDateString("fr-FR")}</span>
                      <span>·</span>
                      <Link to={`/tracking?ref=${d.ref}`} className="text-accent hover:underline">
                        Voir le détail public
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
