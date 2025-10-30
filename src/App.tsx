import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  JSX,
  useRef,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/utils/tooltip";
import { Toaster } from "@/utils/toaster";
import { Toaster as Sonner, toast } from "@/utils/sonner";
import { Login } from "./pages/LoginPage/LoginPage";
import { Footer } from "@/components/Footer/Footer";
import Signup from "./pages/SignupPage/SignupPage";
import { DashboardPage } from "@/pages/DashboardPage/DashboardPage";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import { Navbar } from "@/components/Admin/Navbar/Navbar";
import { Menu, X, Search, Bell, ChevronRight, LogOut } from "lucide-react";
import FacultiesPage from "@/pages/FacultiesPage/FacultiesPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import { SubjectsPage } from "./pages/SubjectsPage/SubjectsPage";
import { ReportsPage } from "./pages/ReportsPage/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { FeesPage } from "./pages/FeesPage/FeesPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import { ExamsDashboard } from "./pages/Exams/ExamsDashboard";
import { ViewAllExamsPage } from "./pages/Exams/ViewAllExamsPage";
import { ExamDetailsPage } from "./pages/Exams/ExamDetailsPage";

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
  if (!context)
    throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;
  const setIsLoading = (loading: boolean) => setLoadingCount(loading ? 1 : 0);
  const incrementLoading = () => setLoadingCount((prev) => prev + 1);
  const decrementLoading = () =>
    setLoadingCount((prev) => Math.max(0, prev - 1));

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadingCount,
        incrementLoading,
        decrementLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

const getBreadcrumbLabel = (path: string) => {
  switch (path) {
    case "dashboard":
      return "Overview";
    case "students":
      return "Students";
    case "faculties":
      return "Faculties";
    default:
      return path.charAt(0).toUpperCase() + path.slice(1);
  }
};

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const role = localStorage.getItem("role")?.toLowerCase();
  if (role !== "admin") {
    toast.error("Access denied! Only admins can access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

interface PageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

const PageLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [activeNav, setActiveNav] = useState("dashboard");
  const location = useLocation();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initiateLogout = () => {
    setShowLogoutDropdown(false);
    setShowConfirmModal(true);
  };

  const confirmAndLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleCancelLogout = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "dashboard";
    setActiveNav(path);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogoutDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageProps: PageProps = {
    sidebarOpen,
    setSidebarOpen,
    activeNav,
    setActiveNav,
  };
  const authPages = ["/login", "/signup"];

  if (authPages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  const role = localStorage.getItem("role")?.toLowerCase();
  if (role !== "admin") {
    toast.error("Access denied! Only admins can access this page.");
    return <Navigate to="/login" replace />;
  }

  const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 11000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#1e2228",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    color: "#fff",
    minWidth: "300px",
    textAlign: "center",
  };

  return (
    <div className="dashboard-layout">
      <Navbar {...pageProps} />
      <div
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
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
              <span className="breadcrumb-item active">
                {getBreadcrumbLabel(activeNav)}
              </span>
            </div>
          </div>

          <div className="header-right-section">
            <div className="header-search">
              <Search size={18} />
              <input type="text" placeholder="Search students, courses..." />
            </div>

            <button
              className="header-icon-btn notification-bell"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                className="header-icon-btn"
                aria-label="User menu"
                onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                style={{ position: "relative" }}
              >
                <div className="user-avatar-header">AD</div>
              </button>

              {showLogoutDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "48px",
                    right: 0,
                    backgroundColor: "#1e2228",
                    color: "#fff",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    minWidth: "120px",
                    zIndex: 10000,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      padding: "0.25rem 0.5rem",
                      width: "100%",
                      textAlign: "left",
                      transition: "background-color 0.2s",
                      borderRadius: "4px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2a2f38")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={initiateLogout}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<DashboardPage {...pageProps} />} />
          <Route path="/dashboard" element={<DashboardPage {...pageProps} />} />
          <Route path="/students" element={<StudentsPage {...pageProps} />} />
          <Route path="/faculties" element={<FacultiesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/fees" element={<FeesPage {...pageProps} />} />
          <Route
            path="/attendance"
            element={<AttendancePage sidebarOpen={sidebarOpen} />}
          />

          <Route path="/exams/*" element={<ExamsDashboard />} />

          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage {...pageProps} />} />
        </Routes>
      </div>
      <Footer />

      {showConfirmModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ margin: "0 0 1rem 0", fontWeight: 500 }}>
              Confirm Logout
            </h3>
            <p style={{ margin: "0 0 1.5rem 0", color: "#ccc" }}>
              Are you sure you want to log out of the Admin Dashboard?
            </p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <button
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#3f454f",
                  color: "#fff",
                  fontSize: "1rem",
                }}
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  fontSize: "1rem",
                }}
                onClick={confirmAndLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingProvider>
          <BrowserRouter>
            <PageLayout />
          </BrowserRouter>
        </LoadingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
