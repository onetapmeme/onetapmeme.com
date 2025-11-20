import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Crosshair, Gamepad2, Gem, Eye, Image as ImageIcon, Shield, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
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
      toast.success("📧 Vérifiez votre email pour confirmer votre signature!");
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
      title: "We Are Gamers First",
      description: "This isn't about getting rich quick. It's about building something real for the community we love. Finance bros, turn back now.",
    },
    {
      number: "II",
      icon: Shield,
      title: "No Whales, Only 1Tappers",
      description: "We reject pump-and-dump schemes. We reject manipulation. Everyone here has an equal shot at success.",
    },
    {
      number: "III",
      icon: Gem,
      title: "HODL Like a Pro Player",
      description: "Great plays require patience. Diamond hands beat paper every time. Trust the process.",
    },
    {
      number: "IV",
      icon: ImageIcon,
      title: "Memes Are Our Language",
      description: "We don't take ourselves too seriously, but we take our community seriously. Culture first, profits second.",
    },
    {
      number: "V",
      icon: Eye,
      title: "Transparency > Hype",
      description: "No hidden agendas. No secret allocations. What you see is what you get. Always.",
    },
  ], []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Premium Particle Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
              y: [0, -25, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
            className="mb-8 glass-effect hover:bg-primary/10 font-rajdhani border-primary/20 hover:border-primary/40 transition-all duration-300"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
        </motion.div>
      </div>

      {/* HERO SECTION - Mission Statement */}
      <SectionWrapper variant="primary">
        <motion.section
          className="min-h-[70vh] flex flex-col items-center justify-center text-center relative py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Giant Crosshair Animation */}
          <motion.div
            className="absolute w-32 h-32 md:w-48 md:h-48 opacity-5"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 2, ease: "easeOut" }}
            aria-hidden="true"
          >
            <Crosshair className="w-full h-full text-primary" />
          </motion.div>

          <div className="relative z-10 space-y-6 md:space-y-10 max-w-5xl mx-auto px-4">
            {/* Sequential text reveals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-2xl text-muted-foreground font-rajdhani">
                We, the <span className="text-primary font-semibold">1Tappers</span>,
              </p>
              <p className="text-xl md:text-3xl text-foreground font-rajdhani max-w-3xl mx-auto leading-relaxed">
                united by our love of gaming and distrust of traditional finance...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 my-10" aria-hidden="true">
                <div className="h-px w-20 md:w-32 bg-gradient-accent" />
                <Crosshair className="w-8 h-8 text-accent animate-pulse" />
                <div className="h-px w-20 md:w-32 bg-gradient-accent" />
              </div>
              <p className="text-2xl md:text-4xl text-foreground font-orbitron mb-6 font-semibold">
                ...declare these truths to be self-evident:
              </p>
            </motion.div>

            {/* EPIC REVEAL - Main tagline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold uppercase leading-tight px-4"
              style={{
                background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 20%, hsl(210, 100%, 55%) 40%, hsl(25, 100%, 55%) 60%, hsl(210, 100%, 55%) 80%, hsl(25, 100%, 55%) 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(22,163,224,0.6))',
                animation: 'gradient-flow 8s linear infinite',
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
      </SectionWrapper>

      {/* CORE PRINCIPLES SECTION */}
      <SectionWrapper variant="accent" blendFrom="primary">
        <section className="space-y-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase tracking-wider">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Core Principles
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4" aria-hidden="true">
              <div className="h-px w-24 bg-gradient-accent" />
              <Crosshair className="w-8 h-8 text-accent animate-pulse" />
              <div className="h-px w-24 bg-gradient-accent" />
            </div>
          </motion.div>

          {/* Article Cards Grid */}
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {principles.map((principle, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="glass-effect rounded-2xl p-8 md:p-10 overflow-hidden hover:bg-primary/5 transition-all duration-500 premium-border">
                    {/* Watermark number */}
                    <div className="absolute top-4 right-4 text-8xl md:text-9xl font-orbitron font-bold text-primary/5 pointer-events-none select-none" aria-hidden="true">
                      {principle.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon */}
                      <div className="flex items-center justify-center">
                        <principle.icon 
                          className="w-16 h-16 md:w-20 md:h-20 text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                          style={{ filter: 'drop-shadow(0 0 20px rgba(22,163,224,0.6))' }}
                        />
                      </div>

                      {/* Article number */}
                      <div className="text-center">
                        <span className="text-3xl md:text-4xl font-orbitron font-bold uppercase tracking-wider bg-gradient-accent bg-clip-text text-transparent">
                          Article {principle.number}
                        </span>
                      </div>

                      {/* Separator */}
                      <div className="flex items-center justify-center gap-3" aria-hidden="true">
                        <div className="h-px w-16 bg-gradient-accent" />
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <div className="h-px w-16 bg-gradient-accent" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-center text-foreground leading-tight">
                        {principle.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base md:text-lg text-muted-foreground font-rajdhani leading-relaxed text-center">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* CTA SECTION - Join the Army */}
      <SectionWrapper variant="primary" blendFrom="accent">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Epic Title */}
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl md:text-6xl font-orbitron font-bold uppercase">
                  <motion.span 
                    className="inline-block"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 25%, hsl(210, 100%, 55%) 50%, hsl(25, 100%, 55%) 75%, hsl(210, 100%, 55%) 100%)',
                      backgroundSize: '300% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 30px rgba(22,163,224,0.5))',
                      animation: 'gradient-flow 5s linear infinite',
                    }}
                  >
                    ⚡ JOIN THE 1TAP ARMY ⚡
                  </motion.span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
                  By signing, you're joining a community that values <span className="text-primary font-semibold">transparency</span>, <span className="text-accent font-semibold">gaming culture</span>, and <span className="text-primary font-semibold">fair play</span> above all else.
                </p>
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
                  className="space-y-8"
                >
                  <form onSubmit={handleSign} className="space-y-6">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-16 text-lg glass-effect border-2 border-primary/20 focus:border-primary transition-all font-rajdhani placeholder:text-muted-foreground/50"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-16 text-xl font-orbitron font-bold uppercase transition-all duration-500 group rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(210, 100%, 60%), hsl(210, 100%, 50%))',
                        boxShadow: '0 0 40px hsla(210, 100%, 55%, 0.5)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 70px hsla(210, 100%, 55%, 0.7)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px hsla(210, 100%, 55%, 0.5)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      aria-label="Sign the 1Tap manifesto"
                    >
                      <Zap className="w-6 h-6 mr-2" aria-hidden="true" />
                      Sign the Manifesto
                      <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                  
                  <p className="text-sm text-muted-foreground text-center font-rajdhani leading-relaxed">
                    By signing, you agree to uphold the 1Tap principles and become part of the gaming-crypto revolution. We'll send you a confirmation email to verify your signature.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-8 py-8"
                >
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle2 className="w-24 h-24 text-primary" style={{ filter: 'drop-shadow(0 0 30px rgba(22,163,224,0.7))' }} aria-hidden="true" />
                    </motion.div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-accent bg-clip-text text-transparent">
                      Welcome to the Army! 🎯
                    </h3>
                    <div className="space-y-3">
                      <p className="text-xl text-foreground font-rajdhani font-semibold">
                        📧 Check Your Email
                      </p>
                      <p className="text-lg text-muted-foreground font-rajdhani max-w-md mx-auto">
                        We've sent you a confirmation link. Click it to verify your signature and officially join the ranks.
                      </p>
                    </div>
                    <div className="mt-6 glass-effect rounded-xl px-6 py-4 border border-primary/20 max-w-md mx-auto">
                      <p className="text-sm text-muted-foreground font-rajdhani">
                        💡 Don't forget to check your spam folder if you don't see the email
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Manifesto;
