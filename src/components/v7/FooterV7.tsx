import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Twitter, Send, Youtube, Instagram, Github, Shield } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import logo from '@/assets/onetap_new_logo.png';

const FooterV7 = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/OneTapMeme', label: 'Twitter' },
    { icon: Send, href: 'https://t.me/onetapmeme', label: 'Telegram' },
    { icon: SiDiscord, href: 'https://discord.com/channels/1219285086156099644', label: 'Discord' },
    { icon: Youtube, href: 'https://www.youtube.com/@OneTapMeme', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/onetapmeme', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/onetap', label: 'GitHub' },
  ];

  const footerLinks = {
    product: [
      { label: 'Tokenomics', href: '#tokenomics' },
      { label: 'Tap to Earn', href: '#tap-to-earn' },
      { label: 'Meme Generator', href: '#memes' },
      { label: 'Leaderboard', href: '#leaderboard' },
    ],
    resources: [
      { label: 'Whitepaper', href: '/whitepaper.pdf' },
      { label: 'Audit Report', href: '/audit' },
      { label: 'Brand Kit', href: '/brand' },
      { label: 'Documentation', href: '/docs' },
    ],
    legal: [
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.privacy'), href: '/privacy' },
      { label: t('footer.disclaimer'), href: '/disclaimer' },
      { label: t('footer.ownership'), href: '/ownership' },
    ],
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/home" className="flex items-center gap-3 group w-fit">
              <img
                src={logo}
                alt="$ONETAP"
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                style={{ imageRendering: 'pixelated' }}
              />
              <div>
                <div className="text-2xl font-bold text-foreground">$ONETAP</div>
                <div className="text-sm text-muted-foreground">Gaming Memecoin</div>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 $ONETAP. {t('footer.rights')}
            </div>

            {/* Legal Shield Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                {t('footer.protected')}
              </span>
            </div>

            {/* Contact */}
            <div className="text-sm text-muted-foreground">
              <span className="mr-2">{t('footer.contact')}:</span>
              <a
                href="mailto:contactonetapmeme@gmail.com"
                className="text-primary hover:underline"
              >
                contactonetapmeme@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-lg bg-muted/10 border border-border/30">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t('footer.disclaimerText')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV7;
