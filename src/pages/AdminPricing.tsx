import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, Plus, Save, Trash2 } from "lucide-react";
import {
  listServicePricing, adminUpsertServicePricing, adminDeletePricing,
  type ServicePricing,
} from "@/lib/booking";

type Row = ServicePricing & { _new?: boolean; _featuresText?: string };

export default function AdminPricing() {
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
    try {
      const list = await listServicePricing();
      setRows(list.map((r) => ({ ...r, _featuresText: r.features.join("\n") })));
    } catch (e: any) {
      toast({ title: "Erreur", description: e?.message, variant: "destructive" });
    }
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const update = (id: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addNew = () => {
    const id = `new-${Date.now()}`;
    setRows((rs) => [...rs, {
      id, packKey: "", label: "", priceCents: 0, turnaroundDays: 7,
      description: "", features: [], _featuresText: "", sortOrder: rs.length + 1,
      isActive: true, _new: true,
    }]);
  };

  const save = async (row: Row) => {
    setSavingId(row.id);
    try {
      const features = (row._featuresText || "").split("\n").map((s) => s.trim()).filter(Boolean);
      await adminUpsertServicePricing({
        id: row._new ? undefined : row.id,
        packKey: row.packKey,
        label: row.label,
        priceCents: row.priceCents,
        turnaroundDays: row.turnaroundDays,
        description: row.description,
        features,
        sortOrder: row.sortOrder,
        isActive: row.isActive,
      });
      toast({ title: "Tarif enregistré", description: row.label });
      await load();
    } catch (e: any) {
      toast({ title: "Échec", description: e?.message, variant: "destructive" });
    } finally { setSavingId(null); }
  };

  const remove = async (row: Row) => {
    if (row._new) { setRows((rs) => rs.filter((r) => r.id !== row.id)); return; }
    if (!confirm(`Supprimer ${row.label} ?`)) return;
    try {
      await adminDeletePricing("service_pricing", row.id);
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
        <div className="container mx-auto max-w-5xl">
          <header className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Tarifs forfaits</h1>
              <p className="text-muted-foreground mt-1">Modifiez prix, descriptifs et options des packs CardSurgery.</p>
            </div>
            <Button onClick={addNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" /> Nouveau forfait
            </Button>
          </header>

          <div className="space-y-5">
            {rows.map((row) => (
              <Card key={row.id} className="p-5 space-y-4">
                <div className="grid md:grid-cols-4 gap-3">
                  <div>
                    <Label>Clé technique</Label>
                    <Input value={row.packKey} onChange={(e) => update(row.id, { packKey: e.target.value })} placeholder="clean" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Libellé</Label>
                    <Input value={row.label} onChange={(e) => update(row.id, { label: e.target.value })} />
                  </div>
                  <div className="flex items-end gap-3">
                    <Switch checked={row.isActive} onCheckedChange={(v) => update(row.id, { isActive: v })} />
                    <span className="text-sm text-muted-foreground">{row.isActive ? "Actif" : "Masqué"}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Prix (centimes)</Label>
                    <Input type="number" value={row.priceCents}
                      onChange={(e) => update(row.id, { priceCents: parseInt(e.target.value || "0", 10) })} />
                    <p className="text-xs text-muted-foreground mt-1">{(row.priceCents / 100).toFixed(2)} €</p>
                  </div>
                  <div>
                    <Label>Délai (jours)</Label>
                    <Input type="number" value={row.turnaroundDays ?? ""}
                      onChange={(e) => update(row.id, { turnaroundDays: e.target.value ? parseInt(e.target.value, 10) : null })} />
                  </div>
                  <div>
                    <Label>Ordre d'affichage</Label>
                    <Input type="number" value={row.sortOrder}
                      onChange={(e) => update(row.id, { sortOrder: parseInt(e.target.value || "0", 10) })} />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea rows={2} value={row.description ?? ""} onChange={(e) => update(row.id, { description: e.target.value })} />
                </div>
                <div>
                  <Label>Caractéristiques (une par ligne)</Label>
                  <Textarea rows={4} value={row._featuresText ?? ""} onChange={(e) => update(row.id, { _featuresText: e.target.value })} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => remove(row)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                  </Button>
                  <Button onClick={() => save(row)} disabled={savingId === row.id} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {savingId === row.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                    Enregistrer
                  </Button>
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
