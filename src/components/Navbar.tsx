import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, ShieldCheck, User as UserIcon, LogOut, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/cardsurgery-logo.png";
import { copy, pickLang } from "@/components/cards/copy";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => copy[k][lang];
  const { user, isAdmin } = useAuth();

  const NAV_ITEMS = [
    { label: t("navServices"), to: "/pricing" },
    { label: t("navGallery"), to: "/gallery" },
    { label: t("navDiagnostic"), to: "/diagnostic" },
    { label: t("navBooking"), to: "/booking" },
    { label: t("navTracking"), to: "/tracking" },
    { label: t("navFaq"), to: "/faq" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/home");
  };

  const initial = (user?.email ?? "?").charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? "h-20 bg-background/80 backdrop-blur-xl border border-border scale-95 w-[94%] max-w-5xl shadow-md"
          : "h-20 bg-background/90 backdrop-blur-md border border-border w-[96%] max-w-6xl"
      }`}
    >
      <div className="mx-auto h-full px-4 sm:px-6">
        <nav className="flex items-center justify-between h-full gap-2">
          <Link to="/home" className="flex items-center gap-2 group shrink-0">
            <img src={logo} alt="CardSurgery" className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_hsla(22,55%,55%,0.4)]" />
            <span className="hidden sm:inline font-bold text-foreground tracking-tight text-lg">
              Card<span className="text-accent">Surgery</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.to)}
                className={`text-sm font-medium whitespace-nowrap ${
                  location.pathname === item.to ? "text-accent" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher inline />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="border-accent/40 rounded-full px-2.5 gap-2 hidden sm:inline-flex" aria-label="Mon compte">
                    <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center">
                      {initial}
                    </span>
                    <span className="hidden md:inline text-xs max-w-[120px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-[100]">
                  <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/my-dossiers")}>
                    <FolderOpen className="w-4 h-4 mr-2" /> Mes dossiers
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <ShieldCheck className="w-4 h-4 mr-2 text-accent" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex border-accent/40 rounded-full"
                onClick={() => navigate("/auth")}
              >
                <UserIcon className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden md:inline">Connexion</span>
              </Button>
            )}
            <Button
              size="sm"
              tabIndex={isScrolled ? -1 : 0}
              aria-hidden={isScrolled}
              className={`hidden 2xl:inline-flex glossy-btn text-accent-foreground border-0 whitespace-nowrap transition-all duration-500 ease-in-out origin-right ${
                isScrolled
                  ? "opacity-0 scale-90 -translate-x-2 pointer-events-none w-0 px-0 ml-0 overflow-hidden"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
              onClick={() => navigate("/pricing")}
            >
              {t("heroCtaPrimary")}
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border z-[100]">
                <div className="flex flex-col gap-2 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-foreground hover:text-accent transition-colors font-medium py-2"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-3 mt-2 border-t border-border">
                    <LanguageSwitcher inline />
                  </div>
                  <Button
                    className="mt-4 glossy-btn text-accent-foreground border-0"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/pricing");
                    }}
                  >
                    {t("heroCtaPrimary")}
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
