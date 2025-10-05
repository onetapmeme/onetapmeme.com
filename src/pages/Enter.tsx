import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tap2enterImage from "@/assets/tap2enter.png";
import { Shield } from "lucide-react";
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
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Privacy Notice Modal - Shows First */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-2xl w-full p-8 border-2 border-primary/30 bg-gradient-card shadow-glow-primary animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-2xl font-bold text-foreground">Privacy & Disclaimer Notice</h2>
            </div>
            
            <div className="space-y-4 text-sm text-muted-foreground mb-8 max-h-[60vh] overflow-y-auto">
              <p className="text-foreground font-semibold">
                ⚠️ IMPORTANT: Please read carefully before accessing $ONETAP
              </p>
              
              <div className="space-y-3 border-l-2 border-primary/50 pl-4">
                <p>
                  <strong className="text-foreground">Investment Risk:</strong> $ONETAP is a memecoin with NO intrinsic value. Cryptocurrency investments are highly volatile and speculative. You may lose all invested capital.
                </p>
                
                <p>
                  <strong className="text-foreground">No Affiliation:</strong> This project is NOT affiliated with, endorsed by, or connected to Valve Corporation, Counter-Strike, CS:GO, or any related trademarks. All references are purely thematic.
                </p>
                
                <p>
                  <strong className="text-foreground">Privacy:</strong> This website does NOT collect personal data, use tracking cookies, or store any user information. No analytics or third-party trackers are active.
                </p>
                
                <p>
                  <strong className="text-foreground">No Guarantees:</strong> The project provides NO financial advice, investment recommendations, or profit guarantees. DYOR (Do Your Own Research).
                </p>
                
                <p>
                  <strong className="text-foreground">Legal Compliance:</strong> By continuing, you confirm you are legally permitted to access cryptocurrency projects in your jurisdiction.
                </p>
              </div>
              
              <p className="text-xs text-muted-foreground/80 pt-4">
                For complete legal information, see our <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a>, <a href="/non-affiliation" className="text-primary hover:underline">Non-Affiliation Notice</a>, and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
            
            <Button 
              onClick={handleAcceptPrivacy}
              className="w-full bg-gradient-accent hover:shadow-glow-primary transition-all text-lg font-bold py-6"
            >
              I UNDERSTAND - ENTER SITE
            </Button>
          </Card>
        </div>
      )}

      {/* Main Tap to Enter Screen */}
      <div 
        onClick={handleClick} 
        className={`min-h-screen relative cursor-pointer group transition-all duration-1000 ${
          isClicked ? "animate-pulse-glow" : ""
        } ${showPrivacy ? "pointer-events-none opacity-30 blur-sm" : ""}`}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${tap2enterImage})`,
            filter: isClicked ? "brightness(1.5) contrast(1.2)" : "brightness(1)",
            transform: isClicked ? "scale(1.1)" : "scale(1)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40"></div>
        </div>

        {/* Click Ripples */}
        {ripples.map(ripple => (
          <div 
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="w-4 h-4 bg-secondary rounded-full animate-[ping_1s_ease-out] opacity-75"></div>
            <div className="w-8 h-8 bg-primary rounded-full animate-[ping_1.5s_ease-out] opacity-50 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"></div>
          </div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-muted-foreground/60 font-mono animate-pulse">
            🎮 Sound On for Best Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enter;
