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
import MediaSection from "@/components/MediaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BenControllerV2 />
      <LanguageSwitcher />
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      
      <div id="about">
        <SectionWrapper variant="primary">
          <About />
        </SectionWrapper>
      </div>

      <div id="tokenomics">
        <SectionWrapper variant="accent">
          <Tokenomics />
        </SectionWrapper>
      </div>

      <div id="live-stats">
        <SectionWrapper variant="primary">
          <LiveStats />
        </SectionWrapper>
      </div>
      
      <div id="roadmap">
        <SectionWrapper variant="accent">
          <Roadmap />
        </SectionWrapper>
      </div>
      
      <div id="community">
        <SectionWrapper variant="primary">
          <Community />
        </SectionWrapper>
      </div>

      <div id="tap-to-earn">
        <SectionWrapper variant="accent">
          <TapToEarnSection />
        </SectionWrapper>
      </div>

      <div id="rewards">
        <SectionWrapper variant="primary">
          <RewardSystem />
        </SectionWrapper>
      </div>
      
      <div id="memes">
        <SectionWrapper variant="accent">
          <MemeSection />
        </SectionWrapper>
      </div>

      <div id="media">
        <SectionWrapper variant="primary">
          <MediaSection />
        </SectionWrapper>
      </div>
      
      <div id="footer">
        <Footer />
      </div>
      <CookieBanner />
    </div>
  );
};

export default Index;
