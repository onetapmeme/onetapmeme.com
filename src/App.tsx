import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import RouteSEO from "@/components/RouteSEO";
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
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Diagnostic from "./pages/Diagnostic";
import Booking from "./pages/Booking";
import Tracking from "./pages/Tracking";
import Payment from "./pages/Payment";
import AdminDossiers from "./pages/AdminDossiers";
import AdminHub from "./pages/AdminHub";
import AdminBookings from "./pages/AdminBookings";
import AdminPricing from "./pages/AdminPricing";
import AdminGrading from "./pages/AdminGrading";
import MyDossiers from "./pages/MyDossiers";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <SEOHead />
        <RouteSEO />
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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<RequireAuth requireAdmin><AdminHub /></RequireAuth>} />
          <Route path="/admin/hub" element={<RequireAuth requireAdmin><AdminHub /></RequireAuth>} />
          <Route path="/admin/legacy" element={<RequireAuth requireAdmin><Admin /></RequireAuth>} />
          <Route path="/admin/dossiers" element={<RequireAuth requireAdmin><AdminDossiers /></RequireAuth>} />
          <Route path="/admin/bookings" element={<RequireAuth requireAdmin><AdminBookings /></RequireAuth>} />
          <Route path="/admin/pricing" element={<RequireAuth requireAdmin><AdminPricing /></RequireAuth>} />
          <Route path="/admin/grading" element={<RequireAuth requireAdmin><AdminGrading /></RequireAuth>} />
          <Route path="/my-dossiers" element={<RequireAuth><MyDossiers /></RequireAuth>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
