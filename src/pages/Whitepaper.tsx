import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Whitepaper = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    // TODO: Link to actual PDF when created
    window.open('/whitepaper-v1.pdf', '_blank');
  };

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
            <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('whitepaper.title') || '$ONETAP Whitepaper'}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('whitepaper.subtitle') || 'Technical documentation and project vision'}
            </p>
            <Button
              onClick={handleDownload}
              size="lg"
              className="gap-2"
            >
              <Download className="w-5 h-5" />
              {t('whitepaper.download') || 'Download PDF'}
            </Button>
          </motion.div>

          {/* Executive Summary */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20">
              <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
              <p className="text-muted-foreground mb-4">
                $ONETAP is a community-driven cryptocurrency project built on Base network, combining gaming culture with decentralized finance. Inspired by Counter-Strike: Global Offensive (CS:GO), we create an ecosystem where meme culture meets real utility.
              </p>
              <p className="text-muted-foreground">
                Our mission is to build the most engaging meme coin experience through innovative tap-to-earn mechanics, NFT drop systems, and community governance. With zero taxes, locked liquidity, and transparent operations, $ONETAP represents a fair launch approach to cryptocurrency.
              </p>
            </Card>
          </motion.section>

          {/* Vision & Mission */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6">Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect p-6 rounded-2xl border-primary/20">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the leading gaming-themed cryptocurrency, bridging Web2 gamers into Web3 through familiar mechanics and engaging experiences.
                </p>
              </Card>
              <Card className="glass-effect p-6 rounded-2xl border-primary/20">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  Create sustainable value through community engagement, innovative features, and transparent governance while maintaining the fun spirit of meme culture.
                </p>
              </Card>
            </div>
          </motion.section>

          {/* Tokenomics */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20">
              <h2 className="text-3xl font-bold mb-6">Tokenomics</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Supply Details</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Total Supply: 1,000,000,000 $ONETAP</li>
                    <li>• Network: Base (Ethereum L2)</li>
                    <li>• Symbol: $1TAP</li>
                    <li>• Decimals: 18</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Distribution</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 85% - Liquidity Pool (locked 6 months)</li>
                    <li>• 10% - Community Rewards & Airdrops</li>
                    <li>• 3% - Marketing & Partnerships</li>
                    <li>• 2% - Team (1 year linear vesting)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Tax Structure</h3>
                  <p className="text-muted-foreground font-bold">
                    0% Buy Tax | 0% Sell Tax
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We believe in fair trading without hidden fees. Revenue is generated through ecosystem utilities, not transaction taxes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Advanced Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Anti-Whale: Max 2% per transaction, 3% per wallet</li>
                    <li>• Anti-Bot: Launch protection mechanisms</li>
                    <li>• Burn Mechanism: Quarterly manual burns (transparent tracking)</li>
                    <li>• Contract: Verified on BaseScan, ownership renounced post-launch</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Roadmap */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20">
              <h2 className="text-3xl font-bold mb-6">2025 Roadmap</h2>
              
              <div className="space-y-8">
                {/* Phase 1 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Q1 2025 - Launch & Hype</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✅ Website launch with tap-to-earn game</li>
                    <li>✅ Community building (Discord, Telegram, Twitter)</li>
                    <li>✅ Token launch on Base network</li>
                    <li>✅ Initial liquidity lock (6 months)</li>
                    <li>✅ Marketing campaign kickoff</li>
                    <li>✅ First NFT drop event</li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Q2 2025 - Growth & Listings</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🔄 CoinGecko listing</li>
                    <li>🔄 CoinMarketCap listing</li>
                    <li>🔄 DEX trending campaigns</li>
                    <li>🔄 Holder dashboard with portfolio tracking</li>
                    <li>🔄 Referral system launch</li>
                    <li>🔄 NFT marketplace (trade drops)</li>
                  </ul>
                </div>

                {/* Phase 3 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Q3 2025 - Utility & Ecosystem</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🔄 Staking platform (multiple lock periods)</li>
                    <li>🔄 External audit (Hacken or CertiK)</li>
                    <li>🔄 Mobile PWA launch</li>
                    <li>🔄 Partnership announcements</li>
                    <li>🔄 First community token burn</li>
                    <li>🔄 Advanced analytics dashboard</li>
                  </ul>
                </div>

                {/* Phase 4 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Q4 2025 - Innovation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🔄 Steam/CS:GO integration (beta)</li>
                    <li>🔄 DAO governance launch</li>
                    <li>🔄 Launchpad for gaming tokens</li>
                    <li>🔄 Merchandise store</li>
                    <li>🔄 Major CEX listing (target: Binance, Coinbase)</li>
                    <li>🔄 Ecosystem expansion (partnerships, collaborations)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Team */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">The Team</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                $ONETAP is built by a dedicated team of crypto veterans, game developers, and marketing specialists. We use pseudonyms for security and privacy, following the tradition of successful decentralized projects. Our commitment is to transparency through code, not personal identities.
              </p>
              <p className="text-muted-foreground">
                <strong>Core roles:</strong> Founder (Vision & Strategy), Lead Developer (Smart Contracts), Game Developer (Tap-to-Earn), Marketing Lead (Growth), Community Manager (Support).
              </p>
              <div className="mt-6">
                <a
                  href="/team"
                  className="text-primary hover:underline font-semibold"
                >
                  → Meet the full team
                </a>
              </div>
            </Card>
          </motion.section>

          {/* Security & Legal */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Security & Compliance</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Smart Contract Security:</strong> Internal audit completed, external audit by Hacken scheduled for Q3 2025. Contract is open-source and verified on BaseScan.
                </p>
                <p>
                  <strong>Liquidity Security:</strong> Initial LP locked for 6 months via trusted protocol. Lock proof publicly accessible. Extensions decided by DAO vote.
                </p>
                <p>
                  <strong>Legal Disclaimer:</strong> $ONETAP is a utility token for entertainment and ecosystem participation. It is not an investment vehicle, security, or financial product. No guarantees of profit. Crypto carries risk - only invest what you can afford to lose.
                </p>
                <p>
                  <strong>Compliance:</strong> Not affiliated with Valve Corporation or Counter-Strike. All trademarks belong to their respective owners. Fair use under parody and community creation principles.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20 text-center">
              <h2 className="text-3xl font-bold mb-6">Join The Movement</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                $ONETAP is more than a token—it's a community of gamers, dreamers, and believers in the power of decentralization. Together, we're building the future of gaming-themed crypto. One tap at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Full PDF
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Whitepaper;
