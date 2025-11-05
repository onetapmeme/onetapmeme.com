import { Users, Lock, TrendingUp, Wallet, Coins, PieChart as PieChartIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const TokenDistribution = () => {
  const distribution = [
    {
      icon: Users,
      category: "Community / Circulation",
      percentage: 70,
      tokens: "70M",
      color: "text-primary",
      bgColor: "bg-primary/10",
      notes: "Public & airdrops"
    },
    {
      icon: Lock,
      category: "Liquidity Pool (locked 6 months)",
      percentage: 10,
      tokens: "10M",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      notes: "Proof visible"
    },
    {
      icon: TrendingUp,
      category: "Marketing & Partnerships (vesting)",
      percentage: 8,
      tokens: "8M",
      color: "text-accent",
      bgColor: "bg-accent/10",
      notes: "6-month vest"
    },
    {
      icon: Wallet,
      category: "Team / Founder",
      percentage: 5,
      tokens: "5M",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      notes: "Public wallet visible"
    },
    {
      icon: Coins,
      category: "Treasury / Rewards / Staking / Bounties",
      percentage: 7,
      tokens: "7M",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      notes: "Dynamic system"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <PieChartIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">Balanced Launch</h3>
        <p className="text-sm md:text-base text-muted-foreground">100,000,000 total supply — structured and fair</p>
      </div>

      <div className="space-y-4">
        {distribution.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="glass-effect p-5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-base md:text-lg font-bold text-foreground">{item.category}</h4>
                    <span className="text-xl md:text-2xl font-bold text-primary">{item.percentage}%</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.tokens} tokens
                  </p>
                  
                  <div className="mb-2">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground italic">
                    {item.notes}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* LP Lock Notice */}
      <Card className="glass-effect p-6 border-2 border-primary/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-bold text-foreground mb-1">
              Liquidity Pool Locked 6 Months
            </h4>
            <p className="text-sm text-muted-foreground">
              LP secured until {new Date(Date.now() + 180*24*60*60*1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TokenDistribution;
