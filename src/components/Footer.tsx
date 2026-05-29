import React from 'react';
import { Play, Download, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.colBrand}>
            <div style={styles.brandTitle}>
              <img 
                src="/theevilent-logo.png" 
                alt="The Evil Ent Logo" 
                style={styles.logo} 
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
              <li>
                <button onClick={() => handleNavClick('home')} style={styles.linkButton}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('games')} style={styles.linkButton}>
                  Games
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('team')} style={styles.linkButton}>
                  Team Members
                </button>
              </li>
            </ul>
          </div>

          {/* Store & Platform Links */}
          <div style={styles.colPlatforms}>
            <h4 style={styles.heading}>PLAY ARCANE CASTERS</h4>
            <div style={styles.platformGrid}>
              <a 
                href="https://play.google.com/store/apps/details?id=com.team6515.wordonline" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.platformCard}
                className="gothic-card-hover"
              >
                <div style={styles.platformIconWrapper}>
                  <Play size={18} color="var(--color-primary)" />
                </div>
                <div style={styles.platformMeta}>
                  <span style={styles.platformSubtitle}>GET IT ON</span>
                  <span style={styles.platformTitle}>Google Play</span>
                </div>
                <ExternalLink size={14} style={styles.arrow} />
              </a>

              <a 
                href="https://theevilent.itch.io/arcane-casters" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.platformCard}
                className="gothic-card-hover"
              >
                <div style={styles.platformIconWrapper}>
                  <Download size={18} color="var(--color-primary)" />
                </div>
                <div style={styles.platformMeta}>
                  <span style={styles.platformSubtitle}>DOWNLOAD ON</span>
                  <span style={styles.platformTitle}>itch.io</span>
                </div>
                <ExternalLink size={14} style={styles.arrow} />
              </a>

              <a 
                href="https://www.game-ping.kr/games/arcane-casters" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.platformCard}
                className="gothic-card-hover"
              >
                <div style={styles.platformIconWrapper}>
                  <Globe size={18} color="var(--color-primary)" />
                </div>
                <div style={styles.platformMeta}>
                  <span style={styles.platformSubtitle}>EXPLORE ON</span>
                  <span style={styles.platformTitle}>game-ping</span>
                </div>
                <ExternalLink size={14} style={styles.arrow} />
              </a>
            </div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Footer Bottom */}
        <div style={styles.bottom}>
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
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color 0.2s ease, transform 0.2s ease',
    fontFamily: 'var(--font-body)',
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

// Insert media queries and styles for footer
if (typeof document !== 'undefined') {
  const footerStyle = document.createElement('style');
  footerStyle.innerHTML = `
    @media (min-width: 768px) {
      footer div[style*="display: grid"][style*="gap: 3rem"] {
        grid-template-columns: 2fr 1fr 2fr !important;
      }
      footer div[style*="display: flex"][style*="align-items: center"][style*="text-align: center"] {
        flex-direction: row !important;
        justify-content: space-between !important;
        text-align: left !important;
      }
    }

    .gothic-card-hover:hover {
      transform: translateY(-2px);
      border-color: var(--color-primary) !important;
      box-shadow: 0 4px 12px var(--color-primary-glow);
    }
    
    .gothic-card-hover:hover svg {
      color: var(--color-text-light) !important;
      transform: translateX(2px) translateY(-1px);
    }
    
    footer button:hover {
      color: var(--color-text-light) !important;
      transform: translateX(4px);
    }
  `;
  document.head.appendChild(footerStyle);
}

export default Footer;
