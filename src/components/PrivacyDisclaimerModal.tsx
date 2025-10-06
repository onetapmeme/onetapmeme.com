import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const PrivacyDisclaimerModal = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("onetap-privacy-accepted");
    if (!hasAccepted) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("onetap-privacy-accepted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/98 backdrop-blur-lg animate-fade-in">
      <Card className="max-w-2xl w-full p-6 md:p-8 border-2 border-primary/30 bg-gradient-card shadow-glow-primary animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{t('enter.privacy')}</h2>
        </div>
        
        <div className="space-y-4 text-sm text-muted-foreground mb-8 max-h-[50vh] md:max-h-[60vh] overflow-y-auto scrollbar-thin">
          <p className="text-foreground font-semibold text-base">
            {t('enter.important')}
          </p>
          
          <div className="space-y-3 border-l-2 border-primary/50 pl-4">
            <p>
              <strong className="text-foreground">{t('enter.risk')}</strong> {t('enter.riskText')}
            </p>
            
            <p>
              <strong className="text-foreground">{t('enter.noAffiliation')}</strong> {t('enter.noAffiliationText')}
            </p>
            
            <p>
              <strong className="text-foreground">{t('enter.privacy2')}</strong> {t('enter.privacyText')}
            </p>
            
            <p>
              <strong className="text-foreground">{t('enter.noGuarantees')}</strong> {t('enter.noGuaranteesText')}
            </p>
            
            <p>
              <strong className="text-foreground">{t('enter.legal')}</strong> {t('enter.legalText')}
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground/80 pt-4">
            {t('enter.moreInfo')} <a href="/disclaimer" className="text-primary hover:underline">{t('enter.disclaimer')}</a>, <a href="/non-affiliation" className="text-primary hover:underline">{t('enter.nonAffiliation')}</a>, {t('enter.privacyPolicy')} <a href="/privacy" className="text-primary hover:underline">{t('enter.privacyPolicy')}</a>.
          </p>
        </div>
        
        <Button 
          onClick={handleAccept}
          className="w-full bg-gradient-accent hover:shadow-glow-primary transition-all text-base md:text-lg font-bold py-5 md:py-6"
        >
          {t('enter.understand')}
        </Button>
      </Card>
    </div>
  );
};

export default PrivacyDisclaimerModal;
