import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PredictionPage from "./pages/PredictionPage";
import NotFound from "./pages/NotFound";
import WelcomePage from "./components/WelcomePage";
import MedicalLogin from "./components/MedicalLogin";
import PatientsDatabase from "./pages/PatientsDatabase"; // ← import the new page
import Reports from "./pages/Reports";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<MedicalLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/patients" element={<PatientsDatabase />} /> {/* ← new route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
