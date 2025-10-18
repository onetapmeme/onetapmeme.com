import { useTranslation } from 'react-i18next';
import { Music, ExternalLink, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MediaSection = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const tiktokVideos = [
    {
      id: "1",
      title: t('media.video1.title'),
      thumbnail: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=400&h=600&fit=crop",
      url: "https://tiktok.com/@onetap_meme"
    },
    {
      id: "2",
      title: t('media.video2.title'),
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
      url: "https://tiktok.com/@onetap_meme"
    },
    {
      id: "3",
      title: t('media.video3.title'),
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      url: "https://tiktok.com/@onetap_meme"
    }
  ];

  return (
    <section 
      id="media"
      ref={ref}
      className={`py-20 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Music className="w-16 h-16 mx-auto mb-6 text-primary icon-float icon-glow" />
          <h2 
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 5s linear infinite',
            }}
          >
            {t('media.title')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {t('media.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {tiktokVideos.map((video, index) => (
            <Card 
              key={video.id}
              className="group relative overflow-hidden glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <a 
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <div className="aspect-[9/16] relative overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    {video.title}
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </h3>
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="text-lg py-6 px-8"
            style={{
              background: 'linear-gradient(135deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
              boxShadow: '0 0 30px hsla(210, 100%, 55%, 0.3)',
            }}
          >
            <a 
              href="https://tiktok.com/@onetap_meme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Music className="w-5 h-5" />
              {t('media.viewMore')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
