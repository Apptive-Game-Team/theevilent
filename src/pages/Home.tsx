import React from 'react';
import { Shield, Sparkles, Sword, Terminal, ExternalLink, Calendar } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.logoContainer} className="logo-pulse">
            <img 
              src="/theevilent-logo.png" 
              alt="The Evil Ent logo with glowing red eyes" 
              style={styles.heroLogo} 
            />
            {/* Absolute positioning overlays to simulate pulsing red eyes on the logo */}
            <div style={styles.eyeLeft} className="eye-pulse" />
            <div style={styles.eyeRight} className="eye-pulse" />
          </div>
          
          <h1 style={styles.heroTitle} className="text-glow">
            THE EVIL ENT
          </h1>
          <p style={styles.heroSub}>
            실시간 카드 조합 대전 전략 게임 '아케인 캐스터즈'를 개발하는 인디 게임 팀
          </p>

          <div className="hero-btn-group" style={styles.heroBtnGroup}>
            <button 
              onClick={() => setActiveTab('games')} 
              className="btn-primary"
            >
              <Sword size={18} />
              아케인 캐스터즈 플레이
            </button>
            <button 
              onClick={() => setActiveTab('team')} 
              className="btn-secondary"
            >
              <Terminal size={18} />
              팀 멤버 소개
            </button>
          </div>
        </div>
      </section>

      {/* About The Studio */}
      <section style={styles.sectionDark}>
        <div className="container">
          <div style={styles.aboutGrid}>
            <div style={styles.aboutTextCol}>
              <h2 style={styles.sectionTitle}>
                ABOUT <span className="accent-color">THE EVIL ENT</span>
              </h2>
              <p style={styles.paragraph}>
                우리는 독창적인 시스템과 몰입감 넘치는 분위기를 가진 게임을 만드는 2인 개발 팀 <strong>The Evil Ent</strong>입니다. 어두운 숲속의 신비롭고 고딕한 아트를 기반으로 깊이 있는 대전 전략 경험을 설계하고 있습니다.
              </p>
              <p style={styles.paragraph}>
                겉모습만 화려한 게임을 넘어, 플레이어의 지략과 순발력이 발휘될 수 있는 정교한 게임플레이 메커니즘을 핵심 가치로 삼아 개발에 집중하고 있습니다.
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <Shield size={20} color="var(--color-primary)" />
                  <div>
                    <h4 style={styles.featureTitle}>실시간 전략 대전</h4>
                    <p style={styles.featureDesc}>빠른 템포의 전투 속에서 카드를 조합하여 최선의 마법을 도출해내는 두뇌 싸움.</p>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <Sparkles size={20} color="var(--color-primary)" />
                  <div>
                    <h4 style={styles.featureTitle}>직관적인 마법 조합</h4>
                    <p style={styles.featureDesc}>복잡한 조작 대신 카드를 결합하여 직관적이고 빠르게 마법을 시전하는 시스템.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.aboutImageCol}>
              <div style={styles.imageCard}>
                <img 
                  src="/theevilent-logo.png" 
                  alt="Team Emblem" 
                  style={styles.showcaseImg} 
                />
                <div style={styles.imageOverlay} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Game Callout */}
      <section style={styles.sectionFeatured}>
        <div className="container">
          <div style={styles.featuredBox} className="gothic-card">
            <span style={styles.featuredBadge}>MAIN FLAGSHIP GAME</span>
            <h2 style={styles.featuredTitle} className="text-glow-subtle">ARCANE CASTERS</h2>
            <p style={styles.featuredDesc}>
              카드를 합쳐 강력한 마법을 영창하고 실시간으로 상대방과 싸우는 전략 대전 게임입니다. 
              다양한 카드를 획득하고 자신만의 덱을 구축하여 실시간 마법 결투에서 승리하세요.
            </p>
            <div style={styles.featuredBtnRow}>
              <button 
                onClick={() => setActiveTab('games')} 
                className="btn-primary"
              >
                자세히 알아보기
                <Sword size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates & Devlogs redirection */}
      <section style={styles.sectionUpdates}>
        <div className="container">
          <h2 style={styles.sectionTitleCentered}>
            DEVELOPMENT <span className="accent-color">DEVLOGS</span>
          </h2>
          <div style={styles.devlogCtaContainer}>
            <div className="gothic-card" style={styles.devlogCtaCard}>
              <div style={styles.devlogIconWrapper}>
                <Calendar size={32} color="var(--color-primary)" />
              </div>
              <h3 style={styles.devlogCtaTitle}>itch.io에서 공식 개발 일지 읽기</h3>
              <p style={styles.devlogCtaDesc}>
                아케인 캐스터즈의 최신 업데이트, 밸런스 패치, 버그 수정 및 새로운 마법 카드 추가 소식은 itch.io 개발자 블로그에 실시간으로 기록되고 있습니다.
              </p>
              <a 
                href="https://theevilent.itch.io/arcane-casters/devlog" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                style={{ marginTop: '1rem' }}
              >
                공식 데브로그 보러가기
                <ExternalLink size={16} />
              </a>
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
  hero: {
    position: 'relative',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '4rem 1.5rem',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '800px',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    width: '220px',
    height: '220px',
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5)',
    border: '1.5px solid #2d231e',
    backgroundColor: '#000',
  },
  heroLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  /* Eye placements matched exactly with logo coordinates for glowing overlay */
  eyeLeft: {
    position: 'absolute',
    left: '42.3%',
    top: '43.2%',
    width: '28px',
    height: '12px',
    backgroundColor: '#ff1a1a',
    borderRadius: '50%',
    filter: 'blur(3.5px)',
    transform: 'rotate(-10deg)',
    mixBlendMode: 'screen',
  },
  eyeRight: {
    position: 'absolute',
    left: '54.5%',
    top: '43.2%',
    width: '28px',
    height: '12px',
    backgroundColor: '#ff1a1a',
    borderRadius: '50%',
    filter: 'blur(3.5px)',
    transform: 'rotate(10deg)',
    mixBlendMode: 'screen',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '3.2rem',
    fontWeight: '900',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
    lineHeight: '1.1',
  },
  heroSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--color-text-muted)',
    marginBottom: '2.5rem',
    letterSpacing: '0.05em',
    fontWeight: '300',
    maxWidth: '600px',
  },
  heroBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center',
  },
  sectionDark: {
    padding: '6rem 0',
    position: 'relative',
    backgroundColor: 'rgba(9, 8, 7, 0.4)',
    borderTop: '1px solid #1a1512',
    borderBottom: '1px solid #1a1512',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    letterSpacing: '0.1em',
    borderLeft: '4px solid var(--color-primary)',
    paddingLeft: '1rem',
  },
  paragraph: {
    fontSize: '1.05rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.75',
    marginBottom: '1.5rem',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  aboutTextCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  featureItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  featureDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
  },
  aboutImageCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageCard: {
    position: 'relative',
    width: '320px',
    height: '320px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
    border: '2px solid #2d231e',
  },
  showcaseImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, rgba(13, 11, 10, 0.4))',
  },
  sectionFeatured: {
    padding: '4rem 0',
  },
  featuredBox: {
    padding: '3rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1c1512 0%, #0d0b0a 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  featuredBadge: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'var(--color-primary)',
    fontWeight: '700',
    marginBottom: '1rem',
    display: 'inline-block',
  },
  featuredTitle: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    letterSpacing: '0.15em',
  },
  featuredDesc: {
    fontSize: '1.1rem',
    color: 'var(--color-text-muted)',
    maxWidth: '750px',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  featuredBtnRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  sectionUpdates: {
    padding: '6rem 0 8rem 0',
  },
  sectionTitleCentered: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    letterSpacing: '0.15em',
  },
  devlogCtaContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  devlogCtaCard: {
    maxWidth: '650px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 2rem',
    gap: '1rem',
  },
  devlogIconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'rgba(230, 30, 42, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    border: '1.5px dashed var(--color-primary)',
  },
  devlogCtaTitle: {
    fontSize: '1.4rem',
    letterSpacing: '0.05em',
  },
  devlogCtaDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.65',
    marginBottom: '0.5rem',
  },
};

// Add raw CSS injections for custom eye glowing pulsing animations
if (typeof document !== 'undefined') {
  const eyeStyle = document.createElement('style');
  eyeStyle.innerHTML = `
    @media (min-width: 480px) {
      .hero-btn-group {
        flex-direction: row !important;
      }
    }

    @media (min-width: 1024px) {
      section div[style*="display: grid"][style*="gap: 4rem"] {
        grid-template-columns: 3fr 2fr !important;
      }
    }

    .eye-pulse {
      animation: eyeGlowPulse 4s infinite ease-in-out;
    }

    .logo-pulse:hover .eye-pulse {
      animation: eyeGlowIntense 0.4s forwards ease-out;
      background-color: #ff333f !important;
      filter: blur(5px) !important;
      transform: scale(1.3) !important;
    }

    @keyframes eyeGlowPulse {
      0%, 100% {
        opacity: 0.4;
        filter: blur(2px);
        transform: scale(0.9);
      }
      50% {
        opacity: 0.95;
        filter: blur(3.5px);
        transform: scale(1.1);
      }
    }

    @keyframes eyeGlowIntense {
      0% {
        transform: scale(1);
        filter: blur(3px);
      }
      100% {
        transform: scale(1.35) translateY(-1px);
        filter: blur(5px);
        box-shadow: 0 0 10px #ff1a1a, 0 0 20px #ff1a1a;
      }
    }

    .logo-pulse {
      transition: transform 0.4s ease-out, border-color 0.4s ease-out, box-shadow 0.4s ease-out;
    }

    .logo-pulse:hover {
      transform: scale(1.03) translateY(-4px);
      border-color: #7a1f1f !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(230, 30, 42, 0.45) !important;
    }
  `;
  document.head.appendChild(eyeStyle);
}

export default Home;
