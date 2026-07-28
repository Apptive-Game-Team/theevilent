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
}

export const summonConcepts: SummonConcept[] = [
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
    name: '잿불 올챙이',
    internalName: 'FireTadpole',
    faction: '차원 유랑종',
    role: '시간제한 지상 근접 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '10초 교대 소환·시간 경과 후 소멸',
    description: '균열두꺼비가 흡수한 불 마력에 적응한 새끼다. 악마나 정령이 아니며, 제한된 시간 동안 지상 표적을 근접 공격한다.',
    sourceMagic: { slug: 'dimension_toad', name: '균열두꺼비' },
    artwork: {
      src: '/concept-art/fire-tadpole.webp',
      alt: '불 마력 적응형 잿불 올챙이 컨셉 아트',
      width: 1024,
      height: 481,
    },
  },
  {
    slug: 'lightning_tadpole',
    name: '뇌광 올챙이',
    internalName: 'LightningTadpole',
    faction: '차원 유랑종',
    role: '시간제한 지상 근접 공격',
    mobility: '지상 이동',
    targeting: '지상',
    lifecycle: '10초 교대 소환·시간 경과 후 소멸',
    description: '균열두꺼비가 흡수한 전기 마력에 적응한 새끼다. 잿불 올챙이와 같은 종과 몸 구조를 유지하고 체내 마력층만 달라진다.',
    sourceMagic: { slug: 'dimension_toad', name: '균열두꺼비' },
    artwork: {
      src: '/concept-art/lightning-tadpole.webp',
      alt: '전기 마력 적응형 뇌광 올챙이 컨셉 아트',
      width: 1024,
      height: 481,
    },
  },
];
