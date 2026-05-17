import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, Plus, Save, Trash2 } from "lucide-react";
import {
  listGradingPricing, adminUpsertGradingPricing, adminDeletePricing,
  type GradingPricing,
} from "@/lib/booking";

type Row = GradingPricing & { _new?: boolean };

export default function AdminGrading() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      const { data } = await supabase.from("user_roles").select("role")
        .eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
      setChecked(true);
    })();
  }, [navigate]);

  const load = async () => {
    try { setRows(await listGradingPricing()); }
    catch (e: any) { toast({ title: "Erreur", description: e?.message, variant: "destructive" }); }
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const update = (id: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addNew = () => {
    const id = `new-${Date.now()}`;
    setRows((rs) => [...rs, {
      id, partner: "PCA", tierLabel: "", minValueCents: 0, maxValueCents: null,
      priceCents: 0, turnaroundDays: 30, sortOrder: rs.length + 1, isActive: true, _new: true,
    }]);
  };

  const save = async (row: Row) => {
    setSavingId(row.id);
    try {
      await adminUpsertGradingPricing({
        id: row._new ? undefined : row.id,
        partner: row.partner,
        tierLabel: row.tierLabel,
        minValueCents: row.minValueCents,
        maxValueCents: row.maxValueCents,
        priceCents: row.priceCents,
        turnaroundDays: row.turnaroundDays,
        sortOrder: row.sortOrder,
        isActive: row.isActive,
      });
      toast({ title: "Tarif enregistré", description: `${row.partner} – ${row.tierLabel}` });
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    } finally { setSavingId(null); }
  };

  const remove = async (row: Row) => {
    if (row._new) { setRows((rs) => rs.filter((r) => r.id !== row.id)); return; }
    if (!confirm(`Supprimer ${row.partner} – ${row.tierLabel} ?`)) return;
    try {
      await adminDeletePricing("grading_pricing", row.id);
      toast({ title: "Supprimé" });
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    }
  };

  if (!checked) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto max-w-md text-center">
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Accès refusé</h1>
          <Button onClick={() => navigate("/")} variant="outline">Retour</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Grilles grading partenaires</h1>
              <p className="text-muted-foreground mt-1">Tarifs PCA, CCC, Collect Aura par tranche de valeur déclarée.</p>
            </div>
            <Button onClick={addNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" /> Nouvelle tranche
            </Button>
          </header>

          <div className="space-y-4">
            {rows.map((row) => (
              <Card key={row.id} className="p-4">
                <div className="grid md:grid-cols-7 gap-3 items-end">
                  <div>
                    <Label>Partenaire</Label>
                    <Input value={row.partner} onChange={(e) => update(row.id, { partner: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Libellé tranche</Label>
                    <Input value={row.tierLabel} onChange={(e) => update(row.id, { tierLabel: e.target.value })} />
                  </div>
                  <div>
                    <Label>Min (€)</Label>
                    <Input type="number" value={row.minValueCents / 100}
                      onChange={(e) => update(row.id, { minValueCents: Math.round(parseFloat(e.target.value || "0") * 100) })} />
                  </div>
                  <div>
                    <Label>Max (€)</Label>
                    <Input type="number" value={row.maxValueCents != null ? row.maxValueCents / 100 : ""}
                      placeholder="∞"
                      onChange={(e) => update(row.id, { maxValueCents: e.target.value ? Math.round(parseFloat(e.target.value) * 100) : null })} />
                  </div>
                  <div>
                    <Label>Prix (€)</Label>
                    <Input type="number" value={row.priceCents / 100}
                      onChange={(e) => update(row.id, { priceCents: Math.round(parseFloat(e.target.value || "0") * 100) })} />
                  </div>
                  <div>
                    <Label>Délai (j)</Label>
                    <Input type="number" value={row.turnaroundDays ?? ""}
                      onChange={(e) => update(row.id, { turnaroundDays: e.target.value ? parseInt(e.target.value, 10) : null })} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Switch checked={row.isActive} onCheckedChange={(v) => update(row.id, { isActive: v })} />
                    <span className="text-sm text-muted-foreground">{row.isActive ? "Actif" : "Masqué"}</span>
                    <span className="text-xs text-muted-foreground ml-4">Ordre :</span>
                    <Input type="number" value={row.sortOrder} className="w-20 h-8"
                      onChange={(e) => update(row.id, { sortOrder: parseInt(e.target.value || "0", 10) })} />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => remove(row)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => save(row)} disabled={savingId === row.id} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      {savingId === row.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
