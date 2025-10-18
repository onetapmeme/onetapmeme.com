import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Lock, Users, Droplet, TrendingUp, Wallet, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const data = [
  { name: "Community / Circulation", value: 70, color: "hsl(210, 100%, 55%)", desc: "Public & airdrops" },
  { name: "Liquidity Pool", value: 10, color: "hsl(25, 100%, 55%)", desc: "Locked 6 months" },
  { name: "Marketing & Partnerships", value: 8, color: "hsl(280, 100%, 60%)", desc: "6-month vesting" },
  { name: "Team / Founder", value: 5, color: "hsl(340, 100%, 60%)", desc: "Public wallet visible" },
  { name: "Treasury / Rewards", value: 7, color: "hsl(150, 100%, 45%)", desc: "Staking & Bounties" },
];

const distributionDetails = [
  {
    icon: Users,
    label: "Community / Circulation",
    percentage: 70,
    tokens: "70M",
    description: "Public & airdrops",
    color: "text-[hsl(210,100%,55%)]"
  },
  {
    icon: Lock,
    label: "Liquidity Pool",
    percentage: 10,
    tokens: "10M",
    description: "Locked 6 months - Proof visible",
    color: "text-[hsl(25,100%,55%)]"
  },
  {
    icon: TrendingUp,
    label: "Marketing & Partnerships",
    percentage: 8,
    tokens: "8M",
    description: "6-month vesting schedule",
    color: "text-[hsl(280,100%,60%)]"
  },
  {
    icon: Wallet,
    label: "Team / Founder",
    percentage: 5,
    tokens: "5M",
    description: "Public wallet visible",
    color: "text-[hsl(340,100%,60%)]"
  },
  {
    icon: Coins,
    label: "Treasury / Rewards / Staking / Bounties",
    percentage: 7,
    tokens: "7M",
    description: "Community incentives",
    color: "text-[hsl(150,100%,45%)]"
  },
];

const TokenomicsChart = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <Card ref={ref} className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
      <h3 className="text-xl font-bold mb-6 text-center text-foreground">Token Allocation Breakdown</h3>
      
      {/* Animated Donut Chart */}
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${value}%`}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              isAnimationActive={isVisible}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isVisible ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground))",
                padding: "12px"
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value}% (${(value * 1000000).toLocaleString()} tokens)`,
                props.payload.desc
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution Details */}
      <div className="space-y-3">
        {distributionDetails.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
              style={{ backgroundColor: data[index].color }}
            >
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.tokens}</span>
                  <span className={`font-bold ${item.color}`}>{item.percentage}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-border animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-semibold">Liquidity Locked</span>
        </div>
        <p className="text-xs text-muted-foreground">
          LP tokens locked for 6 months until {new Date(Date.now() + 180*24*60*60*1000).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </p>
      </div>
    </Card>
  );
};

export default TokenomicsChart;
