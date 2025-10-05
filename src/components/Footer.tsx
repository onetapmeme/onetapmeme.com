import { Twitter, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/onetap_new_logo.png";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Send, label: "Telegram", href: "#" },
    { icon: MessageCircle, label: "Discord", href: "#" },
  ];

  return (
    <footer className="bg-card border-t-2 border-primary/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="OneTap Logo" className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-foreground">$ONETAP</h3>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              The ultimate gaming memecoin. Pixelated dreams, crypto reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-bold mb-4 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["About", "Tokenomics", "Roadmap"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="text-center md:col-span-3 lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Disclaimer", path: "/disclaimer" },
                { label: "Non-Affiliation", path: "/non-affiliation" },
                { label: "Privacy", path: "/privacy" },
                { label: "Terms of Use", path: "/terms" },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold mb-4 text-foreground">Join the Community</h4>
            <div className="flex gap-3 justify-center md:justify-end">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow-primary"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2025 $ONETAP. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Disclaimer: $ONETAP is not affiliated with Valve Corporation or Counter-Strike. 
            This is an independent community-driven memecoin project. Cryptocurrency trading 
            involves risk. Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
