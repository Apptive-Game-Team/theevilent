interface ConceptArtwork {
  src: string;
  alt: string;
  caption: string;
}

interface GameAssetArtwork {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface RelatedArtwork {
  heading: string;
  concept: ConceptArtwork;
  gameAsset: GameAssetArtwork;
}

export interface MagicArtwork {
  concept: ConceptArtwork;
  gameAsset: GameAssetArtwork;
  related?: RelatedArtwork[];
}

export const magicArtwork: Record<string, MagicArtwork> = {
  ember_spirit_swarm: {
    concept: {
      src: '/concept-art/ember-spirit-swarm.webp',
      alt: '지면을 낮게 달리며 불길을 남기는 잿불 척후악마 컨셉 아트',
      caption: '지옥불 군단의 소형 지상 근접 무리 개체 · 컨셉 아트',
    },
    gameAsset: {
      src: '/game-assets/ember-spirit-swarm.webp',
      alt: '오른쪽을 향한 45도 시점의 잿불 척후악마 인게임 에셋',
      caption: '우측 방향 · 지상 근접 공격 · 이동 경로 불 장판',
      width: 128,
      height: 78,
    },
  },
  chicken_commando: {
    concept: {
      src: '/concept-art/chicken-commando.webp',
      alt: '낙하산 전개 상태와 지상 전투 상태로 나뉜 인간 비전 강하대 컨셉 아트',
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
    related: [
      {
        heading: '소환 개체 · 화염탄 비행 악마',
        concept: {
          src: '/concept-art/fire-child-spirit.webp',
          alt: '지옥불 군단장이 방출하는 소형 비행 악마 FireChildSpirit 컨셉 아트',
          caption: '군단장의 하위 개체 · 공중 원거리 공격 악마',
        },
        gameAsset: {
          src: '/game-assets/fire-child-spirit.webp',
          alt: '오른쪽을 향한 45도 시점의 FireChildSpirit 인게임 에셋',
          caption: '화염탄 공격 · 지상 및 공중 표적 · 소형 128px',
          width: 114,
          height: 128,
        },
      },
    ],
  },
};
