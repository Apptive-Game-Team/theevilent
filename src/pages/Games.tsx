import React, { useState } from 'react';
import { Play, Download, Globe, Sparkles, Flame, Snowflake, Shield, Layers } from 'lucide-react';

export const Games: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>('fire');

  const cards = [
    {
      id: 'fire',
      name: 'FIRE CARD (화염 카드)',
      color: '#ff4d4d',
      icon: <Flame size={20} color="#ff4d4d" />,
      spell: 'Hellfire Blast (헬파이어 블래스트)',
      description: '화염 카드들을 합쳐 더 거대하고 파괴적인 화염 구체를 conjuring합니다. 폭발 시 넓은 반경에 강력한 스플래시 피해를 줍니다.',
      stats: { 위력: '★★★★★', 사거리: '★★★☆☆', 난이도: '★☆☆☆☆' }
    },
    {
      id: 'frost',
      name: 'FROST CARD (빙결 카드)',
      color: '#33ccff',
      icon: <Snowflake size={20} color="#33ccff" />,
      spell: 'Blizzard Field (블리자드 필드)',
      description: '빙결 카드를 병합하여 지면에 혹독한 눈보라 지대를 생성합니다. 범위 내 적들의 이동 속도를 대폭 둔화시켜 전장을 장악합니다.',
      stats: { 위력: '★★★☆☆', 사거리: '★★★★☆', 난이도: '★★★☆☆' }
    },
    {
      id: 'shield',
      name: 'SHIELD CARD (보호막 카드)',
      color: '#4cd137',
      icon: <Shield size={20} color="#4cd137" />,
      spell: 'Runic Aegis (루닉 이지스)',
      description: '보호막 카드를 조합하여 일정 시간 동안 적의 모든 마법 공격 피해를 무력화하는 고대 마법의 방벽을 소환합니다.',
      stats: { 위력: '☆☆☆☆☆', 사거리: '★☆☆☆☆', 난이도: '★★☆☆☆' }
    }
  ];

  const activeCard = cards.find((c) => c.id === selectedCard) || cards[0];

  const galleryItems = [
    {
      title: '실시간 전장 대결',
      subtitle: '상대의 움직임에 대응하여 빠르게 카드를 드래그하고 머지합니다.',
      image: '/theevilent-logo.png',
    },
    {
      title: '전략적인 카드 구성',
      subtitle: '전투 돌입 전, 자신만의 플레이 스타일에 맞게 마법 덱을 조합하세요.',
      image: '/theevilent-logo.png',
    },
    {
      title: '실시간 마법 아레나',
      subtitle: '박진감 넘치는 결투 경기장에서 최강의 마법사 마스터에 도전하세요.',
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
                <span>Real-Time Card Merging Strategy Game</span>
              </div>
              <h1 style={styles.gameTitle} className="text-glow">
                ARCANE CASTERS
              </h1>
              <p style={styles.gamePitch}>
                아케인 캐스터즈는 실시간으로 마법 카드를 병합(Merge)하여 더 강력한 상위 주문을 완성하고 상대방과 겨루는 하이템포 실시간 전략 대전 게임입니다. 순발력과 덱 빌딩 전략의 극한을 시험해 보세요.
              </p>

              {/* Direct Play Links Grid */}
              <div className="game-link-banner" style={styles.linkBanner}>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.team6515.wordonline" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-google"
                >
                  <Play size={18} />
                  <span>Google Play (Android)</span>
                </a>
                <a 
                  href="https://theevilent.itch.io/arcane-casters" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-itch"
                >
                  <Download size={18} />
                  <span>itch.io 다운로드</span>
                </a>
                <a 
                  href="https://www.game-ping.kr/games/arcane-casters" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.storeBtn}
                  className="store-btn-ping"
                >
                  <Globe size={18} />
                  <span>game-ping (웹 플레이)</span>
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
            CARD <span className="accent-color">MERGING</span> SYSTEM
          </h2>
          <p style={styles.sectionSubtitle}>
            카드를 선택하여 마법이 결합되었을 때 소환되는 상위 주문과 메커니즘을 미리 살펴보세요.
          </p>

          <div style={styles.workshopBox} className="gothic-card">
            <div style={styles.workshopGrid}>
              {/* Left Column: Element Selectors */}
              <div style={styles.runeSelectorCol}>
                <h4 style={styles.workshopLabel}>보유 카드 선택</h4>
                <div style={styles.runeBtnGroup}>
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      style={{
                        ...styles.runeBtn,
                        borderColor: selectedCard === card.id ? card.color : '#2d231e',
                        backgroundColor: selectedCard === card.id ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                      }}
                    >
                      {card.icon}
                      <span style={{ 
                        ...styles.runeBtnText,
                        color: selectedCard === card.id ? card.color : 'var(--color-text-muted)',
                      }}>
                        {card.name}
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
                    boxShadow: `0 0 40px ${activeCard.color}22`,
                    borderColor: `${activeCard.color}44`,
                  }}
                >
                  <div style={styles.spellMeta}>
                    <Layers size={18} style={{ color: activeCard.color }} />
                    <span style={{ ...styles.spellRuneType, color: activeCard.color }}>
                      MERGED MAGIC SPELL
                    </span>
                  </div>
                  <h3 style={{ ...styles.spellName, textShadow: `0 0 10px ${activeCard.color}aa` }}>
                    {activeCard.spell}
                  </h3>
                  <p style={styles.spellDesc}>{activeCard.description}</p>
                  
                  <div style={styles.divider} />
                  
                  <div style={styles.statsContainer}>
                    {Object.entries(activeCard.stats).map(([label, val]) => (
                      <div key={label} style={styles.statRow}>
                        <span style={styles.statLabel}>{label}:</span>
                        <span style={{ ...styles.statVal, color: activeCard.color }}>{val}</span>
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
            SCENE & <span className="accent-color">DEVELOPMENT</span>
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
            SYSTEM <span className="accent-color">SPECIFICATIONS</span>
          </h2>
          <div className="grid-2" style={styles.specsGrid}>
            {/* Web Platform Specs */}
            <div className="gothic-card">
              <h3 style={styles.specsHeader}>WEB BROWSER (MAIN ENVIRONMENT)</h3>
              <div style={styles.specList}>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>지원 플랫폼</span>
                  <span style={styles.specValue}>Windows 10/11, macOS, Linux, ChromeOS</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>권장 브라우저</span>
                  <span style={styles.specValue}>Google Chrome, Safari, Firefox, Edge (최신버전 권장)</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>그래픽 엔진</span>
                  <span style={styles.specValue}>WebGL 2.0 규격 지원 기기 필수</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>권장 메모리</span>
                  <span style={styles.specValue}>4 GB RAM 이상</span>
                </div>
              </div>
            </div>

            {/* Mobile Specs */}
            <div className="gothic-card">
              <h3 style={styles.specsHeader}>MOBILE (APP & WEB)</h3>
              <div style={styles.specList}>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>OS 버전</span>
                  <span style={styles.specValue}>Android 8.0 (Oreo) 이상 / iOS 14 이상</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>실행 방식</span>
                  <span style={styles.specValue}>구글 플레이 전용 앱 다운로드 또는 모바일 브라우저를 통한 접속</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>네트워크</span>
                  <span style={styles.specValue}>실시간 동기화 PvP를 위한 안정적인 Wi-Fi 또는 LTE/5G망 필요</span>
                </div>
                <div style={styles.specRow}>
                  <span style={styles.specLabel}>여유 용량</span>
                  <span style={styles.specValue}>앱 설치 및 캐시 파일 포함 300 MB 이상 권장</span>
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
    .game-link-banner {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    @media (min-width: 576px) {
      .game-link-banner {
        flex-direction: row !important;
        align-items: center;
      }
      .game-link-banner a {
        flex: 1;
        text-align: center;
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
