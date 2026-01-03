import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import Community from "@/components/Community";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SectionWrapper from "@/components/SectionWrapper";
import BenControllerV2 from "@/components/ben/BenControllerV2";
import LiveStats from "@/components/LiveStats";
import MediaSection from "@/components/MediaSection";
import SocialProof from "@/components/SocialProof";
import SwapWidget from "@/components/SwapWidget";
import WhyOneTap from "@/components/WhyOneTap";
import StickyBuyButton from "@/components/StickyBuyButton";
import LiveMarketCap from "@/components/LiveMarketCap";
import HowToBuy from "@/components/HowToBuy";
import EarlyBuyerBonus from "@/components/EarlyBuyerBonus";
import PartnersSection from "@/components/PartnersSection";
import NotificationBell from "@/components/NotificationBell";
import NotificationCTA from "@/components/NotificationCTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BenControllerV2 />
      <NotificationBell />
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

      <div id="how-to-buy">
        <SectionWrapper variant="primary" blendFrom="accent">
          <HowToBuy />
        </SectionWrapper>
      </div>

      <div id="swap">
        <SectionWrapper variant="accent" blendFrom="primary">
          <SwapWidget />
        </SectionWrapper>
      </div>

      <div id="early-bonus">
        <SectionWrapper variant="primary" blendFrom="accent">
          <EarlyBuyerBonus />
        </SectionWrapper>
      </div>

      <div id="live-market">
        <SectionWrapper variant="accent" blendFrom="primary">
          <LiveMarketCap />
        </SectionWrapper>
      </div>

      <div id="live-stats">
        <SectionWrapper variant="primary" blendFrom="accent">
          <LiveStats />
        </SectionWrapper>
      </div>
      
      <div id="roadmap">
        <SectionWrapper variant="primary" blendFrom="accent">
          <RoadmapTimeline />
        </SectionWrapper>
      </div>
      
      <div id="community">
        <SectionWrapper variant="primary" blendFrom="accent">
          <Community />
        </SectionWrapper>
      </div>

      <div id="notifications">
        <SectionWrapper variant="accent" blendFrom="primary">
          <div className="container mx-auto max-w-4xl">
            <NotificationCTA />
          </div>
        </SectionWrapper>
      </div>

      <div id="media">
        <SectionWrapper variant="accent" blendFrom="primary">
          <MediaSection />
        </SectionWrapper>
      </div>

      <div id="partners">
        <SectionWrapper variant="primary" blendFrom="accent">
          <PartnersSection />
        </SectionWrapper>
      </div>

      <div id="social-proof">
        <SectionWrapper variant="accent" blendFrom="primary">
          <SocialProof />
        </SectionWrapper>
      </div>

      <div id="faq">
        <SectionWrapper variant="accent" blendFrom="primary">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about $1TAP
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="q1" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">What is $1TAP?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  $1TAP is a community-driven meme coin on the Base network, inspired by competitive gaming culture. It combines gaming nostalgia with DeFi innovation, offering a tap-to-earn game, NFT drops, and a vibrant ecosystem.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">How does the Tap-to-Earn game work?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Tap the screen to earn XP, rank up through 10+ tiers (Bronze → Global Elite), and unlock NFT drops. Higher ranks = rarer drops. Fully on-chain, play on web or mobile.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">What are the tokenomics?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Total supply: 100,000,000 $1TAP tokens. Fixed supply, no minting function. 3% transaction tax (1% dev, 1% marketing, 1% liquidity). Liquidity pool locked for 6 months.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">Is the contract audited and safe?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Internal security audit completed. Contract is open-source and verified on BaseScan. LP locked for 6 months, multi-sig wallet (2/3 required), no mint function, and taxes are immutable. Check our Security page for full details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">How do I buy $1TAP?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  1. Get a Web3 wallet (MetaMask, Coinbase Wallet). 2. Add Base network. 3. Bridge ETH to Base. 4. Swap on Uniswap using our contract address. Always verify the contract on our official channels!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">What makes $1TAP different from other meme coins?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Unlike typical meme coins, $1TAP has real utility: a tap-to-earn game, XP rankings, NFT drops, and a gamified ecosystem. We focus on the gaming community with CS:GO-inspired themes and competitive features.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">Is there a team token lock?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Team tokens are locked with a transparent release schedule via timelock. Dev and marketing funds require multi-sig approval (2/3 signatures). Full transparency is our priority.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8" className="glass-effect border border-primary/20 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">How can I get involved in the community?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Join our Discord, follow us on X/Twitter, participate in meme contests, earn XP through daily quests, and help spread the word. Active contributors earn special "Commander" and "Sniper" roles with exclusive rewards!
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <a
                href="/faq"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                View All Questions →
              </a>
            </div>
          </div>
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
