import { motion } from 'framer-motion';
import { Zap, Package, Palette, Trophy, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Feature {
  badge: string;
  title: string;
  description: string;
  benefits: string[];
  icon: any;
  visual: string;
  alignment: 'left' | 'right';
}

const FeaturesShowcaseV7 = () => {
  const { ref, isVisible } = useScrollAnimation();

  const features: Feature[] = [
    {
      badge: 'Earn',
      title: 'Tap Your Way to Rewards',
      description: 'Every tap earns XP. Climb ranks inspired by CS:GO and unlock legendary drops with our gamified reward system.',
      benefits: [
        '6 rarity tiers (Common to Mythic)',
        'CS:GO inspired rank progression',
        'Real-time global leaderboard',
        'Daily challenges & bounties',
      ],
      icon: Zap,
      visual: '⚡',
      alignment: 'left',
    },
    {
      badge: 'Collect',
      title: 'Build Your Arsenal',
      description: 'Collect exclusive weapon skins, backgrounds, and accessories. Show off your collection and trade with other players.',
      benefits: [
        'Legendary weapon skins',
        'Exclusive backgrounds',
        'Rare accessories & items',
        'Trading marketplace (coming soon)',
      ],
      icon: Package,
      visual: '🎮',
      alignment: 'right',
    },
    {
      badge: 'Create',
      title: 'Professional Meme Studio',
      description: 'Use your collected items to create viral CS:GO inspired memes. Share on social media and earn bonus rewards.',
      benefits: [
        'Advanced editing tools',
        'Custom text & stickers',
        'One-click social sharing',
        'Community contests',
      ],
      icon: Palette,
      visual: '🎨',
      alignment: 'left',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="mb-24 md:mb-32 last:mb-0"
            initial={{ opacity: 0, y: 60 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.3 }}
          >
            <div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                feature.alignment === 'right' ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={feature.alignment === 'right' ? 'lg:col-start-2' : ''}>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  {feature.badge}
                </Badge>

                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  {feature.title}
                </h3>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-4 mb-8">
                  {feature.benefits.map((benefit, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.3 + 0.5 + j * 0.1 }}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-base text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  variant="outline"
                  className="group border-border/50 hover:border-primary/50"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Visual */}
              <div className={feature.alignment === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <Card className="glass-effect-v7 p-8 md:p-12 border-border/50 hover-lift relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

                  {/* Visual content */}
                  <div className="relative z-10 flex items-center justify-center h-64 md:h-80">
                    <motion.div
                      className="text-9xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {feature.visual}
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, j) => (
                      <motion.div
                        key={j}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full"
                        style={{
                          left: `${20 + j * 15}%`,
                          top: `${30 + (j % 3) * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: j * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesShowcaseV7;
