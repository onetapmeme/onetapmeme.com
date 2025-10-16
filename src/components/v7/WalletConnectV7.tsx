import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ChevronRight, CheckCircle2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const WalletConnectV7 = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect with MetaMask',
      popular: true,
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Scan with mobile wallet',
      popular: true,
    },
    {
      name: 'Coinbase Wallet',
      icon: '💙',
      description: 'Connect with Coinbase',
      popular: false,
    },
    {
      name: 'Rainbow',
      icon: '🌈',
      description: 'Connect with Rainbow',
      popular: false,
    },
  ];

  const handleConnect = async (walletName: string) => {
    // Placeholder - implement real wallet connection
    console.log(`Connecting to ${walletName}...`);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress('0x742d...3a9f');
    }, 1000);
  };

  if (isConnected) {
    return (
      <Card className="glass-effect-v7 p-4 border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Connected</div>
              <div className="text-xs text-muted-foreground font-mono">{address}</div>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsConnected(false)}
            className="text-destructive hover:bg-destructive/10"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-border/50 hover:border-primary/50"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to connect to $ONETAP
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {wallets.map((wallet, i) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full justify-between h-auto p-4 border-border/50 hover:border-primary/50 hover:bg-primary/5 group"
                onClick={() => handleConnect(wallet.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{wallet.icon}</div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{wallet.name}</span>
                      {wallet.popular && (
                        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{wallet.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-sm font-medium text-foreground">Secure Connection</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We never store your private keys. Your wallet remains under your complete control.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectV7;
