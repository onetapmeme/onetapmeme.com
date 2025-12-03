import { ArrowLeft, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t, i18n } = useTranslation();
  
  const formatDate = () => {
    const locale = i18n.language === 'zh' ? 'zh-CN' : 
                   i18n.language === 'ru' ? 'ru-RU' : 
                   i18n.language === 'es' ? 'es-ES' : 
                   i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    return new Date().toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('legal.backHome')}
          </Button>
        </Link>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t('privacy.title')}</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                {t('privacy.intro')}
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                {t('privacy.dataCollection.title')}
              </h2>
              <p className="text-foreground/80 mb-4">
                {t('privacy.dataCollection.description')}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>{t('privacy.dataCollection.noPersonal')}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>{t('privacy.dataCollection.noCookies')}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>{t('privacy.dataCollection.noAnalytics')}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>{t('privacy.dataCollection.blockchain')}</strong></span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.thirdParty.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('privacy.thirdParty.description')}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('privacy.thirdParty.wallets')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('privacy.thirdParty.blockchain')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('privacy.thirdParty.dex')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.gdpr.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('privacy.gdpr.description')}
              </p>
              <p className="text-foreground/80">
                {t('privacy.gdpr.blockchain')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.changes.title')}</h2>
              <p className="text-foreground/80">
                {t('privacy.changes.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('privacy.contact.title')}</h2>
              <p className="text-foreground/80">
                {t('privacy.contact.description')}
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-6 border-t border-border">
              {t('legal.lastUpdated')}: {formatDate()}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
