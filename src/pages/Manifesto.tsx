import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Crosshair, Target, Shield, Users, Trophy } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Manifesto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSigned(true);
      toast.success("Welcome to the OneTapper army! 🎯");
      setEmail("");
    }
  };

  const principles = [
    {
      number: "I",
      icon: Users,
      title: t('manifesto.principle1.title'),
      description: t('manifesto.principle1.description'),
      color: "from-primary/20 to-primary/5"
    },
    {
      number: "II",
      icon: Shield,
      title: t('manifesto.principle2.title'),
      description: t('manifesto.principle2.description'),
      color: "from-accent/20 to-accent/5"
    },
    {
      number: "III",
      icon: Target,
      title: t('manifesto.principle3.title'),
      description: t('manifesto.principle3.description'),
      color: "from-primary/20 to-primary/5"
    },
    {
      number: "IV",
      icon: Trophy,
      title: t('manifesto.principle4.title'),
      description: t('manifesto.principle4.description'),
      color: "from-accent/20 to-accent/5"
    },
    {
      number: "V",
      icon: Crosshair,
      title: t('manifesto.principle5.title'),
      description: t('manifesto.principle5.description'),
      color: "from-primary/20 to-primary/5"
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* CS:GO Vintage Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,224,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,0,0.08),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" 
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
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('manifesto.backHome')}
          </Button>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Vintage Header with CS:GO Style */}
          <motion.div 
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative crosshair elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 opacity-10">
              <Crosshair className="w-full h-full text-primary animate-spin-slow" />
            </div>
            
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-3xl" />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-4 relative"
                style={{
                  background: 'linear-gradient(135deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(22,163,224,0.3)',
                  animation: 'gradient-flow 5s linear infinite',
                  letterSpacing: '0.05em'
                }}
              >
                {t('manifesto.title')}
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Target className="w-8 h-8 text-accent animate-pulse" />
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
            
            <p className="text-xl md:text-2xl text-primary font-rajdhani font-semibold uppercase tracking-wider">
              {t('manifesto.subtitle')}
            </p>
          </motion.div>

          {/* Mission Statement - Vintage Military Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-2 border-primary/30 relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/40" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/40" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative z-10">
                <div className="inline-block px-4 py-2 mb-6 border border-primary/30 rounded bg-primary/10 backdrop-blur-sm">
                  <span className="font-orbitron text-xs uppercase tracking-widest text-primary font-bold">
                    Mission Statement
                  </span>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-foreground font-rajdhani tracking-wide">
                  {t('manifesto.preamble')}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Core Principles - CS:GO Tactical Style */}
          <div className="space-y-6 mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-10 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              CORE PRINCIPLES
            </motion.h2>
            
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card 
                  className={`p-6 md:p-8 bg-gradient-to-br ${principle.color} backdrop-blur-xl border-2 border-primary/20 hover:border-accent/40 transition-all duration-500 relative overflow-hidden group`}
                >
                  {/* Tactical stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary" />
                  
                  {/* Background number */}
                  <div className="absolute -right-8 -top-8 text-[180px] font-orbitron font-black text-primary/5 group-hover:text-primary/10 transition-all duration-500 select-none">
                    {principle.number}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 md:gap-6 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <principle.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="inline-block px-3 py-1 mb-3 border border-primary/30 rounded bg-primary/10 backdrop-blur-sm">
                          <span className="font-orbitron text-xs uppercase tracking-widest text-primary font-bold">
                            Article {principle.number}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {principle.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-rajdhani">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sign the Manifesto - Military Recruitment Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/20 via-card/80 to-accent/20 backdrop-blur-xl border-2 border-primary/40 relative overflow-hidden">
              {/* Animated scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
                  animation: 'shimmer 3s linear infinite'
                }}
              />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Crosshair className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                  <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground mb-3">
                    {t('manifesto.signTitle')}
                  </h3>
                  <p className="text-muted-foreground font-rajdhani text-lg">
                    Become an official OneTapper. Join the revolution.
                  </p>
                </div>
                
                {!signed ? (
                  <form onSubmit={handleSign} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder={t('manifesto.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-background/50 border-primary/30 focus:border-primary font-rajdhani text-lg backdrop-blur-sm"
                      />
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="font-orbitron font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black shadow-[0_0_30px_rgba(22,163,224,0.5)] hover:shadow-[0_0_50px_rgba(22,163,224,0.8)] transition-all duration-300"
                      >
                        <Target className="mr-2 w-5 h-5" />
                        {t('manifesto.signButton')}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-6 font-rajdhani">
                      {t('manifesto.footerNote')}
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-6 animate-fade-in">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
                    </motion.div>
                    <div>
                      <p className="text-2xl md:text-3xl font-orbitron font-bold text-green-500 mb-2">
                        {t('manifesto.thankYou')}
                      </p>
                      <p className="text-lg text-muted-foreground font-rajdhani">
                        {t('manifesto.welcomeMessage')}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm">
                      <Trophy className="w-6 h-6 text-green-500" />
                      <span className="font-orbitron font-bold text-green-500">
                        RANK: ONETAPPER
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Tactical Footer */}
          <motion.div 
            className="text-center mt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <Crosshair className="w-6 h-6 text-primary/50" />
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
            <p className="text-sm text-muted-foreground font-rajdhani">
              Est. 2025 • OneTap Army • For Gamers, By Gamers
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Manifesto;
