import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Entry = {
  keywords: string[];
  answer: string;
};

// Strict knowledge base — CardSurgery only
const KB: Entry[] = [
  {
    keywords: ["qui", "quoi", "presentation", "présentation", "cardsurgery", "service", "labo", "laboratoire"],
    answer:
      "CardSurgery est un laboratoire français spécialisé dans la restauration, le nettoyage et la préservation esthétique de cartes TCG (Pokémon, One Piece, Lorcana, Magic, Yu-Gi-Oh). Notre mission : éliminer les impuretés, atténuer les défauts de surface et maximiser le « Eye-Appeal » avant certification.",
  },
  {
    keywords: ["nintendo", "bandai", "pokemon company", "affil", "officiel", "partenariat marque"],
    answer:
      "CardSurgery est un service totalement indépendant. Nous ne sommes affiliés ni à Nintendo, ni à The Pokémon Company, ni à Bandai, ni à aucun autre éditeur de TCG.",
  },
  {
    keywords: ["technologie", "protocole", "outil", "precision", "précision", "methode", "méthode"],
    answer:
      "Nous appliquons notre protocole exclusif de précision chirurgicale : outils calibrés et solutions non invasives appliqués au micromètre près, sans jamais altérer la structure d'origine de la carte.",
  },
  {
    keywords: ["reserver", "réserver", "reservation", "réservation", "commander", "comment commencer", "diagnostic"],
    answer:
      "La réservation se fait via notre formulaire de diagnostic en ligne : photos recto/verso, choix du forfait et blocage de votre créneau. Vous recevez ensuite le guide d'expédition sécurisé.",
  },
  {
    keywords: ["envoi", "expedition", "expédition", "colis", "toploader", "emballage", "shipping"],
    answer:
      "Un guide d'expédition strict vous est fourni (Toploader scellé, emballage blindé). Tous nos colis de retour sont expédiés avec suivi et assurance intégrée.",
  },
  {
    keywords: ["paiement", "payer", "stripe", "paypal", "carte bancaire", "cb"],
    answer:
      "Les paiements sont 100 % sécurisés par Carte Bancaire (Stripe) ou PayPal, validés lors de la confirmation du diagnostic de votre carte.",
  },
  {
    keywords: ["prix", "tarif", "tarifs", "forfait", "combien", "cout", "coût", "euro", "€"],
    answer:
      "Nos 3 forfaits transparents : Surface Clean & Polish à 19 €, Professional Restoration à 39 €, Full Surgery à 95 €. Options à la carte (Redressage 9 €, Nettoyage colle 9 €, Pré-grading 15 €) validées uniquement avec votre accord.",
  },
  {
    keywords: ["cache", "caché", "frais cache", "supplement", "supplément", "surprise"],
    answer:
      "Aucun frais caché. Les options à la carte ne sont activées qu'après votre validation explicite du diagnostic.",
  },
  {
    keywords: ["securite locaux", "securité", "stockage", "coffre", "atelier", "microscope"],
    answer:
      "Vos cartes sont manipulées sous microscope en atmosphère protégée et stockées dans un coffre-fort ignifugé entre chaque étape.",
  },
  {
    keywords: ["pro", "professionnel", "boutique", "volume", "gros", "degressif", "dégressif"],
    answer:
      "Aucune limite par envoi. Nous proposons des tarifs dégressifs et des partenariats de volume pour les boutiques et collectionneurs sérieux. Contactez-nous à contact@cardsurgery.com.",
  },
  {
    keywords: ["psa", "bgs", "pca", "grading", "certif", "certification", "accepté", "accepter"],
    answer:
      "Nos interventions (nettoyage de surface, redressage) sont des pratiques d'entretien courantes qui respectent scrupuleusement les chartes de conservation de PSA, BGS et PCA.",
  },
  {
    keywords: ["echec", "échec", "impossible", "risque", "refuse", "refusé", "abimer", "abîmer"],
    answer:
      "Si notre diagnostic en laboratoire révèle un risque pour votre carte, l'opération est annulée et votre carte vous est renvoyée sans aucun frais technique.",
  },
  {
    keywords: ["certificat", "authenticite", "authenticité", "rapport", "preuve"],
    answer:
      "Chaque carte restaurée est livrée avec un certificat numérique unique répertoriant l'ensemble des interventions effectuées dans notre laboratoire.",
  },
  {
    keywords: ["modifier", "annuler", "annulation", "changer commande"],
    answer:
      "Vous pouvez modifier ou annuler votre commande à tout moment avant l'envoi physique de vos cartes, en contactant notre support à contact@cardsurgery.com.",
  },
  {
    keywords: ["suivi", "suivre", "tracking", "etat", "état", "avancement", "ou en est", "où en est"],
    answer:
      "Notre dashboard de suivi temps réel affiche les étapes : Réception → Analyse → En Chirurgie → Expédié.",
  },
  {
    keywords: ["pre-grading", "pré-grading", "pregrading", "evaluer note", "évaluer note"],
    answer:
      "L'analyse pré-grading (15 €) évalue numériquement les chances d'obtenir une note maximale auprès des organismes de certification après notre intervention.",
  },
  {
    keywords: ["urgent", "urgence", "fast", "rapide", "delai court", "48h"],
    answer:
      "L'option Fast Track permet un traitement prioritaire en 48 heures pour vos cartes les plus précieuses.",
  },
  {
    keywords: ["mobile", "smartphone", "téléphone", "telephone", "responsive"],
    answer:
      "Toute notre interface, y compris le suivi de dossier, est 100 % responsive et optimisée pour smartphone.",
  },
  {
    keywords: ["instagram", "reseau", "réseau", "social", "communaute", "communauté"],
    answer:
      "Suivez les coulisses, les vidéos avant/après et nos restaurations live sur Instagram @card_surgery (https://www.instagram.com/card_surgery/).",
  },
  {
    keywords: ["affiliation creator", "affilié", "createur", "créateur", "influence", "partenaire content"],
    answer:
      "Nous proposons un programme d'affiliation dédié aux créateurs de contenu de l'écosystème TCG. Contactez-nous pour obtenir votre code partenaire.",
  },
  {
    keywords: ["avis", "review", "evaluation", "évaluation", "note moi"],
    answer:
      "Un lien d'évaluation vous est envoyé automatiquement par e-mail après réception de votre colis de retour.",
  },
  {
    keywords: ["ou", "où", "basé", "base", "localisation", "france", "pays", "adresse"],
    answer:
      "Notre équipe et notre laboratoire de restauration sont basés en France.",
  },
  {
    keywords: ["jeu", "tcg", "pokemon", "one piece", "magic", "lorcana", "yugioh", "yu-gi-oh", "accept"],
    answer:
      "Nous restaurons toutes les principales gammes de TCG : Pokémon, One Piece, Lorcana, Magic: The Gathering et Yu-Gi-Oh.",
  },
];

const FALLBACK =
  "Je suis l'assistant virtuel de CardSurgery, spécialisé uniquement dans la chirurgie et la préservation de vos cartes TCG. Pour toute autre demande, écrivez-nous à contact@cardsurgery.com.";

const SUGGESTIONS = [
  "Quel est le prix pour une carte Pokémon ?",
  "Est-ce accepté par PSA ?",
  "Où êtes-vous basés ?",
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9€\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findAnswer(q: string): string {
  const n = normalize(q);
  if (!n) return FALLBACK;
  let bestScore = 0;
  let bestAnswer = FALLBACK;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      const nk = normalize(kw);
      if (!nk) continue;
      if (n.includes(nk)) score += nk.split(" ").length * 2;
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }
  return bestScore >= 2 ? bestAnswer : FALLBACK;
}

type Msg = { role: "user" | "bot"; text: string };

const FAQAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setThinking(true);
    setTimeout(() => {
      const answer = findAnswer(question);
      setMessages((m) => [...m, { role: "bot", text: answer }]);
      setThinking(false);
    }, 700);
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
              animate={thinking ? { rotate: 360 } : { rotate: 0 }}
              transition={
                thinking
                  ? { repeat: Infinity, duration: 1.2, ease: "linear" }
                  : { duration: 0.3 }
              }
              className="relative p-2.5 rounded-full bg-primary/15 border border-primary/30"
            >
              <Bot className="w-5 h-5 text-primary" />
              {thinking && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                Demandez à notre Chirurgien Virtuel
              </h3>
              <p className="text-xs text-muted-foreground">
                Réponses immédiates basées sur l'expertise CardSurgery
              </p>
            </div>
          </div>

          {/* Conversation */}
          {(messages.length > 0 || thinking) && (
            <div className="mb-5 max-h-80 overflow-y-auto space-y-3 rounded-2xl border border-border/50 bg-background/40 p-4">
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
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-2.5 text-sm text-muted-foreground inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyse en cours…
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}

          {/* Input */}
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
                placeholder="Posez votre question (ex : forfait, délai, PSA…)"
                className="w-full h-12 rounded-full bg-background/60 backdrop-blur-md border border-primary/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 px-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                aria-label="Posez votre question"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
            </div>
            <Button
              type="submit"
              disabled={thinking || !input.trim()}
              className="h-12 px-5 rounded-full glossy-btn text-accent-foreground border-0 shrink-0"
              aria-label="Envoyer"
            >
              {thinking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>

          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                disabled={thinking}
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
