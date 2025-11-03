import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ROICalculator = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [investment, setInvestment] = useState('100');
  const [buyPrice, setBuyPrice] = useState('0.0005');
  const [currentPrice, setCurrentPrice] = useState('0.00075');
  
  const calculateROI = () => {
    const investAmount = parseFloat(investment) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const current = parseFloat(currentPrice) || 0;
    
    if (buy === 0) return { tokens: 0, currentValue: 0, profit: 0, roi: 0 };
    
    const tokens = investAmount / buy;
    const currentValue = tokens * current;
    const profit = currentValue - investAmount;
    const roi = ((profit / investAmount) * 100);
    
    return { tokens, currentValue, profit, roi };
  };

  const calculateScenario = (multiplier: number) => {
    const investAmount = parseFloat(investment) || 0;
    const buy = parseFloat(buyPrice) || 0;
    
    if (buy === 0) return { value: 0, profit: 0, roi: 0 };
    
    const tokens = investAmount / buy;
    const futurePrice = buy * multiplier;
    const value = tokens * futurePrice;
    const profit = value - investAmount;
    const roi = ((profit / investAmount) * 100);
    
    return { value, profit, roi };
  };

  const results = calculateROI();
  const scenarios = [
    { label: '+10%', multiplier: 1.1, color: 'text-green-400' },
    { label: '+50%', multiplier: 1.5, color: 'text-green-500' },
    { label: '+100%', multiplier: 2, color: 'text-green-600' },
    { label: '+500%', multiplier: 6, color: 'text-primary' },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Calculator className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            ROI Calculator
          </h2>
          <p className="text-lg text-muted-foreground">
            Calculate potential returns on your $ONETAP investment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Investment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="investment" className="text-foreground mb-2">
                    Investment Amount ($)
                  </Label>
                  <Input
                    id="investment"
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    placeholder="100"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div>
                  <Label htmlFor="buyPrice" className="text-foreground mb-2">
                    Buy Price ($)
                  </Label>
                  <Input
                    id="buyPrice"
                    type="number"
                    step="0.0001"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    placeholder="0.0005"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div>
                  <Label htmlFor="currentPrice" className="text-foreground mb-2">
                    Current Price ($)
                  </Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    step="0.0001"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    placeholder="0.00075"
                    className="bg-background/50 border-primary/20"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Current Returns
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">Tokens Owned</p>
                  <p className="text-2xl font-bold text-foreground">
                    {results.tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${results.currentValue.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground mb-1">Profit/Loss</p>
                  <p className={`text-2xl font-bold ${results.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {results.profit >= 0 ? '+' : ''}${results.profit.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">ROI</p>
                  <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* What If Scenarios */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                "What If" Scenarios
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario, i) => {
                const result = calculateScenario(scenario.multiplier);
                return (
                  <motion.div
                    key={i}
                    className="p-4 rounded-xl bg-background/50 hover:bg-primary/5 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <p className={`text-lg font-bold mb-2 ${scenario.color}`}>
                      {scenario.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      ${result.value.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-500">
                      +${result.profit.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.roi.toFixed(0)}% ROI
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground italic">
            ⚠️ This calculator is for illustrative purposes only. Past performance does not guarantee future results. 
            Cryptocurrency investments carry risk. DYOR.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;