import React from 'react';
import { arcaneCastersSectionNav, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { NAVBAR_HEIGHT } from './Navbar';

interface ArcaneCastersSubNavProps {
  activeTab: TabId;
  navigateToTab: (tab: TabId) => void;
}

// Section-level sub navigation for the Arcane Casters pages (overview and the
// magic compendium). Keeps those routes out of the top-level
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
        {arcaneCastersSectionNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={getTabPath(item.id)}
              onClick={(event) => handleLinkClick(event, item.id)}
              style={{
                ...styles.link,
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
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    // top is the Navbar's own height, imported as NAVBAR_HEIGHT from
    // Navbar.tsx (see that file's export) so the two heights cannot drift
    // apart without both files being touched.
    position: 'sticky',
    top: `${NAVBAR_HEIGHT}px`,
    zIndex: 900,
    // A pale, sunken ground rather than the navbar's white surface, so this
    // row reads as a layer below it rather than a continuation of it.
    backgroundColor: 'var(--color-ground-sunken)',
    boxShadow: 'var(--shadow-bar)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    height: '52px',
    overflowX: 'auto',
  },
  link: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '0.875rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-pill)',
    transition: 'color var(--transition-fast), background-color var(--transition-fast)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
};

export default ArcaneCastersSubNav;
