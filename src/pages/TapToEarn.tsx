import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Target, Zap, Gift } from "lucide-react";
import TapSimulatorGame from "@/components/TapSimulatorGame";
import TapLeaderboard from "@/components/TapLeaderboard";

const TapToEarn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
            className="mb-6 bg-background/50 backdrop-blur border-primary/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>

          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-accent shadow-glow-primary">
              <Zap className="w-10 h-10 text-background" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(22,163,224,0.6)]">
              TAP TO EARN
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Click to earn XP, rank up through CS:GO-inspired tiers, and unlock exclusive drops!
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Rank Up</h3>
                <p className="text-sm text-muted-foreground">
                  Progress through 18 CS:GO ranks from Silver to Global Elite
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Unlock Drops</h3>
                <p className="text-sm text-muted-foreground">
                  Earn legendary skins, weapons, and rare collectibles
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Compete</h3>
                <p className="text-sm text-muted-foreground">
                  Climb the leaderboard and become the top player
                </p>
              </Card>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-7xl mx-auto">
            {/* Game Section */}
            <div className="space-y-6">
              <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
                <TapSimulatorGame />
              </Card>

              {/* How It Works */}
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
                <h2 className="text-2xl font-bold mb-4 text-primary">How It Works</h2>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p><strong className="text-foreground">Tap to Earn:</strong> Each tap awards 1-3 XP. Keep clicking to accumulate XP!</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p><strong className="text-foreground">Rank Up:</strong> Reach XP thresholds to advance through 18 CS:GO-inspired ranks.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p><strong className="text-foreground">Unlock Drops:</strong> Each rank unlocks a guaranteed drop. Random drops can appear while tapping!</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">4</span>
                    </div>
                    <p><strong className="text-foreground">Auto-Save:</strong> Your progress saves automatically. Come back anytime!</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Leaderboard Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
                <TapLeaderboard />
              </Card>
            </div>
          </div>

          {/* Rarity Tiers Info */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 max-w-7xl mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-accent bg-clip-text text-transparent">
              Rarity Tiers
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🥈</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Common</h3>
                <p className="text-sm text-muted-foreground">60% drop rate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <span className="text-2xl">💠</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Rare</h3>
                <p className="text-sm text-muted-foreground">25% drop rate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Epic</h3>
                <p className="text-sm text-muted-foreground">10% drop rate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="font-bold text-lg mb-1">Legendary</h3>
                <p className="text-sm text-muted-foreground">5% drop rate</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TapToEarn;
