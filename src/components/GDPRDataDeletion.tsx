import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Trash2, Loader2, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export const GDPRDataDeletion = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gdpr-delete-user-data');
      
      if (error) {
        throw error;
      }

      if (data?.success) {
        setIsDeleted(true);
        toast({
          title: "Data Deleted",
          description: "All your personal data has been permanently deleted.",
        });

        // Sign out and redirect after 3 seconds
        setTimeout(async () => {
          await supabase.auth.signOut();
          navigate('/');
        }, 3000);
      } else {
        throw new Error(data?.message || 'Deletion failed');
      }
    } catch (error: any) {
      console.error('GDPR deletion error:', error);
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleted) {
    return (
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            Data Deleted Successfully
          </CardTitle>
          <CardDescription>
            Your account and all associated data have been permanently deleted.
            You will be redirected shortly.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Delete All My Data (GDPR Article 17)
        </CardTitle>
        <CardDescription>
          Exercise your Right to Erasure under GDPR Article 17. This action will
          permanently delete all your personal data from our systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>This will permanently delete:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Your player progress and XP</li>
            <li>Your inventory and collected items</li>
            <li>Your achievements and quest progress</li>
            <li>Your created memes and votes</li>
            <li>Your manifesto signature</li>
            <li>Your wallet statistics</li>
            <li>Your referral information (anonymized)</li>
          </ul>
          <p className="mt-4 font-semibold text-destructive">
            ⚠️ This action cannot be undone.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All My Data
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers in compliance
                with GDPR Article 17 (Right to Erasure).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAllData}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Yes, delete everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
