import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Twitter, Send, Users, Trophy, Gift, TrendingUp, Crown, Medal, Award, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReferralStats {
  totalReferrals: number;
  volumeGenerated: number;
  rewardsEarned: number;
  rank: number;
}

interface LeaderboardEntry {
  wallet: string;
  referrals: number;
  volume: number;
  rewards: number;
  rank: number;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  requirement: number;
  reward: string;
  icon: React.ReactNode;
  achieved: boolean;
}

const ReferralDashboard = () => {
  const [referralCode, setReferralCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    volumeGenerated: 0,
    rewardsEarned: 0,
    rank: 0
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Milestones avec récompenses progressives
  const milestones: Milestone[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Parrainez votre premier ami',
      requirement: 1,
      reward: '100 $1TAP',
      icon: <Star className="w-5 h-5" />,
      achieved: stats.totalReferrals >= 1
    },
    {
      id: 'ambassador',
      name: 'Ambassador',
      description: 'Parrainez 5 amis',
      requirement: 5,
      reward: '500 $1TAP + NFT Badge',
      icon: <Award className="w-5 h-5" />,
      achieved: stats.totalReferrals >= 5
    },
    {
      id: 'influencer',
      name: 'Influencer',
      description: 'Parrainez 25 amis',
      requirement: 25,
      reward: '2,500 $1TAP + Whitelist',
      icon: <Medal className="w-5 h-5" />,
      achieved: stats.totalReferrals >= 25
    },
    {
      id: 'legend',
      name: 'Legend',
      description: 'Parrainez 100 amis',
      requirement: 100,
      reward: '10,000 $1TAP + VIP Access',
      icon: <Crown className="w-5 h-5" />,
      achieved: stats.totalReferrals >= 100
    }
  ];

  useEffect(() => {
    const savedWallet = localStorage.getItem('referralWallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      generateReferralCode(savedWallet);
      loadReferralData(savedWallet);
    } else {
      const tempWallet = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
      setWalletAddress(tempWallet);
      localStorage.setItem('referralWallet', tempWallet);
      generateReferralCode(tempWallet);
      loadReferralData(tempWallet);
    }
    loadLeaderboard();
  }, []);

  const generateReferralCode = (wallet: string) => {
    const code = `1TAP-${wallet.slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setReferralCode(code);
  };

  const loadReferralData = async (wallet: string) => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_wallet', wallet);

      if (error) throw error;

      const totalReferrals = data?.length || 0;
      const volumeGenerated = data?.reduce((sum, r) => sum + (r.volume_generated || 0), 0) || 0;
      const rewardsEarned = data?.reduce((sum, r) => sum + (r.rewards_earned || 0), 0) || 0;

      setStats({
        totalReferrals,
        volumeGenerated,
        rewardsEarned,
        rank: 0
      });
    } catch (error) {
      console.error('Error loading referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('referrer_wallet, volume_generated, rewards_earned')
        .order('volume_generated', { ascending: false });

      if (error) throw error;

      const aggregated = data?.reduce((acc: Record<string, LeaderboardEntry>, curr) => {
        const wallet = curr.referrer_wallet;
        if (!acc[wallet]) {
          acc[wallet] = {
            wallet,
            referrals: 0,
            volume: 0,
            rewards: 0,
            rank: 0
          };
        }
        acc[wallet].referrals += 1;
        acc[wallet].volume += curr.volume_generated || 0;
        acc[wallet].rewards += curr.rewards_earned || 0;
        return acc;
      }, {});

      const sorted = Object.values(aggregated || {})
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      setLeaderboard(sorted);

      if (walletAddress) {
        const userRank = sorted.findIndex(e => e.wallet === walletAddress) + 1;
        setStats(prev => ({ ...prev, rank: userRank || 999 }));
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };

  const getReferralLink = () => {
    return `${window.location.origin}?ref=${referralCode}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink());
      setCopied(true);
      toast({
        title: "Lien copié! 🎉",
        description: "Partagez-le pour gagner des récompenses",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive"
      });
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`🚀 Rejoignez la révolution $1TAP! Utilisez mon lien de parrainage pour des bonus exclusifs! 🎁\n\n${getReferralLink()}\n\n#OneTap #Crypto #Meme`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(`🚀 Rejoignez la révolution $1TAP! Utilisez mon lien de parrainage pour des bonus exclusifs! 🎁`);
    const url = encodeURIComponent(getReferralLink());
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const formatAddress = (address: string) => {
    if (address.length > 12) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-muted-foreground font-mono">#{rank}</span>;
    }
  };

  const getNextMilestone = () => {
    return milestones.find(m => !m.achieved);
  };

  const nextMilestone = getNextMilestone();
  const progress = nextMilestone 
    ? (stats.totalReferrals / nextMilestone.requirement) * 100 
    : 100;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            <Gift className="w-4 h-4 mr-2" />
            Programme Parrainage
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Parrainez & <span className="text-primary">Gagnez</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invitez vos amis et gagnez jusqu'à 10% de leurs transactions en récompenses $1TAP
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                    <p className="text-xs text-muted-foreground">Parrainages</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">${formatNumber(stats.volumeGenerated)}</p>
                    <p className="text-xs text-muted-foreground">Volume Généré</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Gift className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{formatNumber(stats.rewardsEarned)}</p>
                    <p className="text-xs text-muted-foreground">$1TAP Gagnés</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">#{stats.rank || '-'}</p>
                    <p className="text-xs text-muted-foreground">Classement</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    Votre Lien de Parrainage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border/50">
                    <code className="flex-1 text-sm truncate">{getReferralLink()}</code>
                    <Button 
                      size="sm" 
                      onClick={handleCopy}
                      variant={copied ? "default" : "outline"}
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-background/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Code:</span>
                    <code className="font-bold text-primary">{referralCode}</code>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={shareOnTwitter} 
                      className="flex-1 gap-2"
                      variant="outline"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button 
                      onClick={shareOnTelegram} 
                      className="flex-1 gap-2"
                      variant="outline"
                    >
                      <Send className="w-4 h-4" />
                      Telegram
                    </Button>
                    <Button 
                      onClick={handleCopy} 
                      className="flex-1 gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Objectifs & Récompenses
                  </CardTitle>
                  {nextMilestone && (
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Prochain: {nextMilestone.name}</span>
                        <span>{stats.totalReferrals}/{nextMilestone.requirement}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`p-4 rounded-lg border text-center transition-all ${
                          milestone.achieved
                            ? 'bg-primary/20 border-primary/50'
                            : 'bg-background/50 border-border/50 opacity-60'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          milestone.achieved ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {milestone.icon}
                        </div>
                        <p className="font-semibold text-sm">{milestone.name}</p>
                        <p className="text-xs text-muted-foreground">{milestone.requirement} refs</p>
                        <Badge variant={milestone.achieved ? "default" : "secondary"} className="mt-2 text-xs">
                          {milestone.reward}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Top Ambassadeurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Soyez le premier ambassadeur!</p>
                      <p className="text-sm">Partagez votre lien pour apparaître ici</p>
                    </div>
                  ) : (
                    leaderboard.map((entry, index) => (
                      <motion.div
                        key={entry.wallet}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          entry.wallet === walletAddress
                            ? 'bg-primary/20 border border-primary/50'
                            : 'bg-background/50'
                        }`}
                      >
                        <div className="w-8 text-center">
                          {getRankIcon(entry.rank)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {formatAddress(entry.wallet)}
                            {entry.wallet === walletAddress && (
                              <Badge variant="outline" className="ml-2 text-xs">Vous</Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.referrals} refs • ${formatNumber(entry.volume)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{formatNumber(entry.rewards)}</p>
                          <p className="text-xs text-muted-foreground">$1TAP</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="mt-6 p-4 bg-background/30 rounded-lg border border-border/30">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-primary" />
                    Comment ça marche
                  </h4>
                  <ol className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">1</span>
                      Partagez votre lien unique
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">2</span>
                      Vos amis achètent $1TAP
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">3</span>
                      Gagnez 10% de leurs transactions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">4</span>
                      Débloquez des bonus exclusifs
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReferralDashboard;
