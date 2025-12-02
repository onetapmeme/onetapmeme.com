import { Gamepad2, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WhyOneTap = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const features = [
    {
      icon: Gamepad2,
      title: t('whyOneTap.gamers.title'),
      description: t('whyOneTap.gamers.description'),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: t('whyOneTap.secure.title'),
      description: t('whyOneTap.secure.description'),
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section 
      ref={ref}
      className={`py-12 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 16.66%, hsl(210, 100%, 55%) 33.33%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 66.66%, hsl(25, 100%, 55%) 83.33%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 10s linear infinite',
            }}
          >
            {t('whyOneTap.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('whyOneTap.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 h-full group relative overflow-hidden">
                {/* Animated gradient background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOneTap;
