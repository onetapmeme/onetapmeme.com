import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const SocialProof = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [holderCount, setHolderCount] = useState(0);

  useEffect(() => {
    loadHolderCount();
    const interval = setInterval(loadHolderCount, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadHolderCount = async () => {
    const { count } = await supabase
      .from('wallet_stats')
      .select('*', { count: 'exact', head: true });
    
    if (count) setHolderCount(count);
  };

  const partners = [
    { name: 'Base', logo: '⚡' },
    { name: 'Uniswap', logo: '🦄' },
    { name: 'DexScreener', logo: '📊' },
  ];

  const testimonials = [
    {
      name: 'CryptoGamer',
      role: 'Early Holder',
      text: 'Best gaming memecoin I\'ve found. The competitive gaming theme is pure nostalgia!',
      rating: 5,
    },
    {
      name: '1TapTrader',
      role: 'Community Member',
      text: 'Transparent team, locked liquidity, and a solid roadmap. This is the one.',
      rating: 5,
    },
    {
      name: 'HeadshotKing',
      role: 'Diamond Hands',
      text: 'Finally a memecoin that understands gaming culture. HODLING to the moon! 🚀',
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-10 md:py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Live Holder Count */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-effect p-8 rounded-2xl border-primary/20 max-w-md mx-auto">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
              Live Holder Count
            </p>
            <motion.p
              className="text-5xl md:text-6xl font-bold text-foreground"
              key={holderCount}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {holderCount.toLocaleString()}+
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">
              Growing Community
            </p>
          </Card>
        </motion.div>

        {/* As Seen On */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            As Seen On
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                className="glass-effect px-8 py-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-500"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{partner.logo}</span>
                  <span className="text-xl font-bold text-foreground">
                    {partner.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Community Love
          </h3>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              >
                <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20 text-center">
            <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="font-bold text-foreground mb-1">Audited Contract</p>
            <p className="text-sm text-muted-foreground">Security First</p>
          </Card>
          <Card className="glass-effect p-6 rounded-2xl border-primary/20 text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-accent" />
            <p className="font-bold text-foreground mb-1">6-Month LP Lock</p>
            <p className="text-sm text-muted-foreground">Community Protected</p>
          </Card>
          <Card className="glass-effect p-6 rounded-2xl border-primary/20 text-center">
            <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="font-bold text-foreground mb-1">Active Community</p>
            <p className="text-sm text-muted-foreground">24/7 Support</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;