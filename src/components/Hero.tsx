import { Button } from "@/components/ui/button";
import { Crosshair, Zap, TrendingUp, Volume2 } from "lucide-react";
import logo from "@/assets/onetap_new_logo.png";
import heroBg from "@/assets/hero-bg.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AudioControls from "@/components/AudioControls";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      {/* Pixel Particles Animation */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Audio Controls - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <AudioControls />
        </div>

        <div className="animate-pixel-fade">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <img 
              src={logo} 
              alt="OneTap Logo" 
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 animate-float drop-shadow-[0_0_35px_rgba(22,163,224,0.7)]"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-accent bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(22,163,224,0.5)] px-4">
            {t('hero.title')}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground mb-3 md:mb-4 font-bold tracking-wide px-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-10 md:mb-16 px-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto text-base md:text-lg">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              {t('hero.cta')}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base md:text-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              {t('tokenomics.chart')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
            {[
              { icon: Crosshair, label: "Market Cap", value: "TBA" },
              { icon: Zap, label: "Holders", value: "Growing" },
              { icon: TrendingUp, label: "Liquidity", value: "Locked" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border-2 border-primary/30 rounded-lg p-4 md:p-6 backdrop-blur-sm hover:border-primary hover:shadow-glow-primary transition-all duration-300 animate-pixel-fade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
                <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
