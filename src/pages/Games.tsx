import React from 'react';
import { Sparkles } from 'lucide-react';
import { platformLinks } from '../content/siteContent';

export const Games: React.FC = () => {
  const [primaryPlatform, ...webPlayPlatforms] = platformLinks;

  return (
    <div style={styles.page}>
      <section style={styles.headerSection}>
        <div className="container">
          <div className="games-header-grid" style={styles.headerGrid}>
            <div style={styles.headerContent}>
              <div style={styles.productIdentity}>
                <img
                  src="/arcane-casters-icon.png"
                  alt="Arcane Casters icon"
                  style={styles.gameIcon}
                  width="96"
                  height="96"
                  fetchPriority="high"
                />
                <div style={styles.identityText}>
                  <div style={styles.tagline}>
                    <Sparkles size={16} color="var(--color-primary)" aria-hidden="true" />
                    <span>Real-Time Card Merging Strategy Game</span>
                  </div>
                  <h1 style={styles.gameTitle} className="text-glow">
                    ARCANE CASTERS
                  </h1>
                </div>
              </div>

              <p style={styles.gamePitch}>
                아케인 캐스터즈는 실시간으로 마법 카드를 병합(Merge)하여 더 강력한 상위 주문을 완성하고 상대방과 겨루는 하이템포 실시간 전략 대전 게임입니다. 순발력과 덱 빌딩 전략의 극한을 시험해 보세요.
              </p>

              <div style={styles.playPanel}>
                <a
                  href={primaryPlatform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.storeBtn, ...styles.primaryStoreBtn }}
                  className={`store-btn-${primaryPlatform.variant}`}
                >
                  <primaryPlatform.Icon size={18} aria-hidden="true" />
                  <span>{primaryPlatform.label}</span>
                </a>
                <div className="games-web-play-row" style={styles.webPlayRow}>
                  {webPlayPlatforms.map(({ href, label, variant, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.storeBtn}
                    className={`store-btn-${variant}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.headerImageWrapper}>
              <div style={styles.gameCardVisual}>
                <img 
                  src="/arcane-casters-thumbnail-16x9.png" 
                  alt="Arcane Casters key visual" 
                  style={styles.gameHeroImg} 
                  width="1920"
                  height="1080"
                  fetchPriority="high"
                />
              </div>
              <div style={styles.mediaCaption}>
                <span style={styles.captionDot} aria-hidden="true" />
                <span>Official 16:9 key art</span>
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
    padding: '6rem 0 7rem 0',
  },
  headerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.35rem',
    minWidth: 0,
  },
  productIdentity: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  gameIcon: {
    width: '86px',
    height: '86px',
    flexShrink: 0,
    borderRadius: '18px',
    border: '1px solid rgba(163, 199, 85, 0.45)',
    boxShadow: '0 16px 40px rgba(94, 139, 44, 0.18), 0 0 0 6px rgba(163, 199, 85, 0.06)',
    objectFit: 'cover',
  },
  identityText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
    minWidth: 0,
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
    overflowWrap: 'anywhere',
  },
  gamePitch: {
    fontSize: '1.15rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.75',
  },
  playPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '560px',
  },
  webPlayRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem',
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
    minHeight: '54px',
  },
  primaryStoreBtn: {
    justifyContent: 'flex-start',
    borderColor: 'rgba(230, 30, 42, 0.45)',
    background: 'linear-gradient(135deg, rgba(163, 20, 28, 0.95) 0%, rgba(230, 30, 42, 0.88) 100%)',
    boxShadow: '0 12px 30px rgba(230, 30, 42, 0.18)',
  },
  headerImageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  gameCardVisual: {
    position: 'relative',
    width: 'min(100%, 680px)',
    aspectRatio: '16 / 9',
    borderRadius: '8px',
    border: '2px solid #2d231e',
    overflow: 'hidden',
    backgroundColor: '#11150c',
    boxShadow: '0 24px 55px rgba(0,0,0,0.72), 0 0 0 1px rgba(163, 199, 85, 0.12)',
  },
  gameHeroImg: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'contain',
    filter: 'brightness(0.94) saturate(0.92)',
  },
  mediaCaption: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--color-text-muted)',
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  captionDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#a3c755',
    boxShadow: '0 0 10px rgba(163, 199, 85, 0.7)',
  },
};

export default Games;
