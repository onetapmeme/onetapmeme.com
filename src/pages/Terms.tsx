import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Terms = () => {
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
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Use</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provisions 
              of this agreement.
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Use of Website</h2>
              <p className="text-foreground/80 mb-4">
                This website and its contents are provided "as is" without any warranties, expressed or implied. 
                We do not warrant the accuracy, completeness, or availability of the information, products, 
                services, or related graphics contained on the website.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>The website may contain technical inaccuracies or typographical errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Information may be changed or updated without notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>We reserve the right to modify these terms at any time</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">No Financial Advice</h2>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded mb-4">
                <p className="font-bold text-destructive mb-2">Important</p>
                <p className="text-foreground/80">
                  By using this site, you agree not to rely on it for financial decisions. Nothing on this 
                  website constitutes professional financial, investment, legal, or tax advice.
                </p>
              </div>
              <p className="text-foreground/80">
                Any information provided is for entertainment and educational purposes only. You should conduct 
                your own research and consult with qualified professionals before making any investment decisions.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Limitation of Liability</h2>
              <p className="text-foreground/80 mb-4">
                In no event shall $ONETAP, its operators, or contributors be liable for any damages including, 
                without limitation, direct or indirect, special, incidental, or consequential damages, losses or 
                expenses arising in connection with this website or use thereof or inability to use by any party, 
                or in connection with any failure of performance, error, omission, interruption, defect, delay in 
                operation or transmission, computer virus or line or system failure.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Compliance with Laws</h2>
              <p className="text-foreground/80 mb-4">
                You are responsible for complying with your local laws and regulations. Cryptocurrency regulations 
                vary by jurisdiction.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Ensure cryptocurrency trading is legal in your jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Comply with all applicable tax reporting requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Understand and follow KYC/AML regulations in your region</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Intellectual Property</h2>
              <p className="text-foreground/80">
                The content on this website, excluding third-party trademarks and references, is the property of 
                the $ONETAP community. Unauthorized use or reproduction is prohibited.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Governing Law</h2>
              <p className="text-foreground/80">
                These terms shall be governed by and construed in accordance with applicable international law, 
                without regard to its conflict of law provisions.
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

export default Terms;
