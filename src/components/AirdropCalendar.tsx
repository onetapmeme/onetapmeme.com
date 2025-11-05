import { Calendar, Gift, Trophy, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AirdropCalendar = () => {
  const { t } = useTranslation();

  const airdrops = [
    {
      icon: Zap,
      title: t('airdrops.weekly.title'),
      description: t('airdrops.weekly.description'),
      schedule: t('airdrops.weekly.schedule'),
      reward: "100-1,000 $ONETAP",
      status: "active",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Gift,
      title: t('airdrops.meme.title'),
      description: t('airdrops.meme.description'),
      schedule: t('airdrops.meme.schedule'),
      reward: "1,000,000 $ONETAP",
      status: "upcoming",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      icon: Users,
      title: t('airdrops.referral.title'),
      description: t('airdrops.referral.description'),
      schedule: t('airdrops.referral.schedule'),
      reward: "2x Multiplier",
      status: "active",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      title: t('airdrops.tournament.title'),
      description: t('airdrops.tournament.description'),
      schedule: t('airdrops.tournament.schedule'),
      reward: "50,000 $ONETAP",
      status: "upcoming",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-500 animate-pulse" 
      : "bg-blue-500";
  };

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {t('airdrops.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('airdrops.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {airdrops.map((airdrop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 h-full relative overflow-hidden group">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${airdrop.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${airdrop.gradient} flex items-center justify-center`}>
                      <airdrop.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className={`${getStatusColor(airdrop.status)} text-white text-xs`}>
                      {airdrop.status.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {airdrop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {airdrop.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{airdrop.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">{airdrop.reward}</span>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${airdrop.gradient} opacity-10 rounded-full blur-2xl`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('airdrops.note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AirdropCalendar;
