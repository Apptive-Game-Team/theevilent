import React from 'react';
import { Shield, Sparkles, Sword, Terminal, Calendar, ArrowRight } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const newsItems = [
    {
      date: 'MAY 28, 2026',
      title: 'Arcane Casters: Alpha Version 1.2 Released!',
      summary: 'Added new magical elements, refined the casting mechanics, and updated spell feedback. Download now on itch.io!',
      category: 'UPDATE',
    },
    {
      date: 'MAY 15, 2026',
      title: 'Unveiling the Core Magic Spell System',
      summary: 'Deep-dive into how players combine rune gestures to conjure ancient, powerful curses and protective glyphs.',
      category: 'DEVLOG',
    },
    {
      date: 'MAY 01, 2026',
      title: 'The Evil Ent: Website Officially Launched',
      summary: 'Our official headquarters is now live. Follow our devlogs, view game specifications, and connect with the community.',
      category: 'ANNOUNCEMENT',
    },
  ];

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
            Indie Game Developers Summoning Dark Fantasy Realms
          </p>

          <div style={styles.heroBtnGroup}>
            <button 
              onClick={() => setActiveTab('games')} 
              className="btn-primary"
            >
              <Sword size={18} />
              PLAY ARCANE CASTERS
            </button>
            <button 
              onClick={() => setActiveTab('team')} 
              className="btn-secondary"
            >
              <Terminal size={18} />
              MEET THE TEAM
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
                FROM THE <span className="accent-color">DARKNESS</span> WE RISE
              </h2>
              <p style={styles.paragraph}>
                We are <strong>The Evil Ent</strong>, a two-man indie studio creating immersive, moody, and mystical gaming experiences. Our designs draw inspiration from dark woods, ancient myths, and spellbinding rituals.
              </p>
              <p style={styles.paragraph}>
                Instead of bright, cheerful paths, we wander into the shadowy groves of game development, crafting deep gameplay systems and rich, pixel-perfect atmospheres that stick with you.
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <Shield size={20} color="var(--color-primary)" />
                  <div>
                    <h4 style={styles.featureTitle}>Deep Systems</h4>
                    <p style={styles.featureDesc}>Focusing on rich spellcasting mechanics and strategic gameplay.</p>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <Sparkles size={20} color="var(--color-primary)" />
                  <div>
                    <h4 style={styles.featureTitle}>Atmospheric Visuals</h4>
                    <p style={styles.featureDesc}>Dark fantasy artwork matching detailed, gothic environments.</p>
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
            <span style={styles.featuredBadge}>FEATURED RELEASE</span>
            <h2 style={styles.featuredTitle} className="text-glow-subtle">ARCANE CASTERS</h2>
            <p style={styles.featuredDesc}>
              Harness elemental elements and combine unique rune glyphs to conjure devastating magic spells. A dark, fast-paced action/strategy adventure that challenges your wits and speed.
            </p>
            <div style={styles.featuredBtnRow}>
              <button 
                onClick={() => setActiveTab('games')} 
                className="btn-primary"
              >
                Learn More & Play
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates & Devlogs */}
      <section style={styles.sectionUpdates}>
        <div className="container">
          <h2 style={styles.sectionTitleCentered}>
            LATEST <span className="accent-color">ANNOUNCEMENTS</span>
          </h2>
          <div className="grid-3" style={styles.newsGrid}>
            {newsItems.map((item, index) => (
              <div key={index} className="gothic-card" style={styles.newsCard}>
                <div style={styles.newsMeta}>
                  <span style={styles.newsCategory}>{item.category}</span>
                  <div style={styles.newsDate}>
                    <Calendar size={12} style={{ marginRight: '4px' }} />
                    {item.date}
                  </div>
                </div>
                <h3 style={styles.newsCardTitle}>{item.title}</h3>
                <p style={styles.newsCardSummary}>{item.summary}</p>
              </div>
            ))}
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
  newsGrid: {
    marginTop: '2rem',
  },
  newsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
  },
  newsMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.8rem',
  },
  newsCategory: {
    color: 'var(--color-primary)',
    fontWeight: '700',
    letterSpacing: '0.1em',
  },
  newsDate: {
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center',
  },
  newsCardTitle: {
    fontSize: '1.2rem',
    lineHeight: '1.4',
    letterSpacing: '0.02em',
  },
  newsCardSummary: {
    color: 'var(--color-text-muted)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    flexGrow: 1,
  },
};

// Add raw CSS injections for custom eye glowing pulsing animations
if (typeof document !== 'undefined') {
  const eyeStyle = document.createElement('style');
  eyeStyle.innerHTML = `
    @media (min-width: 480px) {
      div[style*="display: flex"][style*="flex-direction: column"][style*="gap: 1rem"] {
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
