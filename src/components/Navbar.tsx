import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, ShieldCheck, User as UserIcon, LogOut, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/cardsurgery-logo.png";
import { copy, pickLang, tr } from "@/components/cards/copy";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SIDEBAR_LOCALES = ["fr", "en", "de", "es", "ru", "zh", "pt", "ja"] as const;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => tr(copy[k], lang);
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
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        top: "calc(env(safe-area-inset-top) + 0.75rem)",
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full ${
        isScrolled
          ? "h-14 sm:h-16 bg-background/65 backdrop-blur-2xl backdrop-saturate-150 border border-border/60 w-[94%] max-w-6xl shadow-[0_8px_30px_-12px_hsla(20,35%,16%,0.18)]"
          : "h-16 sm:h-20 bg-background/80 backdrop-blur-xl backdrop-saturate-150 border border-border/70 w-[96%] max-w-7xl shadow-[0_4px_20px_-12px_hsla(20,35%,16%,0.12)]"
      }`}
    >
      <div className="mx-auto h-full px-3 sm:px-6">
        <nav className="flex items-center justify-between h-full gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Link
            to="/home"
            className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
          >
            <img
              src={logo}
              alt="CardSurgery"
              className={`w-auto object-contain drop-shadow-[0_0_12px_hsla(22,55%,55%,0.3)] transition-all duration-500 ${
                isScrolled ? "h-9 sm:h-11" : "h-10 sm:h-14"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
            <span className="hidden sm:inline font-bold text-foreground tracking-tight text-base leading-none">
              Card<span className="text-accent">Surgery</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className={`relative text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] rounded-full bg-accent transition-all duration-500 ${
                      isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <LanguageSwitcher inline />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-accent/40 rounded-full px-2.5 gap-2 hidden sm:inline-flex"
                    aria-label="Mon compte"
                  >
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
                    <FolderOpen className="w-4 h-4 mr-2" /> {t("navMyDossiers")}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <ShieldCheck className="w-4 h-4 mr-2 text-accent" /> {t("navAdmin")}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" /> {t("navLogout")}
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
                <span className="hidden md:inline">{t("navConnexion")}</span>
              </Button>
            )}

            <Button
              size="sm"
              tabIndex={isScrolled ? -1 : 0}
              aria-hidden={isScrolled}
              className={`hidden lg:inline-flex glossy-btn text-accent-foreground border-0 whitespace-nowrap rounded-full transition-all duration-500 ease-in-out origin-right ${
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
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border z-[100] flex flex-col h-full">
                <div className="flex flex-col gap-2 mt-8 flex-1">
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

                  {user ? (
                    <>
                      <Link
                        to="/my-dossiers"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-foreground hover:text-accent py-2 flex items-center gap-2"
                      >
                        <FolderOpen className="w-4 h-4" /> {t("navMyDossiers")}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-base text-accent py-2 flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4" /> {t("navAdmin")}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleSignOut();
                        }}
                        className="text-base text-foreground hover:text-accent py-2 flex items-center gap-2 text-left"
                      >
                        <LogOut className="w-4 h-4" /> {t("navLogout")}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base text-foreground hover:text-accent py-2 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4" /> {t("navConnexion")}
                    </Link>
                  )}
                  <Button
                    className="mt-4 glossy-btn text-accent-foreground border-0 rounded-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/pricing");
                    }}
                  >
                    {t("heroCtaPrimary")}
                  </Button>
                </div>

                {/* Language strip — pinned to bottom of drawer */}
                <div className="mt-auto pt-6 border-t border-border/60">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3 text-center">
                    {t("navLanguageLabel")}
                  </p>
                  <div className="flex items-center justify-center flex-wrap text-[11px] uppercase font-semibold tracking-[0.2em]">
                    {SIDEBAR_LOCALES.map((code, i) => {
                      const active = i18n.language === code;
                      return (
                        <div key={code} className="flex items-center">
                          {i > 0 && (
                            <span aria-hidden className="px-2 text-border select-none">
                              |
                            </span>
                          )}
                          <button
                            onClick={() => {
                              i18n.changeLanguage(code);
                              setIsMobileMenuOpen(false);
                            }}
                            aria-pressed={active}
                            className={`py-1 transition-colors duration-300 ease-in-out ${
                              active
                                ? "text-accent"
                                : "text-foreground/60 hover:text-foreground"
                            }`}
                          >
                            {code}
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
