import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Sparkles, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string;
  drop_name: string;
  drop_icon: string;
  drop_rarity: string;
  rank_name: string;
  collected_at: string;
  is_equipped: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadInventory(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadInventory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('player_inventory')
        .select('*')
        .eq('user_id', userId)
        .order('collected_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error: any) {
      console.error('Error loading inventory:', error);
      toast({
        title: "Error loading inventory",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleEquip = async (itemId: string, currentEquipped: boolean) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('player_inventory')
        .update({ is_equipped: !currentEquipped })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setInventory(prev => prev.map(item => 
        item.id === itemId ? { ...item, is_equipped: !currentEquipped } : item
      ));
      
      toast({
        title: currentEquipped ? "Item unequipped" : "Item equipped",
        description: currentEquipped ? "Item removed from profile" : "Item equipped to profile",
      });
    } catch (error: any) {
      console.error('Error toggling equip:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      "Common": "bg-gray-500",
      "Uncommon": "bg-green-500",
      "Rare": "bg-blue-500",
      "Epic": "bg-purple-500",
      "Legendary": "bg-yellow-500",
      "Mythic": "bg-red-500",
      "Legendary+": "bg-gradient-to-r from-yellow-500 to-red-500"
    };
    return colors[rarity] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Info */}
        <Card className="bg-card/40 backdrop-blur-md border-2 border-primary/30 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.email || "Player"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {inventory.length} drops collected
              </p>
            </div>
          </div>
        </Card>

        {/* Inventory */}
        <Card className="bg-card/40 backdrop-blur-md border-2 border-primary/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Inventory</h2>
          </div>

          {inventory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No drops yet!</p>
              <p className="text-sm text-muted-foreground">
                Rank up to collect drops
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 transition-all cursor-pointer ${
                    item.is_equipped
                      ? "border-2 border-primary shadow-glow-primary"
                      : "border border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleEquip(item.id, item.is_equipped)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{item.drop_icon}</div>
                    <Badge className={`${getRarityColor(item.drop_rarity)} text-white text-xs mb-2`}>
                      {item.drop_rarity}
                    </Badge>
                    <h3 className="font-bold text-sm mb-1">{item.drop_name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      From: {item.rank_name}
                    </p>
                    {item.is_equipped && (
                      <Badge variant="outline" className="text-xs">
                        ✓ Equipped
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
