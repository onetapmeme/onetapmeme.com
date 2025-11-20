import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type VerificationStatus = 'loading' | 'success' | 'already_verified' | 'invalid' | 'expired' | 'error';

const ManifestoVerify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [email, setEmail] = useState<string>('');
  const token = searchParams.get('token');

  useEffect(() => {
    document.title = "Vérification de signature - OneTap Manifesto";
    
    const verifyToken = async () => {
      if (!token) {
        setStatus('invalid');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('manifesto-verify', {
          body: { token }
        });

        if (error) throw error;

        if (data.success) {
          setEmail(data.email);
          if (data.message === 'already_verified') {
            setStatus('already_verified');
          } else {
            setStatus('success');
          }
        } else if (data.error === 'expired_token') {
          setStatus('expired');
        } else {
          setStatus('invalid');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  const statusContent = {
    loading: {
      icon: <Loader2 className="w-20 h-20 text-primary animate-spin" />,
      title: "Vérification en cours...",
      description: "Veuillez patienter pendant que nous vérifions votre signature.",
      color: "text-primary"
    },
    success: {
      icon: <CheckCircle className="w-20 h-20 text-green-500" />,
      title: "Signature confirmée !",
      description: `Merci ${email} ! Votre signature du manifeste a été vérifiée avec succès.`,
      color: "text-green-500"
    },
    already_verified: {
      icon: <CheckCircle className="w-20 h-20 text-green-500" />,
      title: "Déjà vérifié",
      description: `Votre signature ${email} a déjà été confirmée.`,
      color: "text-green-500"
    },
    invalid: {
      icon: <XCircle className="w-20 h-20 text-destructive" />,
      title: "Lien invalide",
      description: "Ce lien de vérification n'est pas valide. Veuillez réessayer de signer le manifeste.",
      color: "text-destructive"
    },
    expired: {
      icon: <Clock className="w-20 h-20 text-accent" />,
      title: "Lien expiré",
      description: "Ce lien de vérification a expiré (24h). Veuillez réessayer de signer le manifeste.",
      color: "text-accent"
    },
    error: {
      icon: <XCircle className="w-20 h-20 text-destructive" />,
      title: "Erreur",
      description: "Une erreur s'est produite lors de la vérification. Veuillez réessayer.",
      color: "text-destructive"
    }
  };

  const content = statusContent[status];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-black to-accent/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <div className="glass-effect rounded-2xl p-12 text-center space-y-6 border border-border/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              {content.icon}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl font-bold ${content.color}`}
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-md mx-auto"
            >
              {content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 space-y-3"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/manifesto">
                  Retour au Manifeste
                </Link>
              </Button>
              
              {(status === 'invalid' || status === 'expired') && (
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto ml-0 sm:ml-3 mt-3 sm:mt-0">
                  <Link to="/">
                    Retour à l'accueil
                  </Link>
                </Button>
              )}
            </motion.div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 border-t border-border/30"
              >
                <p className="text-sm text-muted-foreground">
                  Vous faites maintenant partie de la révolution OneTap ! 🎮
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ManifestoVerify;
