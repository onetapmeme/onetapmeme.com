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
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Tokenomics />
      <SectionDivider />
      <Community />
      <SectionDivider />
      <Roadmap />
      <SectionDivider />
      <MemeSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
