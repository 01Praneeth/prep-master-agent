import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Protected pages
import Dashboard from "./pages/Dashboard";
import StudyPlan from "./pages/StudyPlan";
import Quizzes from "./pages/Quizzes";
import Revision from "./pages/Revision";
import JobUpdates from "./pages/JobUpdates";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/study-plan" element={
            <ProtectedRoute>
              <Layout>
                <StudyPlan />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/quizzes" element={
            <ProtectedRoute>
              <Layout>
                <Quizzes />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/revision" element={
            <ProtectedRoute>
              <Layout>
                <Revision />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/job-updates" element={
            <ProtectedRoute>
              <Layout>
                <JobUpdates />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
