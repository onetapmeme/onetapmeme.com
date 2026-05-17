import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Search,
  Wand2,
  ShieldCheck,
  Layers,
  Diamond,
  PackageCheck,
  Stethoscope,
  Brush,
  Eye,
  Lock,
  Mail,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BeforeAfterSlider from "@/components/cards/BeforeAfterSlider";
import logo from "@/assets/cardsurgery-logo.png";
import heroBg from "@/assets/hero-bg.png";
import { copy, pickLang } from "./copy";
import SocialProof from "./SocialProof";
import { useSavedCardsCounter } from "@/hooks/useSavedCardsCounter";

const CardHome = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => copy[k][lang];
  const savedCount = useSavedCardsCounter();



  const steps = [
    { icon: PackageCheck, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Stethoscope, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Wand2, title: t("step3Title"), desc: t("step3Desc") },
    { icon: ShieldCheck, title: t("step4Title"), desc: t("step4Desc") },
  ];

  const why = [
    { icon: Search, title: t("why1Title"), desc: t("why1Desc") },
    { icon: Diamond, title: t("why2Title"), desc: t("why2Desc") },
    { icon: Eye, title: t("why3Title"), desc: t("why3Desc") },
    { icon: Lock, title: t("why4Title"), desc: t("why4Desc") },
  ];

  const trust = [t("trust1"), t("trust2"), t("trust3"), t("trust4")];


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4"
      >
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-primary/18 rounded-full blur-[200px] opacity-45" />
          <div className="absolute -bottom-40 left-1/3 w-[1000px] h-[600px] bg-primary/14 rounded-full blur-[200px] opacity-40" />
          <div className="absolute -bottom-44 right-1/3 w-[1100px] h-[650px] bg-primary/16 rounded-full blur-[220px] opacity-42" />
        </div>

        <div className="relative z-10 container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.img
                src={logo}
                alt="CardSurgery"
                className="h-40 sm:h-52 md:h-64 w-auto object-contain"
                animate={{
                  y: [0, -10, 0],
                  filter: [
                    "drop-shadow(0 0 30px hsla(210,100%,55%,0.5))",
                    "drop-shadow(0 0 60px hsla(210,100%,55%,0.8))",
                    "drop-shadow(0 0 30px hsla(210,100%,55%,0.5))",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <p className="uppercase tracking-widest text-xs md:text-sm text-primary mb-4 font-semibold">
              {t("heroEyebrow")}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              {t("heroTitle")}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-foreground/90 mb-4 max-w-3xl mx-auto">
              {t("heroTagline")}
            </p>

            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[t("heroBadgeWarranty"), t("heroBadgeInsured")].map(
                (b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full glass-effect border border-primary/30 text-xs font-semibold text-foreground/90"
                  >
                    {b}
                  </span>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-accent/40 mb-8 shadow-[0_0_30px_hsla(4,78%,52%,0.25)]"
            >
              <FlaskConical className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-foreground">
                {t("heroBadgeSaved").replace("{count}", savedCount.toLocaleString())}
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 rounded-full group glossy-btn text-accent-foreground border-0"
              >
                <a href="/pricing">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("heroCtaPrimary")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT / STORYTELLING */}
      <section id="about" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <Diamond className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("aboutTitle")}</h2>
          </motion.div>
          <Card className="glass-effect p-8 md:p-12 rounded-3xl border-primary/20">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              {t("aboutP1")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("aboutP2")}
            </p>
          </Card>
        </div>
      </section>



      <section id="process" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("processTitle")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("processSubtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-primary/10 md:-translate-x-1/2" />
            <div className="space-y-10">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    className={`md:flex ${i % 2 === 1 ? "md:justify-start" : "md:justify-end"}`}
                  >
                    <Card className="glass-effect p-6 rounded-2xl border-primary/20 max-w-md w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                          {t("stepLabel")} {i + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </Card>
                  </div>
                  <div
                    className={`absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 p-3 rounded-full bg-background border-4 border-primary shadow-[0_0_30px_hsla(210,100%,55%,0.4)]`}
                  >
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Authority & references */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a
              href="https://www.kurtscardcare.com/post/kurts-card-care-recovery?srsltid=AfmBOoqfAlwPgcz3Lha8FPmjA9pa2Z33TlFC4Q5bs5nuWSEdAVr4u1wt"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-2xl border border-primary/20 p-5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group block"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Produits référencés
              </p>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                Solutions Kurt's Card Care Recovery →
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Gamme professionnelle utilisée par notre laboratoire.
              </p>
            </a>
            <a
              href="https://www.rocketcollect.net"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-2xl border border-accent/30 p-5 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group block"
            >
              <p className="text-xs uppercase tracking-widest text-accent mb-1">
                Certifications & formations
              </p>
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                Maîtrise validée par Rocket Collect →
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Formations premium et certifications professionnelles.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("whyTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {why.map((w, i) => (
              <Card
                key={i}
                className="glass-effect h-full p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500"
              >
                <w.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2 text-foreground">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <ShieldCheck className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("trustTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trust.map((line, i) => (
              <Card
                key={i}
                className="glass-effect p-5 rounded-2xl border-primary/20 flex items-start gap-3"
              >
                <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground/90">{line}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — testimonials + Instagram corner */}
      <SocialProof />


      {/* BEFORE / AFTER DEMO */}
      <section id="before-after" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Avant / Après</h2>
            <p className="text-lg text-muted-foreground">
              Glissez le curseur pour comparer une restauration réelle.
            </p>
          </div>
          <BeforeAfterSlider
            before="https://placehold.co/800x1100/7a6a55/ffffff?text=AVANT"
            after="https://placehold.co/800x1100/3a2f24/ffffff?text=APRÈS"
            alt="Démonstration restauration CardSurgery"
          />
        </div>
      </section>

      {/* SÉCURITÉ CLINIQUE */}
      <section id="security" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Lock className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Sécurité clinique</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vos cartes traitées comme des actifs : traçabilité, stockage protégé, assurance dédiée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <Lock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Coffre ignifuge</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stockage en coffre-fort ignifuge entre chaque étape, accès restreint à l'équipe technique habilitée.
              </p>
            </Card>
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Assurance bout-en-bout</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Colis aller / retour assurés et suivis jusqu'à 5 000 € la déclaration. Aucune zone d'ombre.
              </p>
            </Card>
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Traçabilité HD</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Photos haute définition à chaque étape, archivées dans votre dossier sécurisé.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass-effect p-10 md:p-14 rounded-3xl border-primary/30 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("ctaTitle")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("ctaDesc")}</p>
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 rounded-full glossy-btn text-accent-foreground border-0"
            >
              <a href="/pricing">
                <Sparkles className="w-5 h-5 mr-2" />
                {t("ctaButton")}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              {t("ctaContact")}{" "}
              <a
                href="mailto:contact@cardsurgery.com"
                className="text-primary hover:underline"
              >
                contact@cardsurgery.com
              </a>
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default CardHome;
