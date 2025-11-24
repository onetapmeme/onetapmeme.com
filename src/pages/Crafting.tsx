import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

interface InventoryItem {
  id: string;
  drop_name: string;
  drop_icon: string;
  drop_rarity: string;
  collected_at: string;
  is_equipped: boolean;
}

const rarityColors: Record<string, string> = {
  "Common": "border-gray-500 bg-gray-500/10 text-gray-300",
  "Uncommon": "border-green-500 bg-green-500/10 text-green-300",
  "Rare": "border-blue-500 bg-blue-500/10 text-blue-300",
  "Epic": "border-purple-500 bg-purple-500/10 text-purple-300",
  "Legendary": "border-yellow-500 bg-yellow-500/10 text-yellow-300",
  "Legendary+": "border-orange-500 bg-orange-500/10 text-orange-300",
  "Mythic": "border-red-500 bg-red-500/10 text-red-300"
};

const CRAFT_RECIPES = [
  { from: 'Common', to: 'Uncommon', required: 3 },
  { from: 'Uncommon', to: 'Rare', required: 3 },
  { from: 'Rare', to: 'Epic', required: 3 },
  { from: 'Epic', to: 'Legendary', required: 3 },
  { from: 'Legendary', to: 'Legendary+', required: 3 },
  { from: 'Legendary+', to: 'Mythic', required: 3 },
];

export default function Crafting() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [crafting, setCrafting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      loadInventory(user.id);
    } else {
      setLoading(false);
    }
  };

  const loadInventory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('player_inventory')
        .select('*')
        .eq('user_id', userId)
        .order('drop_rarity', { ascending: true })
        .order('collected_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const canCraft = () => {
    if (selectedItems.size === 0) return false;

    const selectedItemsList = inventory.filter(item => selectedItems.has(item.id));
    if (selectedItemsList.length === 0) return false;

    const rarity = selectedItemsList[0].drop_rarity;
    const recipe = CRAFT_RECIPES.find(r => r.from === rarity);
    
    if (!recipe) return false;

    return selectedItemsList.every(item => item.drop_rarity === rarity) && 
           selectedItemsList.length === recipe.required;
  };

  const handleCraft = async () => {
    if (!user) {
      toast.error("You must be logged in to craft");
      return;
    }

    if (!canCraft()) {
      toast.error("Invalid crafting selection");
      return;
    }

    setCrafting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('craft-items', {
        body: { itemIds: Array.from(selectedItems) },
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });

      if (response.error) throw response.error;

      toast.success(response.data.message, {
        description: `+${response.data.xpEarned} XP earned!`
      });

      setSelectedItems(new Set());
      await loadInventory(user.id);
    } catch (error: any) {
      console.error('Crafting error:', error);
      toast.error(error.message || "Failed to craft items");
    } finally {
      setCrafting(false);
    }
  };

  const getSelectedRarityInfo = () => {
    if (selectedItems.size === 0) return null;
    
    const selectedItemsList = inventory.filter(item => selectedItems.has(item.id));
    if (selectedItemsList.length === 0) return null;
    
    const rarity = selectedItemsList[0].drop_rarity;
    const recipe = CRAFT_RECIPES.find(r => r.from === rarity);
    
    return { rarity, recipe, count: selectedItemsList.length };
  };

  const rarityInfo = getSelectedRarityInfo();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Crafting System</h1>
          <p className="text-muted-foreground mb-8">
            Please log in to access the crafting system
          </p>
        </div>
      </div>
    );
  }

  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.drop_rarity]) {
      acc[item.drop_rarity] = [];
    }
    acc[item.drop_rarity].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Crafting System
            </h1>
            <p className="text-muted-foreground text-lg">
              Combine 3 items of the same rarity to create a higher tier item
            </p>
          </div>

          {/* Crafting Recipes Card */}
          <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Crafting Recipes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CRAFT_RECIPES.map((recipe) => (
                <div key={recipe.from} className="text-center p-3 rounded-lg bg-background/50 border border-border/30">
                  <div className="text-sm mb-1">
                    <span className={rarityColors[recipe.from]?.split(' ')[2]}>
                      {recipe.required}x {recipe.from}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">→</div>
                  <div className="text-sm font-semibold">
                    <span className={rarityColors[recipe.to]?.split(' ')[2]}>
                      1x {recipe.to}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Selection Info */}
          {rarityInfo && (
            <Card className="p-4 mb-6 bg-primary/10 border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Items</p>
                  <p className="text-lg font-semibold">
                    {rarityInfo.count} / {rarityInfo.recipe?.required || 0} {rarityInfo.rarity} items
                  </p>
                </div>
                {rarityInfo.recipe && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Will craft</p>
                    <p className={`text-lg font-semibold ${rarityColors[rarityInfo.recipe.to]?.split(' ')[2]}`}>
                      {rarityInfo.recipe.to}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Craft Button */}
          <div className="mb-8 text-center">
            <Button
              onClick={handleCraft}
              disabled={!canCraft() || crafting}
              size="lg"
              className="gap-2"
            >
              {crafting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Crafting...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Craft Items ({selectedItems.size} selected)
                </>
              )}
            </Button>
          </div>

          {/* Inventory Grid by Rarity */}
          <div className="space-y-8">
            {Object.keys(groupedInventory).length === 0 ? (
              <Card className="p-12 text-center bg-card/30 backdrop-blur-sm">
                <p className="text-muted-foreground">
                  Your inventory is empty. Play the Tap to Earn game to collect items!
                </p>
              </Card>
            ) : (
              Object.entries(groupedInventory).map(([rarity, items]) => {
                const recipe = CRAFT_RECIPES.find(r => r.from === rarity);
                
                return (
                  <div key={rarity}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-2xl font-bold ${rarityColors[rarity]?.split(' ')[2]}`}>
                        {rarity} ({items.length})
                      </h2>
                      {recipe && (
                        <span className="text-sm text-muted-foreground">
                          {recipe.required} items → {recipe.to}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {items.map((item) => (
                        <Card
                          key={item.id}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`
                            relative p-4 cursor-pointer transition-all hover:scale-105
                            ${rarityColors[item.drop_rarity]}
                            ${selectedItems.has(item.id) ? 'ring-4 ring-primary shadow-lg shadow-primary/50' : ''}
                          `}
                        >
                          <div className="text-center">
                            <div className="text-4xl mb-2">
                              {item.drop_icon.endsWith('.png') ? '🎮' : item.drop_icon}
                            </div>
                            <p className="text-xs font-medium line-clamp-2">
                              {item.drop_name}
                            </p>
                            {selectedItems.has(item.id) && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
