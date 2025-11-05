import { CheckCircle2, Circle, Clock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const RoadmapTimeline = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-8 h-8 text-primary" />;
      case "current":
        return <Clock className="w-8 h-8 text-yellow-500 animate-pulse" />;
      default:
        return <Circle className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-primary shadow-[0_0_40px_rgba(22,163,224,0.4)]";
      case "current":
        return "border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.5)] bg-yellow-500/5";
      default:
        return "border-muted-foreground/30";
    }
  };

  const phases = [
    { 
      phase: "Phase 1", 
      title: t('roadmap.phase1'), 
      status: "completed", 
      items: t('roadmap.phase1Items', { returnObjects: true }) as string[], 
      progress: 100 
    },
    { 
      phase: "Phase 2", 
      title: t('roadmap.phase2'), 
      status: "current", 
      items: t('roadmap.phase2Items', { returnObjects: true }) as string[], 
      progress: 65 
    },
    { 
      phase: "Phase 3", 
      title: t('roadmap.phase3'), 
      status: "upcoming", 
      items: t('roadmap.phase3Items', { returnObjects: true }) as string[], 
      progress: 0 
    },
    { 
      phase: "Phase 4", 
      title: t('roadmap.phase4'), 
      status: "upcoming", 
      items: t('roadmap.phase4Items', { returnObjects: true }) as string[], 
      progress: 0 
    },
  ];

  return (
    <section 
      id="roadmap" 
      ref={ref}
      className={`py-20 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <Target className="w-16 h-16 mx-auto mb-6 text-primary icon-float icon-glow" />
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
            {t('roadmap.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('roadmap.subtitle')}
          </p>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="glass-effect rounded-xl p-6 border-2 border-primary/30">
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span className="font-semibold text-foreground">Overall Progress</span>
              <span className="font-bold text-primary">41%</span>
            </div>
            <Progress value={41} className="h-3" />
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-yellow-500 to-muted-foreground/30" />

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline Node */}
                <div className={`absolute left-2 top-4 p-2 rounded-full bg-background border-4 ${getStatusColor(phase.status)}`}>
                  {getStatusIcon(phase.status)}
                </div>

                {/* Content Card */}
                <Card className={`p-6 border-2 ${getStatusColor(phase.status)} hover:scale-[1.02] transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {phase.phase}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mt-1">
                        {phase.title}
                      </h3>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      phase.status === 'completed' ? 'bg-primary/20 text-primary' :
                      phase.status === 'current' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {phase.status === 'completed' ? '✓ Completed' :
                       phase.status === 'current' ? '⚡ In Progress' :
                       '⏳ Upcoming'}
                    </span>
                  </div>

                  {/* Progress Bar for Current Phase */}
                  {phase.status === "current" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Phase Progress</span>
                        <span className="font-bold text-yellow-500">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                  )}

                  {/* Items List */}
                  <ul className="space-y-2.5">
                    {Array.isArray(phase.items) && phase.items.map((item, j) => {
                      const isCompleted = phase.status === "completed" || 
                                        (phase.status === "current" && j < Math.floor(phase.items.length * (phase.progress / 100)));
                      return (
                        <motion.li 
                          key={j} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.15 + j * 0.05 }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                            {item}
                          </span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapTimeline;
