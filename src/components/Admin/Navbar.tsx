import React from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  FileText,
  Settings,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import './Navbar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
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
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap size={20} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText size={20} /> },
    { id: 'reports', label: 'Reports', icon: <Award size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <img src="./logo.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain'}} />
            </div>
            {sidebarOpen && <span className="logo-text">EduCRM</span>}
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
              {sidebarOpen && activeNav === item.id && (
                <ChevronRight size={18} className="nav-arrow" />
              )}
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
