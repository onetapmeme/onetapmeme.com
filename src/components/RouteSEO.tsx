import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://onetaptoken.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type Meta = { title: string; description: string };

const ROUTE_META: Record<string, Meta> = {
  "/": {
    title: "$1TAP — Enter the Ultimate Gaming Memecoin",
    description: "Enter $1TAP: a community-driven gaming memecoin on Base. FPS culture meets crypto with fair launch and locked liquidity.",
  },
  "/home": {
    title: "$1TAP — The Ultimate Gaming Memecoin on Base",
    description: "$1TAP combines FPS nostalgia with modern crypto. Community-driven, fair launch gaming memecoin on Base Network.",
  },
  "/auth": {
    title: "Sign In or Sign Up — $1TAP",
    description: "Access your $1TAP account to track holdings, claim rewards, and join the community.",
  },
  "/profile": {
    title: "Your Profile — $1TAP",
    description: "Manage your $1TAP profile, preferences, and notification settings.",
  },
  "/ownership": {
    title: "Project Ownership & Transparency — $1TAP",
    description: "Read the official $1TAP ownership disclosure, multi-sig setup, and team transparency report.",
  },
  "/disclaimer": {
    title: "Disclaimer — $1TAP",
    description: "Important disclaimers about $1TAP token, risks, and informational use of the website.",
  },
  "/non-affiliation": {
    title: "Non-Affiliation Notice — $1TAP",
    description: "$1TAP is not affiliated with any FPS game, studio, or trademark holder. Read the full notice.",
  },
  "/privacy": {
    title: "Privacy Policy — $1TAP",
    description: "Learn how $1TAP collects, uses, and protects your personal data, including GDPR rights.",
  },
  "/terms": {
    title: "Terms of Service — $1TAP",
    description: "The terms governing your use of the $1TAP website, community, and token-related features.",
  },
  "/legal-notice": {
    title: "Legal Notice — $1TAP",
    description: "Legal information about the publisher, hosting, and contact details for $1TAP.",
  },
  "/token": {
    title: "$1TAP Token — Tokenomics, Supply & Contract",
    description: "Explore $1TAP tokenomics: 100M supply, locked LP, 0% buy/sell tax, multi-sig treasury, and contract details.",
  },
  "/lore": {
    title: "$1TAP Lore — Origin Story of the Tactical Memecoin",
    description: "Discover the lore of $1TAP: the headshot heard around the blockchain and the rise of tactical memecoin culture.",
  },
  "/meme": {
    title: "Meme Generator — Create $1TAP Memes",
    description: "Build, share, and earn XP with the $1TAP meme generator. Templates, captions, and contests.",
  },
  "/meme-generator": {
    title: "Meme Generator — Create $1TAP Memes",
    description: "Build, share, and earn XP with the $1TAP meme generator. Templates, captions, and contests.",
  },
  "/tap-to-earn": {
    title: "Tap-to-Earn — Play & Earn with $1TAP",
    description: "Tap to earn XP, climb FPS-inspired ranks, and unlock NFT drops in the official $1TAP tap-to-earn game.",
  },
  "/daily-quests": {
    title: "Daily Quests — Earn $1TAP Rewards",
    description: "Complete daily quests to earn XP, $1TAP rewards, and exclusive NFT drops.",
  },
  "/faq": {
    title: "FAQ — Everything About $1TAP",
    description: "Answers to the most common questions about $1TAP: tokenomics, buying, security, and the roadmap.",
  },
  "/team": {
    title: "Team — The People Behind $1TAP",
    description: "Meet the $1TAP team, advisors, and contributors building the gaming memecoin on Base.",
  },
  "/whitepaper": {
    title: "$1TAP Whitepaper — Vision, Tokenomics & Roadmap",
    description: "Read the official $1TAP whitepaper covering vision, tokenomics, security, and roadmap milestones.",
  },
  "/dashboard": {
    title: "Holder Dashboard — $1TAP",
    description: "Track your $1TAP holdings, rank, rewards, and live market data in one dashboard.",
  },
  "/security": {
    title: "Security & Audit — $1TAP",
    description: "Audit reports, locked LP proof, multi-sig treasury, and the full $1TAP security posture.",
  },
  "/blog": {
    title: "Blog — $1TAP News & Updates",
    description: "Latest $1TAP news, partnerships, AMAs, and product releases from the team.",
  },
  "/leaderboard": {
    title: "Leaderboard — Top $1TAP Players & Holders",
    description: "See the top tappers, top holders, and top ambassadors competing on the $1TAP leaderboard.",
  },
  "/achievements": {
    title: "Achievements — Unlock $1TAP Badges",
    description: "Unlock achievements and badges across tapping, holding, and community milestones.",
  },
  "/manifesto": {
    title: "The $1TAP Manifesto — Sign the Tactical Pledge",
    description: "Read and sign the $1TAP manifesto: a tactical pledge for fair launch, gaming culture, and community ownership.",
  },
  "/manifesto/verify": {
    title: "Verify a Manifesto Signature — $1TAP",
    description: "Cryptographically verify any signature on the $1TAP manifesto.",
  },
  "/integrations": {
    title: "Integrations & Partners — $1TAP",
    description: "Explore $1TAP integrations across Base, Uniswap, audit firms, and ecosystem partners.",
  },
  "/inventory": {
    title: "Inventory — Your $1TAP Items & NFTs",
    description: "View and manage your $1TAP NFT drops, items, and craftable assets.",
  },
  "/crafting": {
    title: "Crafting — Combine Items in $1TAP",
    description: "Craft rare items and NFTs by combining your $1TAP inventory pieces.",
  },
};

const DEFAULT_META: Meta = {
  title: "$1TAP — The Ultimate Gaming Memecoin",
  description: "$1TAP combines FPS nostalgia with modern crypto. Community-driven, fair launch gaming memecoin on Base Network.",
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] || DEFAULT_META;
  const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};

export default RouteSEO;
