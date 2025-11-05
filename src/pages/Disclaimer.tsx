import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Disclaimer = () => {
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
            <AlertTriangle className="w-8 h-8 text-secondary" />
            <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed">
              $1TAP is a community meme token. It has no intrinsic value or expectation of financial return.
              It is not an investment, security, or financial product. Do your own research.
            </p>

            <p className="text-lg leading-relaxed">
              By interacting with this website or the token, you agree that you are solely responsible for your 
              actions and acknowledge the risks associated with cryptocurrencies.
            </p>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
              <p className="font-bold text-destructive mb-2">Important Notice</p>
              <p className="text-foreground/80">
                Nothing on this website constitutes financial advice. Cryptocurrency trading involves substantial 
                risk of loss and is not suitable for every investor. Always consult with a qualified financial 
                advisor before making any investment decisions.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Risks</h2>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>High volatility and potential for complete loss of investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>No guarantees of value, liquidity, or market performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>Smart contract risks and potential vulnerabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">▸</span>
                  <span>Regulatory uncertainty in various jurisdictions</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Your Responsibility</h2>
              <p className="text-foreground/80">
                You are solely responsible for determining whether any investment, investment strategy, or 
                related transaction is appropriate for you based on your personal investment objectives, 
                financial circumstances, and risk tolerance. You should consult your legal or tax professional 
                regarding your specific situation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
