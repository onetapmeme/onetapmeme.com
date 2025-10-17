import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import benSpritesheet from '@/assets/ben-spritesheet.png';
import { getBenDialogue } from './BenDialogues';
import { useTranslation } from 'react-i18next';

// Sprite positions in the 3x3 grid
const SPRITE_POSITIONS = {
  neutral: { x: 0, y: 0 },      // Top-left
  talking: { x: 1, y: 0 },      // Top-center
  smiling: { x: 2, y: 0 },      // Top-right
  pointing: { x: 0, y: 1 },     // Middle-left
  explaining: { x: 1, y: 1 },   // Middle-center
  winking: { x: 2, y: 1 },      // Middle-right
  shooting: { x: 0, y: 2 },     // Bottom-left
  thinking: { x: 1, y: 2 },     // Bottom-center
  celebrating: { x: 2, y: 2 },  // Bottom-right
};

const SPRITE_SIZE = 128; // Each sprite is 128x128px in the sheet
const CIRCLE_SIZE_DESKTOP = 96; // w-24 h-24
const CIRCLE_SIZE_MOBILE = 64; // w-16 h-16

interface BenPosition {
  bottom: string;
  right: string;
  section: string;
  sprite: keyof typeof SPRITE_POSITIONS;
}

const sectionPositions: Record<string, BenPosition> = {
  hero: { bottom: '20px', right: '20px', section: 'hero', sprite: 'celebrating' },
  about: { bottom: '20px', right: '20px', section: 'about', sprite: 'talking' },
  tokenomics: { bottom: '20px', right: '20px', section: 'tokenomics', sprite: 'pointing' },
  'live-stats': { bottom: '20px', right: '20px', section: 'live-stats', sprite: 'explaining' },
  roadmap: { bottom: '20px', right: '20px', section: 'roadmap', sprite: 'thinking' },
  community: { bottom: '20px', right: '20px', section: 'community', sprite: 'winking' },
  'tap-to-earn': { bottom: '20px', right: '20px', section: 'tap-to-earn', sprite: 'shooting' },
  rewards: { bottom: '20px', right: '20px', section: 'rewards', sprite: 'smiling' },
  memes: { bottom: '20px', right: '20px', section: 'memes', sprite: 'celebrating' },
  footer: { bottom: '20px', right: '20px', section: 'footer', sprite: 'neutral' },
};

const BenControllerV2 = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const currentSectionRef = useRef('hero');
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSprite, setCurrentSprite] = useState<keyof typeof SPRITE_POSITIONS>('neutral');
  const [isSpawning, setIsSpawning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dialogueTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSectionChangeRef = useRef<number>(0);
  const heroShownRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const benDisabled = localStorage.getItem('benDisabled');
    if (benDisabled === 'true') return;

    // Initial spawn animation
    setTimeout(() => {
      setIsVisible(true);
      setIsSpawning(false);
      setCurrentSprite('celebrating');
      showDialogForSection('hero');
      setTimeout(() => setCurrentSprite('neutral'), 2000);
    }, 1500);

    // Section tracking with IntersectionObserver
    const sections = Object.keys(sectionPositions);
    const observers: IntersectionObserver[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && sections.includes(id)) {
            if (currentSectionRef.current !== id) {
              currentSectionRef.current = id;
              setCurrentSection(id);
              showDialogForSection(id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      io.disconnect();
      observers.forEach((o) => o.disconnect());
    };
  }, [currentSection]);

  const showDialogForSection = (section: string) => {
    const now = Date.now();
    if (now - lastSectionChangeRef.current < 800) return;
    
    // Skip hero section if already shown
    if (section === 'hero' && heroShownRef.current) return;
    
    lastSectionChangeRef.current = now;

    const dialogue = getBenDialogue(i18n.language, section);
    const position = sectionPositions[section];
    if (dialogue && position) {
      if (section === 'hero') {
        heroShownRef.current = true;
      }
      
      setCurrentSprite(position.sprite);
      setDialogueText(dialogue.text);
      setShowDialogue(true);

      if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
      dialogueTimeoutRef.current = setTimeout(() => {
        setShowDialogue(false);
        setCurrentSprite('neutral');
      }, dialogue.duration || 7000);
    }
  };

  const toggleBen = () => {
    localStorage.setItem('benDisabled', 'true');
    setIsVisible(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  if (!isVisible) return null;

  // Mobile simplified version
  if (isMobile) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div
          className="w-16 h-16 rounded-full border-2 border-primary/50 bg-card/90 backdrop-blur-sm shadow-lg cursor-pointer hover:scale-110 transition-transform overflow-hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${benSpritesheet})`,
              backgroundSize: `${SPRITE_SIZE * 3}px ${SPRITE_SIZE * 3}px`,
              backgroundPosition: `-${SPRITE_POSITIONS[currentSprite].x * SPRITE_SIZE + (SPRITE_SIZE - CIRCLE_SIZE_MOBILE) / 2}px -${SPRITE_POSITIONS[currentSprite].y * SPRITE_SIZE + (SPRITE_SIZE - CIRCLE_SIZE_MOBILE) / 2}px`,
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      </motion.div>
    );
  }

  // Desktop full version
  const position = sectionPositions[currentSection] || sectionPositions.hero;

  return (
    <AnimatePresence>
      <motion.div
        initial={isSpawning ? { scale: 0, opacity: 0, y: 100 } : { opacity: 1 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          bottom: position.bottom,
          right: position.right,
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          duration: 0.8,
        }}
        className="fixed z-50 group"
        style={{ bottom: position.bottom, right: position.right }}
      >
        {/* Circle spawn animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1],
            delay: isSpawning ? 0.3 : 0 
          }}
          className="absolute inset-0 rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent"
        />
        
        {/* Spawn particles effect */}
        {isSpawning && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos((i * Math.PI * 2) / 16) * 80,
                  y: Math.sin((i * Math.PI * 2) / 16) * 80,
                  opacity: [1, 0.5, 0],
                }}
                transition={{ duration: 1.2, delay: i * 0.04 }}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{ left: '50%', top: '50%' }}
              />
            ))}
          </div>
        )}

        {/* Ben character */}
        <motion.div
          className="relative cursor-pointer"
          animate={{
            y: [0, -10, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={() => setShowMenu(!showMenu)}
          whileHover={{ scale: 1.05 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          
          {/* Sprite */}
          <div className="relative w-24 h-24 rounded-full border-2 border-primary/50 bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${benSpritesheet})`,
                backgroundSize: `${SPRITE_SIZE * 3}px ${SPRITE_SIZE * 3}px`,
                backgroundPosition: `-${SPRITE_POSITIONS[currentSprite].x * SPRITE_SIZE + (SPRITE_SIZE - CIRCLE_SIZE_DESKTOP) / 2}px -${SPRITE_POSITIONS[currentSprite].y * SPRITE_SIZE + (SPRITE_SIZE - CIRCLE_SIZE_DESKTOP) / 2}px`,
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
              }}
            />
          </div>
        </motion.div>

        {/* Dialogue bubble */}
        <AnimatePresence>
          {showDialogue && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-full right-0 mb-4 max-w-xs"
            >
              <div className="relative bg-card/95 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-2xl">
                <div className="text-sm text-foreground leading-relaxed font-medium">
                  {dialogueText}
                </div>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card/95 border-r border-b border-primary/30 transform rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-full right-0 mb-4 bg-card/95 backdrop-blur-md border border-primary/30 rounded-xl p-3 shadow-2xl min-w-[160px]"
            >
              <button
                onClick={toggleMute}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-primary/10 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                onClick={toggleBen}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-destructive/10 text-destructive rounded-lg transition-colors mt-1"
              >
                <X className="w-4 h-4" />
                <span>Disable Ben</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default BenControllerV2;
