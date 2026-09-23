import React from 'react';
import { ExternalLink } from 'lucide-react';
import { magicConcepts } from '../content/magicConcepts';
import { summonConcepts } from '../content/summonConcepts';
import { platformLinks } from '../content/siteContent';
import type { TabId } from '../content/siteContent';
import { getTabPath } from '../routing';

interface HomeProps {
  navigateToTab: (tab: TabId) => void;
}

interface SpriteEntry {
  bean: string;
  width: number;
  height: number;
}

/**
 * The wall of runtime sprites. Every entry is a magic that has its own record
 * in the compendium, so each cell is a link into that record. The intrinsic
 * size of each file is kept here so the grid never reflows while it loads.
 */
const spriteWall: SpriteEntry[] = [
  { bean: 'magma_spirit', width: 256, height: 253 },
  { bean: 'fire_drop', width: 104, height: 192 },
  { bean: 'meteor_shower', width: 207, height: 256 },
  { bean: 'fire_slime_nest', width: 128, height: 108 },
  { bean: 'aqua_archer', width: 256, height: 246 },
  { bean: 'bubble_spirit', width: 250, height: 256 },
  { bean: 'sea_serpent', width: 201, height: 256 },
  { bean: 'tidal_warhead', width: 256, height: 256 },
  { bean: 'water_slime_swarm', width: 256, height: 224 },
  { bean: 'cloud_dragon', width: 256, height: 182 },
  { bean: 'zap_mouse', width: 256, height: 162 },
  { bean: 'thunder_spirit', width: 256, height: 226 },
  { bean: 'storm_stag', width: 256, height: 256 },
  { bean: 'thunder_bird_swarm', width: 256, height: 188 },
  { bean: 'lightning_drop', width: 320, height: 640 },
  { bean: 'storm_rider', width: 256, height: 221 },
  { bean: 'leafair', width: 178, height: 256 },
  { bean: 'vine_spirit', width: 180, height: 256 },
  { bean: 'seed_spirit_swarm', width: 256, height: 224 },
  { bean: 'tree_golem', width: 240, height: 256 },
  { bean: 'life_tree', width: 256, height: 207 },
  { bean: 'overgrowth', width: 256, height: 245 },
  { bean: 'rock_golem', width: 256, height: 244 },
  { bean: 'rock_mage', width: 234, height: 256 },
  { bean: 'wall_golem', width: 226, height: 254 },
  { bean: 'mini_rock_swarm', width: 236, height: 256 },
  { bean: 'titan_remnant', width: 253, height: 215 },
  { bean: 'wind_spirit', width: 206, height: 256 },
  { bean: 'razor_gale', width: 192, height: 155 },
  { bean: 'tornado_strike', width: 224, height: 256 },
  { bean: 'dimension_toad', width: 768, height: 456 },
  { bean: 'frenzy_totem', width: 163, height: 256 },
  { bean: 'will_o_wisp', width: 256, height: 180 },
  { bean: 'bomb_sprite', width: 222, height: 256 },
  { bean: 'dragon_tower', width: 161, height: 256 },
  { bean: 'healing_totem', width: 188, height: 256 },
];

const magicNameByBean = new Map(magicConcepts.map((magic) => [magic.bean, magic.concept_name]));

const spriteSource = (bean: string) => `/game-assets/${bean.replace(/_/g, '-')}.webp`;

export const Home: React.FC<HomeProps> = ({ navigateToTab }) => {
  const [googlePlay, itchIo, youTube] = platformLinks;

  // The tab links stay real links so they can be opened in a new tab, but a
  // plain click is handed to the router instead of reloading the document.
  const openTab = (tab: TabId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateToTab(tab);
  };

  return (
    <div style={styles.page}>
      {/* The clearing the match is played in, with the game's own logo on it. */}
      <section className="band band-lg band-grove" style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <h1 style={styles.heroHeading}>
            <img
              src="/arcane-casters-logo.png"
              srcSet="/arcane-casters-logo-800.png 800w, /arcane-casters-logo.png 1600w"
              sizes="(min-width: 768px) 560px, 86vw"
              alt="Arcane Casters"
              style={styles.heroLogo}
              width="1600"
              height="1000"
              fetchPriority="high"
            />
          </h1>

          <p className="lede" style={styles.heroLede}>
            카드를 합쳐 마법을 만들고, 햇빛 드는 초원에서 실시간으로 맞붙는다.
          </p>

          <div className="hero-btn-group" style={styles.heroButtons}>
            <a
              href={googlePlay.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              <googlePlay.Icon size={20} aria-hidden="true" />
              {googlePlay.label}
            </a>
            <a
              href={itchIo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg store-btn-itch"
            >
              <itchIo.Icon size={20} aria-hidden="true" />
              {itchIo.label}
            </a>
            <a
              href={youTube.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg store-btn-youtube"
            >
              <youTube.Icon size={20} aria-hidden="true" />
              {youTube.label}
            </a>
          </div>
        </div>
      </section>

      {/* One match screen, big enough to read the hand of cards. */}
      <section className="band band-md band-ground">
        <div className="container-wide" style={styles.matchIntro}>
          <h2>실제 경기 화면</h2>
          <p className="lede" style={styles.sectionLede}>초원 양 끝에 캐스터가 서고, 아래 나무 판자에 손패 여섯 장이 깔린다.</p>
        </div>

        <div className="container-wide" style={styles.matchShotWrap}>
          <img
            src="/gameplay/match.png"
            alt="초원 양 끝에 캐스터가 선 경기 화면. 아래 나무 판자 위에 마나값이 붙은 마법 카드 여섯 장이 놓여 있다"
            className="media-shot"
            width="1600"
            height="894"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="container" style={styles.matchFacts}>
          <div className="grid-3">
            <article className="panel" style={styles.factPanel}>
              <h3>손패 여섯 장</h3>
              <p style={styles.factText}>지금 낼 수 있는 마법은 판자 위 여섯 장이 전부다.</p>
            </article>
            <article className="panel" style={styles.factPanel}>
              <h3>마나 배지</h3>
              <p style={styles.factText}>카드마다 마나값이 붙어 있다.</p>
              <p style={styles.chipRow}>
                <span className="chip chip-mana">20</span>
                <span className="chip chip-mana">25</span>
              </p>
            </article>
            <article className="panel" style={styles.factPanel}>
              <h3>실시간</h3>
              <p style={styles.factText}>턴을 기다리지 않는다. 마나가 차는 대로 바로 시전한다.</p>
            </article>
          </div>

          <a
            href={getTabPath('games')}
            onClick={openTab('games')}
            className="btn-primary"
            style={styles.inlineCta}
          >
            아케인 캐스터즈 자세히 보기
          </a>
        </div>
      </section>

      {/* The hud plank, carrying the runtime sprites the way it carries cards. */}
      <section className="band band-lg band-wood">
        <div className="container" style={styles.spriteIntro}>
          <h2>마법 {magicConcepts.length}가지와 소환수 {summonConcepts.length}종</h2>
          <p className="lede" style={styles.woodLede}>
            격자에 깔린 그림은 전부 경기에 그대로 나오는 스프라이트다. 하나를 고르면 그 기록으로 간다.
          </p>
        </div>

        <div className="container" style={styles.spriteWallWrap}>
          <div className="sprite-grid">
            {spriteWall.map(({ bean, width, height }) => (
              <a className="sprite-cell" href={getTabPath('magic', bean)} key={bean}>
                <img
                  src={spriteSource(bean)}
                  alt={`${magicNameByBean.get(bean) ?? bean} 인게임 스프라이트`}
                  width={width}
                  height={height}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="game-link-banner" style={styles.compendiumBanner}>
            <a className="panel panel-link" href={getTabPath('magic')}>
              <h3>마법 도감</h3>
              <p style={styles.factText}>{magicConcepts.length}개 마법의 시전 방식과 진영.</p>
            </a>
            <a className="panel panel-link" href={getTabPath('summons')}>
              <h3>소환수 도감</h3>
              <p style={styles.factText}>{summonConcepts.length}종 소환 개체의 역할과 이동.</p>
            </a>
          </div>
        </div>
      </section>

      {/* The studio, kept to one line. The Team page carries the rest. */}
      <section className="band band-sm band-sunken">
        <div className="container" style={styles.studioRow}>
          <img
            src="/theevilent-logo.png"
            alt="The Evil Ent 팀 로고"
            style={styles.studioLogo}
            width="1254"
            height="1254"
            loading="lazy"
            decoding="async"
          />
          <div style={styles.studioText}>
            <h2 style={styles.studioName}>THE EVIL ENT</h2>
            <p style={styles.factText}>아케인 캐스터즈를 만드는 2인 게임 팀.</p>
          </div>
          <a
            href={getTabPath('team')}
            onClick={openTab('team')}
            className="btn-secondary"
            style={styles.studioCta}
          >
            팀 소개 보기
          </a>
        </div>
      </section>

      {/* itch.io devlog. */}
      <section className="band band-md band-surface">
        <div className="container-narrow" style={styles.devlog}>
          <h2>개발 일지</h2>
          <p className="lede" style={styles.sectionLede}>업데이트와 밸런스 패치 기록은 itch.io devlog 에 쌓인다.</p>
          <a
            href="https://theevilent.itch.io/arcane-casters/devlog"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            devlog 읽기
            <ExternalLink size={18} aria-hidden="true" />
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
  hero: {
    textAlign: 'center',
  },
  heroInner: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  heroHeading: {
    lineHeight: 0,
    margin: 0,
  },
  heroLogo: {
    display: 'block',
    height: 'auto',
    width: 'min(100%, 560px)',
  },
  heroLede: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink)',
    maxWidth: '42ch',
  },
  heroButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5rem',
  },
  sectionLede: {
    wordBreak: 'keep-all',
  },
  matchIntro: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  matchShotWrap: {
    marginBottom: '2.5rem',
  },
  matchFacts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  factPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  factText: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink-soft)',
    fontSize: 'var(--text-body)',
    lineHeight: 1.6,
    margin: 0,
  },
  chipRow: {
    display: 'flex',
    gap: '0.4rem',
    margin: 0,
  },
  inlineCta: {
    alignSelf: 'flex-start',
  },
  spriteIntro: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  woodLede: {
    wordBreak: 'keep-all',
    color: 'var(--color-ink-wood)',
    maxWidth: '52ch',
  },
  spriteWallWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  compendiumBanner: {
    marginTop: '0.5rem',
  },
  studioRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
  },
  studioLogo: {
    borderRadius: 'var(--radius-icon)',
    flexShrink: 0,
    height: '72px',
    objectFit: 'cover',
    width: '72px',
  },
  studioText: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '0.35rem',
    minWidth: '12rem',
  },
  studioName: {
    fontFamily: 'var(--font-wordmark)',
    fontSize: 'var(--text-h3)',
  },
  studioCta: {
    flexShrink: 0,
  },
  devlog: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
};

export default Home;
