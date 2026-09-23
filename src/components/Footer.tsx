import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { aiArtworkNoticeEn, arcaneCastersFooterLinks, legalLinks, navigationItems, platformLinks, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';

interface FooterProps {
  navigateToTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateToTab }) => {
  const currentYear = new Date().getFullYear();
  // index.css dropped the global `footer a:hover { transform: translateX(4px) }`
  // rule, so this component gives its own links a hover response, keyed by a
  // string per link since each needs its own transform/shadow.
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default fragment navigation so only SPA routing runs.
  const handleNavClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tabId);
  };

  return (
    // .band-wood (index.css) paints the wood plank, its top lip in
    // --color-wood-edge, and sets text to --color-ink-wood — the same hud
    // plank the match screen lays its cards on.
    <footer className="band band-wood" style={styles.footer}>
      <div className="container">
        <div className="footer-grid" style={styles.grid}>
          {/* Brand */}
          <div style={styles.colBrand}>
            <div style={styles.brandTitle}>
              <div style={styles.logoChip}>
                <img
                  src="/theevilent-logo.png"
                  alt="The Evil Ent Logo"
                  style={styles.logo}
                  width={32}
                  height={32}
                />
              </div>
              {/* The studio wordmark keeps its own fixed face even though the
                  rest of the site's headings ride --font-display, which
                  follows the active theme. */}
              <h3 style={styles.brandText}>THE EVIL ENT</h3>
            </div>
          </div>

          {/* Quick Navigation */}
          <div style={styles.colLinks}>
            <h4 style={styles.heading}>NAVIGATION</h4>
            <ul style={styles.list}>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={getTabPath(item.id)}
                    onClick={(event) => handleNavClick(event, item.id)}
                    onMouseEnter={() => setHoveredKey(`nav-${item.id}`)}
                    onMouseLeave={() => setHoveredKey(null)}
                    style={{
                      ...styles.linkButton,
                      color: hoveredKey === `nav-${item.id}` ? 'var(--color-ink-wood)' : 'var(--color-ink-wood-soft)',
                      transform: hoveredKey === `nav-${item.id}` ? 'translateX(4px)' : 'none',
                    }}
                  >
                    {item.footerLabel}
                  </a>
                  {/* The magic compendium moved out of the top-level
                      nav into the Arcane Casters section sub navigation, so list
                      it here, indented beneath Games, to keep a site-wide link. */}
                  {item.id === 'games' && (
                    <ul style={styles.subList}>
                      {arcaneCastersFooterLinks.map((subItem) => (
                        <li key={subItem.id}>
                          <a
                            href={getTabPath(subItem.id)}
                            onClick={(event) => handleNavClick(event, subItem.id)}
                            onMouseEnter={() => setHoveredKey(`sub-${subItem.id}`)}
                            onMouseLeave={() => setHoveredKey(null)}
                            style={{
                              ...styles.subLinkButton,
                              color: hoveredKey === `sub-${subItem.id}` ? 'var(--color-ink-wood)' : 'var(--color-ink-wood-soft)',
                              transform: hoveredKey === `sub-${subItem.id}` ? 'translateX(4px)' : 'none',
                            }}
                          >
                            {subItem.footerLabel}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
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
                  onMouseEnter={() => setHoveredKey(`platform-${href}`)}
                  onMouseLeave={() => setHoveredKey(null)}
                  style={{
                    ...styles.platformCard,
                    transform: hoveredKey === `platform-${href}` ? 'translateY(-3px)' : 'none',
                    boxShadow: hoveredKey === `platform-${href}` ? 'var(--shadow-card-raised)' : 'var(--shadow-card)',
                  }}
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
          <nav style={styles.legalRow} aria-label="Legal">
            {legalLinks.map((item) => (
              <a
                key={item.id}
                href={getTabPath(item.id)}
                onClick={(event) => handleNavClick(event, item.id)}
                onMouseEnter={() => setHoveredKey(`legal-${item.id}`)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  ...styles.legalLink,
                  color: hoveredKey === `legal-${item.id}` ? 'var(--color-ink-wood)' : 'var(--color-ink-wood-soft)',
                  textDecoration: hoveredKey === `legal-${item.id}` ? 'underline' : 'none',
                }}
              >
                {item.footerLabel}
              </a>
            ))}
          </nav>

          <p style={styles.copyText}>
            © {currentYear} <strong>The Evil Ent</strong>. All rights reserved.
          </p>
          <p style={styles.devs}>
            Summoned by <span style={styles.devTag}>monolong</span> & <span style={styles.devTag}>yunseong</span>
          </p>
          <p style={styles.aiNotice}>{aiArtworkNoticeEn}</p>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    padding: 'var(--space-band-md) 0 var(--space-band-sm) 0',
    marginTop: 'auto',
    zIndex: 10,
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
  // A small white card, floated the way every other card on the site is —
  // shadow, no border — rather than the old dark chip with a hairline edge.
  logoChip: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-control)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  brandText: {
    fontFamily: 'var(--font-wordmark)',
    fontSize: '1.25rem',
    fontWeight: 800,
    color: 'var(--color-ink-wood)',
  },
  colLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  heading: {
    fontSize: 'var(--text-label)',
    fontWeight: 700,
    color: 'var(--color-ink-wood)',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  linkButton: {
    fontSize: '0.95rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color var(--transition-fast), transform var(--transition-fast)',
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    display: 'inline-flex',
  },
  subList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginTop: '0.6rem',
    paddingLeft: '1rem',
    borderLeft: '1px solid var(--color-rule-wood)',
  },
  subLinkButton: {
    fontSize: '0.85rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color var(--transition-fast), transform var(--transition-fast)',
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
  // A white card lifted on a shadow, the same panel language every other
  // card on the site uses, rather than a bordered dark box.
  platformCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'var(--color-surface)',
    padding: '0.6rem 1rem',
    borderRadius: 'var(--radius-control-lg)',
    textDecoration: 'none',
    color: 'var(--color-ink)',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
  },
  platformIconWrapper: {
    backgroundColor: 'var(--color-primary-tint)',
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-pill)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  platformMeta: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  platformSubtitle: {
    fontSize: '0.65rem',
    color: 'var(--color-ink-muted)',
  },
  platformTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    fontFamily: 'var(--font-body)',
    overflowWrap: 'anywhere',
  },
  arrow: {
    color: 'var(--color-ink-muted)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-rule-wood)',
    margin: '2rem 0',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  legalRow: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legalLink: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-body)',
    transition: 'color var(--transition-fast)',
  },
  copyText: {
    fontSize: '0.9rem',
    color: 'var(--color-ink-wood-soft)',
  },
  devs: {
    fontSize: '0.85rem',
    color: 'var(--color-ink-wood-soft)',
  },
  devTag: {
    color: 'var(--color-ink-wood)',
    fontFamily: 'var(--font-wordmark)',
    fontWeight: 700,
    borderBottom: '1px solid var(--color-ent-crimson)',
    paddingBottom: '2px',
  },
  aiNotice: {
    fontSize: '0.8rem',
    color: 'var(--color-ink-wood-soft)',
  },
};

export default Footer;
