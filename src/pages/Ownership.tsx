import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Lock, Calendar, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Ownership = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            ← Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Official Ownership Certificate</h1>
            <p className="text-muted-foreground text-lg">
              Legal proof of ownership and intellectual property rights for the $ONETAP project
            </p>
          </div>

          {/* Main Content */}
          <Card className="p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">$ONETAP — Official Ownership Document</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Name</p>
                <p className="text-lg font-semibold">$ONETAP</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="text-lg font-semibold">Hugo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  January 7, 2025
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="text-lg font-semibold">1.0</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">Project Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                The $ONETAP project is an independent digital initiative combining blockchain, 
                gaming culture, and artistic design inspired by Counter-Strike. It includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>A memecoin deployed on the Base network</li>
                <li>The ONETAP website and gamified experience</li>
                <li>Visual assets, branding, sound effects, and digital art under the "Pixel CT" identity</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Ownership Statement
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I, Hugo, declare that I am the sole and legitimate owner of the $ONETAP project 
                and all associated intellectual property, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Branding and identity:</strong> "$ONETAP", "Onetapper", "Pixel-CT Memes"</li>
                <li><strong>Visual and audio assets:</strong> All images, sounds, animations, and design elements</li>
                <li><strong>The $ONETAP website:</strong> Source code, user interface, and interactive features</li>
                <li><strong>Token concept:</strong> Smart contract design and tokenomics structure</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                This ownership extends to all future versions, updates, and derivatives of the project.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">Legal Framework</h3>
              <p className="text-muted-foreground leading-relaxed">
                This document serves as proof of ownership under:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>European Directive 2001/29/EC</strong> (Copyright in the Information Society)</li>
                <li><strong>Berne Convention</strong> for the Protection of Literary and Artistic Works</li>
                <li><strong>French Code de la Propriété Intellectuelle</strong>, Articles L111-1 and L113-1</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-500">Non-Affiliation Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                The $ONETAP project is <strong>not affiliated, associated, authorized, endorsed by, 
                or in any way officially connected</strong> with Valve Corporation, Counter-Strike 
                (CS:GO, CS2, or any related games), Gabe Newell, or any official gaming entities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All references to Counter-Strike, CS:GO, CS2, or related gaming culture are purely 
                thematic, artistic, and for entertainment purposes only. This is an independent 
                community project.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-xl font-bold">Digital Signature</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2 font-mono text-sm">
                <p><strong>Signed by:</strong> Hugo</p>
                <p className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <strong>Website:</strong> onetapmeme.com
                </p>
                <p><strong>Timestamp:</strong> 2025-01-07</p>
                <p><strong>Document Hash:</strong> [Generated on commit]</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-center text-sm text-muted-foreground">
                © 2025 $ONETAP Project — All rights reserved.<br />
                <strong>Non-affiliated with Valve Corporation or Counter-Strike.</strong>
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Protected under ONETAP Legal Shield v1.0
              </p>
            </div>
          </Card>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <FileText className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">License</h3>
              <p className="text-sm text-muted-foreground">View the ONETAP Community License 1.0</p>
              <a 
                href="https://onetapmeme.com/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Read License →
              </a>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <Shield className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">Security Audit</h3>
              <p className="text-sm text-muted-foreground">Token transparency and security report</p>
              <a 
                href="https://onetapmeme.com/disclaimer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Audit →
              </a>
            </Card>

            <Card className="p-6 text-center space-y-3 hover:bg-accent transition-colors">
              <Github className="w-8 h-8 mx-auto text-primary" />
              <h3 className="font-bold">Source Code</h3>
              <p className="text-sm text-muted-foreground">Open-source repository on GitHub</p>
              <a 
                href="https://github.com/Hugo-SEQUIER/onetap-token" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Repository →
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ownership;
