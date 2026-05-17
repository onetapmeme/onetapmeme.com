import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Comment préparer ma carte avant l'envoi ?",
  "Quelle est la différence entre PCA et CCC ?",
  "Le polissage abîme-t-il l'holofoil ?",
  "Quel forfait pour un Charizard 1999 ?",
];

const FUNCTIONS_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1`;

const FAQAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming]);

  const ask = async (q: string) => {
    const question = q.trim();
    if (!question || streaming) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch(`${FUNCTIONS_BASE}/faq-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Erreur réseau" }));
        throw new Error(data.error || "Erreur IA");
      }
      if (!res.body) throw new Error("Pas de flux de réponse");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            /* ignore partial */
          }
        }
      }
    } catch (err: any) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Désolé, je n'ai pas pu répondre. Réessaie dans un instant ou écris-nous à **contact@cardsurgery.com**.",
        };
        return copy;
      });
      toast.error(err.message || "Erreur de l'assistant");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <Card className="relative overflow-hidden rounded-3xl border border-primary/30 bg-background/40 backdrop-blur-xl shadow-[0_10px_60px_-15px_hsla(210,100%,55%,0.35)]">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={streaming ? { rotate: 360 } : { rotate: 0 }}
              transition={
                streaming
                  ? { repeat: Infinity, duration: 1.2, ease: "linear" }
                  : { duration: 0.3 }
              }
              className="relative p-2.5 rounded-full bg-primary/15 border border-primary/30"
            >
              <Bot className="w-5 h-5 text-primary" />
              {streaming && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                Chirurgien Virtuel — Assistant IA
              </h3>
              <p className="text-xs text-muted-foreground">
                Conseils experts sur diagnostic, restauration et grading
              </p>
            </div>
          </div>

          {(messages.length > 0 || streaming) && (
            <div className="mb-5 max-h-96 overflow-y-auto space-y-3 rounded-2xl border border-border/50 bg-background/40 p-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-strong:text-foreground">
                          {m.content ? (
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Analyse en cours…
                            </span>
                          )}
                        </div>
                      ) : (
                        m.content
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={endRef} />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question (ex : holofoil, PCA, délais, polissage…)"
                className="w-full h-12 rounded-full bg-background/60 backdrop-blur-md border border-primary/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 px-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                aria-label="Posez votre question"
                disabled={streaming}
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
            </div>
            <Button
              type="submit"
              disabled={streaming || !input.trim()}
              className="h-12 px-5 rounded-full glossy-btn text-accent-foreground border-0 shrink-0"
              aria-label="Envoyer"
            >
              {streaming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={streaming}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-background/40 hover:bg-primary/10 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FAQAssistant;
