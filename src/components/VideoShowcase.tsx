import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Youtube, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const VideoShowcase = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: '1',
      title: 'What is $ONETAP?',
      description: 'Introduction to the ultimate gaming memecoin',
      thumbnail: '/placeholder.svg',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
      category: 'introduction',
    },
    {
      id: '2',
      title: 'How to Buy $ONETAP',
      description: 'Step-by-step tutorial on purchasing tokens',
      thumbnail: '/placeholder.svg',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
      category: 'tutorial',
    },
    {
      id: '3',
      title: 'Meet the Team',
      description: 'Get to know the builders behind $ONETAP',
      thumbnail: '/placeholder.svg',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
      category: 'team',
    },
    {
      id: '4',
      title: 'Roadmap Explained',
      description: 'Deep dive into our 2025 roadmap and vision',
      thumbnail: '/placeholder.svg',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
      category: 'roadmap',
    },
  ];

  return (
    <>
      <section ref={ref} className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Youtube className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Video Content
            </h2>
            <p className="text-lg text-muted-foreground">
              Learn about $ONETAP through our video guides and updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <Card className="glass-effect rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden group cursor-pointer">
                  <div
                    className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden"
                    onClick={() => setSelectedVideo(video.youtubeId)}
                  >
                    {/* Placeholder thumbnail - replace with actual thumbnails */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-primary/20 text-primary mb-2 capitalize">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {video.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setSelectedVideo(video.youtubeId)}
                    >
                      <Play className="w-4 h-4" />
                      Watch Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA for YouTube Channel */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20 max-w-2xl mx-auto">
              <Youtube className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Subscribe to Our Channel
              </h3>
              <p className="text-muted-foreground mb-6">
                Don't miss out on exclusive content, tutorials, and community updates
              </p>
              <Button
                size="lg"
                className="gap-2"
                style={{
                  background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                }}
                onClick={() => window.open('https://www.youtube.com/@OneTapMeme', '_blank')}
              >
                <Youtube className="w-5 h-5" />
                Subscribe Now
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-foreground">Video Player</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {selectedVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-b-lg"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoShowcase;