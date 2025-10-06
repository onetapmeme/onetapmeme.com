import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Enter from "./pages/Enter";
import Index from "./pages/Index";
import Disclaimer from "./pages/Disclaimer";
import NonAffiliation from "./pages/NonAffiliation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import MemeGenerator from "./pages/MemeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/home" element={<Index />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/non-affiliation" element={<NonAffiliation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/meme" element={<MemeGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
