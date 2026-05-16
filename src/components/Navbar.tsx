import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/cardsurgery-logo.png";

const NAV_ITEMS = [
  { label: "Services", to: "/pricing" },
  { label: "Galerie", to: "/gallery" },
  { label: "Diagnostic", to: "/diagnostic" },
  { label: "Réservation", to: "/booking" },
  { label: "Suivi", to: "/tracking" },
  { label: "FAQ", to: "/faq" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? "h-20 bg-background/80 backdrop-blur-xl border border-border scale-95 w-[94%] max-w-5xl shadow-md"
          : "h-20 bg-background/90 backdrop-blur-md border border-border w-[96%] max-w-6xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <Link to="/home" className="flex items-center gap-2 group">
            <img src={logo} alt="CardSurgery" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_hsla(210,100%,55%,0.4)]" />
            <span className="hidden sm:inline font-bold text-foreground tracking-tight text-lg">
              Card<span className="text-accent">Surgery</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.to)}
                className={`text-sm font-medium ${
                  location.pathname === item.to ? "text-accent" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:inline-flex glossy-btn text-accent-foreground border-0"
              onClick={() => navigate("/pricing")}
            >
              Débuter une opération de restauration
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
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
                  <Button
                    className="mt-4 glossy-btn text-accent-foreground border-0"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/pricing");
                    }}
                  >
                    Débuter une opération de restauration
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

