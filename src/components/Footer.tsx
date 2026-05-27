import { Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/cardsurgery-logo.png";
import { copy, pickLang, tr } from "@/components/cards/copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FLink = { label: string; to: string };

const LinkCol = ({ title, links, small }: { title: string; links: FLink[]; small?: boolean }) => (
  <div className="text-center md:text-left min-w-0">
    <h4 className="text-base font-bold mb-4 text-foreground break-words hyphens-auto">{title}</h4>
    <nav className="flex flex-col gap-2">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className={`${small ? "text-xs" : "text-sm"} text-muted-foreground hover:text-accent transition-colors break-words`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  </div>
);

const Footer = () => {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => tr(copy[k], lang);

  const services: FLink[] = [
    { label: t("footerLinkPricing"), to: "/pricing" },
    { label: t("footerLinkGallery"), to: "/gallery" },
    { label: t("footerLinkDiagnostic"), to: "/diagnostic" },
    { label: t("footerLinkBooking"), to: "/booking" },
    { label: t("footerLinkTracking"), to: "/tracking" },
  ];

  const company: FLink[] = [
    { label: t("footerLinkAbout"), to: "/home#about" },
    { label: t("footerLinkProcess"), to: "/home#process" },
    { label: t("footerLinkFaq"), to: "/faq" },
    { label: t("footerLinkContact"), to: "/home#contact" },
  ];

  const legal: FLink[] = [
    { label: t("footerLinkLegalNotice"), to: "/legal-notice" },
    { label: t("footerLinkTerms"), to: "/terms" },
    { label: t("footerLinkPrivacy"), to: "/privacy" },
    { label: t("footerLinkDisclaimer"), to: "/non-affiliation" },
  ];

  const copyright = t("footerCopyright").replace("{year}", String(new Date().getFullYear()));

  // Mobile accordion item helper
  const MobileSection = ({ value, title, links, small }: { value: string; title: string; links: FLink[]; small?: boolean }) => (
    <AccordionItem value={value} className="border-b border-border/60">
      <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground hover:no-underline py-4">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <nav className="flex flex-col gap-2.5 pl-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`${small ? "text-xs" : "text-sm"} text-muted-foreground hover:text-accent transition-colors break-words`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <footer className="bg-secondary/40 border-t border-border py-12 section-x overflow-x-hidden max-w-[100vw]">
      <div className="container mx-auto max-w-6xl">
        {/* Brand block — always visible */}
        <div className="text-center md:text-left mb-6 md:mb-0 md:hidden">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={logo} alt="CardSurgery" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_hsla(22,55%,55%,0.35)]" />
            <span className="text-xl font-bold text-foreground">
              Card<span className="text-accent">Surgery</span>
            </span>
          </div>
          <p className="text-sm text-foreground/90 italic font-serif break-words">{t("footerBrandTagline")}</p>
          <p className="text-xs text-muted-foreground mt-2 break-words">{t("footerSubTagline")}</p>
        </div>

        {/* Mobile: collapsible link blocks */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <MobileSection value="services" title={t("footerColServices")} links={services} />
            <MobileSection value="brand" title={t("footerColBrand")} links={company} />
            <MobileSection value="legal" title={t("footerColLegal")} links={legal} small />
          </Accordion>

          {/* Contact + socials (always visible, no accordion) */}
          <div className="text-center mt-6">
            <a href="mailto:contact@cardsurgery.com" className="text-sm text-accent hover:underline break-all block mb-3">
              contact@cardsurgery.com
            </a>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:contact@cardsurgery.com" aria-label="Email"><Mail className="w-4 h-4" /></a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/card_surgery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-8">
          <div className="text-left min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="CardSurgery" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_hsla(22,55%,55%,0.35)]" />
              <span className="text-xl font-bold text-foreground">
                Card<span className="text-accent">Surgery</span>
              </span>
            </div>
            <p className="text-sm text-foreground/90 italic font-serif break-words">{t("footerBrandTagline")}</p>
            <p className="text-xs text-muted-foreground mt-3 break-words">{t("footerSubTagline")}</p>
          </div>

          <LinkCol title={t("footerColServices")} links={services} />
          <LinkCol title={t("footerColBrand")} links={company} />

          <div className="text-left min-w-0">
            <h4 className="text-base font-bold mb-4 text-foreground break-words hyphens-auto">{t("footerColLegal")}</h4>
            <nav className="flex flex-col gap-2 mb-4">
              {legal.map((l) => (
                <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-accent transition-colors break-words">
                  {l.label}
                </Link>
              ))}
            </nav>
            <a href="mailto:contact@cardsurgery.com" className="text-sm text-accent hover:underline break-all block mb-3">
              contact@cardsurgery.com
            </a>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:contact@cardsurgery.com" aria-label="Email"><Mail className="w-4 h-4" /></a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://instagram.com/card_surgery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-muted-foreground opacity-60 break-words">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
