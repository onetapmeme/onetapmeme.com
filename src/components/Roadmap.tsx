import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Launch",
      status: "completed",
      items: [
        "Token Creation",
        "Website Launch",
        "Social Media Setup",
        "Community Building",
      ],
    },
    {
      phase: "Phase 2",
      title: "Growth",
      status: "current",
      items: [
        "CoinGecko Listing",
        "CoinMarketCap Listing",
        "1000+ Holders",
        "Marketing Campaign",
      ],
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      status: "upcoming",
      items: [
        "CEX Listings",
        "Partnership Announcements",
        "Community Events",
        "Merchandise Store",
      ],
    },
    {
      phase: "Phase 4",
      title: "Domination",
      status: "upcoming",
      items: [
        "Major Exchange Listings",
        "Global Marketing",
        "10,000+ Holders",
        "To The Moon! 🚀",
      ],
    },
  ];

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
        return "border-secondary shadow-glow-gold";
      default:
        return "border-muted";
    }
  };

  return (
    <section id="roadmap" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Roadmap
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Our journey to becoming the #1 gaming memecoin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {phases.map((phase, i) => (
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
              <ul className="space-y-2">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                    <span className="text-primary mt-1">▸</span>
                    <span>{item}</span>
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
