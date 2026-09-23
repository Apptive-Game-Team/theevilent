import React from 'react';
import {
  ArrowLeft,
  Castle,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Flame,
  Mountain,
  Orbit,
  Skull,
  TreeDeciduous,
  type LucideIcon,
} from 'lucide-react';
import { magicConcepts, magicFamilyLabels, type MagicConcept } from '../content/magicConcepts';
import { magicAccessoryArtwork, magicArtwork, magicRelatedArtwork } from '../content/magicArtwork';
import { summonConcepts } from '../content/summonConcepts';
import { aiArtworkNoticeKo } from '../content/siteContent';
import { getTabPath } from '../routing';

interface MagicCompendiumProps {
  slug?: string;
}

const PAGE_SIZE = 24;

/**
 * `ConceptArtwork` (the `concept` field on magicArtwork and magicRelatedArtwork
 * entries) carries no width/height — only gameAsset-shaped fields do. These are
 * the real pixel sizes of every file in public/concept-art, read once with
 * Pillow, so every <img> can still report an intrinsic size and reserve its
 * box before the file loads. The fallback matches the 3:2 box the CSS already
 * gives .magic-concept-art img via aspect-ratio.
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
 * getCardArtwork can return a sprite that already carries real width/height
 * (the summon-fallback branch) or a bare ConceptArtwork that does not. Use the
 * real size when it is already there; only fall back to the concept-art table
 * for the branches that lack one.
 */
const getCardArtworkSize = (art: { src: string; width?: number; height?: number }) =>
  typeof art.width === 'number' && typeof art.height === 'number'
    ? { width: art.width, height: art.height }
    : getConceptArtSize(art.src);

const getCardArtwork = (bean: string) => {
  const directArtwork = magicArtwork[bean]?.concept;
  if (directArtwork) return directArtwork;

  const summonArtwork = summonConcepts.find((summon) => summon.sourceMagic.slug === bean)?.artwork;
  if (summonArtwork) return summonArtwork;

  return magicRelatedArtwork[bean]?.[0]?.concept;
};

const getQuery = () => new URLSearchParams(window.location.search);

const makeListHref = (changes: Record<string, string | null>) => {
  const query = getQuery();
  Object.entries(changes).forEach(([key, value]) => {
    if (value) query.set(key, value);
    else query.delete(key);
  });
  const suffix = query.toString();
  return `${getTabPath('magic')}${suffix ? `?${suffix}` : ''}`;
};

const factionIcon = (faction: string): LucideIcon => {
  if (faction.includes('세계수')) return TreeDeciduous;
  if (faction.includes('타락')) return Skull;
  if (faction.includes('지옥불')) return Flame;
  if (faction.includes('물')) return Droplets;
  if (faction.includes('돌')) return Mountain;
  if (faction.includes('인간')) return Castle;
  return Orbit;
};

const FilterRow: React.FC<{
  label: string;
  param: string;
  active: string;
  values: string[];
  labels?: Record<string, string>;
}> = ({ label, param, active, values, labels }) => (
  <div className="magic-filter-row">
    <strong>{label}</strong>
    <a className={!active ? 'is-active' : ''} href={makeListHref({ [param]: null, page: null })}>전체</a>
    {values.map((value) => (
      <a
        className={active === value ? 'is-active' : ''}
        href={makeListHref({ [param]: value, page: null })}
        key={value}
      >
        {labels?.[value] ?? value}
      </a>
    ))}
  </div>
);

interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  isConcept: boolean;
}

interface GallerySection {
  heading?: string;
  figures: Figure[];
}

// The artwork data carries working notes in its captions and headings
// ("부속 에셋 · …", "0.28초 표시", "별도 생물 아님"). The page shows only the
// short label in front of the first " · ".
const firstLabel = (text: string) => text.split(' · ')[0].trim();
const stripPrefix = (heading: string) => heading.replace(/^(부속 에셋|소환 개체) · /, '');

// Frame captions read "마그마 폭발 · 1단계" or "강타 1 · 구름 밑에 …"; keep the
// part that names the frame.
const frameLabel = (caption: string) =>
  caption.split(' · ').find((part) => /^(대기|강타 \d+|\d+단계)$/.test(part.trim()))?.trim() ?? firstLabel(caption);

const conceptFigure = (art: { src: string; alt: string }): Figure => ({
  ...art,
  ...getConceptArtSize(art.src),
  caption: '컨셉 아트',
  isConcept: true,
});

const assetFigure = (
  art: { src: string; alt: string; width: number; height: number },
  caption = '게임 속 모습',
): Figure => ({ ...art, caption, isConcept: false });

/**
 * Every picture a magic owns, in the order the page shows them. The summon
 * compendium was folded into this page, so the poses and remains that only a
 * summon record carried are appended to the main gallery.
 *
 * A file is shown once. The named sections (frames, the creatures a magic
 * calls, its accessories) claim their files before the summon records do, so
 * a creature such as 화염탄 비행 악마 keeps its own titled section instead of
 * being absorbed into the main gallery and leaving that section empty.
 */
const buildGallery = (bean: string): GallerySection[] => {
  const shown = new Set<string>();
  const take = (figures: Figure[]) => figures.filter((figure) => {
    if (shown.has(figure.src)) return false;
    shown.add(figure.src);
    return true;
  });

  const own = magicArtwork[bean];
  const main = take(own
    ? [conceptFigure(own.concept), ...(own.gameAsset ? [assetFigure(own.gameAsset)] : [])]
    : []);

  const named: GallerySection[] = [];
  if (own?.sequenceArtwork) {
    named.push({
      heading: '단계별 모습',
      figures: take(own.sequenceArtwork.map((frame) => assetFigure(frame, frameLabel(frame.caption)))),
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
        .map((art) => {
          const isConcept = art.src.startsWith('/concept-art/');
          return {
            ...art,
            caption: art.caption ? firstLabel(art.caption) : isConcept ? '컨셉 아트' : '게임 속 모습',
            isConcept,
          };
        });
      main.push(...take(pictures));
    });

  return [{ figures: main }, ...named].filter((section) => section.figures.length > 0);
};

const MagicDetail: React.FC<{ magic: MagicConcept }> = ({ magic }) => {
  const gallery = buildGallery(magic.bean);

  return (
    <article className="magic-detail-page">
      <div className="container">
        <a className="magic-back-link" href={getTabPath('magic')}>
          <ArrowLeft size={17} aria-hidden="true" />
          목록으로
        </a>

        <header className="magic-detail-hero">
          <div className="magic-faction-emblem" aria-hidden="true">
            {React.createElement(factionIcon(magic.faction))}
          </div>
          <div>
            <p className="magic-kicker">
              {magicFamilyLabels[magic.family]}
              {magic.faction && ` · ${magic.faction}`}
            </p>
            <h1>{magic.name}</h1>
          </div>
        </header>

        {magic.description && <p className="lede magic-detail-description">{magic.description}</p>}

        {gallery.length > 0 && <p className="magic-ai-notice">{aiArtworkNoticeKo}</p>}

        {gallery.map((section, index) => (
          <section className="magic-related-artwork" key={section.heading ?? index}>
            {section.heading && <h2>{section.heading}</h2>}
            <div className="magic-artwork-gallery" aria-label={section.heading ?? `${magic.name} 그림`}>
              {section.figures.map((figure, figureIndex) => (
                <figure className={figure.isConcept ? 'magic-concept-art' : 'magic-game-asset'} key={figure.src}>
                  <img
                    alt={figure.alt}
                    decoding="async"
                    fetchPriority={index === 0 && figureIndex === 0 ? 'high' : undefined}
                    height={figure.height}
                    loading={index === 0 && figureIndex === 0 ? undefined : 'lazy'}
                    src={figure.src}
                    width={figure.width}
                  />
                  <figcaption>{figure.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};

const MagicCompendium: React.FC<MagicCompendiumProps> = ({ slug }) => {
  if (slug) {
    const magic = magicConcepts.find((item) => item.bean === slug);
    if (magic) return <MagicDetail magic={magic} />;
  }

  const query = getQuery();
  const family = query.get('family') ?? '';
  const faction = query.get('faction') ?? '';
  const requestedPage = Number.parseInt(query.get('page') ?? '1', 10);

  const filtered = magicConcepts.filter((magic) =>
    (!family || magic.family === family) &&
    (!faction || magic.faction === faction)
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1;
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const factions = [...new Set(magicConcepts.map((magic) => magic.faction).filter(Boolean))].sort();

  return (
    <div className="magic-compendium-page">
      <header className="magic-compendium-hero">
        <div className="container">
          <h1>마법 도감</h1>
        </div>
      </header>

      <main className="container magic-compendium-content">
        <section className="magic-filter-panel" aria-label="마법 필터">
          <FilterRow label="타입" param="family" active={family} values={Object.keys(magicFamilyLabels)} labels={magicFamilyLabels} />
          <FilterRow label="진영" param="faction" active={faction} values={factions} />
        </section>

        <p className="magic-ai-notice">{aiArtworkNoticeKo}</p>

        <section className="magic-card-grid" aria-label="마법 목록">
          {pageItems.map((magic) => {
            const cardArtwork = getCardArtwork(magic.bean);
            return (
              <a
                className={`magic-concept-card${cardArtwork ? ' has-thumbnail' : ''}`}
                href={getTabPath('magic', magic.bean)}
                key={magic.bean}
              >
                {cardArtwork && (
                  <div className="magic-card-thumbnail">
                    <img
                      alt={cardArtwork.alt}
                      decoding="async"
                      height={getCardArtworkSize(cardArtwork).height}
                      loading="lazy"
                      src={cardArtwork.src}
                      width={getCardArtworkSize(cardArtwork).width}
                    />
                  </div>
                )}
                <div className="magic-card-tags">
                  <span>{magicFamilyLabels[magic.family]}</span>
                  {magic.faction && <span>{magic.faction}</span>}
                </div>
                <h2>{magic.name}</h2>
                {magic.description && <p>{magic.description}</p>}
              </a>
            );
          })}
        </section>

        {pageCount > 1 && (
          <nav className="magic-pagination" aria-label="마법 목록 페이지">
            {page > 1 && (
              <a href={makeListHref({ page: String(page - 1) })}>
                <ChevronLeft size={17} aria-hidden="true" /> 이전
              </a>
            )}
            <span>{page} / {pageCount}</span>
            {page < pageCount && (
              <a href={makeListHref({ page: String(page + 1) })}>
                다음 <ChevronRight size={17} aria-hidden="true" />
              </a>
            )}
          </nav>
        )}
      </main>
    </div>
  );
};

export default MagicCompendium;
