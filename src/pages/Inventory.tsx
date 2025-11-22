import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, Trophy, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InventoryItem {
  id: string;
  drop_name: string;
  drop_icon: string;
  drop_rarity: string;
  rank_name: string;
  collected_at: string;
  is_equipped: boolean;
}

const rarityColors: Record<string, string> = {
  common: 'bg-slate-500/20 border-slate-500/50 text-slate-300',
  uncommon: 'bg-green-500/20 border-green-500/50 text-green-300',
  rare: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
  epic: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
  legendary: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
  mythic: 'bg-red-500/20 border-red-500/50 text-red-300'
};

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [inventory, selectedRarity]);

  const loadInventory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    setUser(user);

    const { data, error } = await supabase
      .from('player_inventory')
      .select('*')
      .eq('user_id', user.id)
      .order('collected_at', { ascending: false });

    if (data) {
      setInventory(data);
    }

    setLoading(false);
  };

  const filterInventory = () => {
    if (selectedRarity === 'all') {
      setFilteredInventory(inventory);
    } else {
      setFilteredInventory(inventory.filter(item => item.drop_rarity.toLowerCase() === selectedRarity));
    }
  };

  const getRarityCount = (rarity: string) => {
    if (rarity === 'all') return inventory.length;
    return inventory.filter(item => item.drop_rarity.toLowerCase() === rarity).length;
  };

  const rarityTabs = [
    { value: 'all', label: 'All', icon: Package },
    { value: 'common', label: 'Common', icon: Package },
    { value: 'uncommon', label: 'Uncommon', icon: Package },
    { value: 'rare', label: 'Rare', icon: Trophy },
    { value: 'epic', label: 'Epic', icon: Sparkles },
    { value: 'legendary', label: 'Legendary', icon: Trophy },
    { value: 'mythic', label: 'Mythic', icon: Sparkles }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Inventory</h1>
            <p className="text-muted-foreground mb-8">
              Please login to view your collected drops and items
            </p>
            <Button onClick={() => navigate('/auth')} size="lg">
              Login to View Inventory
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Inventory</h1>
            <p className="text-lg text-muted-foreground">
              Total Items: <span className="text-primary font-bold">{inventory.length}</span>
            </p>
          </motion.div>

          {/* Rarity Filter Tabs */}
          <Tabs value={selectedRarity} onValueChange={setSelectedRarity} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-2 bg-background/50 p-2">
              {rarityTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <Badge variant="secondary" className="ml-1">
                      {getRarityCount(tab.value)}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Inventory Grid */}
          {filteredInventory.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedRarity === 'all' 
                  ? 'Start playing Tap-to-Earn to collect drops!'
                  : `No ${selectedRarity} items in your inventory yet`
                }
              </p>
              <Button onClick={() => navigate('/home#tap-to-earn')}>
                Go to Tap-to-Earn
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredInventory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-6 glass-effect border-2 ${rarityColors[item.drop_rarity.toLowerCase()] || rarityColors.common} hover:scale-105 transition-all`}>
                    <div className="text-center space-y-4">
                      <div className="text-6xl mb-4">{item.drop_icon}</div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.drop_name}</h3>
                        <Badge variant="outline" className="mb-2">
                          {item.drop_rarity}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>From: <span className="text-foreground">{item.rank_name}</span></p>
                        <p>Collected: <span className="text-foreground">
                          {new Date(item.collected_at).toLocaleDateString()}
                        </span></p>
                      </div>

                      {item.is_equipped && (
                        <Badge className="w-full">Equipped</Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats Summary */}
          {inventory.length > 0 && (
            <motion.div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {['common', 'rare', 'epic', 'legendary'].map((rarity) => (
                <Card key={rarity} className="p-4 text-center glass-effect border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1 capitalize">{rarity}</p>
                  <p className="text-2xl font-bold text-primary">
                    {getRarityCount(rarity)}
                  </p>
                </Card>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
