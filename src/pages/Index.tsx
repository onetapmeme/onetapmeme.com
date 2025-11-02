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
        <SectionWrapper variant="primary">
          <Hero />
        </SectionWrapper>
      </div>
      
      <div id="about" className="scroll-mt-20">
        <SectionWrapper variant="primary" blendFrom="primary">
          <About />
        </SectionWrapper>
      </div>

      <div id="tokenomics">
        <SectionWrapper variant="accent" blendFrom="primary">
          <Tokenomics />
        </SectionWrapper>
      </div>

      <div id="live-stats">
        <SectionWrapper variant="primary" blendFrom="accent">
          <LiveStats />
        </SectionWrapper>
      </div>
      
      <div id="roadmap">
        <SectionWrapper variant="accent" blendFrom="primary">
          <Roadmap />
        </SectionWrapper>
      </div>
      
      <div id="community">
        <SectionWrapper variant="primary" blendFrom="accent">
          <Community />
        </SectionWrapper>
      </div>

      <div id="media">
        <SectionWrapper variant="accent" blendFrom="primary">
          <MediaSection />
        </SectionWrapper>
      </div>

      <div id="tap-to-earn">
        <SectionWrapper variant="primary" blendFrom="accent">
          <TapToEarnSection />
        </SectionWrapper>
      </div>

      <div id="rewards">
        <SectionWrapper variant="accent" blendFrom="primary">
          <RewardSystem />
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
