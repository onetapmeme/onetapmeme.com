import { useTranslation } from 'react-i18next';
import { Shield, Users, Rocket, Lock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const About = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

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
      title: t('about.equilibratedLaunch') || 'Equilibrated Launch',
      description: t('about.equilibratedLaunchText') || 'Balanced distribution designed for community, liquidity, and long-term growth.',
    },
    {
      icon: Rocket,
      title: t('about.toTheMoon'),
      description: t('about.toTheMoonText'),
    },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-24 md:py-40 px-4 relative overflow-hidden"
    >

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 60 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Shield className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 text-primary" 
              style={{ filter: 'drop-shadow(0 0 40px currentColor)' }} 
            />
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            style={{ backgroundSize: '200%', animation: 'shimmer 3s linear infinite' }}>
            {t('about.title')}
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Story Section - Split Layout */}
        <motion.div 
          className="mb-20 md:mb-28 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="glass-effect p-8 md:p-12 rounded-3xl border-primary/20 hover:border-primary/40 transition-all duration-500">
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg md:text-xl leading-relaxed">
                {t('about.story')}
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                {t('about.story2')}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid - Premium Cards */}
        <div className="overflow-hidden">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="glass-effect p-6 md:p-8 rounded-2xl border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group h-full">
                  <feature.icon className="w-12 h-12 md:w-14 md:h-14 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" 
                    style={{ filter: 'drop-shadow(0 0 20px currentColor)' }} 
                  />
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div 
          className="mt-16 p-6 glass-effect rounded-2xl border-muted/20 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-sm md:text-base text-muted-foreground italic flex items-start gap-3">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
            <span>{t('about.disclaimerNote')}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
