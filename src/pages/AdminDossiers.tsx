import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, Check, X, Eye, RefreshCcw, Save, Truck } from "lucide-react";
import {
  adminListDossiers, adminUpdateStatus, sendDossierEmail,
  adminValidateDossier, adminMarkShipped,
  type Dossier, type DossierStatus, type DossierEmailKind,
} from "@/lib/dossiers";

const STATUS_LABEL: Record<DossierStatus, string> = {
  requested: "Demande envoyée",
  received: "Cartes reçues",
  payment_required: "Paiement requis",
  paid: "Payé",
  in_surgery: "En chirurgie",
  quality_control: "Contrôle qualité",
  shipped: "Expédié",
  rejected: "Refusé",
  pending_review: "Demande envoyée",
  approved: "Paiement requis",
};

const STATUS_COLOR: Record<DossierStatus, string> = {
  requested: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  received: "bg-accent/10 text-accent",
  payment_required: "bg-accent/20 text-accent",
  paid: "bg-accent/15 text-accent",
  in_surgery: "bg-accent/25 text-accent",
  quality_control: "bg-accent/30 text-accent",
  shipped: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  rejected: "bg-destructive/15 text-destructive",
  pending_review: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  approved: "bg-accent/20 text-accent",
};

// Map a status transition to the customer email kind that should fire.
const STATUS_TO_EMAIL: Partial<Record<DossierStatus, DossierEmailKind>> = {
  requested: "requested",
  received: "received",
  payment_required: "payment-required",
  paid: "paid",
  in_surgery: "in-surgery",
  quality_control: "quality-control",
  shipped: "shipped",
  rejected: "rejected",
};

export default function AdminDossiers() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [filter, setFilter] = useState<DossierStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Dossier | null>(null);
  const [notes, setNotes] = useState("");
  const [acting, setActing] = useState(false);
  const [overridePrice, setOverridePrice] = useState("");
  const [overrideInsuranceEuros, setOverrideInsuranceEuros] = useState("");
  const [carrier, setCarrier] = useState("");
  const [tracking, setTracking] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      const { data } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
      setAuthChecked(true);
    })();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    try {
      setDossiers(await adminListDossiers(filter === "all" ? undefined : filter));
    } catch (e: any) {
      toast({ title: "Erreur de chargement", description: e?.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  useEffect(() => { if (isAdmin) load(); /* eslint-disable-next-line */ }, [isAdmin, filter]);

  const act = async (status: DossierStatus, emailKind?: "approved" | "rejected" | "shipped") => {
    if (!selected) return;
    setActing(true);
    try {
      const updated = await adminUpdateStatus(selected.ref, status, notes || undefined);
      if (emailKind) sendDossierEmail(updated.ref, emailKind);
      toast({ title: "Dossier mis à jour", description: `${updated.ref} → ${STATUS_LABEL[status]}` });
      setSelected(updated);
      setNotes("");
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    } finally { setActing(false); }
  };

  // Pre-fill price/insurance/tracking inputs when a dossier is selected.
  useEffect(() => {
    if (!selected) return;
    setOverridePrice(selected.packPrice ?? "");
    setOverrideInsuranceEuros(
      typeof selected.insuranceCents === "number" ? (selected.insuranceCents / 100).toFixed(2) : ""
    );
    setCarrier(selected.returnCarrier ?? "");
    setTracking(selected.returnTrackingNumber ?? "");
  }, [selected?.ref]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveOverridesAndApprove = async () => {
    if (!selected) return;
    setActing(true);
    try {
      const insCents = overrideInsuranceEuros.trim()
        ? Math.round(parseFloat(overrideInsuranceEuros.replace(",", ".")) * 100)
        : undefined;
      if (insCents !== undefined && (!Number.isFinite(insCents) || insCents < 0)) {
        throw new Error("Montant d'assurance invalide");
      }
      const updated = await adminValidateDossier(selected.ref, {
        notes: notes || undefined,
        overridePackPrice: overridePrice.trim() || undefined,
        overrideInsuranceCents: insCents,
      });
      sendDossierEmail(updated.ref, "approved");
      toast({ title: "Tarifs enregistrés", description: `${updated.ref} validé avec les nouveaux montants.` });
      setSelected(updated);
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    } finally { setActing(false); }
  };

  const shipWithTracking = async () => {
    if (!selected) return;
    if (!carrier.trim() || tracking.trim().length < 4) {
      toast({ title: "Transporteur et n° de suivi requis", variant: "destructive" });
      return;
    }
    setActing(true);
    try {
      const updated = await adminMarkShipped(selected.ref, carrier.trim(), tracking.trim());
      sendDossierEmail(updated.ref, "shipped");
      toast({ title: "Expédition enregistrée", description: `${updated.ref} — ${carrier} ${tracking}` });
      setSelected(updated);
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    } finally { setActing(false); }
  };

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto max-w-md text-center">
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">Cette page est réservée aux administrateurs.</p>
          <Button onClick={() => navigate("/")} variant="outline">Retour à l'accueil</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Diagnostics reçus</h1>
              <p className="text-muted-foreground mt-1">
                Validez ou refusez les dossiers à partir des photos transmises par les clients.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {Object.entries(STATUS_LABEL).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={load} variant="outline" size="icon" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
              </Button>
            </div>
          </header>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="p-3 font-semibold">Réf.</th>
                      <th className="p-3 font-semibold">Client</th>
                      <th className="p-3 font-semibold">Carte</th>
                      <th className="p-3 font-semibold">Forfait</th>
                      <th className="p-3 font-semibold">Statut</th>
                      <th className="p-3 font-semibold">Reçu</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dossiers.length === 0 && (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">
                        {loading ? "Chargement…" : "Aucun dossier."}
                      </td></tr>
                    )}
                    {dossiers.map((d) => (
                      <tr key={d.ref} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 font-mono font-bold">{d.ref}</td>
                        <td className="p-3">
                          <div className="font-medium">{d.name}</div>
                          <div className="text-xs text-muted-foreground">{d.email}</div>
                        </td>
                        <td className="p-3">{d.cardName || "—"}<div className="text-xs text-muted-foreground">{d.tcg}</div></td>
                        <td className="p-3">{d.packLabel}<div className="text-xs text-accent font-semibold">{d.packPrice}</div></td>
                        <td className="p-3"><Badge className={STATUS_COLOR[d.status]}>{STATUS_LABEL[d.status]}</Badge></td>
                        <td className="p-3 text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleString("fr-FR")}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="icon" onClick={() => { setSelected(d); setNotes(d.adminNotes || ""); }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="lg:sticky lg:top-28 self-start">
              {selected ? (
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Dossier</p>
                      <p className="font-mono font-bold text-lg">{selected.ref}</p>
                    </div>
                    <Badge className={STATUS_COLOR[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <p><strong>{selected.name}</strong> · {selected.email}</p>
                    <p>{selected.cardName || "—"} · {selected.tcg || "—"} · est. {selected.estimatedValue || "—"}</p>
                    <p className="text-muted-foreground">Forfait : {selected.packLabel} ({selected.packPrice})</p>
                    {selected.cares?.length > 0 && (
                      <p className="text-xs">Soins : {selected.cares.join(", ")}</p>
                    )}
                    {selected.defects && (
                      <p className="text-xs italic">« {selected.defects} »</p>
                    )}
                  </div>

                  {selected.photos?.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {selected.photos.map((p, i) => (
                        <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                          <img src={p.url} alt={p.slot} className="aspect-[3/4] object-cover rounded border border-border hover:border-accent" />
                          <p className="text-[10px] text-center text-muted-foreground mt-1">{p.slot}</p>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mb-4">Aucune photo fournie.</p>
                  )}

                  <Textarea
                    placeholder="Note interne / message au client…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="mb-3"
                  />

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button
                      onClick={() => act("approved", "approved")}
                      disabled={acting || selected.status === "approved"}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Check className="w-4 h-4 mr-1" /> Approuver
                    </Button>
                    <Button
                      onClick={() => act("rejected", "rejected")}
                      disabled={acting || selected.status === "rejected"}
                      variant="destructive"
                    >
                      <X className="w-4 h-4 mr-1" /> Refuser
                    </Button>
                    <Button onClick={() => act("received")} disabled={acting} variant="outline">Colis reçu</Button>
                    <Button onClick={() => act("in_surgery")} disabled={acting} variant="outline">En chirurgie</Button>
                  </div>

                  {/* Manual price override (custom cases) */}
                  <div className="border-t border-border pt-4 mb-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tarification manuelle
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="ov-price" className="text-xs">Prix forfait</Label>
                        <Input
                          id="ov-price"
                          value={overridePrice}
                          onChange={(e) => setOverridePrice(e.target.value)}
                          placeholder="ex. 49 €"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ov-ins" className="text-xs">Assurance (€)</Label>
                        <Input
                          id="ov-ins"
                          value={overrideInsuranceEuros}
                          onChange={(e) => setOverrideInsuranceEuros(e.target.value)}
                          placeholder="ex. 19.90"
                          inputMode="decimal"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={saveOverridesAndApprove}
                      disabled={acting}
                      className="w-full"
                    >
                      <Save className="w-4 h-4 mr-1" /> Enregistrer tarifs & valider
                    </Button>
                  </div>

                  {/* Return tracking */}
                  <div className="border-t border-border pt-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Expédition retour
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="ship-carrier" className="text-xs">Transporteur</Label>
                        <Input
                          id="ship-carrier"
                          value={carrier}
                          onChange={(e) => setCarrier(e.target.value)}
                          placeholder="La Poste, Chronopost…"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ship-track" className="text-xs">N° de suivi</Label>
                        <Input
                          id="ship-track"
                          value={tracking}
                          onChange={(e) => setTracking(e.target.value)}
                          placeholder="Tracking number"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={shipWithTracking}
                      disabled={acting}
                      variant="outline"
                      className="w-full"
                    >
                      <Truck className="w-4 h-4 mr-1" /> Marquer comme expédié
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-5 text-sm text-muted-foreground text-center">
                  Sélectionnez un dossier pour voir les photos et agir.
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
