import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import Community from "@/components/Community";
import RoadmapTimeline from "@/components/RoadmapTimeline";
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
import SocialProof from "@/components/SocialProof";
import SwapWidget from "@/components/SwapWidget";
import VideoShowcase from "@/components/VideoShowcase";
import WhyOneTap from "@/components/WhyOneTap";
import AirdropCalendar from "@/components/AirdropCalendar";
import StickyBuyButton from "@/components/StickyBuyButton";

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
        <SectionWrapper variant="accent" blendFrom="primary">
          <About />
        </SectionWrapper>
      </div>

      <div id="tokenomics">
        <SectionWrapper variant="primary" blendFrom="accent">
          <Tokenomics />
        </SectionWrapper>
      </div>
      
      <div id="why-onetap">
        <SectionWrapper variant="accent" blendFrom="primary">
          <WhyOneTap />
        </SectionWrapper>
      </div>

      <div id="swap">
        <SectionWrapper variant="primary" blendFrom="accent">
          <SwapWidget />
        </SectionWrapper>
      </div>

      <div id="live-stats">
        <SectionWrapper variant="accent" blendFrom="primary">
          <LiveStats />
        </SectionWrapper>
      </div>
      
      <div id="roadmap">
        <SectionWrapper variant="primary" blendFrom="accent">
          <RoadmapTimeline />
        </SectionWrapper>
      </div>

      <div id="tap-to-earn">
        <SectionWrapper variant="accent" blendFrom="primary">
          <TapToEarnSection />
        </SectionWrapper>
      </div>

      <div id="rewards">
        <SectionWrapper variant="primary" blendFrom="accent">
          <RewardSystem />
        </SectionWrapper>
      </div>

      <div id="airdrops">
        <SectionWrapper variant="accent" blendFrom="primary">
          <AirdropCalendar />
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

      <div id="videos">
        <SectionWrapper variant="primary" blendFrom="accent">
          <VideoShowcase />
        </SectionWrapper>
      </div>

      <div id="social-proof">
        <SectionWrapper variant="accent" blendFrom="primary">
          <SocialProof />
        </SectionWrapper>
      </div>
      
      <div id="footer">
        <Footer />
      </div>
      <CookieBanner />
      <StickyBuyButton />
    </div>
  );
};

export default Index;
