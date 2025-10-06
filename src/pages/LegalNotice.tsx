import { ArrowLeft, Building2, Mail, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/30">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Legal Notice</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              This page provides legal information about the $ONETAP project in compliance with applicable 
              transparency and disclosure requirements.
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Project Information
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Project Name:</span>
                  <span>$ONETAP</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Nature:</span>
                  <span>Community-driven memecoin (Crypto-asset)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Network:</span>
                  <span>Base (Layer 2 Ethereum)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Token Standard:</span>
                  <span>ERC-20</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact Information
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Email:</span>
                  <span>contact@onetap.xyz</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Community Support:</span>
                  <span>Available via Telegram and Discord</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Server className="w-6 h-6 text-primary" />
                Website Hosting
              </h2>
              <div className="space-y-3 text-foreground/80">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Hosting Provider:</span>
                  <span>GitHub Pages (Microsoft Corporation)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">Domain:</span>
                  <span>onetap.xyz</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold min-w-[180px]">SSL Certificate:</span>
                  <span>Provided by hosting service</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Legal Status</h2>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-4">
                <p className="font-bold text-primary mb-2">Important Classification</p>
                <p className="text-foreground/80">
                  $ONETAP is a memecoin and is <strong>NOT classified as a security</strong>. The token has:
                </p>
                <ul className="mt-3 space-y-1 ml-4">
                  <li>• No promise of financial return</li>
                  <li>• No revenue-generating activity</li>
                  <li>• No centralized management with profit expectations</li>
                  <li>• Community-driven governance and development</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Intellectual Property</h2>
              <p className="text-foreground/80 mb-4">
                All original content, including the $ONETAP branding, logo, and website design, is owned by 
                the $ONETAP community project.
              </p>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
                <p className="font-bold text-destructive mb-2">Third-Party Trademarks</p>
                <p className="text-foreground/80">
                  References to Counter-Strike, CS:GO, CS2, and Valve Corporation are for inspirational and 
                  descriptive purposes only. This project is <strong>NOT affiliated</strong> with these entities. 
                  See our <Link to="/non-affiliation" className="text-primary hover:underline">Non-Affiliation Notice</Link> for details.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Regulatory Compliance</h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong>No KYC Required:</strong> The $ONETAP project does not collect or process personal 
                  identification data from users.
                </p>
                <p>
                  <strong>AML Compliance:</strong> Users are responsible for complying with anti-money laundering 
                  laws in their respective jurisdictions.
                </p>
                <p>
                  <strong>Tax Obligations:</strong> Token holders are solely responsible for reporting and paying 
                  taxes on any cryptocurrency transactions as required by their local tax authorities.
                </p>
                <p>
                  <strong>Geographic Restrictions:</strong> This project may not be available to residents of 
                  certain jurisdictions where cryptocurrency activities are restricted or prohibited.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Dispute Resolution</h2>
              <p className="text-foreground/80">
                Any disputes arising from the use of this website or interactions with the $ONETAP token shall 
                be resolved in accordance with international arbitration principles. Users agree to attempt 
                informal resolution through community channels before pursuing formal legal action.
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-6 border-t border-border">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LegalNotice;
