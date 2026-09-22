import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, type TabId } from '../content/siteContent';
import { getPrimaryNavTab, getTabPath } from '../routing';

interface NavbarProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

// The navbar's fixed height in pixels. ArcaneCastersSubNav.tsx imports this
// constant for its own sticky `top` offset instead of repeating the number,
// so the two files can only drift out of sync if this value itself moves.
export const NAVBAR_HEIGHT = 72;

export const Navbar: React.FC<NavbarProps> = ({ activeTab, navigateToTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Magic and summons are routes inside the Arcane Casters section, so GAMES
  // stays the highlighted top-level item while browsing either compendium.
  const primaryTab = getPrimaryNavTab(activeTab);

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
    // position: sticky already makes this <nav> a positioned element, which
    // is what .nav-mobile-drawer's `position: absolute; top: 100%` (set in
    // index.css) needs to anchor to — no separate `position: relative` rule
    // is needed on top of `sticky`.
    <nav style={styles.nav} aria-label="Primary">
      <div className="container" style={styles.navContainer}>
        <button
          type="button"
          style={styles.brand}
          onClick={() => handleNavClick('home')}
          aria-label="Go To Home"
        >
          <img
            src="/arcane-casters-wordmark.png"
            alt="Arcane Casters"
            style={styles.wordmark}
            width={150}
            height={30}
            fetchPriority="high"
          />
        </button>

        <div className="nav-desktop-menu">
          {navigationItems.map((item) => {
            const isActive = primaryTab === item.id;
            return (
              <a
                key={item.id}
                href={getTabPath(item.id)}
                onClick={(event) => handleNavLinkClick(event, item.id)}
                style={{
                  ...styles.navLink,
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-ink-inverse)' : 'var(--color-ink-soft)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
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
            <X size={24} color="currentColor" aria-hidden="true" />
          ) : (
            <Menu size={24} color="currentColor" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        // .nav-mobile-drawer (index.css) puts this on --color-wood, so link
        // text below uses the wood-tuned ink tokens, not the generic ones.
        <div id="mobile-navigation" className="nav-mobile-drawer">
          {navigationItems.map((item) => {
            const isActive = primaryTab === item.id;
            return (
              <a
                key={item.id}
                href={getTabPath(item.id)}
                onClick={(event) => handleNavLinkClick(event, item.id)}
                style={{
                  ...styles.mobileNavLink,
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'var(--color-ink-inverse)' : 'var(--color-ink-wood-soft)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
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
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'var(--shadow-bar)',
  },
  navContainer: {
    height: `${NAVBAR_HEIGHT}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  wordmark: {
    display: 'block',
    height: '30px',
    width: '150px',
    objectFit: 'contain',
  },
  navLink: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
    padding: '0.55rem 1.1rem',
    borderRadius: 'var(--radius-pill)',
    transition: 'color var(--transition-fast), background-color var(--transition-fast)',
    textDecoration: 'none',
  },
  mobileNavLink: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '1.05rem',
    cursor: 'pointer',
    padding: '0.85rem 1.25rem',
    margin: '0 0.75rem',
    borderRadius: 'var(--radius-control)',
    textAlign: 'left',
    display: 'block',
    transition: 'color var(--transition-fast), background-color var(--transition-fast)',
    textDecoration: 'none',
  },
};

export default Navbar;
