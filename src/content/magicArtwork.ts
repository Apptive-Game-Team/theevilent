export interface MagicArtwork {
  src: string;
  alt: string;
  caption: string;
}

export const magicArtwork: Record<string, MagicArtwork> = {
  fire_lord_spirit: {
    src: '/concept-art/fire-lord-spirit.webp',
    alt: '지옥불 차원의 하늘을 부유하며 하위 악마를 소환하는 거대한 생체 모함',
    caption: '지옥불 군단의 공중 소환 모체 · 컨셉 아트',
  },
};
