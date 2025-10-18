import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/utils/tooltip";
import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner } from "@/utils/sonner";
import { Login } from "./pages/LoginPage/LoginPage";
import { Footer } from "@/components/Footer/Footer";
import Signup from "./pages/SignupPage/SignupPage";
import { DashboardPage } from "@/pages/DashboardPage/DashboardPage";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import { Navbar } from "@/components/Admin/Navbar/Navbar";
import { Menu, X, Search, Bell, ChevronRight } from 'lucide-react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingCount: number;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const setIsLoading = (loading: boolean) => setLoadingCount(loading ? 1 : 0);
  const incrementLoading = () => setLoadingCount(prev => prev + 1);
  const decrementLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingCount, incrementLoading, decrementLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

interface PageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

const queryClient = new QueryClient();

const getBreadcrumbLabel = (path: string) => {
  switch (path) {
    case 'dashboard':
      return 'Overview';
    case 'students':
      return 'Students';
    default:
      return path.charAt(0).toUpperCase() + path.slice(1);
  }
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeNav, setActiveNav] = useState("dashboard");

  const pageProps: PageProps = { sidebarOpen, setSidebarOpen, activeNav, setActiveNav };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingProvider>
          <BrowserRouter>
            <div className="dashboard-layout">
              
              <Navbar {...pageProps} />

              <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                
                <header className="top-header">
                  <div className="header-left-section">
                    <button
                      className="sidebar-toggle"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      aria-label="Toggle sidebar"
                    >
                      {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <div className="breadcrumb">
                      <span className="breadcrumb-item">Dashboard</span>
                      <ChevronRight size={16} className="breadcrumb-separator" />
                      <span className="breadcrumb-item active">{getBreadcrumbLabel(activeNav)}</span>
                    </div>
                  </div>

                  <div className="header-right-section">
                    <div className="header-search">
                      <Search size={18} />
                      <input type="text" placeholder="Search students, courses..." />
                    </div>
                    <button className="header-icon-btn notification-bell" aria-label="Notifications">
                      <Bell size={20} />
                      <span className="notification-dot"></span>
                    </button>
                    <button className="header-icon-btn" aria-label="User menu">
                      <div className="user-avatar-header">AD</div>
                    </button>
                  </div>
                </header>

                <Routes>
                  <Route path="/" element={<DashboardPage {...pageProps} />} />
                  <Route path="/dashboard" element={<DashboardPage {...pageProps} />} />
                  <Route path="/students" element={<StudentsPage {...pageProps} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </div>

            <Footer />
          </BrowserRouter>
        </LoadingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;