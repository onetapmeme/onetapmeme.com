import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Star, TrendingUp, Award } from "lucide-react";
import DailyQuests from "@/components/DailyQuests";

const DailyQuestsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

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
              <Calendar className="w-10 h-10 text-background" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(22,163,224,0.6)]">
              DAILY QUESTS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Complete daily challenges to earn bonus XP and level up faster!
            </p>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Bonus XP</h3>
                <p className="text-sm text-muted-foreground">
                  Earn extra experience points for each completed quest
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Daily Refresh</h3>
                <p className="text-sm text-muted-foreground">
                  New quests unlock every 24 hours for fresh challenges
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Stack Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Complete all quests for a massive XP multiplier bonus
                </p>
              </Card>
            </div>
          </div>

          {/* Main Quests Section */}
          <div className="max-w-5xl mx-auto">
            <DailyQuests />
          </div>

          {/* Quest Tips */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20 max-w-5xl mx-auto mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">
              Quest Tips & Strategies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">💡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Plan Your Day</h3>
                    <p className="text-sm text-muted-foreground">
                      Check quests early and plan your activities to maximize completion efficiency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Focus on Easy Wins</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete simple quests first to build momentum and earn quick rewards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Combine Activities</h3>
                    <p className="text-sm text-muted-foreground">
                      Work on multiple quests at once - tap while sharing memes to double your progress!
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">🔄</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Daily Consistency</h3>
                    <p className="text-sm text-muted-foreground">
                      Log in daily to maintain your streak and unlock bonus multipliers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Complete All Quests</h3>
                    <p className="text-sm text-muted-foreground">
                      Finishing all daily quests grants a special completion bonus worth 2x XP!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">📱</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Stay Connected</h3>
                    <p className="text-sm text-muted-foreground">
                      Login with your wallet to track progress across devices and never lose rewards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quest Categories Info */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur border-blue-500/20">
              <h3 className="text-xl font-bold mb-3 text-blue-400">🎮 Action Quests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tap, click, and interact with the platform to complete these active challenges.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Tap X times</p>
                <p>• Generate memes</p>
                <p>• Craft items</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur border-purple-500/20">
              <h3 className="text-xl font-bold mb-3 text-purple-400">🤝 Social Quests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share, engage, and connect with the community to earn social rewards.
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Share on X (Twitter)</p>
                <p>• Invite friends</p>
                <p>• Join community</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur border-green-500/20">
              <h3 className="text-xl font-bold mb-3 text-green-400">📅 Login Quests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Simple daily login rewards - just show up and claim your bonus XP!
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Daily check-in</p>
                <p>• Streak bonuses</p>
                <p>• Free rewards</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestsPage;
