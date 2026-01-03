import { motion } from "framer-motion";
import { ExternalLink, Shield, Verified, Star } from "lucide-react";

interface Partner {
  name: string;
  logo: string;
  description: string;
  url: string;
  category: "infrastructure" | "security" | "exchange" | "community";
  featured?: boolean;
}

const partners: Partner[] = [
  {
    name: "Base",
    logo: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4",
    description: "Layer 2 blockchain by Coinbase",
    url: "https://base.org",
    category: "infrastructure",
    featured: true,
  },
  {
    name: "Uniswap",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Uniswap_Logo.svg",
    description: "Decentralized exchange protocol",
    url: "https://uniswap.org",
    category: "exchange",
    featured: true,
  },
  {
    name: "Team.Finance",
    logo: "https://www.team.finance/_next/static/media/logo.4eb6fc3e.png",
    description: "LP lock & token security",
    url: "https://team.finance",
    category: "security",
    featured: true,
  },
  {
    name: "DexScreener",
    logo: "https://pbs.twimg.com/profile_images/1722545019329638400/3vGIy6Wv_400x400.jpg",
    description: "Real-time DEX analytics",
    url: "https://dexscreener.com",
    category: "infrastructure",
  },
  {
    name: "BaseScan",
    logo: "https://basescan.org/images/svg/brands/main.svg",
    description: "Base blockchain explorer",
    url: "https://basescan.org",
    category: "infrastructure",
  },
  {
    name: "CoinGecko",
    logo: "https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png",
    description: "Crypto market data platform",
    url: "https://coingecko.com",
    category: "infrastructure",
  },
  {
    name: "Discord",
    logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
    description: "Community hub",
    url: "https://discord.gg/1tap",
    category: "community",
  },
];

const categoryLabels = {
  infrastructure: { label: "Infrastructure", color: "bg-blue-500/20 text-blue-400" },
  security: { label: "Security", color: "bg-green-500/20 text-green-400" },
  exchange: { label: "Exchange", color: "bg-purple-500/20 text-purple-400" },
  community: { label: "Community", color: "bg-orange-500/20 text-orange-400" },
};

const PartnersSection = () => {
  const featuredPartners = partners.filter((p) => p.featured);
  const otherPartners = partners.filter((p) => !p.featured);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            <Verified className="w-4 h-4" />
            TRUSTED BY THE BEST
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Partners & Integrations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've partnered with industry leaders to bring you the safest and most seamless experience
          </p>
        </motion.div>

        {/* Featured Partners */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredPartners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative glass-effect rounded-2xl p-6 border-2 border-primary/30 hover:border-primary/50 transition-all overflow-hidden"
            >
              {/* Featured badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Logo */}
                <div className="w-20 h-20 rounded-2xl bg-background/80 p-4 mb-4 border border-border/50 group-hover:border-primary/30 transition-colors">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${partner.name}&background=random&size=100`;
                    }}
                  />
                </div>

                {/* Category badge */}
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${
                    categoryLabels[partner.category].color
                  }`}
                >
                  {categoryLabels[partner.category].label}
                </span>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {partner.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm">
                  {partner.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Other Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherPartners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group glass-effect rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-background/80 p-2 mb-3 group-hover:bg-primary/10 transition-colors">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${partner.name}&background=random&size=100`;
                  }}
                />
              </div>
              <h4 className="font-semibold text-sm mb-1">{partner.name}</h4>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  categoryLabels[partner.category].color
                }`}
              >
                {categoryLabels[partner.category].label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Shield, label: "Audited Contract", value: "100% Secure" },
            { icon: Verified, label: "LP Locked", value: "6 Months" },
            { icon: Star, label: "Community Trust", value: "10K+ Members" },
            { icon: ExternalLink, label: "Open Source", value: "Verified Code" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/30"
            >
              <div className="p-2 rounded-lg bg-primary/20">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-bold text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Want to partner with $1TAP?
          </p>
          <a
            href="mailto:partnerships@1tap.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Get in Touch →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersSection;
