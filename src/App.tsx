
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateProject from "./pages/Dashboard/CreateProject";
import Projects from "./pages/Dashboard/Projects";
import Datasets from "./pages/Dashboard/Datasets";
import Models from "./pages/Dashboard/Models";
import Settings from "./pages/Dashboard/Settings";
import CalculateCompute from "./pages/Dashboard/CalculateCompute";
import RentCompute from "./pages/Dashboard/RentCompute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create" element={<CreateProject />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/datasets" element={<Datasets />} />
          <Route path="/dashboard/models" element={<Models />} />
          <Route path="/dashboard/calculate-compute" element={<CalculateCompute />} />
          <Route path="/dashboard/rent-compute" element={<RentCompute />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
