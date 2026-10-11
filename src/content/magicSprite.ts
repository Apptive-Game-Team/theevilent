import { magicArtwork, magicRelatedArtwork } from './magicArtwork';
import { summonConcepts } from './summonConcepts';

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

export const getConceptArtSize = (src: string) =>
  CONCEPT_ART_SIZES[src.split('/').pop() ?? ''] ?? { width: 1200, height: 800 };

/**
 * Three magics have no in-game sprite in public/game-assets; their tile shows
 * the concept art (or the summon's picture) instead.
 */
const MAGICS_WITHOUT_SPRITE = new Set(['ember_spirit_swarm', 'fire_lord_spirit', 'fire_spirit']);

export interface Sprite {
  src: string;
  width: number;
  height: number;
}

export const getSprite = (bean: string): Sprite | undefined => {
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
