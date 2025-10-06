import { useTranslation } from 'react-i18next';
import { MessageCircle, Twitter, Hash, Instagram, Youtube, Music, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ParticleEffect from "@/components/ParticleEffect";

const Community = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const socialLinks = [
    {
      icon: Twitter,
      name: 'Twitter/X',
      description: 'Follow us for the latest updates and memes',
      url: 'https://x.com/OneTapMeme',
      color: 'text-[#1DA1F2]',
      bgColor: 'bg-[#1DA1F2]/10',
    },
    {
      icon: Music,
      name: 'TikTok',
      description: 'Watch our gaming content and viral memes',
      url: 'https://tiktok.com/@onetap_meme',
      color: 'text-[#000000]',
      bgColor: 'bg-[#000000]/10',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      description: 'Check out our visual content and stories',
      url: 'https://www.instagram.com/onetapmeme',
      color: 'text-[#E4405F]',
      bgColor: 'bg-[#E4405F]/10',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      description: 'Subscribe for gaming videos and tutorials',
      url: 'https://www.youtube.com/@OneTapMeme',
      color: 'text-[#FF0000]',
      bgColor: 'bg-[#FF0000]/10',
    },
    {
      icon: MessageCircle,
      name: 'Reddit',
      description: 'Join our Reddit community for discussions',
      url: 'https://www.reddit.com/user/ManySingle7170',
      color: 'text-[#FF4500]',
      bgColor: 'bg-[#FF4500]/10',
    },
  ];

  return (
    <section 
      id="community" 
      ref={ref}
      className={`py-20 md:py-32 px-4 bg-gradient-to-br from-muted/30 via-background to-muted/30 section-scale-in reveal-on-scroll ${isRevealed ? 'revealed' : ''} relative overflow-hidden`}
    >
      <ParticleEffect color="hsl(210, 100%, 55%)" count={28} speed={0.22} />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-12 animate-pixel-fade">
          <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-primary icon-float icon-glow" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            {t('community.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('community.subtitle')}
          </p>
        </div>

        {/* Community Roles & XP System */}
        <div className="mb-12 max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Join the Onetappers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Commanders</h4>
                  <p className="text-sm text-muted-foreground">
                    Community moderators and information relays. Help newcomers and maintain a positive environment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Snipers</h4>
                  <p className="text-sm text-muted-foreground">
                    Creative content creators. Design memes, graphics, and visual content to spread the word.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h4 className="font-bold text-foreground">XP & Rewards System</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Earn XP by participating in the community, creating content, and engaging with other members. 
                Level up to unlock exclusive drops and future airdrops!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">Telegram Bot Integration</span>
                <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">Leaderboards</span>
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">Exclusive Airdrops</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {socialLinks.map((social, index) => (
            <Card
              key={index}
              className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary group animate-pixel-fade pixel-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${social.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform icon-glow`}>
                <social.icon className={`w-6 h-6 md:w-7 md:h-7 ${social.color}`} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{social.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{social.description}</p>
              <Button
                asChild
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  Join Now
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
