import { motion } from 'framer-motion';
import { ArrowRight, Users, TrendingUp, Lock, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import logo from '@/assets/onetap_new_logo.png';

const HeroV7 = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(hsl(220, 15%, 30%) 1px, transparent 1px), 
                              linear-gradient(90deg, hsl(220, 15%, 30%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pre-title badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Base Network • Fair Launch</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-gradient-v7">Tap.</span>{' '}
              <span className="text-foreground">Earn.</span>{' '}
              <span className="text-gradient-v7">Dominate.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The first gaming memecoin with integrated tap-to-earn mechanics 
              and NFT rewards. Built for gamers, by gamers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-glow-primary group"
                onClick={() => scrollToSection('tap-to-earn')}
              >
                Start Tapping
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border/50 hover:border-primary/50 group"
              >
                <FileText className="mr-2 w-5 h-5" />
                Whitepaper
              </Button>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { icon: Users, label: 'Tappers', value: '50K+', color: 'text-primary' },
                { icon: TrendingUp, label: 'Market Cap', value: '$2M', color: 'text-accent' },
                { icon: Lock, label: 'LP Locked', value: '100%', color: 'text-green-400' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - App Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-50" />

            {/* Mockup Card */}
            <Card className="relative glass-effect-v7 p-6 md:p-8 border-border/50 hover-lift">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={logo}
                      alt="$ONETAP"
                      className="w-10 h-10"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div>
                      <div className="font-bold text-foreground">$ONETAP</div>
                      <div className="text-sm text-muted-foreground">Tap to Earn</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                    Active
                  </div>
                </div>

                {/* Balance Display */}
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total Balance</div>
                  <div className="text-4xl font-bold text-foreground">
                    423,817 <span className="text-primary">€</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">+€1.61%</span>
                    <span className="text-muted-foreground">vs yesterday</span>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border/30 flex items-end justify-around p-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    />
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                    Tap Now
                  </Button>
                  <Button variant="outline" className="border-border/50">
                    View Stats
                  </Button>
                </div>
              </div>
            </Card>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroV7;
