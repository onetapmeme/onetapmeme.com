import { ArrowLeft, Building2, Mail, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LegalNotice = () => {
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
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t('legalNotice.title')}</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              {t('legalNotice.intro')}
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                {t('legalNotice.projectInfo.title')}
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.projectInfo.name')}:</span>
                  <span>1TAP</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.projectInfo.nature')}:</span>
                  <span>{t('legalNotice.projectInfo.natureValue')}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.projectInfo.network')}:</span>
                  <span>Base (Layer 2 Ethereum)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.projectInfo.tokenStandard')}:</span>
                  <span>ERC-20</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                {t('legalNotice.contact.title')}
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.contact.email')}:</span>
                  <span>contactonetapmeme@gmail.com</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.contact.community')}:</span>
                  <span>{t('legalNotice.contact.communityValue')}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Server className="w-6 h-6 text-primary" />
                {t('legalNotice.hosting.title')}
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.hosting.provider')}:</span>
                  <span>IONOS by 1&1 (DDoS Protection)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.hosting.registrar')}:</span>
                  <span>IONOS SE</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.hosting.domain')}:</span>
                  <span>onetapmeme.com</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.hosting.ssl')}:</span>
                  <span>Sectigo Wildcard SSL</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">{t('legalNotice.hosting.security')}:</span>
                  <span>{t('legalNotice.hosting.securityValue')}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('legalNotice.legalStatus.title')}</h2>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-4">
                <p className="font-bold text-primary mb-2">{t('legalNotice.legalStatus.classification')}</p>
                <p className="text-foreground/80">
                  {t('legalNotice.legalStatus.description')}
                </p>
                <ul className="mt-3 space-y-1 ml-4">
                  <li>• {t('legalNotice.legalStatus.item1')}</li>
                  <li>• {t('legalNotice.legalStatus.item2')}</li>
                  <li>• {t('legalNotice.legalStatus.item3')}</li>
                  <li>• {t('legalNotice.legalStatus.item4')}</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('legalNotice.intellectualProperty.title')}</h2>
              <p className="text-foreground/80 mb-4">
                {t('legalNotice.intellectualProperty.description')}
              </p>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                <p className="font-bold text-destructive mb-2">{t('legalNotice.intellectualProperty.thirdParty')}</p>
                <p className="text-foreground/80">
                  {t('legalNotice.intellectualProperty.thirdPartyDesc')}{' '}
                  <Link to="/non-affiliation" className="text-primary hover:underline">{t('legalNotice.intellectualProperty.seeNotice')}</Link>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('legalNotice.regulatory.title')}</h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong>{t('legalNotice.regulatory.noKyc')}:</strong> {t('legalNotice.regulatory.noKycDesc')}
                </p>
                <p>
                  <strong>{t('legalNotice.regulatory.aml')}:</strong> {t('legalNotice.regulatory.amlDesc')}
                </p>
                <p>
                  <strong>{t('legalNotice.regulatory.tax')}:</strong> {t('legalNotice.regulatory.taxDesc')}
                </p>
                <p>
                  <strong>{t('legalNotice.regulatory.geo')}:</strong> {t('legalNotice.regulatory.geoDesc')}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('legalNotice.dispute.title')}</h2>
              <p className="text-foreground/80">
                {t('legalNotice.dispute.description')}
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

export default LegalNotice;
