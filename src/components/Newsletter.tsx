import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

// Email validation schema
const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}`;
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email with zod schema
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const validatedEmail = validation.data.email;
    setLoading(true);

    try {
      if (!recaptchaLoaded || !window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }

      // Get reCAPTCHA token
      const recaptchaToken = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        { action: 'newsletter_signup' }
      );

      const { data, error } = await supabase.functions.invoke('newsletter-signup', {
        body: { email: validatedEmail, recaptchaToken }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      
      setSuccess(true);
      setEmail('');
      toast.success('Successfully subscribed!');
      
      // Reset success state after animation
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      if (error.message === 'Rate limit exceeded. Please try again later.') {
        toast.error('Too many attempts. Please try again later.');
      } else if (error.message === 'CAPTCHA verification failed') {
        toast.error('Security verification failed. Please try again.');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Get 1Tapped
          </h3>
          <p className="text-muted-foreground">
            Subscribe for exclusive updates, airdrops & alpha
          </p>
        </div>

        <div className="relative">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                className="pl-10 h-12 bg-background/50 border-primary/20 focus:border-primary/40 rounded-xl"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || success}
              size="lg"
              className="px-6 rounded-xl"
              style={{
                background: success 
                  ? 'linear-gradient(135deg, hsl(142, 76%, 36%), hsl(142, 76%, 46%))' 
                  : 'linear-gradient(135deg, hsl(210, 100%, 60%), hsl(210, 100%, 50%))',
                boxShadow: success 
                  ? '0 0 30px hsla(142, 76%, 36%, 0.4)' 
                  : '0 0 30px hsla(210, 100%, 55%, 0.4)',
              }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </motion.div>
                ) : success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-semibold"
                  >
                    Subscribe
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </form>
    </div>
  );
};

export default Newsletter;