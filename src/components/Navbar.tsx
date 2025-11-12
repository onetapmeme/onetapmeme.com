import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/onetap_new_logo.png";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const Navbar = () => {
  const {
    t
  } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  const navItems = [{
    name: t('nav.about'),
    href: "#about",
    onClick: () => scrollToSection('about')
  }, {
    name: t('nav.tokenomics'),
    href: "#tokenomics",
    onClick: () => scrollToSection('tokenomics')
  }, {
    name: "Team",
    href: "/team",
    isExternal: true
  }, {
    name: "Manifesto",
    href: "/manifesto",
    isExternal: true
  }, {
    name: "Integrations",
    href: "/integrations",
    isExternal: true
  }, {
    name: "Dashboard",
    href: "/dashboard",
    isExternal: true
  }, {
    name: "Leaderboard",
    href: "/leaderboard",
    isExternal: true
  }, {
    name: "Blog",
    href: "/blog",
    isExternal: true
  }];
  return <header className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${isScrolled ? "h-16 bg-background/40 backdrop-blur-xl border border-primary/20 scale-95 w-[90%] max-w-4xl shadow-glow-primary" : "h-16 bg-background/80 backdrop-blur-md border border-primary/10 w-[95%] max-w-5xl"}`}>
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/home" className="flex items-center gap-3 group" onClick={e => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}>
            <img src={logo} alt="1Tap" className="w-10 h-10 group-hover:animate-pulse-glow transition-all" />
            
          </a>

          {/* Navigation Menu */}
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-xl border-primary/20">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 pb-4 border-b border-primary/20">
                    <ThemeToggle />
                    <LanguageSwitcher inline />
                  </div>
                  {navItems.map(item => item.isExternal ? <a key={item.name} href={item.href} className="text-lg text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a> : <a key={item.name} href={item.href} className="text-lg text-muted-foreground hover:text-primary transition-colors font-medium" onClick={e => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}>
                        {item.name}
                      </a>)}
                  <Button variant="hero" className="mt-4" asChild>
                    <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>;
};
export default Navbar;