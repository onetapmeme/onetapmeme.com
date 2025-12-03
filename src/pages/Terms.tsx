import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Terms = () => {
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
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t('terms.title')}</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              {t('terms.intro')}
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.useOfWebsite.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('terms.useOfWebsite.description')}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.useOfWebsite.item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.useOfWebsite.item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.useOfWebsite.item3')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.noFinancialAdvice.title')}</h2>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded mb-4">
                <p className="font-bold text-destructive mb-2">{t('terms.noFinancialAdvice.important')}</p>
                <p className="text-foreground/80">
                  {t('terms.noFinancialAdvice.warning')}
                </p>
              </div>
              <p className="text-foreground/80">
                {t('terms.noFinancialAdvice.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.liability.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('terms.liability.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.compliance.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('terms.compliance.description')}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.compliance.item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.compliance.item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('terms.compliance.item3')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.intellectualProperty.title')}</h2>
              <p className="text-foreground/80">
                {t('terms.intellectualProperty.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('terms.governingLaw.title')}</h2>
              <p className="text-foreground/80">
                {t('terms.governingLaw.description')}
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

export default Terms;
