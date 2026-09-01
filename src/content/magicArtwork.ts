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

export interface AccessoryArtwork extends GameAssetArtwork {
  heading: string;
}

export interface RelatedArtwork {
  slug: string;
  heading: string;
  concept: ConceptArtwork;
  gameAsset?: GameAssetArtwork;
}

export interface MagicArtwork {
  concept: ConceptArtwork;
  gameAsset?: GameAssetArtwork;
  sequenceArtwork?: GameAssetArtwork[];
}

export const magicArtwork: Record<string, MagicArtwork> = {
  dimension_toad: {
    concept: {
      src: '/concept-art/dimension-toad.webp',
      alt: '여섯 다리로 차원 풍경을 운반하는 경계 운반자 컨셉 아트',
      caption: '차원 유랑종의 이동하는 세계 조각 · 컨셉 아트',
    },
    gameAsset: {
      src: '/game-assets/dimension-toad.webp',
      alt: '경계 운반자 인게임 스프라이트',
      caption: '경계 운반자 · 인게임 스프라이트',
      width: 768,
      height: 456,
    },
  },
  ember_spirit_swarm: {
    concept: {
      src: '/concept-art/ember-spirit-swarm.webp',
      alt: '지면을 낮게 달리며 불길을 남기는 잿불 척후악마 컨셉 아트',
      caption: '지옥불 군단의 소형 지상 근접 무리 개체 · 컨셉 아트',
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
  },
  fire_lord_spirit: {
    concept: {
      src: '/concept-art/fire-lord-spirit.webp',
      alt: '지옥불 차원의 하늘을 부유하며 하위 악마를 소환하는 거대한 생체 모함 컨셉 아트',
      caption: '지옥불 군단의 공중 소환 모체 · 컨셉 아트',
    },
  },
  evil_ent: {
    concept: {
      src: '/game-assets/evil-ent-idle.webp',
      alt: '오른쪽을 향해 마른 나무 팔을 뻗을 준비를 하는 사악한 나무 골렘',
      caption: '사악한 나무 골렘 · 기본 자세 · 인게임 스프라이트',
    },
    gameAsset: {
      src: '/game-assets/evil-ent-attack.webp',
      alt: '오른쪽으로 긴 나무 팔을 뻗어 공격하는 사악한 나무 골렘',
      caption: '사악한 나무 골렘 · 팔을 뻗은 공격 자세',
      width: 224,
      height: 256,
    },
  },
  chain_lightning: {
    concept: {
      src: '/game-assets/chain-lightning.webp',
      alt: '왼쪽에서 오른쪽으로 굵은 전격 마디가 이어지는 연쇄 번개',
      caption: '연쇄 번개 · 64px 실루엣 검수를 마친 인게임 스프라이트',
    },
  },
  magma_explosion: {
    concept: {
      src: '/game-assets/magma-explosion.webp',
      alt: '검붉은 갑각이 갈라지며 내부 용암광이 솟는 마그마 폭발',
      caption: '마그마 폭발 · 2.5D cut-paper 인게임 스프라이트',
    },
    gameAsset: {
      src: '/game-assets/magma-explosion.webp',
      alt: '마그마 폭발 초기 갑각 프레임',
      caption: '마그마 폭발 · 초기 갑각 프레임',
      width: 217,
      height: 256,
    },
    sequenceArtwork: [1, 2, 3, 4].map((index) => ({
      src: `/game-assets/magma-explosion-strike-${index}.webp`,
      alt: `마그마 폭발 ${index}단계 프레임`,
      caption: `마그마 폭발 · ${index}단계`,
      width: 217,
      height: 256,
    })),
  },
  fire_shot: {
    concept: {
      src: '/game-assets/fire-shot.webp',
      alt: '검붉은 갑각과 중앙 용암 코어로 만든 우측 비행 화염탄',
      caption: '화염탄 · 지옥불 갑각 용암 투사체',
    },
    gameAsset: {
      src: '/game-assets/fire-shot.webp',
      alt: '우측으로 날아가는 갑각 용암 화염탄',
      caption: '화염탄 · 인게임 투사체',
      width: 256,
      height: 88,
    },
  },
  lightning_drop: {
    concept: {
      src: '/concept-art/lightning-cloud-strike-sequence.webp',
      alt: '번개 구름 아래에서 낙뢰가 지면까지 자라는 여섯 단계 연출 시트',
      caption: '번개 투하 · 번개 구름 대기 및 6단계 강타 시퀀스',
    },
    gameAsset: {
      src: '/game-assets/lightning-drop.webp',
      alt: '번개 투하 인게임 스프라이트',
      caption: '번개 투하 · 인게임 스프라이트',
      width: 320,
      height: 640,
    },
    sequenceArtwork: [
      ['lightning-cloud-idle.webp', '번개 구름 · 대기'],
      ['lightning-cloud-strike-0.webp', '강타 1 · 구름 밑에 번개가 돋음'],
      ['lightning-cloud-strike-1.webp', '강타 2 · 번개 줄기가 절반까지 성장'],
      ['lightning-cloud-strike-2.webp', '강타 3 · 번개 줄기가 지면 직전까지 성장'],
      ['lightning-cloud-strike-3.webp', '강타 4 · 지면 도달과 최대 밝기'],
      ['lightning-cloud-strike-4.webp', '강타 5 · 잔광'],
      ['lightning-cloud-strike-5.webp', '강타 6 · 소멸 직전'],
    ].map(([file, caption]) => ({
      src: `/game-assets/${file}`,
      alt: caption,
      caption,
      width: 320,
      height: 640,
    })),
  },
};

export const magicAccessoryArtwork: Record<string, AccessoryArtwork[]> = {
  cloud_dragon: [
    {
      heading: '부속 에셋 · 구형 물 아우라',
      src: '/game-assets/cloud-dragon-water-aura.webp',
      alt: '운룡의 몸 전체를 감싸는 구형 물 아우라',
      caption: '운룡 전용 물 아우라 · 중앙 저밀도 · 본체와 별도 렌더링',
      width: 510,
      height: 512,
    },
  ],
  fire_spirit: [
    {
      heading: '부속 에셋 · 지옥불 오라',
      src: '/game-assets/fire-aura.webp',
      alt: '지옥불 악마 주변을 회전하는 타원형 불 아우라',
      caption: '지옥불 공용 오라 · 대기 맥동과 공격 파동에 사용',
      width: 512,
      height: 295,
    },
  ],
};

export const magicRelatedArtwork: Record<string, RelatedArtwork[]> = {
  dimension_toad: [
    {
      slug: 'fire_tadpole',
      heading: '소환 개체 · 화산편',
      concept: {
        src: '/concept-art/fire-tadpole.webp',
        alt: '내부에 화산 풍경을 품은 소형 차원 파편 화산편 컨셉 아트',
        caption: '차원 유랑종 · 빠른 지상 화염 근접 개체',
      },
      gameAsset: {
        src: '/game-assets/fire-tadpole.webp',
        alt: '화산편 인게임 스프라이트',
        caption: '화산편 · 인게임 스프라이트',
        width: 512,
        height: 240,
      },
    },
    {
      slug: 'lightning_tadpole',
      heading: '소환 개체 · 폭풍편',
      concept: {
        src: '/concept-art/lightning-tadpole.webp',
        alt: '내부에 번개 폭풍을 품은 소형 차원 파편 폭풍편 컨셉 아트',
        caption: '차원 유랑종 · 빠른 지상 번개 근접 개체',
      },
      gameAsset: {
        src: '/game-assets/lightning-tadpole.webp',
        alt: '폭풍편 인게임 스프라이트',
        caption: '폭풍편 · 인게임 스프라이트',
        width: 356,
        height: 512,
      },
    },
  ],
  fire_lord_spirit: [
    {
      slug: 'fire_child_spirit',
      heading: '소환 개체 · 화염탄 비행 악마',
      concept: {
        src: '/concept-art/fire-child-spirit.webp',
        alt: '지옥불 군단장이 방출하는 소형 비행 악마 FireChildSpirit 컨셉 아트',
        caption: '군단장의 하위 개체 · 공중 원거리 공격 악마',
      },
    },
  ],
};
