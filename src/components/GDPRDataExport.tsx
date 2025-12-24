import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileJson, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GDPRDataExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExportData = async () => {
    setIsExporting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gdpr-export-user-data');
      
      if (error) {
        throw error;
      }

      // Create downloadable file
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Generate filename
      const date = new Date().toISOString().split('T')[0];
      const filename = `my-data-export-${date}.json`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLastExport(new Date().toLocaleString());
      
      toast({
        title: "Data Exported",
        description: "Your personal data has been downloaded successfully.",
      });

    } catch (error: any) {
      console.error('GDPR export error:', error);
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5 text-primary" />
          Download My Data (GDPR Article 15)
        </CardTitle>
        <CardDescription>
          Exercise your Right of Access under GDPR Article 15. Download a complete
          copy of all your personal data stored in our systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Your export will include:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Account information and email</li>
            <li>Player progress and XP data</li>
            <li>Inventory and collected items</li>
            <li>Achievements and quest progress</li>
            <li>Created memes and votes</li>
            <li>Manifesto signature (if signed)</li>
            <li>Referral information</li>
            <li>Wallet statistics</li>
          </ul>
        </div>

        <Button 
          onClick={handleExportData}
          className="w-full"
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing Export...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download My Data (JSON)
            </>
          )}
        </Button>

        {lastExport && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Last exported: {lastExport}
          </div>
        )}
      </CardContent>
    </Card>
  );
};