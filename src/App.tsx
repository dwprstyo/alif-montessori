
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AcademicYear from "./pages/AcademicYear";
import AcademicTransition from "./pages/AcademicTransition";
import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Category from "./pages/Category";
import Classes from "./pages/Classes";
import Area from "./pages/Area";
import SemesterArea from "./pages/SemesterArea";
import ToddlerArea from "./pages/ToddlerArea";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen max-w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/master/academic-year" element={<AcademicYear />} />
            <Route path="/master/academic-transition" element={<AcademicTransition />} />
            <Route path="/master/branch" element={<Branch />} />
            <Route path="/master/semester" element={<Semester />} />
            <Route path="/master/category" element={<Category />} />
            <Route path="/master/classes" element={<Classes />} />
            <Route path="/master/area" element={<Area />} />
            <Route path="/master/semester-area" element={<SemesterArea />} />
            <Route path="/master/toddler-area" element={<ToddlerArea />} />
            <Route path="/master/teacher" element={<Teacher />} />
            <Route path="/master/student" element={<Student />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
