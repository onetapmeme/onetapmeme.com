import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Enter from "./pages/Enter";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Disclaimer from "./pages/Disclaimer";
import NonAffiliation from "./pages/NonAffiliation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LegalNotice from "./pages/LegalNotice";
import Ownership from "./pages/Ownership";
import Token from "./pages/Token";
import Lore from "./pages/Lore";
import NotFound from "./pages/NotFound";
import MemeGenerator from "./pages/MemeGenerator";
import FAQ from "./pages/FAQ";
import Team from "./pages/Team";
import Whitepaper from "./pages/Whitepaper";
import Dashboard from "./pages/Dashboard";
import TapToEarn from "./pages/TapToEarn";
import DailyQuestsPage from "./pages/DailyQuestsPage";
import Security from "./pages/Security";
import Blog from "./pages/Blog";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import Manifesto from "./pages/Manifesto";
import ManifestoVerify from "./pages/ManifestoVerify";
import Integrations from "./pages/Integrations";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";
import Crafting from "./pages/Crafting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SEOHead />
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/home" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ownership" element={<Ownership />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/non-affiliation" element={<NonAffiliation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/token" element={<Token />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/meme" element={<MemeGenerator />} />
          <Route path="/meme-generator" element={<MemeGenerator />} />
          <Route path="/tap-to-earn" element={<TapToEarn />} />
          <Route path="/daily-quests" element={<DailyQuestsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team" element={<Team />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/security" element={<Security />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/manifesto/verify" element={<ManifestoVerify />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/crafting" element={<Crafting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
