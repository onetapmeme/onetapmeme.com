import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "@/assets/onetap_new_logo.png";
import tap2enterDesktop from "@/assets/tap2enter-desktop.png";
import tap2enterMobile from "@/assets/tap2enter-mobile-new.png";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PreLaunchBanner from "@/components/PreLaunchBanner";
const Enter = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/explosion.wav");
    audioRef.current.preload = "auto";
  }, []);
  const handleAcceptPrivacy = () => {
    setShowPrivacy(false);
  };
  const handleClick = (e: React.MouseEvent) => {
    if (isClicked || showPrivacy) return;
    
    // Check if the click is on the language switcher
    const target = e.target as HTMLElement;
    if (target.closest('button[class*="language"]') || target.closest('.language-switcher')) {
      return;
    }
    
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
  return <div className="min-h-screen bg-background relative overflow-hidden">
      <PreLaunchBanner />
      <div className="language-switcher">
        <LanguageSwitcher />
      </div>
      
      {/* Privacy Notice Modal - Simplified */}
      {showPrivacy && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/98 backdrop-blur-lg animate-fade-in">
          <Card className="max-w-lg w-full p-6 md:p-8 border-2 border-primary/30 bg-gradient-card shadow-glow-primary animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{t('enter.privacy')}</h2>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground mb-6">
              <p className="text-foreground leading-relaxed">
                {t('enter.simplifiedNotice1') || '$ONETAP is a meme token with no intrinsic value or expectation of financial return.'}
              </p>
              <p className="text-foreground leading-relaxed">
                {t('enter.simplifiedNotice2') || 'Cryptocurrency investments carry high risk. Only invest what you can afford to lose.'}
              </p>
              <p className="text-foreground leading-relaxed">
                {t('enter.simplifiedNotice3') || 'By continuing, you confirm you understand these risks and accept our terms.'}
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button onClick={handleAcceptPrivacy} className="w-full bg-gradient-accent hover:shadow-glow-primary transition-all text-base font-bold py-5">
                {t('enter.understand')}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/disclaimer'}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {t('enter.readFullDisclaimer') || 'Read Full Disclaimer →'}
              </Button>
            </div>
          </Card>
        </div>}

      {/* Main Enter Screen - Clickable everywhere */}
      <div 
        onClick={handleClick}
        className={`min-h-screen relative transition-all duration-700 cursor-pointer ${isClicked ? "animate-explosive-flash" : ""} ${showPrivacy ? "pointer-events-none opacity-30 blur-sm scale-95" : ""}`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {/* Desktop background - format large */}
          <img 
            src={tap2enterDesktop} 
            alt="Tap2Enter Background" 
            className="hidden lg:block w-full h-full object-cover object-center opacity-50" 
          />
          {/* Tablet/Mobile background - format réduit */}
          <img 
            src={tap2enterMobile} 
            alt="Tap2Enter Background" 
            className="lg:hidden w-full h-full object-cover object-center opacity-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/65 to-background/90"></div>
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 border-t-4 border-l-4 border-primary/30 animate-pulse z-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 border-b-4 border-r-4 border-primary/30 animate-pulse z-10" style={{
        animationDelay: '0.5s'
      }}></div>

        {/* Central Content - Logo & Title */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
          {/* Logo with Glow Effect */}
          <div className="relative mb-6 animate-scale-pulse">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <img src={logoImage} alt="OneTap Logo" className="relative w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_40px_rgba(22,163,224,0.8)]" />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(22,163,224,0.6)]">
              {t('enter.title')}
            </h1>
            <p className="text-sm md:text-lg font-bold text-foreground/90 tracking-wider">
              {t('enter.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Tap to Enter Button - Fixed at Bottom */}
        <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center px-4">
          <Button 
            disabled={showPrivacy} 
            size="lg" 
            className="text-xl md:text-2xl bg-gradient-accent hover:shadow-glow-primary transition-all hover:scale-105 animate-pulse py-6 px-12 rounded-full font-bold"
          >
            TAP TO ENTER
          </Button>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(15)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-20" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }} />)}
        </div>

      </div>
    </div>;
};
export default Enter;