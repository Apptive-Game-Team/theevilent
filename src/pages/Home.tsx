import React from 'react';
import { ArrowRight, Calendar, ExternalLink, PawPrint, Terminal, Wand2, Sparkles } from 'lucide-react';
import { platformLinks, type TabId } from '../content/siteContent';
import { getTabPath } from '../routing';
import { ARCANE_CASTERS_THEME, useDocumentTheme } from '../hooks/useDocumentTheme';

interface HomeProps {
  navigateToTab: (tab: TabId) => void;
}

export const Home: React.FC<HomeProps> = ({ navigateToTab }) => {
  // Home is the front door for Google Play and YouTube visitors, so it wears
  // the game's own accent instead of The Evil Ent's crimson. Games.tsx already
  // opts in the same way; Team stays on the team's crimson identity.
  useDocumentTheme(ARCANE_CASTERS_THEME);

  const [primaryPlatform] = platformLinks;

  // Let modifier clicks fall through to the browser (open in new tab/window),
  // otherwise cancel the default navigation so only SPA routing runs. Mirrors
  // Footer.tsx and ArcaneCastersSubNav.tsx.
  const handleNavClick = (event: React.MouseEvent, tabId: TabId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tabId);
  };

  return (
    <div style={styles.page}>
      {/* Hero: Arcane Casters, not the team */}
      <section style={styles.hero}>
        <div className="container home-hero-grid" style={styles.heroGrid}>
          <div className="home-hero-content" style={styles.heroContent}>
            <div style={styles.tagline}>
              <Sparkles size={16} color="var(--color-primary)" aria-hidden="true" />
              <span>Real-Time Card Merging Strategy Game</span>
            </div>

            <h1 style={styles.heroTitle} className="text-glow">
              ARCANE CASTERS
            </h1>

            <p style={styles.heroSub}>
              카드를 합쳐 강력한 마법을 완성하고, 실시간으로 상대와 겨루는 전략 대전 게임입니다.
            </p>

            <div className="hero-btn-group" style={styles.heroBtnGroup}>
              <a
                href={primaryPlatform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <primaryPlatform.Icon size={18} aria-hidden="true" />
                {primaryPlatform.title}에서 플레이
              </a>
              <a
                href={getTabPath('games')}
                onClick={(event) => handleNavClick(event, 'games')}
                className="btn-secondary"
              >
                게임 더 알아보기
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="home-hero-art" style={styles.heroArt} aria-hidden="true">
            <div className="home-hero-art-glow" style={styles.heroArtGlow} />
            <img
              src="/concept-art/magma-spirit-idle.webp"
              alt=""
              width="789"
              height="788"
              style={styles.heroArtSecondary}
              className="home-hero-float"
              loading="eager"
            />
            <img
              src="/concept-art/aqua-archer-release.webp"
              alt=""
              width="804"
              height="866"
              style={{ ...styles.heroArtTertiary, animationDelay: '1.4s' }}
              className="home-hero-float"
              loading="eager"
            />
            <img
              src="/concept-art/rock-golem.webp"
              alt=""
              width="1254"
              height="1254"
              style={{ ...styles.heroArtPrimary, animationDelay: '0.7s' }}
              className="home-hero-float"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Magic and summon compendiums: what the game is actually made of */}
      <section style={styles.sectionCompendium}>
        <div className="container">
          <h2 style={styles.sectionTitleCentered}>
            EXPLORE <span className="accent-color">ARCANE CASTERS</span>
          </h2>
          <p style={styles.sectionLead}>
            마법과 소환수를 조합해 나만의 덱을 완성하세요.
          </p>

          <div className="home-compendium-grid" style={styles.compendiumGrid}>
            <a
              href={getTabPath('magic')}
              onClick={(event) => handleNavClick(event, 'magic')}
              className="gothic-card home-compendium-card"
              style={styles.compendiumCard}
            >
              <img
                src="/game-assets/firework-explosion.webp"
                alt=""
                width="254"
                height="238"
                loading="lazy"
                style={styles.compendiumThumb}
              />
              <div style={styles.compendiumIconRow}>
                <Wand2 size={20} color="var(--color-primary)" aria-hidden="true" />
                <h3 style={styles.compendiumTitle}>마법 도감</h3>
              </div>
              <p style={styles.compendiumDesc}>
                카드를 합쳐 완성되는 마법들의 위력과 효과를 한눈에 확인하세요.
              </p>
              <span className="home-compendium-cta" style={styles.compendiumCta}>
                마법 도감 보기
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>

            <a
              href={getTabPath('summons')}
              onClick={(event) => handleNavClick(event, 'summons')}
              className="gothic-card home-compendium-card"
              style={styles.compendiumCard}
            >
              <img
                src="/game-assets/cloud-dragon.webp"
                alt=""
                width="256"
                height="182"
                loading="lazy"
                style={styles.compendiumThumb}
              />
              <div style={styles.compendiumIconRow}>
                <PawPrint size={20} color="var(--color-primary)" aria-hidden="true" />
                <h3 style={styles.compendiumTitle}>소환수 도감</h3>
              </div>
              <p style={styles.compendiumDesc}>
                전장을 채우는 다양한 소환수들의 특징과 역할을 살펴보세요.
              </p>
              <span className="home-compendium-cta" style={styles.compendiumCta}>
                소환수 도감 보기
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* About the team: short, with a path to the full Team page */}
      <section style={styles.sectionDark}>
        <div className="container">
          <div className="home-about-grid" style={styles.teamGrid}>
            <div style={styles.teamTextCol}>
              <h2 style={styles.sectionTitle}>
                ABOUT <span className="accent-color">THE EVIL ENT</span>
              </h2>
              <p style={styles.paragraph}>
                아케인 캐스터즈를 만드는 2인 개발 팀, The Evil Ent입니다. 독창적인 마법 조합
                시스템과 몰입감 있는 실시간 전투를 목표로 개발하고 있습니다.
              </p>
              <a
                href={getTabPath('team')}
                onClick={(event) => handleNavClick(event, 'team')}
                className="btn-secondary"
                style={styles.teamCta}
              >
                <Terminal size={16} aria-hidden="true" />
                팀 멤버 소개 보기
              </a>
            </div>
            <div style={styles.teamImageCol}>
              <div style={styles.teamImageCard}>
                <img
                  src="/theevilent-logo.png"
                  alt="The Evil Ent 팀 로고"
                  style={styles.teamImg}
                  width="220"
                  height="220"
                  loading="lazy"
                />
              </div>
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
                <Calendar size={32} color="var(--color-primary)" aria-hidden="true" />
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
                <ExternalLink size={16} aria-hidden="true" />
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
    padding: '7rem 1.5rem 5rem',
    overflow: 'hidden',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  tagline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--color-primary)',
    letterSpacing: '0.15em',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '3.2rem',
    fontWeight: '900',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
    lineHeight: '1.1',
  },
  heroSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--color-text-muted)',
    marginBottom: '2.5rem',
    letterSpacing: '0.02em',
    fontWeight: '300',
    maxWidth: '520px',
  },
  heroBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center',
  },
  heroArt: {
    position: 'relative',
    width: '100%',
    maxWidth: '460px',
    margin: '0 auto',
    aspectRatio: '1 / 1',
  },
  heroArtGlow: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    right: '-10%',
    bottom: '-10%',
    background:
      'radial-gradient(circle at 62% 38%, var(--color-primary-glow), transparent 60%), radial-gradient(circle at 28% 78%, rgba(var(--color-secondary-rgb), 0.35), transparent 55%)',
    zIndex: 0,
  },
  heroArtPrimary: {
    position: 'absolute',
    bottom: '0',
    right: '2%',
    width: '68%',
    height: 'auto',
    zIndex: 3,
    filter: 'drop-shadow(0 25px 35px rgba(var(--color-shadow-rgb), 0.6))',
  },
  heroArtSecondary: {
    position: 'absolute',
    top: '2%',
    left: '4%',
    width: '44%',
    height: 'auto',
    zIndex: 1,
    filter: 'drop-shadow(0 15px 20px rgba(var(--color-shadow-rgb), 0.5))',
  },
  heroArtTertiary: {
    position: 'absolute',
    bottom: '4%',
    left: '0',
    width: '32%',
    height: 'auto',
    zIndex: 2,
    filter: 'drop-shadow(0 15px 20px rgba(var(--color-shadow-rgb), 0.5))',
  },
  sectionCompendium: {
    padding: '5rem 0',
  },
  sectionTitleCentered: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '0.75rem',
    letterSpacing: '0.15em',
  },
  sectionLead: {
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    fontSize: '1.05rem',
    marginBottom: '3rem',
  },
  compendiumGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
  compendiumCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    textDecoration: 'none',
    color: 'var(--color-text-light)',
  },
  compendiumThumb: {
    width: '100%',
    maxWidth: '180px',
    height: 'auto',
    margin: '0 auto 0.5rem',
    objectFit: 'contain',
  },
  compendiumIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  compendiumTitle: {
    fontSize: '1.3rem',
    letterSpacing: '0.05em',
  },
  compendiumDesc: {
    fontSize: '0.95rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.65',
  },
  compendiumCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginTop: 'auto',
  },
  sectionDark: {
    padding: '5rem 0',
    position: 'relative',
    backgroundColor: 'var(--color-surface-veil)',
    borderTop: '1px solid var(--color-border-rule)',
    borderBottom: '1px solid var(--color-border-rule)',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    marginBottom: '1.25rem',
    letterSpacing: '0.1em',
    borderLeft: '4px solid var(--color-primary)',
    paddingLeft: '1rem',
  },
  paragraph: {
    fontSize: '1rem',
    color: 'var(--color-text-muted)',
    lineHeight: '1.75',
    marginBottom: '1.5rem',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    alignItems: 'center',
  },
  teamTextCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  teamCta: {
    alignSelf: 'flex-start',
  },
  teamImageCol: {
    display: 'flex',
    justifyContent: 'center',
  },
  teamImageCard: {
    position: 'relative',
    width: '220px',
    height: '220px',
    borderRadius: 'var(--radius-media)',
    overflow: 'hidden',
    boxShadow: '0 15px 30px rgba(var(--color-shadow-rgb), 0.5)',
    border: '2px solid var(--color-border)',
  },
  teamImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sectionUpdates: {
    padding: '5rem 0 7rem 0',
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
    backgroundColor: 'var(--color-primary-tint)',
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

export default Home;
