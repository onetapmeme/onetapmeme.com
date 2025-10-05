import { ArrowLeft, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Privacy = () => {
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
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                We respect your privacy. This website does not collect, store, or process personal data by default.
              </p>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Data Collection
              </h2>
              <p className="text-foreground/80 mb-4">
                Our website operates with minimal data collection:
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>No personal information:</strong> We do not collect names, emails, or addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>No cookies:</strong> No tracking cookies are used on this website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>No analytics:</strong> We do not use analytics tools that track your behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span><strong>Blockchain interactions:</strong> Any wallet connections are handled directly by your wallet provider</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Third-Party Services</h2>
              <p className="text-foreground/80 mb-4">
                When you interact with blockchain networks or decentralized exchanges (DEX), you are subject to 
                their respective privacy policies:
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Wallet providers (MetaMask, WalletConnect, etc.) have their own privacy policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Blockchain transactions are public and permanently recorded on the Base network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>DEX platforms may collect their own analytics and usage data</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Your Rights (GDPR)</h2>
              <p className="text-foreground/80 mb-4">
                Under GDPR Article 13, you have the right to information about data processing. Since we do not 
                collect personal data, there is no data to access, modify, or delete.
              </p>
              <p className="text-foreground/80">
                If you have questions about privacy or blockchain transactions, please note that blockchain data 
                is immutable and cannot be deleted once recorded.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Changes to This Policy</h2>
              <p className="text-foreground/80">
                We may update this privacy policy from time to time. Any changes will be posted on this page with 
                an updated revision date.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
              <p className="text-foreground/80">
                If you have any questions about this privacy policy, please reach out to us through our community 
                channels listed on the main website.
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

export default Privacy;
