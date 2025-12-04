import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Lock, Calendar, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Ownership = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            ← {t('common.backToHome')}
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">{t('ownership.title')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('ownership.subtitle')}
            </p>
          </div>

          {/* Main Content */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">{t('ownership.documentTitle')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('ownership.projectName')}</p>
                <p className="text-lg font-semibold">$1TAP</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('ownership.owner')}</p>
                <p className="text-lg font-semibold">Hugo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('ownership.date')}</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t('ownership.dateValue')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('ownership.version')}</p>
                <p className="text-lg font-semibold">1.0</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">{t('ownership.projectDescription.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.projectDescription.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('ownership.projectDescription.item1')}</li>
                <li>{t('ownership.projectDescription.item2')}</li>
                <li>{t('ownership.projectDescription.item3')}</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Lock className="w-5 h-5" />
                {t('ownership.ownershipStatement.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.ownershipStatement.declaration')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>{t('ownership.ownershipStatement.branding')}:</strong> {t('ownership.ownershipStatement.brandingDetails')}</li>
                <li><strong>{t('ownership.ownershipStatement.assets')}:</strong> {t('ownership.ownershipStatement.assetsDetails')}</li>
                <li><strong>{t('ownership.ownershipStatement.website')}:</strong> {t('ownership.ownershipStatement.websiteDetails')}</li>
                <li><strong>{t('ownership.ownershipStatement.token')}:</strong> {t('ownership.ownershipStatement.tokenDetails')}</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.ownershipStatement.extension')}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">{t('ownership.legalFramework.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.legalFramework.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>{t('ownership.legalFramework.eu')}</strong> {t('ownership.legalFramework.euDescription')}</li>
                <li><strong>{t('ownership.legalFramework.berne')}</strong> {t('ownership.legalFramework.berneDescription')}</li>
                <li><strong>{t('ownership.legalFramework.french')}</strong> {t('ownership.legalFramework.frenchDescription')}</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-500">{t('ownership.nonAffiliation.title')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.nonAffiliation.statement')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('ownership.nonAffiliation.references')}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-xl font-bold">{t('ownership.digitalSignature.title')}</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 font-mono text-sm">
                <p><strong>{t('ownership.digitalSignature.signedBy')}:</strong> Hugo</p>
                <p className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <strong>{t('ownership.digitalSignature.website')}:</strong> onetapmeme.com
                </p>
                <p><strong>{t('ownership.digitalSignature.timestamp')}:</strong> 2025-01-07</p>
                <p><strong>{t('ownership.digitalSignature.hash')}:</strong> {t('ownership.digitalSignature.hashValue')}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-center text-sm text-muted-foreground">
                {t('ownership.footer.copyright')}<br />
                <strong>{t('ownership.footer.nonAffiliated')}</strong>
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                {t('ownership.footer.protection')}
              </p>
            </div>
          </Card>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <FileText className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">{t('ownership.resources.license.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('ownership.resources.license.description')}</p>
              <Link 
                to="/terms"
                className="text-primary hover:underline text-sm"
              >
                {t('ownership.resources.license.link')} →
              </Link>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <Shield className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">{t('ownership.resources.audit.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('ownership.resources.audit.description')}</p>
              <Link 
                to="/security"
                className="text-primary hover:underline text-sm"
              >
                {t('ownership.resources.audit.link')} →
              </Link>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <Github className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">{t('ownership.resources.sourceCode.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('ownership.resources.sourceCode.description')}</p>
              <a 
                href="https://github.com/Hugo-SEQUIER/onetap-token" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                {t('ownership.resources.sourceCode.link')} →
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownership;