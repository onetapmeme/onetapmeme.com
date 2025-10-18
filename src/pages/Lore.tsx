import { useTranslation } from 'react-i18next';
import { Sparkles, Crosshair, Trophy, Rocket, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import benImage from "@/assets/ben-spritesheet.png";

const Lore = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, isRevealed } = useScrollReveal();

  const chapters = [
    {
      icon: Sparkles,
      title: t('lore.chapter1.title'),
      content: t('lore.chapter1.content'),
      color: "text-primary"
    },
    {
      icon: Crosshair,
      title: t('lore.chapter2.title'),
      content: t('lore.chapter2.content'),
      color: "text-accent"
    },
    {
      icon: Trophy,
      title: t('lore.chapter3.title'),
      content: t('lore.chapter3.content'),
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: t('lore.chapter4.title'),
      content: t('lore.chapter4.content'),
      color: "text-accent"
    },
    {
      icon: Users,
      title: t('lore.chapter5.title'),
      content: t('lore.chapter5.content'),
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          onClick={() => navigate('/home')}
          variant="outline"
          className="mb-8"
        >
          ← {t('common.backToHome')}
        </Button>
      </div>

      <section 
        ref={ref}
        className={`py-20 px-4 reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-primary icon-float icon-glow" />
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-flow 5s linear infinite',
              }}
            >
              {t('lore.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('lore.subtitle')}
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl rounded-full"></div>
            <img 
              src={benImage} 
              alt="OneTap Mascot" 
              className="w-64 h-64 mx-auto object-contain relative z-10 icon-float"
            />
          </div>

          {/* Story Timeline */}
          <div className="space-y-8">
            {chapters.map((chapter, index) => (
              <Card 
                key={index}
                className="p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 group"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <chapter.icon className={`w-8 h-8 ${chapter.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {chapter.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {chapter.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 p-8 glass-effect border-2 border-accent/30 text-center">
            <Zap className="w-16 h-16 mx-auto mb-6 text-accent icon-glow" />
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {t('lore.cta.title')}
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('lore.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/home#community')}
                size="lg"
                className="text-lg py-6 px-8"
                style={{
                  background: 'linear-gradient(135deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
                  boxShadow: '0 0 30px hsla(210, 100%, 55%, 0.3)',
                }}
              >
                {t('lore.cta.join')}
              </Button>
              <Button
                onClick={() => navigate('/home#tokenomics')}
                variant="outline"
                size="lg"
                className="text-lg py-6 px-8"
              >
                {t('lore.cta.learnMore')}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Lore;
