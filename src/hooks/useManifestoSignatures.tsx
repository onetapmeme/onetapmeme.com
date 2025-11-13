import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useManifestoSignatures = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSignatureCount = async () => {
    try {
      const { count: totalCount, error } = await supabase
        .from('manifesto_signatures')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      setCount(totalCount || 0);
    } catch (error) {
      console.error('Error fetching signature count:', error);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial count
    fetchSignatureCount();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('manifesto_signatures_count')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'manifesto_signatures'
        },
        () => {
          fetchSignatureCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const signManifesto = async (email: string) => {
    try {
      const { error } = await supabase
        .from('manifesto_signatures')
        .insert({ email });
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('already_signed');
        }
        throw error;
      }
      
      return { success: true };
    } catch (error: any) {
      if (error.message === 'already_signed') {
        throw new Error('already_signed');
      }
      throw error;
    }
  };

  return { count, loading, signManifesto };
};
