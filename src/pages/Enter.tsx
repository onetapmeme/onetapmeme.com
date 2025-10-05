import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/onetap_new_logo.png";
import { Shield, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Enter = () => {
  const navigate = useNavigate();
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{
    x: number;
    y: number;
    id: number;
  }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/explosion.wav");
    audioRef.current.preload = "auto";
  }, []);

  const handleAcceptPrivacy = () => {
    setShowPrivacy(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClicked || showPrivacy) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple effect
    setRipples(prev => [...prev, {
      x,
      y,
      id: rippleIdRef.current++
    }]);
    setIsClicked(true);

    // Play explosion sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }

    // Navigate after animation
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Privacy Notice Modal - Shows First */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/98 backdrop-blur-lg animate-fade-in">
          <Card className="max-w-2xl w-full p-6 md:p-8 border-2 border-primary/30 bg-gradient-card shadow-glow-primary animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Privacy & Disclaimer</h2>
            </div>
            
            <div className="space-y-4 text-sm text-muted-foreground mb-8 max-h-[50vh] md:max-h-[60vh] overflow-y-auto scrollbar-thin">
              <p className="text-foreground font-semibold text-base">
                ⚠️ IMPORTANT: Please read carefully
              </p>
              
              <div className="space-y-3 border-l-2 border-primary/50 pl-4">
                <p>
                  <strong className="text-foreground">Investment Risk:</strong> $ONETAP is a memecoin with NO intrinsic value. You may lose all invested capital.
                </p>
                
                <p>
                  <strong className="text-foreground">No Affiliation:</strong> This project is NOT affiliated with Valve Corporation, Counter-Strike, or related trademarks.
                </p>
                
                <p>
                  <strong className="text-foreground">Privacy:</strong> This website does NOT collect personal data or use tracking cookies.
                </p>
                
                <p>
                  <strong className="text-foreground">No Guarantees:</strong> The project provides NO financial advice. DYOR.
                </p>
                
                <p>
                  <strong className="text-foreground">Legal:</strong> By continuing, you confirm you are legally permitted to access cryptocurrency projects.
                </p>
              </div>
              
              <p className="text-xs text-muted-foreground/80 pt-4">
                For complete info, see our <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a>, <a href="/non-affiliation" className="text-primary hover:underline">Non-Affiliation</a>, and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
            
            <Button 
              onClick={handleAcceptPrivacy}
              className="w-full bg-gradient-accent hover:shadow-glow-primary transition-all text-base md:text-lg font-bold py-5 md:py-6"
            >
              I UNDERSTAND - ENTER SITE
            </Button>
          </Card>
        </div>
      )}

      {/* Main Tap to Enter Screen */}
      <div 
        onClick={handleClick} 
        className={`min-h-screen relative cursor-pointer group transition-all duration-700 ${
          isClicked ? "animate-explosive-flash" : ""
        } ${showPrivacy ? "pointer-events-none opacity-30 blur-sm scale-95" : ""}`}
      >
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(22, 163, 224, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22, 163, 224, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 border-t-4 border-l-4 border-primary/30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 border-b-4 border-r-4 border-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          {/* Logo with Glow Effect */}
          <div className="relative mb-8 md:mb-12 animate-scale-pulse">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <img 
              src={logoImage} 
              alt="OneTap Logo" 
              className="relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_60px_rgba(22,163,224,0.9)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Title with Glitch Effect */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-accent bg-clip-text text-transparent animate-text-glow relative">
              $ONETAP
              <div className="absolute inset-0 bg-gradient-accent bg-clip-text text-transparent opacity-50 blur-sm">
                $ONETAP
              </div>
            </h1>
            <p className="text-lg md:text-2xl font-bold text-foreground/90 tracking-widest">
              ONE SHOT, ONE OPPORTUNITY
            </p>
          </div>

          {/* Interactive Tap Zone */}
          <div className="relative group/tap">
            <div className="absolute inset-0 bg-gradient-accent blur-xl opacity-50 group-hover/tap:opacity-70 transition-opacity rounded-full"></div>
            <div className={`relative px-8 md:px-12 py-6 md:py-8 border-2 border-primary/50 rounded-xl backdrop-blur-sm bg-card/30 transition-all duration-300 group-hover/tap:border-primary group-hover/tap:shadow-glow-primary ${
              !showPrivacy ? 'animate-tap-pulse' : ''
            }`}>
              <div className="flex items-center gap-4">
                <Target className={`w-8 h-8 md:w-10 md:h-10 text-primary ${!showPrivacy ? 'animate-spin-slow' : ''}`} />
                <span className="text-2xl md:text-4xl font-black text-foreground tracking-wider">
                  TAP TO ENTER
                </span>
                <Zap className={`w-8 h-8 md:w-10 md:h-10 text-secondary ${!showPrivacy ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-12 max-w-2xl">
            {['Fair Launch', 'Locked Liquidity', 'Community Driven'].map((feature, i) => (
              <div 
                key={feature}
                className="px-4 md:px-6 py-2 md:py-3 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm animate-fade-in-up text-sm md:text-base"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="font-semibold text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Click Ripples */}
        {ripples.map(ripple => (
          <div 
            key={ripple.id}
            className="absolute pointer-events-none z-50"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="w-4 h-4 bg-secondary rounded-full animate-[ping_0.8s_ease-out] opacity-90"></div>
            <div className="w-8 h-8 bg-primary rounded-full animate-[ping_1s_ease-out] opacity-75 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"></div>
            <div className="w-12 h-12 bg-primary/50 rounded-full animate-[ping_1.2s_ease-out] opacity-50 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 text-center z-10">
          <p className="text-xs md:text-sm text-muted-foreground/60 font-mono animate-pulse px-4">
            🎮 Sound On for Best Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enter;
