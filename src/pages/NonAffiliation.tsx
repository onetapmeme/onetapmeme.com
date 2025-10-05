import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const NonAffiliation = () => {
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Non-Affiliation Notice</h1>
          </div>

          <div className="space-y-6 text-foreground/90">
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="text-lg leading-relaxed font-medium">
                $ONETAP is <strong>not affiliated</strong>, associated, authorized, endorsed by, or in any way 
                officially connected with Counter-Strike, Counter-Strike 2 (CS2), Valve Corporation, or Gabe Newell.
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              This is an independent community-driven memecoin project inspired by gaming culture. We have no 
              official relationship, partnership, or endorsement from any gaming companies or their representatives.
            </p>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Trademarks</h2>
              <p className="text-foreground/80 mb-4">
                All product and company names mentioned on this website are trademarks™ or registered® trademarks 
                of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>Counter-Strike and CS:GO are trademarks of Valve Corporation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>All game assets, logos, and imagery belong to their respective owners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>This project uses publicly available gaming culture references for entertainment purposes</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Independent Project</h2>
              <p className="text-foreground/80">
                $ONETAP is a grassroots community initiative created by gaming enthusiasts and cryptocurrency 
                supporters. Any similarities to existing games or brands are purely inspirational and do not 
                represent official partnerships or endorsements.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
              <p className="text-foreground/80">
                If you are a trademark holder and have concerns about our use of references, please contact us 
                for clarification or resolution.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NonAffiliation;
