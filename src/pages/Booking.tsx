import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TIME_SLOTS,
  isBookableDay,
  listTakenSlots,
  createBookingSlot,
} from "@/lib/booking";

const fmtKey = (d: Date) => d.toISOString().slice(0, 10);

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dossierRef, setDossierRef] = useState("");
  const [taken, setTaken] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{ ref: string; date: string; slot: string } | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Load taken slots for the next 60 days
  useEffect(() => {
    const to = new Date(today);
    to.setDate(to.getDate() + 60);
    listTakenSlots(today, to)
      .then(setTaken)
      .catch(() => setTaken(new Set()));
  }, [today]);

  const slotKey = date ? fmtKey(date) : "";
  const isSlotTaken = (t: string) => taken.has(`${slotKey}|${t}`);

  const confirm = async () => {
    if (!date || !slot || !name || !email) {
      toast({ title: "Champs manquants", description: "Date, créneau, nom et email requis.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const ref = await createBookingSlot({ name, email, date, time: slot, dossierRef: dossierRef || undefined });
      const fmt = date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      setConfirmed({ ref, date: fmt, slot });
      setTaken((prev) => new Set(prev).add(`${slotKey}|${slot}`));
      toast({ title: "Créneau réservé ✓", description: `Référence ${ref} envoyée à ${email}.` });
    } catch (e: any) {
      const msg = e?.message?.includes("Slot already taken")
        ? "Ce créneau vient d'être réservé. Choisissez-en un autre."
        : e?.message || "Erreur lors de la réservation";
      toast({ title: "Échec de la réservation", description: msg, variant: "destructive" });
      // refresh taken set
      const to = new Date(today); to.setDate(to.getDate() + 60);
      listTakenSlots(today, to).then(setTaken).catch(() => {});
    } finally {
      setSubmitting(false);
    }
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
              Atelier ouvert du <strong>lundi au jeudi, 10 h–18 h</strong>. Choisissez la date à laquelle vous comptez expédier votre carte ;
              nous garantissons la prise en charge dès réception.
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
                <Button variant="outline" onClick={() => { setConfirmed(null); setSlot(null); }}>Nouvelle réservation</Button>
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
                  onSelect={(d) => { setDate(d); setSlot(null); }}
                  disabled={(d) => d < today || !isBookableDay(d)}
                  className={cn("rounded-md border bg-background p-3 pointer-events-auto")}
                />
                <p className="text-xs text-muted-foreground mt-3">
                  Vendredi, samedi et dimanche fermés (week-end logistique).
                </p>
              </Card>

              <Card className="p-6 space-y-5">
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /> Créneau de dépôt</h3>
                  {!date ? (
                    <p className="text-sm text-muted-foreground">Sélectionnez d'abord une date.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((s) => {
                        const taken = isSlotTaken(s);
                        return (
                          <Button
                            key={s}
                            variant={slot === s ? "default" : "outline"}
                            size="sm"
                            disabled={taken}
                            onClick={() => setSlot(s)}
                            className={cn(
                              slot === s ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "",
                              taken && "opacity-40 line-through",
                            )}
                            aria-label={taken ? `Créneau ${s} déjà pris` : `Choisir le créneau ${s}`}
                          >
                            {s}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bk-name">Nom</Label>
                    <Input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
                  </div>
                  <div>
                    <Label htmlFor="bk-email">Email</Label>
                    <Input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor="bk-ref">Référence dossier (optionnel)</Label>
                    <Input id="bk-ref" value={dossierRef} onChange={(e) => setDossierRef(e.target.value.toUpperCase())} placeholder="CS-XXXXXX" maxLength={20} />
                  </div>
                </div>
                <Button
                  onClick={confirm}
                  disabled={submitting || !date || !slot || !name || !email}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Réservation…</> : "Confirmer la réservation"}
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
