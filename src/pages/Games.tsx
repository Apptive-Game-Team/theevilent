import React from 'react';
import { magicConcepts } from '../content/magicConcepts';
import { summonConcepts } from '../content/summonConcepts';
import { aiArtworkNoticeKo, platformLinks } from '../content/siteContent';
import { getTabPath } from '../routing';

interface ConceptShot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** Concept art, with the wording the compendium already uses for each piece. */
const conceptShots: ConceptShot[] = [
  {
    src: '/concept-art/aqua-archer-drawn.webp',
    alt: '물 화살을 시위에 걸고 당긴 물결 궁수 컨셉 아트',
    caption: '물 슬라임 · 원거리 공격',
    width: 856,
    height: 866,
  },
  {
    src: '/concept-art/water-slime.webp',
    alt: '둥근 물방울 몸에 눈이 둘 달린 물방울 생존자 컨셉 아트',
    caption: '물 슬라임 · 근접 공격',
    width: 1254,
    height: 1254,
  },
  {
    src: '/concept-art/rock-golem.webp',
    alt: '어깨와 팔에 이끼가 덮인 이끼바위 골렘 컨셉 아트',
    caption: '돌 골렘 부족 · 근접 공격',
    width: 1254,
    height: 1254,
  },
  {
    src: '/concept-art/magma-spirit-idle.webp',
    alt: '갑각 틈으로 용암이 흐르는 용암 갑각 악마 컨셉 아트',
    caption: '지옥불 군단 · 지상 범위 공격',
    width: 789,
    height: 788,
  },
  {
    src: '/concept-art/dimension-toad.webp',
    alt: '여섯 다리로 차원 풍경을 운반하는 경계 운반자 컨셉 아트',
    caption: '차원 유랑종 · 세계 파편 소환',
    width: 1774,
    height: 887,
  },
  {
    src: '/concept-art/fire-tadpole.webp',
    alt: '내부에 화산 풍경을 품은 소형 차원 파편 화산편 컨셉 아트',
    caption: '차원 유랑종 · 빠른 지상 화염 근접',
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

const summonThumbs: SpriteThumb[] = [
  { src: '/game-assets/evil-ent-idle.webp', alt: '사악한 나무 골렘 인게임 스프라이트', width: 224, height: 256 },
  { src: '/game-assets/water-slime-attack.webp', alt: '물을 뱉어 공격하는 물방울 생존자 인게임 스프라이트', width: 549, height: 318 },
  { src: '/game-assets/rock-golem-attack.webp', alt: '팔을 휘두르는 이끼바위 골렘 인게임 스프라이트', width: 768, height: 732 },
  { src: '/game-assets/storm-stag.webp', alt: '폭풍 사슴 인게임 스프라이트', width: 256, height: 256 },
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
              손패 여섯 장을 합쳐 마법을 만들고, 초원 반대편의 캐스터를 무너뜨리는 실시간 대전 게임.
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

      {/* How a match actually runs, next to the screen it runs on. */}
      <section className="band band-lg band-ground">
        <div className="container-wide" style={styles.playSection}>
          <h2>한 판이 도는 방식</h2>

          <div className="grid-2 games-play-grid" style={styles.playGrid}>
            <img
              src="/gameplay/match.png"
              alt="나무 판자 위 마법 카드 여섯 장과 녹색 마나 게이지가 보이는 경기 화면"
              className="media-shot"
              width="1600"
              height="894"
              loading="lazy"
              decoding="async"
            />

            <ol style={styles.stepList}>
              <li style={styles.step}>
                <strong style={styles.stepTitle}>카드를 뽑는다</strong>
                <p style={styles.stepText}>판자 위 여섯 장이 지금 쓸 수 있는 전부다.</p>
              </li>
              <li style={styles.step}>
                <strong style={styles.stepTitle}>마나를 채운다</strong>
                <p style={styles.stepText}>카드마다 값이 붙는다. 게이지가 그만큼 차야 나간다.</p>
                <p style={styles.chipRow}>
                  <span className="chip chip-mana">20</span>
                  <span className="chip chip-mana">25</span>
                </p>
              </li>
              <li style={styles.step}>
                <strong style={styles.stepTitle}>초원으로 내보낸다</strong>
                <p style={styles.stepText}>
                  소환된 정령이 알아서 전진하고, 체력 막대가 먼저 비는 쪽이 진다.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Concept art. */}
      <section className="band band-md band-sunken">
        <div className="container" style={styles.artSection}>
          <h2>컨셉 아트</h2>
          <p className="lede" style={styles.sectionLede}>스프라이트가 나오기 전의 그림들.</p>

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

      {/* The two compendiums. */}
      <section className="band band-sm band-wood">
        <div className="container game-link-banner">
          <a className="panel panel-link" href={getTabPath('magic')}>
            <ThumbRow thumbs={magicThumbs} />
            <h3 style={styles.linkTitle}>마법 도감</h3>
            <p style={styles.linkText}>{magicConcepts.length}개 마법의 시전 방식과 진영.</p>
          </a>
          <a className="panel panel-link" href={getTabPath('summons')}>
            <ThumbRow thumbs={summonThumbs} />
            <h3 style={styles.linkTitle}>소환수 도감</h3>
            <p style={styles.linkText}>{summonConcepts.length}종 소환 개체의 역할과 이동.</p>
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
  playGrid: {
    alignItems: 'center',
  },
  stepList: {
    listStyle: 'decimal',
    paddingInlineStart: '1.4rem',
  },
  step: {
    marginBottom: '1.75rem',
    paddingInlineStart: '0.35rem',
  },
  stepTitle: {
    display: 'block',
    fontSize: 'var(--text-h3)',
    fontWeight: 800,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    marginBottom: '0.3rem',
  },
  stepText: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.6,
  },
  chipRow: {
    display: 'flex',
    gap: '0.4rem',
    marginTop: '0.5rem',
  },
  sectionLede: {
    wordBreak: 'keep-all',
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
  linkText: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.6,
    margin: 0,
  },
};

export default Games;
