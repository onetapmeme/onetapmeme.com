import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Lock, Users, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

const data = [
  { name: "Fair Launch", value: 100, color: "hsl(var(--primary))" },
];

const distributionDetails = [
  {
    icon: Users,
    label: "Fair Launch",
    percentage: 100,
    description: "100% public sale, no team allocation",
    color: "text-primary"
  },
];

const TokenomicsChart = () => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
      <h3 className="text-xl font-bold mb-6 text-center text-foreground">Distribution Breakdown</h3>
      
      {/* Animated Pie Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground))"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution Details */}
      <div className="space-y-4">
        {distributionDetails.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground">{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tax Breakdown */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-secondary" />
          <h4 className="font-bold text-foreground">Tax Breakdown (3%)</h4>
        </div>
        
        <div className="space-y-2">
          {[
            { label: "Development", percent: 1, color: "bg-blue-500" },
            { label: "Marketing", percent: 1, color: "bg-purple-500" },
            { label: "Liquidity Pool", percent: 1, color: "bg-green-500" },
          ].map((tax, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{tax.label}</span>
                  <span className="font-semibold text-foreground">{tax.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${tax.color} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${(tax.percent / 3) * 100}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-semibold">Liquidity Locked</span>
        </div>
        <p className="text-xs text-muted-foreground">
          LP tokens locked until {new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString('en-US', { 
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
