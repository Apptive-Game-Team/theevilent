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
  };
}

export const summonConcepts: SummonConcept[] = [
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
