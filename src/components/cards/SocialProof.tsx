import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { copy, pickLang, tr } from "@/components/cards/copy";

// Decorative SVG placeholders so the IG grid renders without external assets.
const tile = (label: string, c1: string, c2: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/>
      </linearGradient></defs>
      <rect width='400' height='400' fill='url(#g)'/>
      <text x='50%' y='52%' font-family='Georgia, serif' font-size='30' fill='white' text-anchor='middle' opacity='0.9'>${label}</text>
    </svg>`
  )}`;

const TILES = [
  { src: tile("Avant / Après", "#7a5b55", "#2d2018"), tag: "#dracaufeu" },
  { src: tile("Whitening Pro", "#5a6f7a", "#1f2a33"), tag: "#whitening" },
  { src: tile("De-curving", "#6a6055", "#1a1814"), tag: "#decurving" },
  { src: tile("Atelier CardSurgery", "#806a85", "#2a1f33"), tag: "#atelier" },
  { src: tile("Pressage", "#7a6a55", "#3a2f24"), tag: "#pressing" },
  { src: tile("Luffy OP01", "#6f5a4a", "#1f1814"), tag: "#onepiece" },
  { src: tile("Lorcana Care", "#5a7a6f", "#1a2a24"), tag: "#lorcana" },
  { src: tile("Coffret retour", "#7a5a6f", "#241a24"), tag: "#packaging" },
];

const TESTIMONIALS = [
  {
    name: "Léa M.",
    role: "Collectionneuse Pokémon",
    text:
      "Ma Gold Star abîmée est revenue comme neuve, prête pour le grading ! Je n'en revenais pas du résultat.",
  },
  {
    name: "Antoine R.",
    role: "Joueur One Piece",
    text:
      "Le soin apporté au colis est incroyable. CardSurgery est devenu LA référence pour mes pièces rares.",
  },
  {
    name: "Camille D.",
    role: "Investisseuse TCG",
    text:
      "Diagnostic transparent, photos avant/après détaillées et résultat bluffant sur un Black Lotus reprint.",
  },
  {
    name: "Yann B.",
    role: "Collectionneur Lorcana",
    text:
      "Une vraie expertise chirurgicale. Mon Elsa First Chapter a retrouvé sa planéité parfaite.",
  },
];

const SocialProof = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => tr(copy[k], lang);
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const current = TESTIMONIALS[idx];

  return (
    <section id="social" className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Testimonials slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            {t("testimonialsTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonialsSub")}
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto mb-24">
          <Card className="glass-effect p-8 md:p-12 rounded-3xl border-primary/20 relative overflow-hidden">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-accent/20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 mb-6">
                  « {current.text} »
                </p>
                <div className="text-sm">
                  <span className="font-bold text-foreground">{current.name}</span>
                  <span className="text-muted-foreground"> · {current.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Précédent">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Aller au témoignage ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-8 bg-accent" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next} aria-label="Suivant">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Instagram corner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border border-primary/20 mb-4">
            <Instagram className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              {t("instagramEyebrow")}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
            {t("instagramTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("instagramSub")}{" "}
            <a
              href="https://instagram.com/card_surgery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline"
            >
              @card_surgery
            </a>
            .
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {TILES.map((t, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/card_surgery"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-lg group"
              aria-label={`Voir ${t.tag} sur Instagram`}
            >
              <img
                src={t.src}
                alt={t.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs text-white font-mono">{t.tag}</span>
              </div>
              <Instagram className="absolute top-2 right-2 w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="rounded-full">
            <a
              href="https://instagram.com/card_surgery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Suivre @card_surgery
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
