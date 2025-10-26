import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, Bell, ChevronRight, LogOut } from 'lucide-react';

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
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const avatarContainerStyle: React.CSSProperties = {
    position: 'relative',
  };

  return (
    <header
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.5rem',
        height: '60px',
        backgroundColor: '#1e2228',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Dashboard</span>
          <ChevronRight size={16} />
          <span>{getBreadcrumbLabel(activeNav)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> 
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2a2f38', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
            }}
          />
        </div>

        <button style={{ background: 'transparent', border: 'none', position: 'relative', cursor: 'pointer', color: '#fff' }}>
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'red',
            }}
          />
        </button>

        <div ref={dropdownRef} style={avatarContainerStyle}> 
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setShowLogout(!showLogout)}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#27ac1f 0%,#16a34a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              AD
            </div>
          </button>

          {showLogout && (
            <div
              style={{
                position: 'absolute',
                top: '48px', 
                right: 0,
                backgroundColor: '#1e2228',
                color: '#fff',
                padding: '0.5rem', 
                borderRadius: '6px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                minWidth: '120px',
                zIndex: 1200,
                display: 'flex', 
                flexDirection: 'column',
              }}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '0.25rem 0.5rem',
                  width: '100%',
                  textAlign: 'left', 
                  transition: 'background-color 0.2s',
                  borderRadius: '4px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2a2f38')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                onClick={handleLogout}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};