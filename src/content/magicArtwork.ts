export interface MagicArtwork {
  concept: {
    src: string;
    alt: string;
    caption: string;
  };
  gameAsset: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
}

export const magicArtwork: Record<string, MagicArtwork> = {
  fire_spirit: {
    concept: {
      src: '/concept-art/fire-spirit.webp',
      alt: '오른쪽을 향해 생체 분사구로 잿불을 내뿜는 지옥불 하급 악마 컨셉 아트',
      caption: '지옥불 군단의 지상 범위 공격수 · 컨셉 아트',
    },
    gameAsset: {
      src: '/game-assets/fire-spirit.webp',
      alt: '오른쪽을 향한 45도 시점의 지옥불 하급 악마 인게임 에셋',
      caption: '오른쪽 방향 · 지면 기준 45° · 투명 인게임 에셋',
      width: 768,
      height: 546,
    },
  },
  fire_lord_spirit: {
    concept: {
      src: '/concept-art/fire-lord-spirit.webp',
      alt: '지옥불 차원의 하늘을 부유하며 하위 악마를 소환하는 거대한 생체 모함 컨셉 아트',
      caption: '지옥불 군단의 공중 소환 모체 · 컨셉 아트',
    },
    gameAsset: {
      src: '/game-assets/fire-lord-spirit.webp',
      alt: '오른쪽을 향한 45도 시점의 지옥불 군단장 인게임 에셋',
      caption: '오른쪽 방향 · 지면 기준 45° · 투명 인게임 에셋',
      width: 768,
      height: 512,
    },
  },
};
