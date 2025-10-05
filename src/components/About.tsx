import { Shield, Users, Rocket, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Community Driven",
      description: "Built by gamers, for gamers. Every holder has a voice in our journey.",
    },
    {
      icon: Lock,
      title: "Liquidity Locked",
      description: "100% liquidity locked. Your investment is secured for the long run.",
    },
    {
      icon: Users,
      title: "Fair Launch",
      description: "No presale, no team tokens. Everyone starts on equal ground.",
    },
    {
      icon: Rocket,
      title: "To The Moon",
      description: "Aggressive marketing and partnerships to reach new heights.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            About $ONETAP
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            $ONETAP is a memecoin that combines the nostalgia of Counter-Strike's golden era 
            with the excitement of modern cryptocurrency. This is not just a token - it's a movement.
          </p>
          <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground italic">
              <Shield className="w-4 h-4 inline mr-2" />
              Disclaimer: $ONETAP is not affiliated with Valve Corporation or Counter-Strike. 
              This is an independent community project inspired by gaming culture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="p-6 bg-card border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-glow-cyan group animate-pixel-fade"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:animate-pulse-glow" />
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
