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
  chicken_commando: {
    concept: {
      src: '/concept-art/chicken-commando.webp',
      alt: '낙하산 전개 상태와 지상 전투 상태로 나뉜 인간 깃털 특공대 컨셉 아트',
      caption: '인간 마법 문명의 공수 전투원 · 2상태 컨셉 아트',
    },
    gameAsset: {
      src: '/game-assets/chicken-commando.webp',
      alt: '낙하산을 펼친 공중 프레임과 낙하산 없는 지상 프레임 인게임 에셋',
      caption: '공중 낙하산 프레임 · 지상 전투 프레임',
      width: 900,
      height: 520,
    },
  },
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
