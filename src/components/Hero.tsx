import { Button } from "@/components/ui/button";
import { Crosshair, Zap, TrendingUp } from "lucide-react";
import logo from "@/assets/onetap_new_logo.png";
import heroBg from "@/assets/hero-bg.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AudioControls from "@/components/AudioControls";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: parallaxOffset,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/20"></div>
      </motion.div>

      {/* Blue halo at bottom for smooth transition to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-[800px] pointer-events-none overflow-hidden z-[1]">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1800px] h-[900px] bg-primary/35 rounded-full blur-[200px] opacity-80" />
        <div className="absolute -bottom-32 left-1/3 w-[1400px] h-[800px] bg-primary/30 rounded-full blur-[180px] opacity-75" />
        <div className="absolute -bottom-36 right-1/3 w-[1500px] h-[850px] bg-primary/32 rounded-full blur-[190px] opacity-78" />
        <div className="absolute -bottom-20 left-1/4 w-[1200px] h-[700px] bg-primary/25 rounded-full blur-[160px] opacity-70" />
        <div className="absolute -bottom-28 right-1/4 w-[1300px] h-[750px] bg-primary/28 rounded-full blur-[170px] opacity-72" />
      </div>

      {/* Premium Particle Effects */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Audio Controls */}
        <div className="absolute top-4 right-4 z-20">
          <AudioControls />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo - Cinematic Entrance */}
          <motion.div 
            className="flex justify-center mb-8 md:mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={logo} 
              alt="OneTap Logo" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64"
              animate={{
                y: [0, -15, 0],
                filter: [
                  'drop-shadow(0 0 40px rgba(22,163,224,0.5))',
                  'drop-shadow(0 0 80px rgba(22,163,224,0.8))',
                  'drop-shadow(0 0 40px rgba(22,163,224,0.5))',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Title - Apple-style Typography */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 16.66%, hsl(210, 100%, 55%) 33.33%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 66.66%, hsl(25, 100%, 55%) 83.33%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 10s linear infinite',
            }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6 font-semibold tracking-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            No recoil. Just gains.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 md:mb-14 max-w-3xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons - Premium Style */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16 md:mb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-full transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(210, 100%, 60%), hsl(210, 100%, 50%))',
                boxShadow: '0 0 40px hsla(210, 100%, 55%, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 70px hsla(210, 100%, 55%, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px hsla(210, 100%, 55%, 0.4)';
              }}
            >
              <Zap className="w-5 h-5 md:w-6 md:h-6" />
              {t('hero.cta')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-full glass-effect hover:bg-primary/10 transition-all duration-500"
            >
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
              {t('tokenomics.chart')}
            </Button>
          </motion.div>

          {/* Stats - Premium Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { icon: Crosshair, label: "Market Cap", value: "TBA" },
              { icon: Zap, label: "Holders", value: "Growing" },
              { icon: TrendingUp, label: "Liquidity", value: "Locked" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="glass-effect rounded-2xl p-6 md:p-8 hover:bg-primary/5 transition-all duration-500 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm md:text-base text-muted-foreground mb-2 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Apple-style Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
