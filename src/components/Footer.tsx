import { Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/onetap_new_logo.png";
import { useTranslation } from "react-i18next";
import { copy, pickLang } from "@/components/cards/copy";

const Footer = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => copy[k][lang];

  const quickLinks = [
    { label: t("navServices"), href: "#services" },
    { label: t("navProcess"), href: "#process" },
    { label: t("navWhy"), href: "#why" },
    { label: t("navFaq"), href: "#faq" },
    { label: t("navContact"), href: "#contact" },
  ];

  const legalLinks = [
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    { label: "Legal Notice", path: "/legal-notice" },
    { label: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <footer className="bg-card border-t-2 border-primary/30 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src={logo} alt="1Tap" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-foreground">1Tap</h3>
            <p className="text-sm text-muted-foreground">{t("footerTagline")}</p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">{t("footerLinks")}</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <a
                  key={l.href}
                  href={`/home${l.href}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">{t("footerLegal")}</h4>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((l) => (
                <a
                  key={l.path}
                  href={l.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-4 text-foreground">{t("footerContact")}</h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a
                href="mailto:contact@1tap-restoration.com"
                className="text-sm text-primary hover:underline break-all"
              >
                contact@1tap-restoration.com
              </a>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href="mailto:contact@1tap-restoration.com" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://instagram.com/1tap.restoration"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 1Tap. {t("footerRights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
