import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Check } from "lucide-react";

const SLOTS = ["09:00", "10:30", "13:30", "15:00", "16:30"];

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState<{ ref: string; date: string; slot: string } | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const confirm = () => {
    if (!date || !slot || !name || !email) {
      toast({ title: "Champs manquants", description: "Date, créneau, nom et email requis.", variant: "destructive" });
      return;
    }
    const ref = "CS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const fmt = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    setConfirmed({ ref, date: fmt, slot });
    toast({ title: "Créneau réservé ✓", description: `Référence ${ref} envoyée à ${email}.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              <span className="text-accent">Réservez</span> votre créneau d'envoi
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choisissez la date à laquelle vous comptez expédier votre carte. Nous garantissons la prise en charge dès réception.
            </p>
          </header>

          {confirmed ? (
            <Card className="p-8 text-center max-w-xl mx-auto border-accent border-2">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Réservation confirmée</h2>
              <p className="text-muted-foreground mb-4">Référence : <span className="font-mono font-bold text-foreground">{confirmed.ref}</span></p>
              <p className="text-foreground"><CalendarDays className="inline w-4 h-4 mr-1" />{confirmed.date}</p>
              <p className="text-foreground mb-6"><Clock className="inline w-4 h-4 mr-1" />{confirmed.slot}</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setConfirmed(null)}>Nouvelle réservation</Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="/tracking">Suivre mon dossier</a>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-accent" /> Date d'envoi</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < today}
                  className="rounded-md border bg-background"
                />
              </Card>

              <Card className="p-6 space-y-5">
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /> Créneau de dépôt</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {SLOTS.map((s) => (
                      <Button
                        key={s}
                        variant={slot === s ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSlot(s)}
                        className={slot === s ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Nom</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                  </div>
                </div>
                <Button onClick={confirm} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Confirmer la réservation
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
