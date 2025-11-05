import { CheckCircle2, Circle, Clock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Roadmap = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-primary" />;
      case "current":
        return <Clock className="w-6 h-6 text-secondary animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-primary shadow-glow-primary";
      case "current":
        return "border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)] bg-yellow-500/5";
      default:
        return "border-muted";
    }
  };

  return (
    <section 
      id="roadmap" 
      ref={ref}
      className={`py-20 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto relative z-10">
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
        <div className="max-w-3xl mx-auto mb-8 px-4">
          <div className="glass-effect rounded-xl p-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span className="font-semibold">Overall Progress</span>
              <span className="font-bold">41%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500"
                style={{ width: '41%' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {[
    { phase: "Phase 1", title: t('roadmap.phase1'), status: "completed", items: t('roadmap.phase1Items', { returnObjects: true }) as string[], progress: 100 },
    { phase: "Phase 2", title: t('roadmap.phase2'), status: "current", items: t('roadmap.phase2Items', { returnObjects: true }) as string[], progress: 65 },
    { phase: "Phase 3", title: t('roadmap.phase3'), status: "upcoming", items: t('roadmap.phase3Items', { returnObjects: true }) as string[], progress: 0 },
    { phase: "Phase 4", title: t('roadmap.phase4'), status: "upcoming", items: t('roadmap.phase4Items', { returnObjects: true }) as string[], progress: 0 },
          ].map((phase, i) => (
            <Card
              key={i}
              className={`p-4 md:p-6 bg-card border-2 transition-all duration-300 hover:scale-105 animate-pixel-fade ${getStatusColor(phase.status)}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-xs md:text-sm font-mono text-muted-foreground">{phase.phase}</span>
                {getStatusIcon(phase.status)}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">{phase.title}</h3>
              
              {/* Progress bar for current phase */}
              {phase.status === "current" && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <ul className="space-y-2">
                {Array.isArray(phase.items) && phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm md:text-base">
                    {phase.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    ) : phase.status === "current" && j < Math.floor(phase.items.length * (phase.progress / 100)) ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span className={phase.status === "completed" || (phase.status === "current" && j < Math.floor(phase.items.length * (phase.progress / 100))) ? "text-foreground" : "text-muted-foreground"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
