import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, RefreshCcw, CalendarDays, Clock, Mail } from "lucide-react";
import { adminListBookings, adminUpdateBookingStatus, type BookingSlot } from "@/lib/booking";

const STATUS = ["confirmed", "honored", "no_show", "cancelled"] as const;
const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmé",
  honored: "Honoré",
  no_show: "Absent",
  cancelled: "Annulé",
};
const STATUS_COLOR: Record<string, string> = {
  confirmed: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  honored: "bg-green-500/20 text-green-700 dark:text-green-300",
  no_show: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
  cancelled: "bg-destructive/20 text-destructive",
};

export default function AdminBookings() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      setItems(await adminListBookings());
    } catch (e: any) {
      toast({ title: "Erreur", description: e?.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const setStatus = async (ref: string, status: string) => {
    try {
      await adminUpdateBookingStatus(ref, status);
      toast({ title: "Mise à jour", description: `${ref} → ${STATUS_LABEL[status]}` });
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
          <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Réservations</h1>
              <p className="text-muted-foreground mt-1">Tous les créneaux de dépôt confirmés par les clients.</p>
            </div>
            <Button onClick={load} variant="outline" size="icon" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
            </Button>
          </header>

          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 font-semibold">Réf.</th>
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Créneau</th>
                    <th className="p-3 font-semibold">Client</th>
                    <th className="p-3 font-semibold">Dossier</th>
                    <th className="p-3 font-semibold">Statut</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">
                      {loading ? "Chargement…" : "Aucune réservation."}
                    </td></tr>
                  )}
                  {items.map((b) => (
                    <tr key={b.ref} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3 font-mono font-bold">{b.ref}</td>
                      <td className="p-3"><CalendarDays className="inline w-3 h-3 mr-1 text-accent" />{b.bookingDate}</td>
                      <td className="p-3"><Clock className="inline w-3 h-3 mr-1 text-accent" />{b.bookingTime}</td>
                      <td className="p-3">
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs text-muted-foreground"><Mail className="inline w-3 h-3 mr-1" />{b.email}</div>
                      </td>
                      <td className="p-3 font-mono text-xs">{b.dossierRef || "—"}</td>
                      <td className="p-3"><Badge className={STATUS_COLOR[b.status]}>{STATUS_LABEL[b.status] || b.status}</Badge></td>
                      <td className="p-3">
                        <Select value={b.status} onValueChange={(v) => setStatus(b.ref, v)}>
                          <SelectTrigger className="w-[140px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {STATUS.map((s) => (<SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
