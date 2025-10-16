import { useState, useEffect } from "react";
import NavbarV7 from "@/components/v7/NavbarV7";
import HeroV7 from "@/components/v7/HeroV7";
import FeaturesShowcaseV7 from "@/components/v7/FeaturesShowcaseV7";
import LiveStats from "@/components/LiveStats";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import RewardSystem from "@/components/RewardSystem";
import LeaderboardV7 from "@/components/v7/LeaderboardV7";
import DailyChallengesV7 from "@/components/v7/DailyChallengesV7";
import Community from "@/components/Community";
import MemeSection from "@/components/MemeSection";
import TapToEarnSection from "@/components/TapToEarnSection";
import FooterV7 from "@/components/v7/FooterV7";
import CookieBanner from "@/components/CookieBanner";
import BenController from "@/components/ben/BenController";
import LoadingScreen from "@/components/LoadingScreen";
import SectionWrapper from "@/components/SectionWrapper";

const IndexV7 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen bg-background">
        <BenController />
        <NavbarV7 />
        <HeroV7 />
        
        <SectionWrapper variant="primary">
          <FeaturesShowcaseV7 />
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
          <LeaderboardV7 />
        </SectionWrapper>

        <SectionWrapper variant="primary">
          <DailyChallengesV7 />
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
        
        <FooterV7 />
        <CookieBanner />
      </div>
    </>
  );
};

export default IndexV7;
