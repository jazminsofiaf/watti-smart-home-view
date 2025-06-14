
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EnergyDashboard from "./pages/EnergyDashboard";
import AlertsPage from "./pages/AlertsPage";
import EcoHacksPage from "./pages/EcoHacksPage";
import TemperatureDetail from "./pages/TemperatureDetail";
import AgentPage from "./pages/AgentPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import EnergyFlowDetails from "./pages/EnergyFlowDetails";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${vh}px`);
      console.log("Set --app-height:", vh);
    };

    setAppHeight(); // set on mount
    window.addEventListener("resize", setAppHeight); // update on resize

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/energy-dashboard" element={<EnergyDashboard />} />
            <Route path="/energy-flow" element={<EnergyFlowDetails />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/eco-hacks" element={<EcoHacksPage />} />
            <Route path="/temperature-detail/:roomId" element={<TemperatureDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
