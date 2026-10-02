import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import {
  getMagicDescription,
  getMagicGameData,
  getMagicName,
  magicConcepts,
  magicElementLabels,
  magicElements,
  magicFactionLabelsEn,
  magicFamilyLabels,
  magicFamilyLabelsEn,
  type MagicConcept,
  type MagicElement,
  type MagicFamily,
} from '../content/magicConcepts';
import { FramePair } from '../components/FramePair';
import { hiresArtwork } from '../content/hiresArtwork';
import { magicAccessoryArtwork, magicArtwork, magicRelatedArtwork } from '../content/magicArtwork';
import { summonConcepts } from '../content/summonConcepts';
import { aiArtworkNotice } from '../content/siteContent';
import { useCopy, useLanguage, type Language } from '../i18n/language';
import { getRouteFromPathname, getTabPath } from '../routing';
import './MagicCompendium.css';

interface MagicCompendiumProps {
  /**
   * App passes the slug it routed. The page reads the live address itself,
   * because selecting a tile rewrites the address without going through App.
   */
  slug?: string;
}

const copy = {
  ko: {
    title: '마법 도감',
    back: '뒤로',
    all: '전체',
    filters: '마법 필터',
    family: '타입',
    list: '마법 목록',
    toList: '목록으로',
    mana: (cost: number) => `${cost} 마나`,
    faction: '진영',
    element: '원소',
    noElement: '없음',
    artwork: '그림',
    concept: '컨셉 아트',
    inGame: '게임 속 모습',
    hires: '고해상도 아트',
    frames: '단계별 모습',
    idle: '대기',
    strike: (n: string) => `강타 ${n}`,
    stage: (n: string) => `${n}단계`,
    empty: '조건에 맞는 마법이 없어요.',
  },
  en: {
    title: 'Magic Book',
    back: 'Back',
    all: 'All',
    filters: 'Magic filters',
    family: 'Type',
    list: 'Magic list',
    toList: 'Back to list',
    mana: (cost: number) => `${cost} Mana`,
    faction: 'Faction',
    element: 'Element',
    noElement: 'None',
    artwork: 'artwork',
    concept: 'Concept art',
    inGame: 'In game',
    hires: 'High-res art',
    frames: 'Frames',
    idle: 'Idle',
    strike: (n: string) => `Strike ${n}`,
    stage: (n: string) => `Stage ${n}`,
    empty: 'No magic matches.',
  },
};

type Copy = (typeof copy)[Language];

const familyLabels: Record<Language, Record<MagicFamily, string>> = {
  ko: magicFamilyLabels,
  en: magicFamilyLabelsEn,
};

const families = Object.keys(magicFamilyLabels) as MagicFamily[];

/**
 * `ConceptArtwork` (the `concept` field on magicArtwork and magicRelatedArtwork
 * entries) carries no width/height — only gameAsset-shaped fields do. These are
 * the real pixel sizes of every file in public/concept-art, read once with
 * Pillow, so every <img> can still report an intrinsic size and reserve its
 * box before the file loads.
 */
const CONCEPT_ART_SIZES: Record<string, { width: number; height: number }> = {
  'aqua-archer-drawn.webp': { width: 856, height: 866 },
  'aqua-archer-release.webp': { width: 804, height: 866 },
  'chicken-commando.webp': { width: 1774, height: 887 },
  'dimension-toad.webp': { width: 1774, height: 887 },
  'ember-spirit-swarm.webp': { width: 770, height: 472 },
  'fire-child-spirit.webp': { width: 810, height: 912 },
  'fire-lord-spirit.webp': { width: 1536, height: 1024 },
  'fire-spirit.webp': { width: 1536, height: 1024 },
  'fire-tadpole.webp': { width: 1774, height: 887 },
  'lightning-cloud-strike-sequence.webp': { width: 2336, height: 664 },
  'lightning-tadpole.webp': { width: 1774, height: 887 },
  'magma-spirit-attack.webp': { width: 672, height: 680 },
  'magma-spirit-idle.webp': { width: 789, height: 788 },
  'magma-spirit-spawn.webp': { width: 820, height: 650 },
  'rock-golem.webp': { width: 1254, height: 1254 },
  'water-slime.webp': { width: 1254, height: 1254 },
};

const getConceptArtSize = (src: string) =>
  CONCEPT_ART_SIZES[src.split('/').pop() ?? ''] ?? { width: 1200, height: 800 };

/**
 * Three magics have no in-game sprite in public/game-assets; their tile shows
 * the concept art (or the summon's picture) instead.
 */
const MAGICS_WITHOUT_SPRITE = new Set(['ember_spirit_swarm', 'fire_lord_spirit', 'fire_spirit']);

interface Sprite {
  src: string;
  width: number;
  height: number;
}

const getSprite = (bean: string): Sprite | undefined => {
  const gameAsset = magicArtwork[bean]?.gameAsset;
  if (gameAsset) return { src: gameAsset.src, width: gameAsset.width, height: gameAsset.height };
  if (!MAGICS_WITHOUT_SPRITE.has(bean)) {
    // The sprites are at most 256 pixels on a side; CSS sets the drawn size.
    return { src: `/game-assets/${bean.replace(/_/g, '-')}.webp`, width: 256, height: 256 };
  }
  const summonArt = summonConcepts.find((summon) => summon.sourceMagic.slug === bean)?.artwork;
  const concept = magicArtwork[bean]?.concept ?? magicRelatedArtwork[bean]?.[0]?.concept;
  if (concept) return { src: concept.src, ...getConceptArtSize(concept.src) };
  if (summonArt) return { src: summonArt.src, width: summonArt.width, height: summonArt.height };
  return undefined;
};

/* -------------------------------------------------------------------------
   The address is the page's state: /arcane-casters/magic/<slug>?element=&family=.
   Selecting a tile or a filter rewrites it and tells subscribers; the back
   button (popstate) and the navbar (a parent re-render) are read the same way.
   ------------------------------------------------------------------------- */
const LOCATION_EVENT = 'magic-compendium-location';

const subscribeLocation = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener(LOCATION_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(LOCATION_EVENT, onChange);
  };
};

const getLocationSnapshot = () => `${window.location.pathname}${window.location.search}`;

const writeLocation = (path: string, mode: 'push' | 'replace') => {
  if (path === getLocationSnapshot()) return;
  if (mode === 'push') window.history.pushState(null, '', path);
  else window.history.replaceState(null, '', path);
  window.dispatchEvent(new Event(LOCATION_EVENT));
};

const findMagic = (slug?: string) => {
  if (!slug) return undefined;
  let bean = slug;
  try {
    bean = decodeURIComponent(slug);
  } catch {
    // a malformed escape is simply not a known magic
  }
  return magicConcepts.find((magic) => magic.bean === bean);
};

const isElement = (value: string | null): value is MagicElement =>
  magicElements.includes(value as MagicElement);

const isFamily = (value: string | null): value is MagicFamily =>
  families.includes(value as MagicFamily);

/**
 * The query for the list. `family` is the filter the old list had; its other
 * parameters (`faction`, `page`) still load the page but no longer filter.
 */
const buildSearch = (element: MagicElement | '', family: MagicFamily | '') => {
  const query = new URLSearchParams();
  if (element) query.set('element', element);
  if (family) query.set('family', family);
  const text = query.toString();
  return text ? `?${text}` : '';
};

/* -------------------------------------------------------------------------
   Gallery: every picture a magic owns, each file once. The named sections
   (frames, the creatures a magic calls, its accessories) claim their files
   before the summon records do, so a creature such as 화염탄 비행 악마 keeps
   its own titled section.
   ------------------------------------------------------------------------- */
interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  swap?: string;
}

interface GallerySection {
  heading?: string;
  figures: Figure[];
}

// The artwork data carries working notes in its headings ("부속 에셋 · …").
// The page shows only the short label.
const firstLabel = (text: string) => text.split(' · ')[0].trim();
const stripPrefix = (heading: string) => heading.replace(/^(부속 에셋|소환 개체) · /, '');

// Frame captions read "마그마 폭발 · 1단계" or "강타 1 · 구름 밑에 …".
const frameLabel = (caption: string, t: Copy) => {
  for (const part of caption.split(' · ').map((item) => item.trim())) {
    if (part === '대기') return t.idle;
    const strike = /^강타 (\d+)$/.exec(part);
    if (strike) return t.strike(strike[1]);
    const stage = /^(\d+)단계$/.exec(part);
    if (stage) return t.stage(stage[1]);
  }
  return firstLabel(caption);
};

const buildGallery = (bean: string, t: Copy, language: Language): GallerySection[] => {
  const shown = new Set<string>();
  const take = (figures: Figure[]) => figures.filter((figure) => {
    if (shown.has(figure.src)) return false;
    shown.add(figure.src);
    return true;
  });
  const conceptFigure = (art: { src: string; alt: string }): Figure => ({
    src: art.src,
    alt: art.alt,
    ...getConceptArtSize(art.src),
    caption: t.concept,
  });
  const assetFigure = (
    art: { src: string; alt: string; width: number; height: number },
    caption = t.inGame,
  ): Figure => ({ src: art.src, alt: art.alt, width: art.width, height: art.height, caption });

  const own = magicArtwork[bean];
  const hires = hiresArtwork[bean];
  const hiresFigures: Figure[] = hires
    ? [{ src: hires.src, swap: hires.swap, alt: hires.alt[language], width: hires.width, height: hires.height, caption: t.hires }]
    : [];
  const main = take([
    ...hiresFigures,
    ...(own ? [conceptFigure(own.concept), ...(own.gameAsset ? [assetFigure(own.gameAsset)] : [])] : []),
  ]);

  const named: GallerySection[] = [];
  if (own?.sequenceArtwork) {
    named.push({
      heading: t.frames,
      figures: take(own.sequenceArtwork.map((frame) => assetFigure(frame, frameLabel(frame.caption, t)))),
    });
  }

  (magicRelatedArtwork[bean] ?? []).forEach((related) => {
    const figures = [conceptFigure(related.concept)];
    if (related.gameAsset) figures.push(assetFigure(related.gameAsset));
    named.push({ heading: stripPrefix(related.heading), figures: take(figures) });
  });

  (magicAccessoryArtwork[bean] ?? []).forEach((accessory) => {
    named.push({ heading: stripPrefix(accessory.heading), figures: take([assetFigure(accessory)]) });
  });

  summonConcepts
    .filter((summon) => summon.sourceMagic.slug === bean)
    .forEach((summon) => {
      const pictures = [summon.artwork, summon.alternateArtwork, summon.spawnArtwork, ...(summon.supplementaryArtwork ?? [])]
        .filter((art): art is NonNullable<typeof art> => Boolean(art))
        .map((art) => assetFigure(art, art.src.startsWith('/concept-art/') ? t.concept : t.inGame));
      main.push(...take(pictures));
    });

  return [{ figures: main }, ...named].filter((section) => section.figures.length > 0);
};

/* ------------------------------------------------------------------------- */

const MagicDetail: React.FC<{
  magic: MagicConcept;
  listHref: string;
  onBackToList: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}> = ({ magic, listHref, onBackToList }) => {
  const { language } = useLanguage();
  const t = useCopy(copy);
  const data = getMagicGameData(magic.bean);
  const name = getMagicName(magic, language);
  const description = getMagicDescription(magic, language);
  const sprite = getSprite(magic.bean);
  const gallery = buildGallery(magic.bean, t, language);
  const faction = language === 'en' ? magicFactionLabelsEn[magic.faction] ?? magic.faction : magic.faction;
  const elementText = data.elements?.length
    ? data.elements.map((element) => magicElementLabels[language][element]).join(' · ')
    : t.noElement;

  return (
    <>
      <a className="magic-detail-back" href={listHref} onClick={onBackToList}>
        <ArrowLeft size={18} strokeWidth={3} aria-hidden="true" />
        {t.toList}
      </a>

      <header className="magic-detail-head">
        <div className="magic-detail-sprite">
          {sprite && <img alt="" src={sprite.src} width={sprite.width} height={sprite.height} decoding="async" />}
        </div>
        <div className="magic-detail-heading">
          <h2 className="text-title magic-detail-name">{name}</h2>
          <div className="magic-pills">
            {typeof data.manaCost === 'number' && (
              <span className="magic-pill magic-pill-mana">
                <span className="text-outline">{t.mana(data.manaCost)}</span>
              </span>
            )}
            {data.elements?.map((element) => (
              <span className={`magic-pill element-${element.toLowerCase()}`} key={element}>
                {magicElementLabels[language][element]}
              </span>
            ))}
            <span className="magic-pill">{familyLabels[language][magic.family]}</span>
          </div>
        </div>
      </header>

      {description && <p className="magic-detail-description">{description}</p>}

      <dl className="magic-stats">
        <div>
          <dt>{t.element}</dt>
          <dd>{elementText}</dd>
        </div>
        {faction && (
          <div>
            <dt>{t.faction}</dt>
            <dd>{faction}</dd>
          </div>
        )}
      </dl>

      {gallery.length > 0 && (
        <section className="magic-gallery" aria-label={`${name} ${t.artwork}`}>
          {gallery.map((section, index) => (
            <div className="magic-gallery-section" key={section.heading ?? index}>
              {section.heading && <h3>{section.heading}</h3>}
              <div className="magic-gallery-grid">
                {section.figures.map((figure) => (
                  <figure key={figure.src}>
                    {figure.swap ? (
                      <FramePair src={figure.src} swap={figure.swap} alt={figure.alt} width={figure.width} height={figure.height} />
                    ) : (
                      <img
                        alt={figure.alt}
                        decoding="async"
                        height={figure.height}
                        loading="lazy"
                        src={figure.src}
                        width={figure.width}
                      />
                    )}
                    <figcaption>{figure.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

const isPlainClick = (event: React.MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const MagicCompendium: React.FC<MagicCompendiumProps> = () => {
  const { language } = useLanguage();
  const t = useCopy(copy);
  const detailRef = useRef<HTMLElement>(null);
  const scrollToDetail = useRef(false);

  const location = useSyncExternalStore(subscribeLocation, getLocationSnapshot);
  const url = new URL(location, window.location.origin);
  const selected = findMagic(getRouteFromPathname(url.pathname).slug);
  const elementParam = url.searchParams.get('element');
  const familyParam = url.searchParams.get('family');
  const element = isElement(elementParam) ? elementParam : '';
  const family = isFamily(familyParam) ? familyParam : '';
  const search = buildSearch(element, family);

  const filtered = magicConcepts.filter((magic) =>
    (!element || (getMagicGameData(magic.bean).elements ?? []).includes(element)) &&
    (!family || magic.family === family)
  );
  // The desktop layout always shows a detail card; without a slug it shows the
  // first tile. On a phone the card appears only once a magic is selected.
  const shown = selected ?? filtered[0];

  useEffect(() => {
    if (!scrollToDetail.current) return;
    scrollToDetail.current = false;
    if (window.matchMedia('(max-width: 959px)').matches) {
      detailRef.current?.scrollIntoView({ block: 'start' });
    }
  }, [selected]);

  const selectMagic = (event: React.MouseEvent<HTMLAnchorElement>, bean: string) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    scrollToDetail.current = true;
    writeLocation(`${getTabPath('magic', bean)}${search}`, 'push');
  };

  const listHref = `${getTabPath('magic')}${search}`;
  const backToList = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    writeLocation(listHref, 'push');
  };

  const setFilters = (nextElement: MagicElement | '', nextFamily: MagicFamily | '') => {
    const path = selected ? getTabPath('magic', selected.bean) : getTabPath('magic');
    writeLocation(`${path}${buildSearch(nextElement, nextFamily)}`, 'replace');
  };

  return (
    <div className="magic-page">
      <div className="container">
        <header className="magic-page-head">
          <a className="flat-btn flat-btn-primary magic-back-button" href={getTabPath('home')} aria-label={t.back}>
            <ArrowLeft size={28} strokeWidth={3.4} aria-hidden="true" />
          </a>
          <div className="title-banner">
            <h1 className="text-title magic-page-title">{t.title}</h1>
          </div>
        </header>

        <div className={`magic-layout${selected ? ' has-selection' : ''}`}>
          <div className="magic-browser">
            <div className="magic-toolbar" role="group" aria-label={t.filters}>
              <div className="magic-chips">
                <button
                  className="magic-chip magic-chip-all"
                  type="button"
                  aria-pressed={!element}
                  onClick={() => setFilters('', family)}
                >
                  {t.all}
                </button>
                {magicElements.map((item) => (
                  <button
                    className="magic-chip"
                    type="button"
                    aria-pressed={element === item}
                    key={item}
                    onClick={() => setFilters(element === item ? '' : item, family)}
                  >
                    <span className={`magic-dot element-${item.toLowerCase()}`} aria-hidden="true" />
                    {magicElementLabels[language][item]}
                  </button>
                ))}
              </div>
              <label className="magic-select">
                <span className="visually-hidden">{t.family}</span>
                <select
                  value={family}
                  onChange={(event) => setFilters(element, isFamily(event.target.value) ? event.target.value : '')}
                >
                  <option value="">{`${t.family} · ${t.all}`}</option>
                  {families.map((item) => (
                    <option value={item} key={item}>{familyLabels[language][item]}</option>
                  ))}
                </select>
                <ChevronDown size={16} strokeWidth={3} aria-hidden="true" />
              </label>
            </div>

            {filtered.length > 0 ? (
              <ul className="magic-grid" aria-label={t.list}>
                {filtered.map((magic) => {
                  const sprite = getSprite(magic.bean);
                  const isCurrent = magic.bean === shown?.bean;
                  return (
                    <li key={magic.bean}>
                      <a
                        className="tile magic-tile"
                        href={`${getTabPath('magic', magic.bean)}${search}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        onClick={(event) => selectMagic(event, magic.bean)}
                      >
                        {sprite && (
                          <img
                            alt=""
                            decoding="async"
                            height={sprite.height}
                            loading="lazy"
                            src={sprite.src}
                            width={sprite.width}
                          />
                        )}
                        <span className="magic-tile-name">{getMagicName(magic, language)}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="magic-empty">{t.empty}</p>
            )}

            <p className="magic-ai-notice">{aiArtworkNotice[language]}</p>
          </div>

          {shown && (
            <article className="flat-card magic-detail" ref={detailRef}>
              <MagicDetail magic={shown} listHref={listHref} onBackToList={backToList} />
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicCompendium;
