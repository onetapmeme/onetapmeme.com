import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Disclaimer = () => {
  const { t } = useTranslation();

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
            <AlertTriangle className="w-8 h-8 text-secondary" />
            <h1 className="text-4xl font-bold text-foreground">{t('disclaimer.title')}</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              {t('disclaimer.intro')}
            </p>

            <p className="text-lg leading-relaxed">
              {t('disclaimer.responsibility')}
            </p>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
              <p className="font-bold text-destructive mb-2">{t('disclaimer.importantNotice.title')}</p>
              <p className="text-foreground/80">
                {t('disclaimer.importantNotice.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('disclaimer.risks.title')}</h2>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>{t('disclaimer.risks.item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>{t('disclaimer.risks.item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>{t('disclaimer.risks.item3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>{t('disclaimer.risks.item4')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('disclaimer.yourResponsibility.title')}</h2>
              <p className="text-foreground/80">
                {t('disclaimer.yourResponsibility.description')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
