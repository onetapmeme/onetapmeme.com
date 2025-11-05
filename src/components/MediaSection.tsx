import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Music2, Video, Image as ImageIcon, Newspaper, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";
import { Music, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const MediaSection = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const mediaLogos = [
    { 
      name: "CoinTelegraph", 
      url: "https://cointelegraph.com",
      icon: Newspaper,
      color: "text-[#00D4AA]"
    },
    { 
      name: "CoinMarketCap", 
      url: "https://coinmarketcap.com",
      icon: TrendingUp,
      color: "text-[#3861FB]"
    },
    { 
      name: "DexScreener", 
      url: "https://dexscreener.com",
      icon: Video,
      color: "text-[#00C48F]"
    },
    { 
      name: "Base Network", 
      url: "https://base.org",
      icon: ImageIcon,
      color: "text-[#0052FF]"
    },
  ];

  const videos = [
    {
      id: "local-1",
      type: "local" as const,
      videoUrl: "/videos/1.mp4"
    },
    {
      id: "local-2",
      type: "local" as const,
      videoUrl: "/videos/2.mp4"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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

        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {videos.map((video) => (
                <div 
                  key={video.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="relative glass-effect border-2 border-primary/30 rounded-lg overflow-hidden aspect-[9/16] max-h-[600px] mx-auto group">
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {videos.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollNext}
                disabled={!canScrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="flex justify-center gap-2 mt-6">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
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

        {/* As Seen On Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-primary opacity-70" />
            <h3 className="text-2xl md:text-3xl font-bold text-muted-foreground">
              {t('media.asSeenOn')}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {mediaLogos.map((logo, index) => (
              <motion.a
                key={index}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="glass-effect rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              >
                <logo.icon className={`w-12 h-12 mx-auto mb-3 ${logo.color} opacity-40 group-hover:opacity-70 transition-opacity duration-300`} />
                <p className="text-sm md:text-base font-semibold text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300">
                  {logo.name}
                </p>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 italic">
            {t('media.comingSoon')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaSection;
