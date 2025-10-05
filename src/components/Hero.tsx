import { Button } from "@/components/ui/button";
import { Crosshair, Zap, TrendingUp } from "lucide-react";
import logo from "@/assets/onetap_logo.png";
import heroBg from "@/assets/hero-bg.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
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
        <div className="animate-pixel-fade">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="OneTap Logo" 
              className="w-48 h-48 md:w-64 md:h-64 animate-float drop-shadow-[0_0_40px_rgba(22,163,224,0.8)]"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(22,163,224,0.5)]">
            $ONETAP
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4 font-bold tracking-wide">
            ONE SHOT, ONE OPPORTUNITY
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The ultimate CS-inspired memecoin. Fair launch, locked liquidity, 100% community-driven.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              <Zap className="w-5 h-5" />
              Buy $ONETAP
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/meme")}>
              <TrendingUp className="w-5 h-5" />
              Meme Generator
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Crosshair, label: "Market Cap", value: "TBA" },
              { icon: Zap, label: "Holders", value: "Growing" },
              { icon: TrendingUp, label: "Liquidity", value: "Locked" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border-2 border-primary/30 rounded-lg p-6 backdrop-blur-sm hover:border-primary hover:shadow-glow-primary transition-all duration-300 animate-pixel-fade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
