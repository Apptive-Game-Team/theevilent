import React, { useState } from 'react';
import { Play, Download, Globe, Sparkles, Flame, Snowflake, Moon, Layers } from 'lucide-react';

export const Games: React.FC = () => {
  const [selectedRune, setSelectedRune] = useState<string>('fire');

  const runes = [
    {
      id: 'fire',
      name: 'IGNIS (FIRE RUNE)',
      color: '#ff4d4d',
      icon: <Flame size={20} color="#ff4d4d" />,
      spell: 'Hellfire Cataclysm',
      description: 'Summons raging volcanic meteors from the dark sky, dealing massive splash damage and igniting all wooden targets in the area.',
      stats: { Power: '★★★★★', Range: '★★★☆☆', Complexity: '★☆☆☆☆' }
    },
    {
      id: 'frost',
      name: 'GLACIES (FROST RUNE)',
      color: '#33ccff',
      icon: <Snowflake size={20} color="#33ccff" />,
      spell: 'Glacial Absolute Zero',
      description: 'Instantly freezes water pathways and locks enemies in solid ice blocks. Highly effective for tactical positioning and control.',
      stats: { Power: '★★★☆☆', Range: '★★★★☆', Complexity: '★★★☆☆' }
    },
    {
      id: 'shadow',
      name: 'TENEBRIS (SHADOW RUNE)',
      color: '#b366ff',
      icon: <Moon size={20} color="#b366ff" />,
      spell: 'Void Soul Devourer',
      description: 'Channels dark energy threads that drain the essence of organic targets, converting their vitality into magical mana shielding.',
      stats: { Power: '★★★★☆', Range: '★★★★★', Complexity: '★★★★★' }
    }
  ];

  const activeRune = runes.find((r) => r.id === selectedRune) || runes[0];

  const galleryItems = [
    {
      title: 'Spooky Grove Rituals',
      subtitle: 'Gather mana beneath the ancient Entwood branch structures.',
      image: '/theevilent-logo.png', // Fallback to logo or styled overlay
    },
    {
      title: 'Runic Gateways',
      subtitle: 'Unlock magical gates by aligning complex elemental glyphs.',
      image: '/theevilent-logo.png',
    },
    {
      title: 'Monsters of the Dark Wood',
      subtitle: 'Fight corrupted timber goliaths and dark druids.',
      image: '/theevilent-logo.png',
    }
  ];

  return (
    <div style={styles.page}>
      {/* Game Header Section */}
      <section style={styles.headerSection}>
        <div className="container">
          <div style={styles.headerGrid}>
            <div style={styles.headerContent}>
              <div style={styles.tagline}>
                <Sparkles size={16} color="var(--color-primary)" />
                <span>Indie Dark Fantasy Masterpiece</span>
              </div>
              <h1 style={styles.gameTitle} className="text-glow">
                ARCANE CASTERS
              </h1>
              <p style={styles.gamePitch}>
                A spellbinding, fast-paced action strategy game where rune combinations shape the forces of nature. Cast magic, survive corrupt woods, and outsmart ancient beasts.
              </p>

              {/* Direct Play Links Grid */}
              <div style={styles.linkBanner}>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.team6515.wordonline" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-google"
                >
                  <Play size={18} />
                  <span>Google Play</span>
                </a>
                <a 
                  href="https://theevilent.itch.io/arcane-casters" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-itch"
                >
                  <Download size={18} />
                  <span>Download itch.io</span>
                </a>
                <a 
                  href="https://www.game-ping.kr/games/arcane-casters" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-ping"
                >
                  <Globe size={18} />
                  <span>game-ping</span>
                </a>
              </div>
            </div>

            {/* Game Card Preview */}
            <div style={styles.headerImageWrapper}>
              <div style={styles.gameCardVisual}>
                <img 
                  src="/theevilent-logo.png" 
                  alt="Arcane Casters Illustration" 
                  style={styles.gameHeroImg} 
                />
                <div style={styles.gameTitleBadge}>ARCANE CASTERS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Spell Workshop */}
      <section style={styles.sectionDark}>
        <div className="container">
          <h2 style={styles.sectionTitleCentered}>
            RUNE <span className="accent-color">SPELLCASTING</span> CHAMBER
          </h2>
          <p style={styles.sectionSubtitle}>
            Select a rune element to test casting combos and preview its devastating in-game spell effects.
          </p>

          <div style={styles.workshopBox} className="gothic-card">
            <div style={styles.workshopGrid}>
              {/* Left Column: Element Selectors */}
              <div style={styles.runeSelectorCol}>
                <h4 style={styles.workshopLabel}>SELECT AN ELEMENT</h4>
                <div style={styles.runeBtnGroup}>
                  {runes.map((rune) => (
                    <button
                      key={rune.id}
                      onClick={() => setSelectedRune(rune.id)}
                      style={{
                        ...styles.runeBtn,
                        borderColor: selectedRune === rune.id ? rune.color : '#2d231e',
                        backgroundColor: selectedRune === rune.id ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                      }}
                    >
                      {rune.icon}
                      <span style={{ 
                        ...styles.runeBtnText,
                        color: selectedRune === rune.id ? rune.color : 'var(--color-text-muted)',
                      }}>
                        {rune.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic Spell Display */}
              <div style={styles.spellDetailsCol}>
                <div 
                  style={{
                    ...styles.spellPreviewGlow,
                    boxShadow: `0 0 40px ${activeRune.color}22`,
                    borderColor: `${activeRune.color}44`,
                  }}
                >
                  <div style={styles.spellMeta}>
                    <Layers size={18} style={{ color: activeRune.color }} />
                    <span style={{ ...styles.spellRuneType, color: activeRune.color }}>
                      CONJURED SPELL
                    </span>
                  </div>
                  <h3 style={{ ...styles.spellName, textShadow: `0 0 10px ${activeRune.color}aa` }}>
                    {activeRune.spell}
                  </h3>
                  <p style={styles.spellDesc}>{activeRune.description}</p>
                  
                  <div style={styles.divider} />
                  
                  <div style={styles.statsContainer}>
                    {Object.entries(activeRune.stats).map(([label, val]) => (
                      <div key={label} style={styles.statRow}>
                        <span style={styles.statLabel}>{label}:</span>
                        <span style={{ ...styles.statVal, color: activeRune.color }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery Showcase */}
      <section style={styles.sectionGallery}>
        <div className="container">
          <h2 style={styles.sectionTitle}>
            VISUALS & <span className="accent-color">DEVELOPMENT SHOTS</span>
          </h2>
          <div className="grid-3" style={styles.galleryGrid}>
            {galleryItems.map((item, index) => (
              <div key={index} className="gothic-card" style={styles.galleryCard}>
                <div style={styles.galleryImageContainer}>
                  <img src={item.image} alt={item.title} style={styles.galleryImage} />
                  <div style={styles.galleryImageGradient} />
                </div>
                <h4 style={styles.galleryCardTitle}>{item.title}</h4>
                <p style={styles.galleryCardSubtitle}>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specifications */}
      <section style={styles.sectionSpecs}>
        <div className="container">
          <h2 style={styles.sectionTitleCentered}>
            SYSTEM <span className="accent-color">REQUIREMENTS</span>
          </h2>
          <div className="grid-2" style={styles.specsGrid}>
            {/* Mobile Specs */}
            <div className="gothic-card">
              <h3 style={styles.specsHeader}>MOBILE (ANDROID)</h3>
              <div style={styles.specList}>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>OS</span>
                  <span style={styles.specValue}>Android 8.0 Oreo or higher</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Processor</span>
                  <span style={styles.specValue}>Qualcomm Snapdragon 660 / Exynos 9611</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Memory</span>
                  <span style={styles.specValue}>3 GB RAM</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Storage</span>
                  <span style={styles.specValue}>300 MB available space</span>
                </div>
              </div>
            </div>

            {/* PC Specs */}
            <div className="gothic-card">
              <h3 style={styles.specsHeader}>PC (ITCH.IO / WEB)</h3>
              <div style={styles.specList}>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>OS</span>
                  <span style={styles.specValue}>Windows 10 64-bit / macOS 11+</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Processor</span>
                  <span style={styles.specValue}>Intel Core i3 / AMD Ryzen 3</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Memory</span>
                  <span style={styles.specValue}>4 GB RAM</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>Storage</span>
                  <span style={styles.specValue}>500 MB available space</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: '100%',
  },
  headerSection: {
    padding: '6rem 0',
  },
  headerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  tagline: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--color-primary)',
    letterSpacing: '0.15em',
  },
  gameTitle: {
    fontSize: '3rem',
    lineHeight: '1.1',
    letterSpacing: '0.1em',
  },
  gamePitch: {
    fontSize: '1.15rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.75',
    marginBottom: '1.5rem',
  },
  linkBanner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  storeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
    color: '#eae7e4',
    padding: '0.85rem 1.5rem',
    borderRadius: '6px',
    border: '1px solid #322822',
    backgroundColor: '#151210',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  },
  headerImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  gameCardVisual: {
    position: 'relative',
    width: '320px',
    height: '420px',
    borderRadius: '12px',
    border: '2px solid #2d231e',
    overflow: 'hidden',
    boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
  },
  gameHeroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.85)',
  },
  gameTitleBadge: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(5,4,4,0.9)',
    border: '1px solid #e61e2a',
    color: 'var(--color-text-light)',
    padding: '0.5rem 1.5rem',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.1em',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '700',
    boxShadow: '0 0 10px rgba(230, 30, 42, 0.4)',
    whiteSpace: 'nowrap',
  },
  sectionDark: {
    padding: '6rem 0',
    backgroundColor: 'rgba(9, 8, 7, 0.4)',
    borderTop: '1px solid #1a1512',
    borderBottom: '1px solid #1a1512',
  },
  sectionTitleCentered: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '0.5rem',
    letterSpacing: '0.15em',
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    fontSize: '1rem',
    marginBottom: '3rem',
    maxWidth: '550px',
    margin: '0 auto 3rem auto',
  },
  workshopBox: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2.5rem',
  },
  workshopGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2.5rem',
  },
  runeSelectorCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  workshopLabel: {
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  },
  runeBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  runeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #2d231e',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  runeBtnText: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    letterSpacing: '0.05em',
    fontSize: '0.9rem',
  },
  spellDetailsCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  spellPreviewGlow: {
    border: '1px solid #2d231e',
    borderRadius: '8px',
    padding: '2rem',
    backgroundColor: '#0d0b0a',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease',
  },
  spellMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
  },
  spellRuneType: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
  },
  spellName: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  spellDesc: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flexGrow: 1,
  },
  divider: {
    height: '1px',
    backgroundColor: '#2d231e',
    margin: '1rem 0',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
  },
  statLabel: {
    color: 'var(--color-text-muted)',
  },
  statVal: {
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '2.5rem',
    letterSpacing: '0.1em',
    borderLeft: '4px solid var(--color-primary)',
    paddingLeft: '1rem',
  },
  sectionGallery: {
    padding: '6rem 0',
  },
  galleryGrid: {},
  galleryCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  galleryImageContainer: {
    position: 'relative',
    height: '180px',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #2d231e',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'sepia(0.2) brightness(0.7)',
  },
  galleryImageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, rgba(5,4,4,0.6))',
  },
  galleryCardTitle: {
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
  },
  galleryCardSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--color-text-muted)',
  },
  sectionSpecs: {
    padding: '6rem 0 8rem 0',
  },
  specsGrid: {},
  specsHeader: {
    fontSize: '1.2rem',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
    color: 'var(--color-primary)',
    borderBottom: '1px solid #2d231e',
    paddingBottom: '0.5rem',
  },
  specList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  specRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  specLabel: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  specValue: {
    fontSize: '0.95rem',
  },
};

// Inject media queries and button styles for Games page
if (typeof document !== 'undefined') {
  const gamesStyle = document.createElement('style');
  gamesStyle.innerHTML = `
    @media (min-width: 480px) {
      .Games_linkBanner {
        flex-direction: row !important;
      }
    }

    @media (min-width: 768px) {
      div[style*="display: grid"][style*="gap: 3rem"] {
        grid-template-columns: 1.2fr 1fr !important;
      }
      div[style*="display: grid"][style*="gap: 2.5rem"] {
        grid-template-columns: 1fr 1.3fr !important;
      }
    }

    .store-btn-google:hover {
      border-color: #34a853 !important;
      box-shadow: 0 0 12px rgba(52, 168, 83, 0.4) !important;
      transform: translateY(-2px);
    }

    .store-btn-itch:hover {
      border-color: #fa5c5c !important;
      box-shadow: 0 0 12px rgba(250, 92, 92, 0.4) !important;
      transform: translateY(-2px);
    }

    .store-btn-ping:hover {
      border-color: #2e86de !important;
      box-shadow: 0 0 12px rgba(46, 134, 222, 0.4) !important;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(gamesStyle);
}

export default Games;
