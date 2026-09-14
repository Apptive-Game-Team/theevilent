import React from 'react';
import { arcaneCastersSectionNav, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';

interface ArcaneCastersSubNavProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

// Section-level sub navigation for the Arcane Casters pages (overview, magic
// compendium, summon compendium). Keeps those routes out of the top-level
// Navbar while still giving them their own quick-switch row.
export const ArcaneCastersSubNav: React.FC<ArcaneCastersSubNavProps> = ({ activeTab, navigateToTab }) => {
  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default navigation so only SPA routing runs.
  const handleLinkClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tabId);
  };

  return (
    <nav style={styles.nav} aria-label="Arcane Casters section">
      <div className="container" style={styles.container}>
        {arcaneCastersSectionNav.map((item) => (
          <a
            key={item.id}
            href={getTabPath(item.id)}
            onClick={(event) => handleLinkClick(event, item.id)}
            style={{
              ...styles.link,
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
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    // top: '70px' assumes the Navbar's fixed 70px height (see Navbar.tsx
    // styles.navContainer) — index.css already makes the same assumption for
    // .nav-mobile-drawer, and that height does not change at mobile widths.
    position: 'sticky',
    top: '70px',
    zIndex: 900,
    // rgba(13, 11, 10, 0.92) and rgba(45, 35, 30, 0.5) are copied from
    // Navbar.tsx's nav colors. feature/37 is moving colors like these into
    // tokens; leaving these as literals here rather than inventing a token
    // name that branch may not end up using.
    backgroundColor: 'rgba(13, 11, 10, 0.92)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(45, 35, 30, 0.5)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.75rem',
    height: '52px',
    overflowX: 'auto',
  },
  link: {
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    padding: '1rem 0.1rem 0.85rem 0.1rem',
    transition: 'color 0.2s ease, border-bottom-color 0.2s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
};

export default ArcaneCastersSubNav;
