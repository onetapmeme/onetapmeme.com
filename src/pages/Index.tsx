import { useState, useEffect } from "react";
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
import BenCharacter from "@/components/BenCharacter";
import LoadingScreen from "@/components/LoadingScreen";
import LiveStats from "@/components/LiveStats";
import RewardSystem from "@/components/RewardSystem";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen bg-background">
        <BenCharacter />
        <LanguageSwitcher />
        <Navbar />
        <Hero />
        
        <SectionWrapper variant="primary">
          <About />
        </SectionWrapper>

        <SectionWrapper variant="accent">
          <LiveStats />
        </SectionWrapper>
        
        <SectionWrapper variant="primary">
          <Tokenomics />
        </SectionWrapper>
        
        <SectionWrapper variant="accent">
          <Roadmap />
        </SectionWrapper>

        <SectionWrapper variant="primary">
          <RewardSystem />
        </SectionWrapper>
        
        <SectionWrapper variant="accent">
          <Community />
        </SectionWrapper>
        
        <SectionWrapper variant="primary">
          <MemeSection />
        </SectionWrapper>
        
        <SectionWrapper variant="accent">
          <TapToEarnSection />
        </SectionWrapper>
        
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
};

export default Index;
