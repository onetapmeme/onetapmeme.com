import { useTranslation } from 'react-i18next';
import { Shield, Users, Rocket, Lock, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('about.communityDriven'),
      description: t('about.communityDrivenText'),
    },
    {
      icon: Lock,
      title: t('about.liquidityLocked'),
      description: t('about.liquidityLockedText'),
    },
    {
      icon: Target,
      title: t('about.fairLaunch'),
      description: t('about.fairLaunchText'),
    },
    {
      icon: Rocket,
      title: t('about.toTheMoon'),
      description: t('about.toTheMoonText'),
    },
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-pixel-fade">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 px-4">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                {t('about.story')}
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                {t('about.story2')}
              </p>
            </div>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-secondary/30 hover:border-secondary/50 transition-all">
            <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-secondary mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{t('about.mission')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.missionText')}</p>
          </Card>
          
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/50 transition-all">
            <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{t('about.vision')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.visionText')}</p>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="p-5 md:p-6 bg-card border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-glow-primary group animate-pixel-fade"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 group-hover:animate-pulse-glow" />
              <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg max-w-3xl mx-auto">
          <p className="text-xs md:text-sm text-muted-foreground italic flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{t('about.disclaimerNote')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
