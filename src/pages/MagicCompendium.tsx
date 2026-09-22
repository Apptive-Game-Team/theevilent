import React from 'react';
import {
  ArrowLeft,
  Castle,
  ChevronLeft,
  ChevronRight,
  Compass,
  Crosshair,
  Droplets,
  Feather,
  Flame,
  Leaf,
  Mountain,
  Orbit,
  Shield,
  Sparkles,
  Wind,
  Zap,
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
  if (faction.includes('지옥불')) return Flame;
  if (faction.includes('물')) return Droplets;
  if (faction.includes('돌')) return Mountain;
  if (faction.includes('전기')) return Zap;
  if (faction.includes('풀')) return Leaf;
  if (faction.includes('바람')) return Wind;
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

const MagicDetail: React.FC<{ magic: MagicConcept }> = ({ magic }) => {
  const artwork = magicArtwork[magic.bean];
  const accessoryArtwork = magicAccessoryArtwork[magic.bean] ?? [];
  const relatedArtwork = magicRelatedArtwork[magic.bean] ?? [];
  const linkedSummons = summonConcepts.filter((summon) => summon.sourceMagic.slug === magic.bean);

  return (
    <article className="magic-detail-page">
    <div className="container">
      <a className="magic-back-link" href={getTabPath('magic')}>
        <ArrowLeft size={17} aria-hidden="true" />
        마법 도감으로
      </a>

      <header className="magic-detail-hero">
        <div className="magic-faction-emblem" aria-hidden="true">
          {React.createElement(factionIcon(magic.faction))}
        </div>
        <div>
          <p className="magic-kicker">{magicFamilyLabels[magic.family]} · {magic.faction}</p>
          <h1>{magic.concept_name}</h1>
          {magic.concept_name !== magic.korean && <p className="magic-legacy-name">기존 이름 · {magic.korean}</p>}
        </div>
      </header>

      {artwork && (
        <>
        <p className="magic-ai-notice">{aiArtworkNoticeKo}</p>
        <section className="magic-artwork-gallery" aria-label="컨셉 및 인게임 아트">
          <figure className="magic-concept-art">
            <img
              alt={artwork.concept.alt}
              decoding="async"
              fetchPriority="high"
              height={getConceptArtSize(artwork.concept.src).height}
              src={artwork.concept.src}
              width={getConceptArtSize(artwork.concept.src).width}
            />
            <figcaption>{artwork.concept.caption}</figcaption>
          </figure>
          {artwork.gameAsset && <figure className="magic-game-asset">
            <img
              alt={artwork.gameAsset.alt}
              decoding="async"
              height={artwork.gameAsset.height}
              loading="lazy"
              src={artwork.gameAsset.src}
              width={artwork.gameAsset.width}
            />
            <figcaption>{artwork.gameAsset.caption}</figcaption>
          </figure>}
        </section>
        {artwork.sequenceArtwork && (
          <section className="magic-related-artwork">
            <h2>번개 구름 · 대기 및 강타 프레임</h2>
            <div className="magic-artwork-gallery" aria-label="번개 구름 대기 및 강타 프레임">
              {artwork.sequenceArtwork.map((frame) => (
                <figure className="magic-game-asset" key={frame.src}>
                  <img
                    alt={frame.alt}
                    decoding="async"
                    height={frame.height}
                    loading="lazy"
                    src={frame.src}
                    width={frame.width}
                  />
                  <figcaption>{frame.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {relatedArtwork.map((related) => (
          <section className="magic-related-artwork" key={related.heading}>
            <h2><a className="summon-relation-link" href={getTabPath('summons', related.slug)}>{related.heading}</a></h2>
            <div className="magic-artwork-gallery" aria-label={`${related.heading} 컨셉 및 인게임 아트`}>
              <figure className="magic-concept-art">
                <img
                  alt={related.concept.alt}
                  decoding="async"
                  height={getConceptArtSize(related.concept.src).height}
                  loading="lazy"
                  src={related.concept.src}
                  width={getConceptArtSize(related.concept.src).width}
                />
                <figcaption>{related.concept.caption}</figcaption>
              </figure>
              {related.gameAsset && <figure className="magic-game-asset">
                <img
                  alt={related.gameAsset.alt}
                  decoding="async"
                  height={related.gameAsset.height}
                  loading="lazy"
                  src={related.gameAsset.src}
                  width={related.gameAsset.width}
                />
                <figcaption>{related.gameAsset.caption}</figcaption>
              </figure>}
            </div>
          </section>
        ))}
        </>
      )}

      {!artwork && relatedArtwork.map((related) => (
        <section className="magic-related-artwork" key={related.heading}>
          <h2><a className="summon-relation-link" href={getTabPath('summons', related.slug)}>{related.heading}</a></h2>
          <div className="magic-artwork-gallery" aria-label={`${related.heading} 컨셉 아트`}>
            <figure className="magic-concept-art">
              <img
                alt={related.concept.alt}
                decoding="async"
                height={getConceptArtSize(related.concept.src).height}
                loading="lazy"
                src={related.concept.src}
                width={getConceptArtSize(related.concept.src).width}
              />
              <figcaption>{related.concept.caption}</figcaption>
            </figure>
          </div>
        </section>
      ))}

      {accessoryArtwork.map((accessory) => (
        <section className="magic-related-artwork" key={accessory.heading}>
          <h2>{accessory.heading}</h2>
          <div className="magic-artwork-gallery" aria-label={accessory.heading}>
            <figure className="magic-game-asset">
              <img
                alt={accessory.alt}
                decoding="async"
                height={accessory.height}
                loading="lazy"
                src={accessory.src}
                width={accessory.width}
              />
              <figcaption>{accessory.caption}</figcaption>
            </figure>
          </div>
        </section>
      ))}

      {linkedSummons.length > 0 && (
        <section className="magic-lore-panel">
          <p className="magic-section-label">SUMMONED CREATURES</p>
          <h2>연관 소환수</h2>
          <ul>
            {linkedSummons.map((summon) => (
              <li key={summon.slug}>
                <a className="summon-relation-link" href={getTabPath('summons', summon.slug)}>
                  {summon.name} · {summon.role}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="magic-lore-panel">
        <p className="magic-section-label">ARCANE RECORD</p>
        <h2>컨셉 설명</h2>
        <p>{magic.concept_description}</p>
      </section>

      <section className="magic-profile-grid" aria-label="전투 프로필">
        {[
          ['기동 방식', magic.mobility, Feather],
          ['전투 역할', magic.combat_role, Shield],
          ['공격 형태', magic.attack_shape, Crosshair],
          ['표적', magic.targeting, Compass],
          ['특수 행동', magic.special_movement, Sparkles],
          ['생명주기', magic.lifecycle, Shield],
        ].map(([label, value, Icon]) => {
          const ProfileIcon = Icon as typeof Feather;
          return (
            <article key={label as string}>
              <ProfileIcon size={18} aria-hidden="true" />
              <span>{label as string}</span>
              <strong>{value as string}</strong>
            </article>
          );
        })}
      </section>

      <div className="magic-detail-columns">
        <section className="magic-behavior-panel">
          <p className="magic-section-label">FIELD BEHAVIOR</p>
          <h2>전장 동작</h2>
          <ol>
            {magic.behavior.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>
        <section className="magic-art-panel">
          <p className="magic-section-label">VISUAL LANGUAGE</p>
          <h2>아트 방향</h2>
          <p>{magic.art_rule}</p>
          <ul>
            <li>2.5D 컷페이퍼</li>
            <li>동작이 먼저 읽히는 실루엣</li>
            <li>진영별 재질과 색 분리</li>
          </ul>
        </section>
      </div>

      <p className="magic-key" translate="no">ARCANE KEY · {magic.bean}</p>
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
  const factions = [...new Set(magicConcepts.map((magic) => magic.faction))].sort();

  return (
    <div className="magic-compendium-page">
      <header className="magic-compendium-hero">
        <div className="container magic-compendium-hero-grid">
          <div>
            <p className="magic-kicker">ARCANE CASTERS · SPELL ARCHIVE</p>
            <h1>마법<br /><span>컨셉 도감</span></h1>
          </div>
          <div className="magic-compendium-intro">
            <p>워드가 남긴 카드의 흔적과 전장 기록을 엮은 {magicConcepts.length}개 마법 아카이브.</p>
            <dl>
              <div><dt>기록</dt><dd>{magicConcepts.length}</dd></div>
              <div><dt>진영</dt><dd>{factions.length}</dd></div>
              <div><dt>시전 방식</dt><dd>5</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <main className="container magic-compendium-content">
        <section className="magic-filter-panel" aria-label="마법 필터">
          <FilterRow label="시전 방식" param="family" active={family} values={Object.keys(magicFamilyLabels)} labels={magicFamilyLabels} />
          <FilterRow label="진영" param="faction" active={faction} values={factions} />
        </section>

        <div className="magic-result-meta" aria-live="polite">
          <span>{filtered.length}개 기록</span>
          <span>{page} / {pageCount} 페이지</span>
        </div>

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
                <span>{magic.mobility}</span>
              </div>
              <h2>{magic.concept_name}</h2>
              {magic.concept_name !== magic.korean && <p className="magic-card-legacy">{magic.korean}</p>}
              <p>{magic.concept_description}</p>
              <strong>{magic.combat_role} · {magic.attack_shape}</strong>
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
