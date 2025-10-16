import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wallet, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/onetap_new_logo.png';

const NavbarV7 = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="$ONETAP"
              className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-xl md:text-2xl font-bold text-foreground hidden sm:block">
              $ONETAP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  About <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuItem onClick={() => scrollToSection('about')}>
                  Story
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('about')}>
                  Mission
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('roadmap')}>
                  Roadmap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Token Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Token <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuItem onClick={() => scrollToSection('tokenomics')}>
                  Tokenomics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('live-stats')}>
                  Live Stats
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="https://basescan.org" target="_blank" rel="noopener noreferrer" className="w-full">
                    Contract
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Earn Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Earn <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuItem onClick={() => scrollToSection('tap-to-earn')}>
                  Tap to Earn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('rewards')}>
                  Rewards
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection('leaderboard')}>
                  Leaderboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={() => scrollToSection('community')}>
              Community
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('memes')}>
              Memes
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                  <Globe className="h-4 w-4" />
                  <span>{currentLang.flag}</span>
                  <span className="hidden lg:inline text-xs">{currentLang.code.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-card/95 backdrop-blur-xl border-border/50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={i18n.language === lang.code ? 'bg-primary/10' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wallet Connect - Desktop */}
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hidden md:flex border-border/50 hover:border-primary/50"
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden lg:inline">Connect</span>
            </Button>

            {/* Buy CTA */}
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow-primary"
            >
              Buy $ONETAP
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('about')}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('tokenomics')}
              >
                Tokenomics
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('tap-to-earn')}
              >
                Tap to Earn
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection('community')}
              >
                Community
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarV7;
