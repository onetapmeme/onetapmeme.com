import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CookieBanner from "@/components/CookieBanner";
import CardHome from "@/components/cards/CardHome";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      <CardHome />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
