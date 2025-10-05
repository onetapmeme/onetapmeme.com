import { PieChart, Lock, Flame, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const Tokenomics = () => {
  const distribution = [
    { label: "Fair Launch", percentage: 100, icon: Users, color: "text-primary" },
  ];

  return (
    <section id="tokenomics" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            Tokenomics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and designed for sustainable growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Token Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-2 border-primary/30">
              <div className="flex items-center gap-4 mb-4">
                <Lock className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Total Supply</h3>
                  <p className="text-3xl font-bold text-primary">100,000,000</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-2 border-primary/30">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">Network</h3>
                <p className="text-2xl font-bold text-primary">Base</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Symbol</h3>
                <p className="text-2xl font-bold text-primary">$ONETAP</p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-2 border-secondary/30">
              <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Flame className="w-6 h-6 text-secondary" />
                Tax Structure
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction Tax:</span>
                  <span className="text-xl font-bold text-secondary">3%</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1 mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span>• Development</span>
                    <span>1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Marketing</span>
                    <span>1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Liquidity Pool</span>
                    <span>1%</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-muted/30 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Lock className="w-4 h-4 inline mr-2" />
                100% Fair Launch. Liquidity locked for 3 months. ERC20 standard.
              </p>
            </div>
          </div>

          {/* Distribution */}
          <div className="space-y-4">
            {distribution.map((item, i) => (
              <Card
                key={i}
                className="p-6 bg-card border-2 border-primary/20 hover:border-primary transition-all duration-300 animate-pixel-fade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                    <span className="text-lg font-bold text-foreground">{item.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-accent rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
