import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Share2, Award, Copy, Check, Twitter, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import WalletConnect from './WalletConnect';

const ReferralDashboard = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { address, isConnected } = useAccount();
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    referrals: 0,
    volume: 0,
    rewards: 0,
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // Generate referral code from wallet address
  useEffect(() => {
    if (isConnected && address) {
      const code = address.slice(2, 10).toUpperCase();
      setReferralCode(code);
      loadReferralStats();
      loadLeaderboard();
    }
  }, [isConnected, address]);

  const loadReferralStats = async () => {
    if (!address) return;
    
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_wallet', address);

    if (!error && data) {
      const totalVolume = data.reduce((sum, ref) => sum + Number(ref.volume_generated), 0);
      const totalRewards = data.reduce((sum, ref) => sum + Number(ref.rewards_earned), 0);
      
      setStats({
        referrals: data.length,
        volume: totalVolume,
        rewards: totalRewards,
      });
    }
  };

  const loadLeaderboard = async () => {
    const { data, error } = await supabase
      .from('referrals')
      .select('referrer_wallet, volume_generated, rewards_earned')
      .order('volume_generated', { ascending: false })
      .limit(50);

    if (!error && data) {
      // Aggregate by referrer
      const aggregated = data.reduce((acc: any, curr) => {
        const wallet = curr.referrer_wallet;
        if (!acc[wallet]) {
          acc[wallet] = {
            wallet,
            volume: 0,
            rewards: 0,
            count: 0,
          };
        }
        acc[wallet].volume += Number(curr.volume_generated);
        acc[wallet].rewards += Number(curr.rewards_earned);
        acc[wallet].count += 1;
        return acc;
      }, {});

      const sorted = Object.values(aggregated)
        .sort((a: any, b: any) => b.volume - a.volume)
        .slice(0, 10);
      
      setLeaderboard(sorted);
    }
  };

  const getReferralLink = () => {
    return `${window.location.origin}?ref=${referralCode}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `Join me on $1TAP! 🎮💰 Use my referral code: ${referralCode}`;
    const url = getReferralLink();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const shareOnTelegram = () => {
    const text = `Join me on $1TAP! Use my referral code: ${referralCode}`;
    const url = getReferralLink();
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <section ref={ref} className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Referral Program
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect your wallet to access your referral dashboard and start earning rewards.
            </p>
            <WalletConnect />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Referral Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Earn rewards by inviting friends to $1TAP
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <Users className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Total Referrals
              </p>
              <p className="text-3xl font-bold text-foreground">
                {stats.referrals}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <Share2 className="w-8 h-8 text-accent mb-4" />
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Volume Generated
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${stats.volume.toFixed(2)}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <Award className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                Rewards Earned
              </p>
              <p className="text-3xl font-bold text-foreground">
                ${stats.rewards.toFixed(2)}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20 mb-12">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Your Referral Link
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Input
                readOnly
                value={getReferralLink()}
                className="flex-1 bg-background/50 border-primary/20"
              />
              <Button
                onClick={handleCopy}
                className="gap-2"
                style={{
                  background: 'linear-gradient(135deg, hsl(210, 100%, 60%), hsl(210, 100%, 50%))',
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </AnimatePresence>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={shareOnTwitter}
                className="gap-2 flex-1"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </Button>
              <Button
                variant="outline"
                onClick={shareOnTelegram}
                className="gap-2 flex-1"
              >
                <Send className="w-4 h-4" />
                Share on Telegram
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20">
            <h3 className="text-xl font-bold mb-6 text-foreground">
              Top 10 Referrers 🏆
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry: any, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    entry.wallet === address
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-background/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {formatAddress(entry.wallet)}
                        {entry.wallet === address && (
                          <span className="ml-2 text-xs text-primary">(You)</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.count} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      ${entry.volume.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ${entry.rewards.toFixed(2)} earned
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralDashboard;