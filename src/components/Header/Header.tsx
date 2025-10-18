import React from 'react';
import { Menu, X, Search, Bell, ChevronRight } from 'lucide-react';

interface TopHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
}

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

export const Header: React.FC<TopHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeNav,
}) => {
  return (
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
  );
};