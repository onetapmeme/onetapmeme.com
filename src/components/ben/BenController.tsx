import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Volume2, VolumeX, X, Languages, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import logo from '@/assets/onetap_new_logo.png';
import { getBenDialogue } from './BenDialogues';
import { useTranslation } from 'react-i18next';

interface BenPosition {
  bottom: string;
  right: string;
  left?: string;
}

const sectionPositions: Record<string, BenPosition> = {
  hero: { bottom: '20%', right: '10%' },
  about: { bottom: '30%', right: '15%' },
  tokenomics: { bottom: '25%', right: '12%' },
  'live-stats': { bottom: '28%', right: '10%' },
  roadmap: { bottom: '35%', right: '8%' },
  rewards: { bottom: '25%', right: '13%' },
  community: { bottom: '20%', right: '10%' },
  memes: { bottom: '30%', right: '15%' },
  'tap-to-earn': { bottom: '25%', right: '10%' },
};

const BenController = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [showDialog, setShowDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasSpawned, setHasSpawned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const dialogTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if Ben is disabled
  useEffect(() => {
    const benDisabled = localStorage.getItem('benDisabled');
    if (benDisabled === 'true') {
      setIsVisible(false);
      return;
    }

    // Spawn animation
    const spawnTimer = setTimeout(() => {
      setIsVisible(true);
      setHasSpawned(true);
      showDialogForSection('spawn');
    }, 1500);

    return () => clearTimeout(spawnTimer);
  }, []);

  // Scroll tracking
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'live-stats', 'tokenomics', 'roadmap', 'rewards', 'community', 'memes', 'tap-to-earn'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (section !== currentSection) {
              setCurrentSection(section);
              showDialogForSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, isVisible]);

  const showDialogForSection = (section: string) => {
    if (dialogTimeoutRef.current) {
      clearTimeout(dialogTimeoutRef.current);
    }

    setShowDialog(true);
    const dialogue = getBenDialogue(i18n.language, section);
    
    dialogTimeoutRef.current = setTimeout(() => {
      setShowDialog(false);
    }, dialogue.duration || 4000);
  };

  const toggleBen = () => {
    setIsVisible(false);
    localStorage.setItem('benDisabled', 'true');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement sound system
  };

  if (!isVisible) return null;

  const currentPosition = sectionPositions[currentSection] || sectionPositions.hero;
  const dialogue = getBenDialogue(i18n.language, currentSection);

  // Mobile fallback - simple static avatar
  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.img
            src={logo}
            alt="Ben"
            className="w-16 h-16 rounded-full border-2 border-primary shadow-lg"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(22,163,224,0.5)',
                '0 0 40px rgba(22,163,224,0.8)',
                '0 0 20px rgba(22,163,224,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleBen}
            className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-card/90 backdrop-blur-sm"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{
        scale: hasSpawned ? 1 : 0,
        opacity: hasSpawned ? 1 : 0,
        y: hasSpawned ? 0 : 50,
        ...currentPosition,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }}
    >
      {/* Ben Character */}
      <motion.div
        className="relative cursor-pointer pointer-events-auto"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onHoverStart={() => setShowMenu(true)}
        onHoverEnd={() => setShowMenu(false)}
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* Spawn particle effect */}
        {!hasSpawned && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 0] }}
            transition={{ duration: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI) / 4) * 50,
                  y: Math.sin((i * Math.PI) / 4) * 50,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            ))}
          </motion.div>
        )}

        {/* Ben Avatar */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          animate={{
            filter: [
              'drop-shadow(0 0 20px rgba(22,163,224,0.6))',
              'drop-shadow(0 0 40px rgba(22,163,224,0.9))',
              'drop-shadow(0 0 20px rgba(22,163,224,0.6))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={logo}
            alt="Ben"
            className="w-20 h-20 md:w-28 md:h-28"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Activity indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Dialog Bubble */}
        <AnimatePresence>
          {showDialog && (
            <motion.div
              className="absolute bottom-full right-0 mb-6 pointer-events-auto max-w-xs"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card/95 backdrop-blur-md border-2 border-primary/40 rounded-2xl p-4 shadow-xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                    {dialogue.text}
                  </p>
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary/40" />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="absolute top-full left-0 mt-4 pointer-events-auto"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-card/95 backdrop-blur-md border-2 border-primary/30 rounded-xl p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="justify-start gap-2 hover:bg-primary/10"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleBen}
                    className="justify-start gap-2 hover:bg-destructive/10 text-destructive"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-xs">Disable Ben</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BenController;
