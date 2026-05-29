import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'HOME' },
    { id: 'games', label: 'GAMES' },
    { id: 'team', label: 'TEAM' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        {/* Logo Brand */}
        <div style={styles.brand} onClick={() => handleNavClick('home')}>
          <div style={styles.logoWrapper}>
            <img 
              src="/theevilent-logo.png" 
              alt="The Evil Ent Logo" 
              style={styles.logo} 
            />
          </div>
          <span style={styles.brandName} className="text-glow-subtle">
            THE EVIL ENT
          </span>
        </div>

        {/* Desktop Menu */}
        <div style={styles.desktopMenu}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                ...styles.navLink,
                color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              }}
              className={activeTab === item.id ? 'text-glow-subtle' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={styles.mobileMenuButton} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} color="#f5f3f0" /> : <Menu size={24} color="#f5f3f0" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={styles.mobileDrawer}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                ...styles.mobileNavLink,
                color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                backgroundColor: activeTab === item.id ? 'rgba(230, 30, 42, 0.05)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(13, 11, 10, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(45, 35, 30, 0.5)',
    transition: 'background-color 0.3s ease',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  logoWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #3d332d',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: '900',
    fontSize: '1.2rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-light)',
    transition: 'color 0.3s ease',
  },
  desktopMenu: {
    display: 'none',
    alignItems: 'center',
    gap: '2rem',
    height: '100%',
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    padding: '1.6rem 0.2rem 1.4rem 0.2rem',
    transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
  },
  mobileMenuButton: {
    display: 'flex',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  mobileDrawer: {
    position: 'absolute',
    top: '70px',
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(13, 11, 10, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid #2d231e',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',
    zIndex: 999,
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '1.1rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    padding: '1rem 2rem',
    textAlign: 'left',
    transition: 'color 0.2s ease, background-color 0.2s ease',
  },
};

// Add responsive desktop style injection via CSS media query
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    @media (min-width: 768px) {
      div[style*="display: none"][style*="alignItems: center"] {
        display: flex !important;
      }
      button[style*="display: flex"][style*="background: none"] {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

export default Navbar;
