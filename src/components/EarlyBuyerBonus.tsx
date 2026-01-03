import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Zap,
  Gift,
  Trophy,
  Users,
  TrendingUp,
  AlertCircle,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLaunchConfig } from "@/config/launch";

interface BonusTier {
  name: string;
  discount: string;
  icon: React.ElementType;
  color: string;
  timeLimit: string;
  perks: string[];
}

const bonusTiers: BonusTier[] = [
  {
    name: "Diamond Hands",
    discount: "10% Bonus",
    icon: Trophy,
    color: "from-cyan-400 to-blue-500",
    timeLimit: "First 24 Hours",
    perks: ["Exclusive NFT Airdrop", "VIP Discord Role", "10% Extra Tokens"],
  },
  {
    name: "Early Bird",
    discount: "5% Bonus",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    timeLimit: "First 48 Hours",
    perks: ["Rare NFT Drop", "Early Supporter Badge", "5% Extra Tokens"],
  },
  {
    name: "OG Holder",
    discount: "Whitelist",
    icon: Gift,
    color: "from-purple-400 to-pink-500",
    timeLimit: "First Week",
    perks: ["Future Airdrop Eligibility", "Governance Voting Rights"],
  },
];

const EarlyBuyerBonus = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [currentBuyers, setCurrentBuyers] = useState(0);
  const [activeTier, setActiveTier] = useState(0);

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getLaunchConfig();
      setIsLaunched(config.isLaunched);
      setLaunchDate(new Date(config.launchDate));
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!launchDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Post-launch: calculate bonus tier expiration
        const hoursSinceLaunch = Math.abs(diff) / (1000 * 60 * 60);
        
        if (hoursSinceLaunch < 24) {
          setActiveTier(0); // Diamond tier
        } else if (hoursSinceLaunch < 48) {
          setActiveTier(1); // Early Bird tier
        } else if (hoursSinceLaunch < 168) { // 7 days
          setActiveTier(2); // OG tier
        } else {
          setActiveTier(-1); // No bonus
        }

        // Calculate time until next tier expires
        let nextExpiry: number;
        if (hoursSinceLaunch < 24) {
          nextExpiry = launchDate.getTime() + 24 * 60 * 60 * 1000 - now.getTime();
        } else if (hoursSinceLaunch < 48) {
          nextExpiry = launchDate.getTime() + 48 * 60 * 60 * 1000 - now.getTime();
        } else if (hoursSinceLaunch < 168) {
          nextExpiry = launchDate.getTime() + 168 * 60 * 60 * 1000 - now.getTime();
        } else {
          nextExpiry = 0;
        }

        if (nextExpiry > 0) {
          setTimeRemaining({
            days: Math.floor(nextExpiry / (1000 * 60 * 60 * 24)),
            hours: Math.floor((nextExpiry % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((nextExpiry % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((nextExpiry % (1000 * 60)) / 1000),
          });
        }
      } else {
        // Pre-launch countdown
        setTimeRemaining({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  // Simulate increasing buyer count
  useEffect(() => {
    if (!isLaunched) return;
    
    const interval = setInterval(() => {
      setCurrentBuyers((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLaunched]);

  // No bonus available
  if (activeTier === -1 && isLaunched) {
    return null;
  }

  const currentTier = bonusTiers[activeTier] || bonusTiers[0];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* FOMO Banner */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg"
            >
              <Flame className="w-4 h-4" />
              <span>LIMITED TIME OFFER</span>
              <Flame className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Main Card */}
          <div
            className={`glass-effect rounded-3xl p-8 border-2 border-primary/30 bg-gradient-to-br ${currentTier.color} bg-opacity-10 relative overflow-hidden`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className={`absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br ${currentTier.color} opacity-20 blur-3xl`}
              />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${currentTier.color} mb-4`}
                >
                  <currentTier.icon className="w-6 h-6 text-white" />
                  <span className="text-xl font-bold text-white">
                    {currentTier.name} Bonus
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {isLaunched ? "Bonus Ends In" : "Launch Countdown"}
                </h2>
                <p className="text-muted-foreground">
                  {isLaunched
                    ? `Get ${currentTier.discount} for being an early buyer!`
                    : "Be ready when the token launches!"}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-8">
                {[
                  { value: timeRemaining.days, label: "Days" },
                  { value: timeRemaining.hours, label: "Hours" },
                  { value: timeRemaining.minutes, label: "Mins" },
                  { value: timeRemaining.seconds, label: "Secs" },
                ].map((unit, i) => (
                  <motion.div
                    key={unit.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-background/80 border border-primary/30 flex items-center justify-center mb-2">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={unit.value}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="text-2xl md:text-3xl font-bold"
                        >
                          {String(unit.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bonus Tiers */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {bonusTiers.map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      activeTier === index
                        ? `border-primary bg-gradient-to-br ${tier.color} bg-opacity-20`
                        : index < activeTier
                        ? "border-muted bg-muted/20 opacity-50"
                        : "border-border bg-background/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <tier.icon
                        className={`w-5 h-5 ${
                          activeTier === index ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="font-bold">{tier.name}</span>
                    </div>
                    <p className="text-lg font-bold mb-2">{tier.discount}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {tier.timeLimit}
                    </p>
                    <ul className="space-y-1">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="text-xs flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    {index < activeTier && isLaunched && (
                      <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Expired
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Live Buyer Count */}
              {isLaunched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-4 mb-6 p-4 rounded-xl bg-background/50"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-bold">{currentBuyers.toLocaleString()}</span>
                    <span className="text-muted-foreground">buyers today</span>
                  </div>
                  <div className="w-px h-6 bg-border" />
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-bold">+{Math.floor(Math.random() * 50 + 10)}%</span>
                    <span className="text-muted-foreground">in 24h</span>
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <div className="text-center">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentTier.color} hover:opacity-90 text-white px-8 py-6 text-lg`}
                  asChild
                >
                  <a
                    href="https://app.uniswap.org/#/swap?outputCurrency=0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8&chain=base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {isLaunched ? `Claim ${currentTier.discount} Now` : "Set Reminder"}
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Bonus automatically applied for early buyers
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EarlyBuyerBonus;
