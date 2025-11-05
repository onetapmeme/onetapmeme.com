import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  const faqCategories = [
    {
      category: t('faq.categories.general') || 'General',
      questions: [
        {
          q: t('faq.general.q1') || 'What is $1TAP?',
          a: t('faq.general.a1') || '$1TAP is a community-driven meme coin on the Base network, inspired by competitive gaming culture. It combines gaming nostalgia with DeFi innovation, offering a tap-to-earn game, NFT drops, and a vibrant ecosystem.'
        },
        {
          q: t('faq.general.q2') || 'Why Base network?',
          a: t('faq.general.a2') || 'Base offers lightning-fast transactions, minimal fees, and Coinbase integration. Perfect for gaming features and mass adoption without the high costs of Ethereum mainnet.'
        },
        {
          q: t('faq.general.q3') || 'Is this affiliated with Valve or popular FPS games?',
          a: t('faq.general.a3') || 'No. $1TAP is an independent community project inspired by competitive gaming culture. We are not affiliated with, endorsed by, or connected to any game developers or publishers in any official capacity.'
        },
        {
          q: t('faq.general.q4') || 'What makes $1TAP different from other meme coins?',
          a: t('faq.general.a4') || 'Unique gaming theme, interactive tap-to-earn game, NFT drop roulette system, locked liquidity for 6 months, and real utility beyond speculation. Plus, our community is built by gamers, for gamers.'
        }
      ]
    },
    {
      category: t('faq.categories.buying') || 'How to Buy',
      questions: [
        {
          q: t('faq.buying.q1') || 'How do I buy $1TAP?',
          a: t('faq.buying.a1') || '1. Get a Web3 wallet (MetaMask, Coinbase Wallet)\n2. Add Base network to your wallet\n3. Buy ETH and bridge to Base\n4. Swap ETH for $1TAP on Uniswap or our integrated DEX widget\n5. Add $1TAP contract address to see your tokens'
        },
        {
          q: t('faq.buying.q2') || 'What is the contract address?',
          a: t('faq.buying.a2') || 'Contract address will be announced at launch on our official channels (Discord, Twitter). Always verify from our official sources to avoid scams.'
        },
        {
          q: t('faq.buying.q3') || 'What slippage should I use?',
          a: t('faq.buying.a3') || 'We recommend 1-2% slippage for most trades. During high volatility, you may need to increase to 3-5%. Our 0% buy/sell tax means slippage is purely for DEX mechanics.'
        },
        {
          q: t('faq.buying.q4') || 'Can I buy with a credit card?',
          a: t('faq.buying.a4') || 'You can use on-ramp services like Moonpay or Coinbase to buy ETH with a card, then bridge to Base and swap for $1TAP. Direct fiat-to-$1TAP coming in Phase 2.'
        }
      ]
    },
    {
      category: t('faq.categories.tokenomics') || 'Tokenomics',
      questions: [
        {
          q: t('faq.tokenomics.q1') || 'What is the total supply?',
          a: t('faq.tokenomics.a1') || 'Total supply: 1,000,000,000 $1TAP tokens. Fixed supply, no minting function. Deflationary through manual burns announced to community.'
        },
        {
          q: t('faq.tokenomics.q2') || 'Are there any taxes?',
          a: t('faq.tokenomics.a2') || 'ZERO taxes. 0% buy, 0% sell. We believe in fair trading without hidden fees. Liquidity is sustained through initial lock and community growth.'
        },
        {
          q: t('faq.tokenomics.q3') || 'How is liquidity secured?',
          a: t('faq.tokenomics.a3') || 'Liquidity pool is locked for 6 months at launch via secure protocol. Lock proof will be published on our Security page. After initial period, community DAO votes on extension.'
        },
        {
          q: t('faq.tokenomics.q4') || 'What about anti-whale protection?',
          a: t('faq.tokenomics.a4') || 'Max transaction: 2% of total supply per trade. Max wallet: 3% of total supply. Prevents pump-and-dump schemes while allowing fair accumulation.'
        },
        {
          q: t('faq.tokenomics.q5') || 'Will there be token burns?',
          a: t('faq.tokenomics.a5') || 'Yes! Manual burns announced quarterly based on: 50% of marketplace fees, community vote thresholds, and milestone achievements. Transparent burn wallet tracking.'
        }
      ]
    },
    {
      category: t('faq.categories.security') || 'Security',
      questions: [
        {
          q: t('faq.security.q1') || 'Has the contract been audited?',
          a: t('faq.security.a1') || 'Internal security audit completed (see Security page). External audit by Hacken scheduled for Phase 3. Contract is open-source and verified on BaseScan.'
        },
        {
          q: t('faq.security.q2') || 'Can the team rug pull?',
          a: t('faq.security.a2') || 'No. Liquidity is locked, ownership is renounced post-launch, and contract has no mint function or admin withdrawals. Multi-sig wallet for community funds with transparent on-chain tracking.'
        },
        {
          q: t('faq.security.q3') || 'How do I verify I have real $1TAP?',
          a: t('faq.security.a3') || 'Always check the official contract address on our website and BaseScan. Scammers create fake tokens. Join our Discord for verification help.'
        },
        {
          q: t('faq.security.q4') || 'What if I find a security issue?',
          a: t('faq.security.a4') || 'Report to security@onetap.com immediately. We have a bug bounty program (details on Security page). Responsible disclosure is rewarded.'
        }
      ]
    },
    {
      category: t('faq.categories.features') || 'Features & Roadmap',
      questions: [
        {
          q: t('faq.features.q1') || 'How does the Tap-to-Earn game work?',
          a: t('faq.features.a1') || 'Tap the screen to earn XP, rank up through 10+ tiers (Bronze → Global Elite), and unlock NFT drops. Higher ranks = rarer drops. Fully on-chain, play on web or mobile.'
        },
        {
          q: t('faq.features.q2') || 'What are Drop Roulettes?',
          a: t('faq.features.a2') || 'Gaming-style loot system. Spin to win: Common skins (60%), Rare weapons (25%), Epic items (10%), Legendary prizes (5%). Trade or hold as NFTs. Marketplace coming Phase 2.'
        },
        {
          q: t('faq.features.q3') || 'When will staking launch?',
          a: t('faq.features.a3') || 'Staking interface planned for Phase 3 (Month 2). Three lock periods: 7 days (5% APY), 30 days (12% APY), 90 days (25% APY). Rewards from ecosystem fees.'
        },
        {
          q: t('faq.features.q4') || 'Will there be a mobile app?',
          a: t('faq.features.a4') || 'Progressive Web App (PWA) launching Phase 4. Install from browser for native-like experience: offline mode, push notifications, portfolio tracking. Full iOS/Android apps if community votes yes.'
        },
        {
          q: t('faq.features.q5') || 'What is the Steam integration?',
          a: t('faq.features.a5') || 'Phase 4 innovation: Track real competitive gaming performance, earn $1TAP rewards for achievements. Beta with 100 users first. Partnership discussions ongoing with major platforms.'
        }
      ]
    },
    {
      category: t('faq.categories.community') || 'Community',
      questions: [
        {
          q: t('faq.community.q1') || 'How can I get involved?',
          a: t('faq.community.a1') || 'Join our Discord (link in footer), follow Twitter for updates, participate in meme contests, vote on DAO proposals, and help spread the word. Active contributors get special roles and rewards.'
        },
        {
          q: t('faq.community.q2') || 'Is there a referral program?',
          a: t('faq.community.a2') || 'Yes! Share your unique referral link, earn XP bonus for each signup, and climb the leaderboard for exclusive NFT airdrops. Top 50 referrers get monthly prizes.'
        },
        {
          q: t('faq.community.q3') || 'How does DAO governance work?',
          a: t('faq.community.a3') || 'Phase 4 feature. Stake $1TAP to vote on: treasury spending, roadmap priorities, partnership approvals, and burn schedules. 1 token staked = 1 vote. Snapshot-based voting.'
        },
        {
          q: t('faq.community.q4') || 'Where can I see the team?',
          a: t('faq.community.a4') || 'Visit our Team page. Core members use pseudonyms for privacy (common in crypto). Doxxing is not required for legitimate projects. We prioritize transparency through code and actions.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('faq.title') || 'Frequently Asked Questions'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('faq.subtitle') || 'Everything you need to know about $1TAP'}
            </p>
          </motion.div>

          {/* FAQ Categories */}
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">
                {category.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="glass-effect border border-primary/20 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {/* Still Have Questions */}
          <motion.div
            className="mt-16 text-center glass-effect p-8 rounded-2xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              {t('faq.stillQuestions') || 'Still have questions?'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('faq.joinCommunity') || 'Join our Discord community for real-time support from the team and community members.'}
            </p>
            <a
              href="https://discord.gg/onetap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Join Discord
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
