import React from 'react';
import { aiArtworkNoticeKo, platformLinks } from '../content/siteContent';
import { getTabPath } from '../routing';

interface ConceptShot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** Concept art, each captioned with the creature's name. */
const conceptShots: ConceptShot[] = [
  {
    src: '/concept-art/aqua-archer-drawn.webp',
    alt: '물 화살을 시위에 걸고 당긴 물결 궁수 컨셉 아트',
    caption: '물결 궁수',
    width: 856,
    height: 866,
  },
  {
    src: '/concept-art/water-slime.webp',
    alt: '둥근 물방울 몸에 눈이 둘 달린 물방울 생존자 컨셉 아트',
    caption: '물방울 생존자',
    width: 1254,
    height: 1254,
  },
  {
    src: '/concept-art/rock-golem.webp',
    alt: '어깨와 팔에 이끼가 덮인 이끼바위 골렘 컨셉 아트',
    caption: '이끼바위 골렘',
    width: 1254,
    height: 1254,
  },
  {
    src: '/concept-art/magma-spirit-idle.webp',
    alt: '갑각 틈으로 용암이 흐르는 용암 갑각 악마 컨셉 아트',
    caption: '용암 갑각 악마',
    width: 789,
    height: 788,
  },
  {
    src: '/concept-art/dimension-toad.webp',
    alt: '여섯 다리로 차원 풍경을 운반하는 경계 운반자 컨셉 아트',
    caption: '경계 운반자',
    width: 1774,
    height: 887,
  },
  {
    src: '/concept-art/fire-tadpole.webp',
    alt: '내부에 화산 풍경을 품은 소형 차원 파편 화산편 컨셉 아트',
    caption: '화산편',
    width: 1774,
    height: 887,
  },
];

interface SpriteThumb {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const magicThumbs: SpriteThumb[] = [
  { src: '/game-assets/tide-call.webp', alt: '파도 소환 인게임 스프라이트', width: 256, height: 193 },
  { src: '/game-assets/boulder-strike.webp', alt: '바위 강타 인게임 스프라이트', width: 256, height: 146 },
  { src: '/game-assets/firework-tower.webp', alt: '폭죽 타워 인게임 스프라이트', width: 181, height: 254 },
  { src: '/game-assets/magma-explosion.webp', alt: '마그마 폭발 인게임 스프라이트', width: 217, height: 256 },
];


const ThumbRow: React.FC<{ thumbs: SpriteThumb[] }> = ({ thumbs }) => (
  <span style={styles.thumbRow}>
    {thumbs.map((thumb) => (
      <img
        key={thumb.src}
        src={thumb.src}
        alt={thumb.alt}
        style={styles.thumb}
        width={thumb.width}
        height={thumb.height}
        loading="lazy"
        decoding="async"
      />
    ))}
  </span>
);

export const Games: React.FC = () => {
  const [googlePlay, ...webPlayPlatforms] = platformLinks;

  return (
    <div style={styles.page}>
      {/* The product, its two lines of type, and where to play it. */}
      <section className="band band-md band-grove">
        <div className="container games-header-grid" style={styles.headerGrid}>
          <div style={styles.headerContent}>
            <h1 style={styles.titleHeading}>
              <img
                src="/arcane-casters-logo.png"
                srcSet="/arcane-casters-logo-800.png 800w, /arcane-casters-logo.png 1600w"
                sizes="(min-width: 768px) 440px, 78vw"
                alt="Arcane Casters"
                style={styles.titleLogo}
                width="1600"
                height="1000"
                fetchPriority="high"
              />
            </h1>

            <p className="lede" style={styles.pitch}>
              마법 카드로 겨루는 실시간 대전 게임
            </p>

            <div style={styles.playPanel}>
              <a
                href={googlePlay.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-lg"
              >
                <googlePlay.Icon size={20} aria-hidden="true" />
                {googlePlay.label}
              </a>
              <div className="games-web-play-row" style={styles.webPlayRow}>
                {webPlayPlatforms.map(({ href, label, variant, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-secondary store-btn-${variant}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <img
            src="/gameplay/battle.png"
            alt="초원에서 물 슬라임 무리와 풀 정령 무리가 맞붙고 머리 위로 빨강과 파랑 체력 막대가 걸린 전투 화면"
            className="media-shot"
            width="1468"
            height="852"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* A second match screen: the hand of cards and the mana gauge. */}
      <section className="band band-lg band-ground" aria-label="경기 화면">
        <div className="container-wide" style={styles.playSection}>
          <img
            src="/gameplay/match.png"
            alt="나무 판자 위 마법 카드 여섯 장과 녹색 마나 게이지가 보이는 경기 화면"
            className="media-shot"
            width="1600"
            height="894"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Concept art. */}
      <section className="band band-md band-sunken">
        <div className="container" style={styles.artSection}>
          <h2>컨셉 아트</h2>

          <div className="grid-3" style={styles.artGrid}>
            {conceptShots.map((shot) => (
              <figure className="panel panel-flush" key={shot.src} style={styles.artFigure}>
                <img
                  src={shot.src}
                  alt={shot.alt}
                  style={styles.artImage}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption style={styles.artCaption}>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>

          <p className="magic-ai-notice">{aiArtworkNoticeKo}</p>
        </div>
      </section>

      {/* The compendium. */}
      <section className="band band-sm band-wood">
        <div className="container game-link-banner">
          <a className="panel panel-link" href={getTabPath('magic')}>
            <ThumbRow thumbs={magicThumbs} />
            <h3 style={styles.linkTitle}>마법 도감</h3>
          </a>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: '100%',
  },
  headerGrid: {
    alignItems: 'center',
    display: 'grid',
    gap: '2.5rem',
    gridTemplateColumns: '1fr',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    minWidth: 0,
  },
  titleHeading: {
    lineHeight: 0,
    margin: 0,
  },
  titleLogo: {
    display: 'block',
    height: 'auto',
    width: 'min(100%, 440px)',
  },
  pitch: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink)',
  },
  playPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    maxWidth: '34rem',
  },
  webPlayRow: {
    display: 'grid',
    gap: '0.75rem',
    gridTemplateColumns: '1fr',
  },
  playSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  artSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  artGrid: {
    marginTop: '1rem',
  },
  artFigure: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  artImage: {
    aspectRatio: '4 / 3',
    background: 'var(--color-ground-sunken)',
    display: 'block',
    height: 'auto',
    objectFit: 'contain',
    padding: '0.75rem',
    width: '100%',
  },
  artCaption: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink-soft)',
    fontSize: 'var(--text-label)',
    lineHeight: 1.5,
    padding: '0.9rem 1.1rem 1.1rem',
  },
  thumbRow: {
    alignItems: 'flex-end',
    display: 'flex',
    gap: '0.6rem',
    marginBottom: '0.9rem',
    minHeight: '56px',
  },
  thumb: {
    height: '56px',
    objectFit: 'contain',
    width: 'auto',
  },
  linkTitle: {
    marginBottom: '0.35rem',
  },
};

export default Games;
