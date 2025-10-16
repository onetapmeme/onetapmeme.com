import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/onetap_new_logo.png';

interface DialogBubble {
  text: string;
  section: string;
}

const BenCharacter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const [showDialog, setShowDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dialogs: Record<string, string> = {
    hero: "Welcome, soldier! Ready to tap your way to glory? 🎯",
    about: "Let me tell you about this legendary project... 🔥",
    tokenomics: "Here's where the magic happens - Equilibrated Launch! 💎",
    roadmap: "The journey ahead is epic! Let's conquer it together! 🚀",
    community: "Join our army of tappers! Together we're unstoppable! 🎮",
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'tokenomics', 'roadmap', 'community'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (section !== currentSection) {
              setCurrentSection(section);
              setShowDialog(true);
              setTimeout(() => setShowDialog(false), 5000);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  useEffect(() => {
    // Show initial dialog
    setTimeout(() => {
      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 5000);
    }, 2000);
  }, []);

  if (!isVisible || (isMobile && localStorage.getItem('benDisabled') === 'true')) {
    return null;
  }

  const toggleBen = () => {
    setIsVisible(false);
    if (isMobile) {
      localStorage.setItem('benDisabled', 'true');
    }
  };

  const benPosition = {
    hero: { bottom: '20%', right: '10%' },
    about: { bottom: '30%', right: '15%' },
    tokenomics: { bottom: '25%', right: '12%' },
    roadmap: { bottom: '35%', right: '8%' },
    community: { bottom: '20%', right: '10%' },
  };

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        ...benPosition[currentSection as keyof typeof benPosition],
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Ben Character - extracted from logo */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src={logo}
          alt="Ben"
          className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_20px_rgba(22,163,224,0.6)]"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Dialog Bubble */}
        <AnimatePresence>
          {showDialog && (
            <motion.div
              className="absolute bottom-full right-0 mb-4 pointer-events-auto"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card/95 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-4 shadow-xl max-w-xs relative">
                <div className="text-sm md:text-base text-foreground font-medium">
                  {dialogs[currentSection]}
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary/40"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Disable Button (Mobile) */}
      {isMobile && (
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleBen}
          className="absolute -top-8 -right-8 pointer-events-auto bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </motion.div>
  );
};

export default BenCharacter;
