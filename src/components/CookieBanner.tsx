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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in">
      <div className="glass-effect rounded-lg p-3 border border-primary/20 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground flex-1">
            No data collected. View{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy</a>
          </p>
          <Button variant="ghost" size="sm" onClick={handleAccept} className="h-6 w-6 p-0">
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
