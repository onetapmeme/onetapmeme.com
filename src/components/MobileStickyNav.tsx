import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, Users } from "lucide-react";
import { SiDiscord } from "react-icons/si";

const MobileStickyNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-effect border-t-2 border-primary/30 px-4 py-3">
        <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
          <Button
            size="sm"
            variant="default"
            asChild
            className="flex-1"
            style={{
              background: 'linear-gradient(135deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
            }}
          >
            <a 
              href="https://dexscreener.com/base/onetap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">Buy $1TAP</span>
            </a>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            asChild
            className="flex-1 border-primary/40"
          >
            <a 
              href="https://x.com/OneTapMeme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">X/Twitter</span>
            </a>
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            asChild
            className="flex-1 border-primary/40"
          >
            <a 
              href="https://discord.com/channels/1219285086156099644"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <SiDiscord className="w-4 h-4" />
              <span className="text-xs font-semibold">Discord</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyNav;
