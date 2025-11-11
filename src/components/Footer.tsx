import { Twitter, Send, MessageCircle, Instagram, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/onetap_new_logo.png";
import { useTranslation } from "react-i18next";
import Newsletter from "./Newsletter";

const Footer = () => {
  const { t } = useTranslation();
  
  const socialLinks = [
    { icon: Twitter, label: "Twitter/X", href: "https://x.com/OneTapMeme" },
    { icon: Music, label: "TikTok", href: "https://tiktok.com/@onetap_meme" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/onetapmeme" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@OneTapMeme" },
    { icon: MessageCircle, label: "Discord", href: "https://discord.com/channels/1219285086156099644" },
    { icon: MessageCircle, label: "Reddit", href: "https://www.reddit.com/user/ManySingle7170" },
  ];

  return (
    <footer className="bg-card border-t-2 border-primary/30 py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="1Tap Logo" className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">$1TAP</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: t('nav.about'), href: "#about" },
                { label: t('nav.tokenomics'), href: "#tokenomics" },
                { label: t('nav.community'), href: "#community" },
                { label: t('nav.roadmap'), href: "#roadmap" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="text-center">
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">{t('footer.legal')}</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: t('footer.ownership'), path: "/ownership" },
                { label: t('footer.disclaimer'), path: "/disclaimer" },
                { label: t('footer.nonAffiliation'), path: "/non-affiliation" },
                { label: t('footer.privacy'), path: "/privacy" },
                { label: t('footer.terms'), path: "/terms" },
                { label: t('footer.legalNotice'), path: "/legal-notice" },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors truncate px-2"
                  title={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="text-center">
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">Resources</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Team", path: "/team" },
                { label: "Manifesto", path: "/manifesto" },
                { label: "Integrations", path: "/integrations" },
                { label: "Blog", path: "/blog" },
                { label: "Security", path: "/security" },
                { label: "Leaderboard", path: "/leaderboard" },
                { label: "Achievements", path: "/achievements" },
                { label: "FAQ", path: "/faq" },
                { label: "Whitepaper", path: "/whitepaper" },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/whitepaper-v2.pdf"
                download
                className="text-xs md:text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                📄 Download PDF
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-foreground">{t('community.title')}</h4>
            <div className="flex gap-2 md:gap-3 justify-center md:justify-end">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow-primary w-10 h-10 md:w-12 md:h-12"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-10 pb-6">
          <Newsletter />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 md:pt-8 text-center space-y-3">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">
            © 2025 $1TAP. {t('footer.rights')}
          </p>
          <p className="text-xs font-semibold text-primary/80 mb-2">
            {t('footer.legalShield')}
          </p>
          <p className="text-xs text-muted-foreground/80 italic px-4 max-w-3xl mx-auto leading-relaxed">
            {t('footer.disclaimerText')}
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            {t('footer.contact')}: <a href="mailto:contactonetapmeme@gmail.com" className="text-primary hover:underline">contactonetapmeme@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
