import { Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/cardsurgery-logo.png";

const Footer = () => {
  const services = [
    { label: "Tarifs & forfaits", to: "/pricing" },
    { label: "Galerie avant/après", to: "/gallery" },
    { label: "Diagnostic", to: "/diagnostic" },
    { label: "Réservation", to: "/booking" },
    { label: "Suivi de dossier", to: "/tracking" },
  ];

  const company = [
    { label: "Qui sommes-nous", to: "/home#about" },
    { label: "Notre processus", to: "/home#process" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/home#contact" },
  ];

  const legal = [
    { label: "Mentions légales", to: "/legal-notice" },
    { label: "CGV", to: "/terms" },
    { label: "Confidentialité", to: "/privacy" },
    { label: "Disclaimer & Non-affiliation", to: "/non-affiliation" },
  ];

  return (
    <footer className="bg-secondary/40 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <img src={logo} alt="CardSurgery" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_hsla(210,100%,55%,0.4)]" />
              <span className="text-xl font-bold text-foreground">
                Card<span className="text-accent">Surgery</span>
              </span>
            </div>
            <p className="text-sm text-foreground/90 italic font-serif">
              "La précision chirurgicale dont vos précieuses cartes ont besoin."
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Restauration premium de cartes de collection : Pokémon, One Piece, Lorcana, Magic, Yu-Gi-Oh.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">Services</h4>
            <nav className="flex flex-col gap-2">
              {services.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">CardSurgery</h4>
            <nav className="flex flex-col gap-2">
              {company.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">Légal & contact</h4>
            <nav className="flex flex-col gap-2 mb-4">
              {legal.map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-accent transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <a href="mailto:contact@card_surgery.com" className="text-sm text-accent hover:underline break-all block mb-3">
              contact@card_surgery.com
            </a>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:contact@card_surgery.com" aria-label="Email"><Mail className="w-4 h-4" /></a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/card_surgery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CardSurgery — Tous droits réservés. Service indépendant non affilié à Nintendo, The Pokémon Company ou Bandai.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
