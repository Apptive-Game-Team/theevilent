import React from 'react';
import { ExternalLink } from 'lucide-react';
import { navigationItems, platformLinks, type TabId } from '../content/siteContent';

interface FooterProps {
  navigateToTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateToTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: TabId) => {
    navigateToTab(tabId);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div className="footer-grid" style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.colBrand}>
            <div style={styles.brandTitle}>
              <img 
                src="/theevilent-logo.png" 
                alt="The Evil Ent Logo" 
                style={styles.logo} 
                width="32"
                height="32"
              />
              <h3 style={styles.brandText}>THE EVIL ENT</h3>
            </div>
            <p style={styles.description}>
              Crafting mysterious, atmospheric dark-fantasy games that crawl from the deep shadows of the ancient forest.
            </p>
          </div>

          {/* Quick Navigation */}
          <div style={styles.colLinks}>
            <h4 style={styles.heading}>NAVIGATION</h4>
            <ul style={styles.list}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id === 'home' ? '#' : `#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    style={styles.linkButton}
                  >
                    {item.footerLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store & Platform Links */}
          <div style={styles.colPlatforms}>
            <h4 style={styles.heading}>PLAY ARCANE CASTERS</h4>
            <div style={styles.platformGrid}>
              {platformLinks.map(({ href, subtitle, title, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.platformCard}
                  className="gothic-card-hover"
                >
                  <div style={styles.platformIconWrapper}>
                    <Icon size={18} color="var(--color-primary)" aria-hidden="true" />
                  </div>
                  <div style={styles.platformMeta}>
                    <span style={styles.platformSubtitle}>{subtitle}</span>
                    <span style={styles.platformTitle}>{title}</span>
                  </div>
                  <ExternalLink size={14} style={styles.arrow} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Footer Bottom */}
        <div className="footer-bottom" style={styles.bottom}>
          <p style={styles.copyText}>
            © {currentYear} <strong>The Evil Ent</strong>. All rights reserved.
          </p>
          <p style={styles.devs}>
            Summoned by <span style={styles.devTag}>monolong</span> & <span style={styles.devTag}>yunseong</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#070605',
    borderTop: '1px solid #1c1512',
    padding: '4rem 0 2rem 0',
    marginTop: 'auto',
    width: '100%',
    zIndex: 10,
    position: 'relative',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    marginBottom: '3rem',
  },
  colBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: 0,
  },
  brandTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    width: '32px',
    height: '32px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #322822',
  },
  brandText: {
    fontSize: '1.25rem',
    letterSpacing: '0.1em',
    fontWeight: '700',
  },
  description: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    maxWidth: '350px',
  },
  colLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  heading: {
    fontSize: '1rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-light)',
    borderLeft: '2px solid var(--color-primary)',
    paddingLeft: '0.75rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  linkButton: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color 0.2s ease, transform 0.2s ease',
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    display: 'inline-flex',
  },
  colPlatforms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  platformGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '320px',
  },
  platformCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#120f0d',
    border: '1px solid #2d231e',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    color: 'var(--color-text-light)',
    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
  platformIconWrapper: {
    backgroundColor: 'rgba(230, 30, 42, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformMeta: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  platformSubtitle: {
    fontSize: '0.65rem',
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)',
  },
  platformTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    overflowWrap: 'anywhere',
  },
  arrow: {
    color: 'var(--color-text-muted)',
    transition: 'transform 0.2s ease, color 0.2s ease',
  },
  divider: {
    height: '1px',
    backgroundColor: '#1c1512',
    margin: '2rem 0',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  copyText: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
  },
  devs: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
  },
  devTag: {
    color: 'var(--color-text-light)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
    fontWeight: '600',
    borderBottom: '1px solid #e61e2a',
    paddingBottom: '2px',
  },
};

export default Footer;
