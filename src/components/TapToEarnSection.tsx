import { useTranslation } from "react-i18next";
import { Trophy, Sparkles, Gift, Zap, Crown, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import TapSimulatorGame from "@/components/TapSimulatorGame";
import TapLeaderboard from "@/components/TapLeaderboard";

const TapToEarnSection = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const rarityTiers = [
    { name: "Common", color: "from-gray-400 to-gray-500", textColor: "text-gray-400", emoji: "⚪", description: "Basic items and backgrounds", rate: "60.0%" },
    { name: "Uncommon", color: "from-green-400 to-green-500", textColor: "text-green-400", emoji: "🟢", description: "Standard quality drops", rate: "25.0%" },
    { name: "Rare", color: "from-blue-400 to-blue-500", textColor: "text-blue-400", emoji: "🔵", description: "Notable skins and maps", rate: "10.0%" },
    { name: "Epic", color: "from-purple-400 to-purple-500", textColor: "text-purple-400", emoji: "🟣", description: "Premium weapons and backgrounds", rate: "3.0%" },
    { name: "Legendary", color: "from-yellow-400 to-orange-500", textColor: "text-yellow-400", emoji: "🟡", description: "Exceptional legendary items", rate: "1.6%" },
    { name: "Mythic", color: "from-red-400 to-pink-500", textColor: "text-red-400", emoji: "🔴", description: "Ultimate prestige rewards", rate: "0.4%" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Earn XP",
      description: "Tap to accumulate XP and climb through competitive ranks",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Trophy,
      title: "Rank Up",
      description: "Progress from Silver I to The Global Elite and beyond",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400"
    },
    {
      icon: Gift,
      title: "Unlock Drops",
      description: "Earn exclusive items, skins, and backgrounds at each rank",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Crown,
      title: "Build Inventory",
      description: "Collect rare items for the meme generator and showcase your collection",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <section
      id="tap-to-earn"
      ref={ref}
      className={`py-12 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-6">
            <Zap className="w-16 h-16 md:w-20 md:h-20 text-primary icon-float icon-glow" />
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 25%, hsl(210, 100%, 65%) 50%, hsl(25, 100%, 55%) 75%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 8s linear infinite',
            }}
          >
            TAP TO EARN
          </h2>
          <div className="max-w-3xl mx-auto px-4 space-y-3">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Click to earn XP, climb ranks, and unlock exclusive drops. 
              Build your collection of legendary items and backgrounds for the meme generator.
            </p>
            <p className="text-sm md:text-base text-accent/80 font-semibold">
              🚧 Currently in development - Coming soon!
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 glass-effect border-primary/20 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <feature.icon className={`w-10 h-10 ${feature.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`} 
                  style={{ filter: 'drop-shadow(0 0 20px currentColor)' }} />
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Game and Leaderboard Section */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Left: Game (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <TapSimulatorGame />
            
            {/* Rarity Tiers */}
            <Card className="p-6 md:p-8 glass-effect border-primary/30">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-8 h-8 text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px currentColor)' }} />
                <h3 className="text-2xl font-bold text-foreground">Rarity Tiers</h3>
              </div>
              <div className="space-y-4">
                {rarityTiers.map((tier, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className={`text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {tier.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold ${tier.textColor}`}>{tier.name}</h4>
                          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${tier.color}`} />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{tier.rate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* How It Works */}
            <Card className="p-6 glass-effect border-accent/30">
              <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Gift className="w-6 h-6 text-accent" />
                How It Works
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span><strong className="text-foreground">Click</strong> the TAP TO EARN button to gain XP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span><strong className="text-foreground">Rank up</strong> through 18 competitive ranks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span><strong className="text-foreground">Unlock drops</strong> at each rank - items, skins, and backgrounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span><strong className="text-foreground">Sign in</strong> to save your progress and build your inventory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span><strong className="text-foreground">Use drops</strong> in the meme generator to create unique content</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right: Leaderboard (1 column) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <TapLeaderboard />
            </div>
          </div>
        </div>

        {/* Legendary Drops Showcase */}
        <Card className="p-8 md:p-12 glass-effect border-2 border-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
                Legendary Drops
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Reach the highest ranks to unlock these prestigious items
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "AWP Dragon Lore", rank: "Silver Elite", emoji: "🐉" },
                { name: "Karambit Fade", rank: "Master Guardian I", emoji: "🔪" },
                { name: "Karambit Doppler", rank: "DMG", emoji: "💎" },
                { name: "Elite Badge", rank: "Global Elite", emoji: "🏆" }
              ].map((drop, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group text-center"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {drop.emoji}
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{drop.name}</h4>
                  <p className="text-xs text-yellow-400">{drop.rank}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TapToEarnSection;
