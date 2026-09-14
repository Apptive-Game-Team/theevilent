export interface SummonConcept {
  slug: string;
  name: string;
  internalName: string;
  faction: string;
  role: string;
  mobility: string;
  targeting: string;
  lifecycle: string;
  description: string;
  sourceMagic: {
    slug: string;
    name: string;
  };
  artwork: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
  alternateArtwork?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  spawnArtwork?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  supplementaryArtwork?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  }[];
}

export const summonConcepts: SummonConcept[] = [
  {
    slug: 'evil_ent',
    name: '사악한 나무 골렘',
    internalName: 'EvilEnt',
    faction: '타락한 정령',
    role: '지상 원거리 공격·끌어당김 연계',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: 'HP 소진 시 파괴',
    description: '지옥불 차원의 영향을 오래 받아 수분이 마르고 숯빛으로 타락한 세계수 정령이다. 사거리 안의 적에게 나무 팔을 뻗고, 주기적으로 가벼운 적을 끌어당겨 불타는 주먹으로 마무리한다.',
    sourceMagic: { slug: 'evil_ent', name: '사악한 나무 골렘' },
    artwork: {
      src: '/game-assets/evil-ent-idle.webp',
      alt: '오른쪽을 향해 마른 나무 팔을 뻗을 준비를 하는 사악한 나무 골렘',
      width: 224,
      height: 256,
      caption: '기본 자세 · 마른 숯빛 목질과 내부 지옥불 균열',
    },
    alternateArtwork: {
      src: '/game-assets/evil-ent-attack.webp',
      alt: '오른쪽으로 긴 나무 팔을 뻗어 공격하는 사악한 나무 골렘',
      width: 224,
      height: 256,
      caption: '공격 자세 · 팔을 뻗은 0.1초 프레임',
    },
  },
  {
    slug: 'magma_spirit',
    name: '용암 갑각 악마',
    internalName: 'MagmaSpirit',
    faction: '지옥불 군단',
    role: '지상 소환형 범위 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: 'HP 소진 시 파괴',
    description: '불·바위 속성을 함께 지닌 중형 악마다. 소환될 때 지면을 찢고 올라온 뒤 선 자세로 대기한다. 공격 순간 한 팔을 지면으로 내려쳐 표적 위치에 용암 주먹을 생성하며, 본체 주변에도 1초 간격 화상 영역을 유지한다.',
    sourceMagic: { slug: 'magma_spirit', name: '용암 갑각 악마' },
    artwork: {
      src: '/concept-art/magma-spirit-idle.webp',
      alt: '양팔로 지면을 짚고 오른쪽을 노려보는 용암 갑각 악마',
      width: 789,
      height: 788,
      caption: '기본 자세 · 양팔을 내리고 선 대기 프레임',
    },
    alternateArtwork: {
      src: '/concept-art/magma-spirit-attack.webp',
      alt: '오른쪽 주먹으로 지면을 내려찍는 용암 갑각 악마',
      width: 672,
      height: 680,
      caption: '공격 자세 · 한 팔을 지면으로 내리치는 프레임',
    },
    spawnArtwork: {
      src: '/concept-art/magma-spirit-spawn.webp',
      alt: '바닥을 찢고 상반신부터 올라오는 용암 갑각 악마',
      width: 820,
      height: 650,
      caption: '소환 자세 · 지면 돌파 후 0.28초 표시',
    },
  },
  {
    slug: 'aqua_archer',
    name: '물결 궁수',
    internalName: 'AquaArcher',
    faction: '물 슬라임',
    role: '지상 원거리 공격',
    mobility: '지상 이동',
    targeting: '지상·공중',
    lifecycle: 'HP 소진 시 파괴',
    description: '활을 다루는 물 슬라임 전투원이다. 평상시 시위를 당긴 채 대기하고, 공격 순간 시위를 놓은 프레임으로 0.08초 교체해 화살 발사를 읽히게 한다.',
    sourceMagic: { slug: 'aqua_archer', name: '물결 궁수' },
    artwork: {
      src: '/concept-art/aqua-archer-drawn.webp',
      alt: '활시위를 당긴 채 오른쪽을 겨누는 물결 궁수',
      width: 856,
      height: 866,
      caption: '기본 자세 · 활시위를 당긴 대기 프레임',
    },
    alternateArtwork: {
      src: '/concept-art/aqua-archer-release.webp',
      alt: '화살을 발사해 활시위를 놓은 물결 궁수',
      width: 804,
      height: 866,
      caption: '공격 자세 · 활시위를 놓은 0.08초 프레임',
    },
  },
  {
    slug: 'fire_child_spirit',
    name: '화염탄 비행 악마',
    internalName: 'FireChildSpirit',
    faction: '지옥불 군단',
    role: '공중 원거리 공격',
    mobility: '공중 이동',
    targeting: '지상·공중',
    lifecycle: '군단장 1기당 최대 5기',
    description: '지옥불 군단장이 5초마다 방출하는 소형 비행 악마다. 안전거리에서 지상과 공중 표적을 추적하고 화염탄을 발사한다.',
    sourceMagic: { slug: 'fire_lord_spirit', name: '지옥불 군단장' },
    artwork: {
      src: '/concept-art/fire-child-spirit.webp',
      alt: '지옥불 군단장이 방출하는 화염탄 비행 악마 컨셉 아트',
      width: 810,
      height: 912,
    },
  },
  {
    slug: 'fire_lord_spirit',
    name: '지옥불 군단장',
    internalName: 'FireLordSpirit',
    faction: '지옥불 군단',
    role: '공중 하위 악마 소환',
    mobility: '공중 부유',
    targeting: '소환 지점',
    lifecycle: 'HP 소진 시 파괴',
    description: '전장 상공에서 안전거리를 유지하는 거대 악마 생체 모함이다. 직접 공격하지 않고 5초마다 하위 비행 악마를 1기씩, 최대 5기 방출한다.',
    sourceMagic: { slug: 'fire_lord_spirit', name: '지옥불 군단장' },
    artwork: {
      src: '/concept-art/fire-lord-spirit.webp',
      alt: '하위 비행 악마를 방출하는 거대한 지옥불 생체 모함 컨셉 아트',
      width: 1536,
      height: 1024,
    },
  },
  {
    slug: 'ember_spirit',
    name: '잿불 척후악마',
    internalName: 'EmberSpirit',
    faction: '지옥불 군단',
    role: '지상 근접 무리 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '무리 마법으로 복수 소환',
    description: '낮고 빠르게 돌진하는 소형 악마다. 근접 공격을 수행하며 이동 경로에 1초 간격으로 불 장판을 남긴다.',
    sourceMagic: { slug: 'ember_spirit_swarm', name: '잿불 악마 무리' },
    artwork: {
      src: '/concept-art/ember-spirit-swarm.webp',
      alt: '잿불 척후악마 컨셉 아트',
      width: 770,
      height: 472,
    },
  },
  {
    slug: 'fire_tadpole',
    name: '화산편',
    internalName: 'FireTadpole',
    faction: '차원 유랑종',
    role: '빠른 화염 근접 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '시간 경과 후 소멸',
    description: '화산 차원의 풍경을 내부에 품은 독립적인 소형 세계 파편이다. 빠르게 지상을 이동해 적에게 화염 근접 공격을 가한다.',
    sourceMagic: { slug: 'dimension_toad', name: '경계 운반자' },
    artwork: {
      src: '/concept-art/fire-tadpole.webp',
      alt: '내부에 화산 풍경을 품은 소형 차원 파편 화산편 컨셉 아트',
      width: 1774,
      height: 887,
    },
    alternateArtwork: {
      src: '/game-assets/fire-tadpole.webp',
      alt: '화산편 인게임 스프라이트',
      width: 512,
      height: 240,
      caption: '화산편 · 인게임 스프라이트',
    },
  },
  {
    slug: 'lightning_tadpole',
    name: '폭풍편',
    internalName: 'LightningTadpole',
    faction: '차원 유랑종',
    role: '빠른 번개 근접 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '시간 경과 후 소멸',
    description: '폭풍 차원의 풍경을 내부에 품은 독립적인 소형 세계 파편이다. 빠르게 지상을 이동해 적에게 번개 근접 공격을 가한다.',
    sourceMagic: { slug: 'dimension_toad', name: '경계 운반자' },
    artwork: {
      src: '/concept-art/lightning-tadpole.webp',
      alt: '내부에 번개 폭풍을 품은 소형 차원 파편 폭풍편 컨셉 아트',
      width: 1774,
      height: 887,
    },
    alternateArtwork: {
      src: '/game-assets/lightning-tadpole.webp',
      alt: '폭풍편 인게임 스프라이트',
      width: 356,
      height: 512,
      caption: '폭풍편 · 인게임 스프라이트',
    },
  },
  {
    slug: 'dimension_toad',
    name: '경계 운반자',
    internalName: 'DimensionToad',
    faction: '차원 유랑종',
    role: '세계 파편 교대 소환',
    mobility: '여섯 다리 지상 도주',
    targeting: '지상 위협 감지',
    lifecycle: 'HP 소진 시 파괴',
    description: '여섯 다리로 움직이며 몸 안에 다른 차원의 풍경을 운반하는 거대 세계 조각이다. 직접 공격하지 않고 위협에서 물러나며, 화산편과 폭풍편을 10초마다 번갈아 제한 없이 소환한다.',
    sourceMagic: { slug: 'dimension_toad', name: '경계 운반자' },
    artwork: {
      src: '/concept-art/dimension-toad.webp',
      alt: '여섯 다리로 차원 풍경을 운반하는 경계 운반자 컨셉 아트',
      width: 1774,
      height: 887,
    },
    alternateArtwork: {
      src: '/game-assets/dimension-toad.webp',
      alt: '경계 운반자 인게임 스프라이트',
      width: 768,
      height: 456,
      caption: '경계 운반자 · 인게임 스프라이트',
    },
  },
  {
    slug: 'rock_golem',
    name: '이끼바위 골렘',
    internalName: 'RockGolem',
    faction: '돌 골렘 부족',
    role: '지상 근접 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '사망 시 20초간 바위 잔해 유지',
    description: '따뜻한 바위와 이끼로 이루어진 독립 부족의 근접 전사다. 사망하면 움직임과 공격 능력이 없는 바위 잔해를 남겨 20초간 지상 이동을 막는다.',
    sourceMagic: { slug: 'rock_golem', name: '이끼바위 골렘' },
    artwork: {
      src: '/concept-art/rock-golem.webp',
      alt: '따뜻한 탄색 석재와 이끼로 이루어진 이끼바위 골렘 컨셉 아트',
      width: 1254,
      height: 1254,
      caption: '기본 자세 · 따뜻한 석재와 이끼 재질',
    },
    alternateArtwork: {
      src: '/game-assets/rock-golem-attack.webp',
      alt: '팔을 휘두르는 이끼바위 골렘 공격 인게임 스프라이트',
      width: 768,
      height: 732,
      caption: '공격 자세 · 인게임 스프라이트',
    },
    supplementaryArtwork: [
      {
        src: '/game-assets/rock-remnant.webp',
        alt: '이끼바위 골렘 사망 후 남는 바위 잔해 인게임 스프라이트',
        width: 384,
        height: 267,
        caption: '사망 잔해 · 20초간 지상 이동 방해 · 별도 생물 아님',
      },
    ],
  },
  {
    slug: 'water_slime',
    name: '물방울 생존자',
    internalName: 'WaterSlime',
    faction: '물 슬라임',
    role: '지상 원거리 무리 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: 'HP 소진 시 파괴',
    description: '멸망에서 살아남은 온건한 물 슬라임 무리다. 이동 경로에 물 지대를 남기고 지상 적에게 물을 뱉어 원거리 공격한다. 물 지대는 독립 소환수가 아니다.',
    sourceMagic: { slug: 'water_slime_swarm', name: '물방울 생존자 무리' },
    artwork: {
      src: '/concept-art/water-slime.webp',
      alt: '반투명 물질 종이층과 둥근 몸체를 지닌 물방울 생존자 컨셉 아트',
      width: 1254,
      height: 1254,
      caption: '기본 자세 · 반투명 물질 종이층',
    },
    alternateArtwork: {
      src: '/game-assets/water-slime-attack.webp',
      alt: '물을 뱉어 공격하는 물방울 생존자 인게임 스프라이트',
      width: 549,
      height: 318,
      caption: '원거리 공격 자세 · 물 뱉기 인게임 스프라이트',
    },
  },
  {
    slug: 'sea_serpent',
    name: '심해 뱀',
    internalName: 'SeaSerpent',
    faction: '귀속 미정',
    role: '전투 개체',
    mobility: '이동 없음',
    targeting: '지상·공중',
    lifecycle: '소스에서 시간 제한을 직접 확인하지 못함',
    description: '심해 뱀은 귀속 미정의 소환 마법이다. 소스에서 지속 이동 AI를 확인하지 못했다. 전투에서는 전투 개체 역할을 맡으며, 지상·공중 대상을 직접 공격 없음 또는 별도 효과 방식으로 다룬다. 특수 행동으로 이동 경로에 원소 장판 생성을 수행한다. 시각적으로는 기존 세계관만으로 귀속을 확정할 수 없다. 시각 제작 전 설정 결정이 필요하다.',
    sourceMagic: { slug: 'sea_serpent', name: '심해 뱀' },
    artwork: {
      src: '/game-assets/sea-serpent.webp',
      alt: '두 겹으로 똬리를 튼 곧추선 몸통의 심해 뱀',
      width: 201,
      height: 256,
      caption: '기본 자세 · 두 겹 똬리를 튼 몸통',
    },
  },
  {
    slug: 'storm_stag',
    name: '폭풍 사슴',
    internalName: 'StormStag',
    faction: '세계수 바람 정령',
    role: '전투 개체',
    mobility: '이동 없음',
    targeting: '지상',
    lifecycle: '소스에서 시간 제한을 직접 확인하지 못함',
    description: '폭풍 사슴은 세계수 바람 정령의 소환 마법이다. 소스에서 지속 이동 AI를 확인하지 못했다. 전투에서는 전투 개체 역할을 맡으며, 지상 대상을 직접 공격 없음 또는 별도 효과 방식으로 다룬다. 추가 특수 이동은 없다. 시각적으로는 넓고 읽기 쉬운 곡선 종이 띠로 흐름과 회전을 표현한다.',
    sourceMagic: { slug: 'storm_stag', name: '폭풍 사슴' },
    artwork: {
      src: '/game-assets/storm-stag.webp',
      alt: '뿔과 갈기가 넓은 곡선 종이 띠로 이루어진 폭풍 사슴',
      width: 256,
      height: 256,
      caption: '기본 자세 · 곡선 종이 띠로 표현한 뿔과 갈기',
    },
  },
  {
    slug: 'wall_golem',
    name: '성벽 골렘',
    internalName: 'WallGolem',
    faction: '귀속 미정',
    role: '전투 개체',
    mobility: '이동 없음',
    targeting: '지상',
    lifecycle: '소스에서 시간 제한을 직접 확인하지 못함',
    description: '성벽 골렘은 귀속 미정의 소환 마법이다. 소스에서 지속 이동 AI를 확인하지 못했다. 전투에서는 전투 개체 역할을 맡으며, 지상 대상을 직접 공격 없음 또는 별도 효과 방식으로 다룬다. 추가 특수 이동은 없다. 시각적으로는 기존 세계관만으로 귀속을 확정할 수 없다. 시각 제작 전 설정 결정이 필요하다.',
    sourceMagic: { slug: 'wall_golem', name: '성벽 골렘' },
    artwork: {
      src: '/game-assets/wall-golem.webp',
      alt: '이끼 낀 석재 블록을 쌓아 올린 성벽 골렘',
      width: 226,
      height: 254,
      caption: '기본 자세 · 이끼 낀 석재 블록 몸체',
    },
  },
  {
    slug: 'mini_rock_swarm',
    name: '꼬마돌 돌격대',
    internalName: 'MiniRockSwarm',
    faction: '돌 골렘 부족',
    role: '전투 개체',
    mobility: '이동 없음',
    targeting: '지상',
    lifecycle: '소스에서 시간 제한을 직접 확인하지 못함',
    description: '꼬마돌 돌격대은 돌 골렘 부족의 소환 마법이다. 소스에서 지속 이동 AI를 확인하지 못했다. 전투에서는 전투 개체 역할을 맡으며, 지상 대상을 직접 공격 없음 또는 별도 효과 방식으로 다룬다. 추가 특수 이동은 없다. 시각적으로는 따뜻한 석재 조각과 이끼. 인간제 회색 기계와 구분한다.',
    sourceMagic: { slug: 'mini_rock_swarm', name: '꼬마돌 돌격대' },
    artwork: {
      src: '/game-assets/mini-rock-swarm.webp',
      alt: '따뜻한 석재 조각과 이끼로 이루어진 꼬마돌 돌격대',
      width: 236,
      height: 256,
      caption: '기본 자세 · 따뜻한 석재 조각과 이끼',
    },
  },
  {
    slug: 'rock_mage',
    name: '룬바위 주술사',
    internalName: 'RockMage',
    faction: '돌 골렘 부족',
    role: '전투 개체',
    mobility: '이동 없음',
    targeting: '지상·공중',
    lifecycle: '소스에서 시간 제한을 직접 확인하지 못함',
    description: '룬바위 주술사은 돌 골렘 부족의 소환 마법이다. 소스에서 지속 이동 AI를 확인하지 못했다. 전투에서는 전투 개체 역할을 맡으며, 지상·공중 대상을 직접 공격 없음 또는 별도 효과 방식으로 다룬다. 추가 특수 이동은 없다. 시각적으로는 따뜻한 석재 조각과 이끼. 인간제 회색 기계와 구분한다.',
    sourceMagic: { slug: 'rock_mage', name: '룬바위 주술사' },
    artwork: {
      src: '/game-assets/rock-mage.webp',
      alt: '이끼 낀 후드를 쓰고 푸른 결정 지팡이를 든 룬바위 주술사',
      width: 234,
      height: 256,
      caption: '기본 자세 · 이끼 낀 후드와 결정 지팡이',
    },
  },
  {
    slug: 'thunder_bird_swarm',
    name: '천둥새 편대',
    internalName: 'ThunderBirdSwarm',
    faction: '세계수 전기 정령',
    role: '원거리 공격',
    mobility: '공중 부유형',
    targeting: '지상',
    lifecycle: 'HP 소진 시 파괴',
    description: '천둥새 편대은 세계수 전기 정령의 소환 마법이다. `ZPhysics(gameObject, hoverY)`로 고도를 유지한다. 전투에서는 원거리 공격 역할을 맡으며, 지상 대상을 단일 표적 방식으로 다룬다. 추가 특수 이동은 없다. 시각적으로는 세계수에서 갈라진 전기 생명과 각진 전격 파편을 사용한다.',
    sourceMagic: { slug: 'thunder_bird_swarm', name: '천둥새 편대' },
    artwork: {
      src: '/game-assets/thunder-bird-swarm.webp',
      alt: '각진 전격 파편 날개를 펼치고 고도를 유지하는 천둥새 편대',
      width: 256,
      height: 188,
      caption: '기본 자세 · 각진 전격 파편 날개',
    },
  },
];
