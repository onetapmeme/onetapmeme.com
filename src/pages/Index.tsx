import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import Community from "@/components/Community";
import Roadmap from "@/components/Roadmap";
import MemeSection from "@/components/MemeSection";
import TapToEarnSection from "@/components/TapToEarnSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SectionTransition from "@/components/SectionTransition";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      <SectionTransition variant="primary" />
      <About />
      <SectionTransition variant="accent" />
      <Tokenomics />
      <SectionTransition variant="primary" />
      <Community />
      <SectionTransition variant="accent" />
      <Roadmap />
      <SectionTransition variant="primary" />
      <MemeSection />
      <SectionTransition variant="accent" />
      <TapToEarnSection />
      <SectionTransition variant="subtle" />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
