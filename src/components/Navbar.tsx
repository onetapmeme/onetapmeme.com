import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/onetap_new_logo.png";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { copy, pickLang } from "@/components/cards/copy";

const Navbar = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => copy[k][lang];
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: t("navServices"), id: "services" },
    { label: t("navProcess"), id: "process" },
    { label: t("navWhy"), id: "why" },
    { label: t("navFaq"), id: "faq" },
    { label: t("navContact"), id: "contact" },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? "h-16 bg-background/40 backdrop-blur-xl border border-primary/20 scale-95 w-[92%] max-w-5xl shadow-glow-primary"
          : "h-16 bg-background/80 backdrop-blur-md border border-primary/10 w-[95%] max-w-6xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <a href="/home" className="flex items-center gap-3 group" onClick={handleLogoClick}>
            <img src={logo} alt="1Tap" className="w-10 h-10 group-hover:animate-pulse-glow transition-all" />
            <span className="hidden sm:inline font-bold text-foreground">1Tap</span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => goToSection(item.id)}
                className="text-sm font-medium hover:bg-primary/10"
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden md:inline-flex bg-background/10 backdrop-blur-md border border-primary/20 hover:bg-background/20"
              asChild
            >
              <a href="/auth">{t("login")}</a>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-xl border-primary/20 z-[100]">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 pb-4 border-b border-primary/20">
                    <ThemeToggle />
                    <LanguageSwitcher inline />
                  </div>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => goToSection(item.id)}
                      className="text-left text-lg text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    variant="ghost"
                    className="mt-4 bg-background/10 border border-primary/20"
                    asChild
                  >
                    <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      {t("login")}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
