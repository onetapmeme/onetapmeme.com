import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Scroll } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Manifesto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSigned(true);
      toast.success(t('manifesto.signedSuccess'));
      setEmail("");
    }
  };

  const principles = [
    {
      number: "I",
      title: t('manifesto.principle1.title'),
      description: t('manifesto.principle1.description'),
    },
    {
      number: "II",
      title: t('manifesto.principle2.title'),
      description: t('manifesto.principle2.description'),
    },
    {
      number: "III",
      title: t('manifesto.principle3.title'),
      description: t('manifesto.principle3.description'),
    },
    {
      number: "IV",
      title: t('manifesto.principle4.title'),
      description: t('manifesto.principle4.description'),
    },
    {
      number: "V",
      title: t('manifesto.principle5.title'),
      description: t('manifesto.principle5.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('manifesto.backHome')}
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Scroll className="w-20 h-20 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
              {t('manifesto.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('manifesto.subtitle')}
            </p>
          </div>

          {/* Preamble */}
          <Card className="p-8 mb-12 bg-card/80 backdrop-blur border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="relative z-10">
              <p className="text-lg leading-relaxed text-foreground italic">
                {t('manifesto.preamble')}
              </p>
            </div>
          </Card>

          {/* Principles */}
          <div className="space-y-8 mb-12">
            {principles.map((principle, index) => (
              <Card 
                key={index} 
                className="p-8 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-12 -top-12 text-[150px] font-bold text-primary/5 group-hover:text-primary/10 transition-all duration-500">
                  {principle.number}
                </div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-bold text-primary">{principle.number}.</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground pt-2">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed pl-16">
                    {principle.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Sign the Manifesto */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur border-primary/30">
            <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
              {t('manifesto.signTitle')}
            </h3>
            
            {!signed ? (
              <form onSubmit={handleSign} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={t('manifesto.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="lg" className="bg-gradient-gold hover:opacity-90">
                  {t('manifesto.signButton')}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
                <p className="text-xl font-bold text-green-500">
                  {t('manifesto.thankYou')}
                </p>
                <p className="text-muted-foreground">
                  {t('manifesto.welcomeMessage')}
                </p>
              </div>
            )}
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>{t('manifesto.footerNote')}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Manifesto;
