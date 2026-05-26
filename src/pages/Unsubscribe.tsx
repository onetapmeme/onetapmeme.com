import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, MailX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const r = await fetch(`${FN_URL}?token=${encodeURIComponent(token)}`, { headers: { apikey: ANON } });
        const j = await r.json();
        if (!r.ok) setState("invalid");
        else if (j.valid === false && j.reason === "already_unsubscribed") setState("already");
        else if (j.valid) setState("valid");
        else setState("invalid");
      } catch { setState("error"); }
    })();
  }, [token]);

  const confirm = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      if ((data as any)?.success || (data as any)?.reason === "already_unsubscribed") setState("done");
      else setState("error");
    } catch { setState("error"); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="p-8 text-center">
            <MailX className="w-10 h-10 mx-auto text-accent mb-3" />
            <h1 className="text-2xl font-bold mb-2">Désabonnement</h1>
            {state === "loading" && <Loader2 className="w-6 h-6 animate-spin mx-auto mt-4 text-accent" />}
            {state === "valid" && (
              <>
                <p className="text-muted-foreground mb-6">Confirmez votre désabonnement des emails CardSurgery.</p>
                <Button onClick={confirm} disabled={busy} className="w-full">
                  {busy ? "Traitement…" : "Confirmer le désabonnement"}
                </Button>
              </>
            )}
            {state === "already" && (
              <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Vous êtes déjà désabonné(e).
              </p>
            )}
            {state === "done" && (
              <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Désabonnement effectué. À bientôt.
              </p>
            )}
            {(state === "invalid" || state === "error") && (
              <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" /> Lien invalide ou expiré.
              </p>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
