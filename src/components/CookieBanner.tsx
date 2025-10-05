import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("onetap-privacy-accepted");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("onetap-privacy-accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-pixel-fade">
      <Card className="max-w-4xl mx-auto bg-card border-2 border-primary/50 shadow-glow-cyan">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">Privacy Notice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This website does not collect or store any personal data. We do not use cookies for tracking. 
                By using this site, you acknowledge our{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/disclaimer" className="text-primary hover:underline">
                  Disclaimer
                </a>
                . Blockchain interactions are public and handled by your wallet provider.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" size="sm" onClick={handleAccept}>
                  I Understand
                </Button>
                <Button variant="ghost" size="sm" onClick={handleAccept}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
