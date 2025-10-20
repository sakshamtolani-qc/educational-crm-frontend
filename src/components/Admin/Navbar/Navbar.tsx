import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  FileText,
  Settings,
  Award,
  ChevronRight,
  X,
  CreditCard,
  CheckSquare,
  Clipboard
} from 'lucide-react';
import './Navbar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
}

interface AdminNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const Navbar: React.FC<AdminNavbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeNav,
  setActiveNav
}) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { id: 'students', label: 'Students', icon: <Users size={20} />, path: '/students' },
  { id: 'faculties', label: 'Faculties', icon: <GraduationCap size={20} />, path: '/faculties' },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={20} />, path: '/courses' },
  { id: 'subjects', label: 'Subjects', icon: <FileText size={20} />, path: '/subjects' },
  { id: 'fees', label: 'Fees', icon: <CreditCard size={20} />, path: '/fees' },
  { id: 'attendance', label: 'Attendance', icon: <CheckSquare size={20} />, path: '/attendance' },
  { id: 'exams', label: 'Exams', icon: <Clipboard size={20} />, path: '/exams' },
  { id: 'reports', label: 'Reports', icon: <Award size={20} />, path: '/reports' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];


  const handleNavClick = (item: NavItem) => {
    setActiveNav(item.id);
    if (item.path) navigate(item.path);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && window.innerWidth <= 768 && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <img src="./logo.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain'}} />
            </div>
            {sidebarOpen && <span className="logo-text">EduCRM</span>}
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => handleNavClick(item)}>
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
              {sidebarOpen && activeNav === item.id && <ChevronRight size={18} className="nav-arrow" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar-sidebar">AD</div>
            {sidebarOpen && (
              <div className="user-info-sidebar">
                <div className="user-name-sidebar">Admin User</div>
                <div className="user-role">Administrator</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
