import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert, FolderOpen, CalendarDays, Tag, Award } from "lucide-react";

type Tile = { to: string; title: string; desc: string; icon: any };

const TILES: Tile[] = [
  { to: "/admin/dossiers", title: "Diagnostics & dossiers", desc: "Valider, refuser, suivre les dossiers clients.", icon: FolderOpen },
  { to: "/admin/bookings", title: "Réservations", desc: "Créneaux de dépôt et gestion des rendez-vous.", icon: CalendarDays },
  { to: "/admin/pricing", title: "Tarifs forfaits", desc: "Modifier les prix et descriptifs des packs.", icon: Tag },
  { to: "/admin/grading", title: "Grilles grading", desc: "Tarifs PCA / CCC / Collect Aura par tranche.", icon: Award },
];

export default function AdminHub() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  if (!checked) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }
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
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Console d'administration</h1>
            <p className="text-muted-foreground mt-1">Gérez les dossiers, créneaux et tarifs CardSurgery.</p>
          </header>
          <div className="grid sm:grid-cols-2 gap-4">
            {TILES.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.to} to={t.to}>
                  <Card className="p-6 hover:border-accent transition-colors h-full">
                    <Icon className="w-8 h-8 text-accent mb-3" />
                    <h2 className="text-lg font-bold mb-1">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
