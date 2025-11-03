import { useState, useEffect } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, TrendingUp, Clock, Award, LogOut, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import WalletConnect from './WalletConnect';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const WalletDashboard = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  
  const [copied, setCopied] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState('Silver');

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Mock data - replace with real API calls
  useEffect(() => {
    if (isConnected && address) {
      // TODO: Fetch real $ONETAP balance from contract
      setTokenBalance(1500000);
      setUsdValue(750);
      
      // TODO: Fetch XP from player_progress table
      setXp(2500);
      setRank('Gold Nova');
    }
  }, [isConnected, address]);

  const mockTransactions = [
    { type: 'buy', amount: '500,000 $1TAP', time: '2 hours ago', usd: '$250' },
    { type: 'sell', amount: '200,000 $1TAP', time: '1 day ago', usd: '$100' },
    { type: 'claim', amount: '50,000 $1TAP', time: '3 days ago', usd: '$25' },
  ];

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
            <Wallet className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Connect Your Wallet
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect your wallet to view your portfolio, track rewards, and manage your $ONETAP holdings.
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
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-foreground">
              Your Portfolio
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{formatAddress(address!)}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => disconnect()}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        </motion.div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  $ONETAP Balance
                </span>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">
                {tokenBalance.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ ${usdValue.toFixed(2)} USD
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  XP Earned
                </span>
                <Award className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">
                {xp.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Rank: {rank}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Holdings %
                </span>
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">
                {((tokenBalance / 1000000000) * 100).toFixed(4)}%
              </p>
              <p className="text-sm text-muted-foreground">
                of total supply
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Recent Transactions
              </h3>
            </div>
            <div className="space-y-4">
              {mockTransactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'buy'
                          ? 'bg-green-500/10 text-green-500'
                          : tx.type === 'sell'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {tx.type === 'buy' ? '↑' : tx.type === 'sell' ? '↓' : '★'}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground capitalize">
                        {tx.type}
                      </p>
                      <p className="text-sm text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{tx.amount}</p>
                    <p className="text-sm text-muted-foreground">{tx.usd}</p>
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

export default WalletDashboard;