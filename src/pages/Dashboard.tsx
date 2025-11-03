import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletDashboard from '@/components/WalletDashboard';
import ROICalculator from '@/components/ROICalculator';
import ReferralDashboard from '@/components/ReferralDashboard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Calculator, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="wallet" className="gap-2">
                <Wallet className="w-4 h-4" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="calculator" className="gap-2">
                <Calculator className="w-4 h-4" />
                ROI
              </TabsTrigger>
              <TabsTrigger value="referrals" className="gap-2">
                <Users className="w-4 h-4" />
                Referrals
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet">
              <WalletDashboard />
            </TabsContent>
            
            <TabsContent value="calculator">
              <ROICalculator />
            </TabsContent>
            
            <TabsContent value="referrals">
              <ReferralDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;