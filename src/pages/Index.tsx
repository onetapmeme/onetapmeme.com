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
import SectionWrapper from "@/components/SectionWrapper";
import BenControllerV2 from "@/components/ben/BenControllerV2";
import LiveStats from "@/components/LiveStats";
import RewardSystem from "@/components/RewardSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BenControllerV2 />
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      
      <SectionWrapper variant="primary">
        <About />
      </SectionWrapper>

      <SectionWrapper variant="accent">
        <Tokenomics />
      </SectionWrapper>

      <SectionWrapper variant="primary">
        <LiveStats />
      </SectionWrapper>
      
      <SectionWrapper variant="accent">
        <Roadmap />
      </SectionWrapper>
      
      <SectionWrapper variant="primary">
        <Community />
      </SectionWrapper>

      <SectionWrapper variant="accent">
        <TapToEarnSection />
      </SectionWrapper>

      <SectionWrapper variant="primary">
        <RewardSystem />
      </SectionWrapper>
      
      <SectionWrapper variant="accent">
        <MemeSection />
      </SectionWrapper>
      
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
