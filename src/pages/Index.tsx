import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import Community from "@/components/Community";
import Roadmap from "@/components/Roadmap";
import MemeSection from "@/components/MemeSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      <About />
      <Tokenomics />
      <Community />
      <Roadmap />
      <MemeSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
