import { useState, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Crosshair, Gamepad2, Gem, Eye, Image, Shield } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useManifestoSignatures } from "@/hooks/useManifestoSignatures";
import { LiveSignatureCounter } from "@/components/manifesto/LiveSignatureCounter";
import { z } from "zod";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const manifestoSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
});

const Manifesto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const { count, loading, signManifesto } = useManifestoSignatures();

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}`;
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    // Set SEO meta tags
    document.title = "1Tap Manifesto - Join the Gaming Revolution";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Join the 1Tap army. We believe in life, liberty, and the pursuit of headshots. Sign our manifesto and be part of the gaming-crypto revolution.");
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email with zod schema
    const validation = manifestoSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const validatedEmail = validation.data.email;

    try {
      if (!recaptchaLoaded || !window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }

      // Get reCAPTCHA token
      const recaptchaToken = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        { action: 'manifesto_sign' }
      );

      await signManifesto(validatedEmail, recaptchaToken);
      setSigned(true);
      toast.success("Welcome to the 1Tapper army! 🎯");
      setEmail("");
    } catch (error: any) {
      if (error.message === 'already_signed') {
        toast.info("You've already signed the manifesto! 🎯");
      } else if (error.message === 'Rate limit exceeded. Please try again later.') {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.message === 'CAPTCHA verification failed') {
        toast.error("Security verification failed. Please try again.");
      } else {
        toast.error("Failed to sign. Please try again.");
      }
    }
  };

  const principles = useMemo(() => [
    {
      number: "I",
      icon: Gamepad2,
      title: t('manifesto.principle1.title'),
      description: t('manifesto.principle1.description'),
    },
    {
      number: "II",
      icon: Shield,
      title: t('manifesto.principle2.title'),
      description: t('manifesto.principle2.description'),
    },
    {
      number: "III",
      icon: Gem,
      title: t('manifesto.principle3.title'),
      description: t('manifesto.principle3.description'),
    },
    {
      number: "IV",
      icon: Image,
      title: t('manifesto.principle4.title'),
      description: t('manifesto.principle4.description'),
    },
    {
      number: "V",
      icon: Eye,
      title: t('manifesto.principle5.title'),
      description: t('manifesto.principle5.description'),
    },
  ], [t]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Gaming Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,224,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,0,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
            backgroundSize: '100% 4px'
          }} 
        />
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
            className="mb-8 border-primary/30 hover:border-primary/60 backdrop-blur-sm font-rajdhani"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('manifesto.backHome')}
          </Button>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-20">
          {/* TRANSFORMATION 1: CINEMATIC OPENING - Mission Statement */}
          <motion.section
            className="min-h-[60vh] flex flex-col items-center justify-center text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Giant Crosshair Animation */}
            <motion.div
              className="absolute w-32 h-32 md:w-48 md:h-48 opacity-10 mb-12"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
              aria-hidden="true"
            >
              <Crosshair className="w-full h-full text-primary" />
            </motion.div>

            <div className="relative z-10 space-y-6 md:space-y-8">
              {/* Sequential text reveals */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground font-rajdhani"
              >
                We, the 1Tappers,
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-2xl md:text-3xl text-foreground font-rajdhani max-w-3xl mx-auto"
              >
                united by our love of gaming and distrust of traditional finance...
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
                  <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <Crosshair className="w-6 h-6 text-accent" />
                  <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
                <p className="text-3xl md:text-4xl text-foreground font-orbitron mb-4">
                  ...declare these truths to be self-evident:
                </p>
              </motion.div>

              {/* EPIC REVEAL - Main tagline */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold uppercase leading-tight"
                style={{
                  background: 'linear-gradient(135deg, hsl(197, 79%, 48%) 0%, hsl(25, 100%, 55%) 50%, hsl(197, 79%, 48%) 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(22,163,224,0.5))',
                  animation: 'gradient-flow 5s linear infinite',
                }}
              >
                LIFE. LIBERTY.
                <br />
                AND THE PURSUIT
                <br />
                OF HEADSHOTS.
              </motion.h1>
            </div>
          </motion.section>

          {/* TRANSFORMATION 2: GAMING STELES - Core Principles */}
          <section className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-primary uppercase tracking-wider">
                Core Principles
              </h2>
              <div className="flex items-center justify-center gap-4" aria-hidden="true">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <Crosshair className="w-6 h-6 text-accent animate-pulse" />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
              </div>
            </motion.div>

            {/* Article Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="relative bg-gradient-to-br from-background via-background/95 to-primary/5 border-2 border-primary/20 rounded-xl p-8 md:p-10 overflow-hidden hover:border-primary/60 transition-all duration-500">
                    {/* Background texture & glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div 
                      className="absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                      }}
                    />

                    {/* Watermark number */}
                    <div className="absolute top-4 right-4 text-8xl md:text-9xl font-orbitron font-bold text-primary/5 pointer-events-none select-none" aria-hidden="true">
                      {principle.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon */}
                      <div className="flex items-center justify-center">
                        <principle.icon 
                          className="w-16 h-16 text-primary transition-transform duration-300 group-hover:scale-110"
                          style={{ filter: 'drop-shadow(0 0 15px rgba(22,163,224,0.5))' }}
                        />
                      </div>

                      {/* Article number */}
                      <div className="text-center">
                        <span className="text-4xl font-orbitron font-bold text-primary uppercase tracking-wider">
                          Article {principle.number}
                        </span>
                      </div>

                      {/* Separator */}
                      <div className="flex items-center justify-center gap-2" aria-hidden="true">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        {principle.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-muted-foreground font-rajdhani leading-relaxed text-center">
                        {principle.description}
                      </p>
                    </div>

                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40" aria-hidden="true" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40" aria-hidden="true" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40" aria-hidden="true" />
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* TRANSFORMATION 3: ARMY RECRUITMENT - CTA with Live Counter */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-16"
          >
            <div className="max-w-2xl mx-auto space-y-10">
              {/* Epic Title */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
                  <span 
                    className="inline-block animate-pulse"
                    style={{
                      background: 'linear-gradient(90deg, hsl(197, 79%, 48%), hsl(25, 100%, 55%), hsl(197, 79%, 48%))',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(22,163,224,0.4))',
                      animation: 'gradient-flow 3s linear infinite',
                    }}
                  >
                    ⚡ JOIN THE 1TAP ARMY ⚡
                  </span>
                </h2>
              </motion.div>

              {/* Live Signature Counter */}
              <div className="flex justify-center">
                <LiveSignatureCounter count={count} loading={loading} />
              </div>

              {/* Sign Form or Success Message */}
              {!signed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <form onSubmit={handleSign} className="space-y-6">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder={t('manifesto.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-primary/30 bg-background/50 backdrop-blur-sm focus:border-primary transition-all font-rajdhani"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-orbitron font-bold uppercase bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 relative group overflow-hidden"
                      style={{
                        boxShadow: '0 0 30px rgba(22,163,224,0.4)',
                      }}
                      aria-label="Sign the 1Tap manifesto"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Crosshair className="w-5 h-5" aria-hidden="true" />
                        {t('manifesto.signButton')}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>

                    <p className="text-sm text-muted-foreground text-center font-rajdhani leading-relaxed">
                      {t('manifesto.footerNote')}
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-primary" style={{ filter: 'drop-shadow(0 0 20px rgba(22,163,224,0.6))' }} aria-hidden="true" />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-orbitron font-bold text-primary">
                      {t('manifesto.thankYou')}
                    </h3>
                    <p className="text-lg text-muted-foreground font-rajdhani">
                      {t('manifesto.welcomeMessage')}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Manifesto;
