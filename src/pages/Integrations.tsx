import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Twitch, MessageSquare, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const Integrations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const integrations = [
    {
      icon: Twitch,
      title: t('integrations.twitch.title'),
      description: t('integrations.twitch.description'),
      status: "prototype",
      features: [
        t('integrations.twitch.feature1'),
        t('integrations.twitch.feature2'),
        t('integrations.twitch.feature3'),
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageSquare,
      title: t('integrations.discord.title'),
      description: t('integrations.discord.description'),
      status: "development",
      features: [
        t('integrations.discord.feature1'),
        t('integrations.discord.feature2'),
        t('integrations.discord.feature3'),
      ],
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Trophy,
      title: t('integrations.nft.title'),
      description: t('integrations.nft.description'),
      status: "concept",
      features: [
        t('integrations.nft.feature1'),
        t('integrations.nft.feature2'),
        t('integrations.nft.feature3'),
      ],
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "prototype":
        return "bg-green-500";
      case "development":
        return "bg-yellow-500";
      case "concept":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('integrations.backHome')}
        </Button>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
              {t('integrations.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('integrations.subtitle')}
            </p>
          </div>

          {/* Integration Cards */}
          <div className="space-y-8">
            {integrations.map((integration, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <integration.icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                          {integration.title}
                        </h3>
                        <Badge className={`${getStatusColor(integration.status)} text-white`}>
                          {integration.status.toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">
                        {integration.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        {integration.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3">
                            <span className="text-primary mt-1 text-xl">▸</span>
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br ${integration.gradient} opacity-5 rounded-full blur-3xl`} />
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {t('integrations.cta.title')}
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('integrations.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/home#community')}
                className="bg-gradient-gold hover:opacity-90"
              >
                {t('integrations.cta.discord')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                {t('integrations.cta.github')}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Integrations;
