
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SquareTubeCalculator from "./pages/SquareTubeCalculator";
import SquarePipeCalculator from "./pages/SquarePipeCalculator";
import ShreeLipiConverter from "./pages/ShreeLipiConverter"; 
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/square-tube" element={<SquareTubeCalculator />} />
          <Route path="/square-pipe" element={<SquarePipeCalculator />} />
          <Route path="/shree-lipi-converter" element={<ShreeLipiConverter />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
