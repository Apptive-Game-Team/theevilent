import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, type TabId } from '../content/siteContent';

interface NavbarProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, navigateToTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (tabId: TabId) => {
    navigateToTab(tabId);
    setIsOpen(false);
  };

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default fragment navigation so only SPA routing runs.
  const handleNavLinkClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(tabId);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <button
          type="button"
          style={styles.brand}
          onClick={() => handleNavClick('home')}
          aria-label="Go To Home"
        >
          <div style={styles.logoWrapper}>
            <img 
              src="/theevilent-logo.png" 
              alt="The Evil Ent Logo" 
              style={styles.logo} 
              width="40"
              height="40"
              fetchPriority="high"
            />
          </div>
          <span style={styles.brandName} className="text-glow-subtle">
            THE EVIL ENT
          </span>
        </button>

        <div className="nav-desktop-menu">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? '#' : `#${item.id}`}
              onClick={(event) => handleNavLinkClick(event, item.id)}
              style={{
                ...styles.navLink,
                color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              }}
              className={activeTab === item.id ? 'text-glow-subtle' : ''}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button 
          type="button"
          className="nav-mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X size={24} color="#f5f3f0" aria-hidden="true" />
          ) : (
            <Menu size={24} color="#f5f3f0" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="nav-mobile-drawer">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.id === 'home' ? '#' : `#${item.id}`}
              onClick={(event) => handleNavLinkClick(event, item.id)}
              style={{
                ...styles.mobileNavLink,
                color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                backgroundColor: activeTab === item.id ? 'rgba(230, 30, 42, 0.05)' : 'transparent',
              }}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
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
    background: 'none',
    border: 'none',
    padding: 0,
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
  navLink: {
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    padding: '1.6rem 0.2rem 1.4rem 0.2rem',
    transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
    textDecoration: 'none',
  },
  mobileNavLink: {
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '1.1rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    padding: '1rem 2rem',
    textAlign: 'left',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    textDecoration: 'none',
  },
};

export default Navbar;
