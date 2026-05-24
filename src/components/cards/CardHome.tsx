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
  Microscope,
  Droplets,
  Hammer,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BeforeAfterSlider from "@/components/cards/BeforeAfterSlider";
import ScrollCue from "@/components/ScrollCue";
import logo from "@/assets/cardsurgery-logo.png";
import lugiaAvant from "@/assets/lugia-avant.jpeg";
import lugiaApres from "@/assets/lugia-apres.jpeg";
import heroBg from "@/assets/hero-bg.png";
import { copy, pickLang, tr } from "./copy";
import SocialProof from "./SocialProof";
import { useSavedCardsCounter } from "@/hooks/useSavedCardsCounter";

const CardHome = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => tr(copy[k], lang);
  const savedCount = useSavedCardsCounter();



  const steps = [
    { icon: Microscope, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Droplets, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Hammer, title: t("step3Title"), desc: t("step3Desc") },
    { icon: Gem, title: t("step4Title"), desc: t("step4Desc") },
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-24 pb-20 section-x"
      >
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        </div>

        {/* Refined ambient glows (2 instead of 3, more diffused) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1400px] h-[700px] bg-accent/10 rounded-full blur-[180px]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[500px] bg-primary/8 rounded-full blur-[160px]" />
        </div>

        {/* Apple-style grain overlay */}
        <div className="grain-overlay z-[2]" />

        <div className="relative z-10 container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center mb-8">
              <motion.img
                src={logo}
                alt="CardSurgery"
                className="h-36 sm:h-48 md:h-60 w-auto object-contain"
                animate={{
                  y: [0, -6, 0],
                  filter: [
                    "drop-shadow(0 0 25px hsla(22,55%,55%,0.28))",
                    "drop-shadow(0 0 45px hsla(22,55%,55%,0.42))",
                    "drop-shadow(0 0 25px hsla(22,55%,55%,0.28))",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              />
            </div>

            <p className="uppercase text-[11px] sm:text-[13px] text-accent mb-5 font-semibold" style={{ letterSpacing: "0.2em" }}>
              {t("heroEyebrow")}
            </p>

            <h1
              className="font-bold mb-5 text-foreground"
              style={{
                fontSize: "clamp(2.25rem, 7vw, 4.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {t("heroTitle")}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-foreground/85 mb-5 max-w-2xl mx-auto leading-snug">
              {t("heroTagline")}
            </p>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-5">
              {[t("heroBadgeWarranty"), t("heroBadgeInsured")].map((b, idx) => (
                <span key={b} className="inline-flex items-center gap-3">
                  {idx > 0 && <span aria-hidden className="text-accent/60 text-xs">•</span>}
                  <span className="px-2.5 py-1 rounded-full glass-effect border border-border/60 text-[11px] font-semibold text-foreground/85 tracking-wide">
                    {b}
                  </span>
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-accent/30 mb-8 shadow-[0_0_24px_hsla(22,55%,55%,0.18)]"
            >
              <FlaskConical className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-foreground">
                {t("heroBadgeSaved").replace("{count}", savedCount.toLocaleString())}
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto min-h-[44px] max-w-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full group glossy-btn text-accent-foreground border-0 whitespace-normal h-auto leading-tight text-center ring-1 ring-accent/15 hover:ring-accent/30 hover:scale-[1.02] transition-[transform,box-shadow,filter] duration-300"
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <a href="/pricing">
                  <Sparkles className="w-5 h-5 mr-2 shrink-0" />
                  {t("heroCtaPrimary")}
                  <ArrowRight className="w-5 h-5 ml-2 shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <ScrollCue targetId="about" />
      </section>


      {/* ABOUT / STORYTELLING */}
      <section id="about" className="py-20 md:py-32 section-x">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <Diamond className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h2 className="h2-fluid font-bold mb-4">{t("aboutTitle")}</h2>
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



      <section id="process" className="py-20 md:py-32 section-x">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="h2-fluid font-bold mb-4">{t("processTitle")}</h2>
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
                  className={`group relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    className={`md:flex ${i % 2 === 1 ? "md:justify-start" : "md:justify-end"}`}
                  >
                    <Card className="glass-effect p-6 rounded-2xl border-primary/20 max-w-md w-full transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-[0_0_40px_-8px_hsla(22,80%,55%,0.45)] group-hover:-translate-y-0.5">
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
                    className="absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 p-3 rounded-full bg-background border-4 border-primary/70 shadow-[0_0_20px_hsla(22,80%,55%,0.25)] transition-all duration-500 ease-out group-hover:border-accent group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_45px_hsla(22,90%,60%,0.75),0_0_90px_hsla(22,90%,60%,0.35)]"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                    <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 blur-2xl bg-accent/30 transition-opacity duration-700" />
                    <s.icon className="relative w-6 h-6 text-primary transition-colors duration-500 group-hover:text-accent" strokeWidth={1.75} />
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
                {t("productsRefEyebrow")}
              </p>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {t("productsRefCta")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("productsRefSub")}
              </p>
            </a>
            <a
              href="https://www.rocketcollect.net"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-2xl border border-accent/30 p-5 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group block"
            >
              <p className="text-xs uppercase tracking-widest text-accent mb-1">
                {t("certTrainingEyebrow")}
              </p>
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {t("certTrainingTitle")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("certTrainingSub")}
              </p>
            </a>
          </div>
        </div>
      </section>


      {/* TRUST */}
      <section id="trust" className="py-20 md:py-32 section-x">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <ShieldCheck className="w-14 h-14 mx-auto mb-6 text-primary" />
            <h2 className="h2-fluid font-bold mb-4">{t("trustTitle")}</h2>
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
      <section id="before-after" className="py-20 md:py-32 section-x overflow-hidden">
        <div className="container mx-auto max-w-3xl w-full">
          <div className="text-center mb-10">
            <h2 className="h2-fluid font-bold mb-4">{t("beforeAfterTitle")}</h2>
          </div>

          <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden">
            <BeforeAfterSlider
              before={lugiaAvant}
              after={lugiaApres}
              alt="Restauration Lugia Légende 113/106"
            />
          </div>


          <div className="mt-8 text-center px-4">
            <h3 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-2xl mx-auto">
              {t("lugiaCaseTitle")}
            </h3>
          </div>

          <div className="mt-8 mx-auto max-w-2xl px-4">
            <Card className="glass-effect p-6 sm:p-8 md:p-10 rounded-3xl border-primary/20">
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-5">
                {t("lugiaIntro")}
              </p>
              <ol className="space-y-4 mb-5 list-none">
                <li className="flex gap-3">
                  <span className="font-serif italic text-primary text-lg shrink-0">1.</span>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{t("lugiaStep1Label")}</span>{" "}
                    {t("lugiaStep1Desc")}
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-serif italic text-primary text-lg shrink-0">2.</span>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{t("lugiaStep2Label")}</span>{" "}
                    {t("lugiaStep2Desc")}
                  </p>
                </li>
              </ol>
              <p className="text-sm sm:text-base font-serif italic text-foreground/80 text-center pt-4 border-t border-primary/10">
                {t("lugiaSlideHint")}
              </p>
            </Card>
          </div>
        </div>
      </section>



      {/* FINAL CTA */}
      <section id="contact" className="py-20 md:py-32 section-x">
        <div className="container mx-auto max-w-3xl">
          <Card className="glass-effect p-6 sm:p-10 md:p-14 rounded-3xl border-primary/30 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="h2-fluid font-bold mb-4">{t("ctaTitle")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("ctaDesc")}</p>
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full glossy-btn text-accent-foreground border-0 whitespace-normal h-auto leading-tight text-center max-w-full"
            >
              <a href="/pricing">
                <Sparkles className="w-5 h-5 mr-2 shrink-0" />
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
