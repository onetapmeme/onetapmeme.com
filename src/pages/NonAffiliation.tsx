import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NonAffiliation = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.backToHome')}
          </Button>
        </Link>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t('nonAffiliation.title')}</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                {t('nonAffiliation.mainNotice')}
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              {t('nonAffiliation.independentDescription')}
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('nonAffiliation.trademarks.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('nonAffiliation.trademarks.description')}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('nonAffiliation.trademarks.item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('nonAffiliation.trademarks.item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{t('nonAffiliation.trademarks.item3')}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('nonAffiliation.independentProject.title')}</h2>
              <p className="text-foreground/80">
                {t('nonAffiliation.independentProject.description')}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('nonAffiliation.contact.title')}</h2>
              <p className="text-foreground/80">
                {t('nonAffiliation.contact.description')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NonAffiliation;