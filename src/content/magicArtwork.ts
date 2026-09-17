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
  crater: {
    concept: {
      src: '/game-assets/crater.webp',
      alt: '검붉은 현무암 갑각과 내부 용암 코어로 만든 지옥불 분화구',
      caption: '분화구 · 지옥불 갑각 인게임 스프라이트',
    },
    gameAsset: {
      src: '/game-assets/crater.webp',
      alt: '검은 현무암 갑각이 둘러싼 내부 용암 분화구',
      caption: '분화구 · 인게임 스프라이트',
      width: 256,
      height: 169,
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
  shock_trap: {
    concept: {
      src: '/game-assets/shock-trap.webp',
      alt: '나뭇가지 둥지 안에 노란 전격 결정이 세워진 감전 덫',
      caption: '세계수 전기 정령의 설치 마법 · 감전 덫',
    },
  },
  repair_totem: {
    concept: {
      src: '/game-assets/repair-totem.webp',
      alt: '덩굴로 감긴 나무 기둥 위에 녹색 결정이 자란 정비 토템',
      caption: '귀속 미정의 설치 마법 · 정비 토템',
    },
  },
  grass_generator: {
    concept: {
      src: '/game-assets/grass-generator.webp',
      alt: '녹색 잎 더미 중앙에 연두색 결정이 박힌 풀 배양기',
      caption: '귀속 미정의 설치 마법 · 풀 배양기',
    },
  },
  dragon_tower: {
    concept: {
      src: '/game-assets/dragon-tower.webp',
      alt: '갈라진 용암 결이 흐르는 인간 마법 문명의 화룡 포탑',
      caption: '인간 마법 문명의 설치 마법 · 화룡 포탑',
    },
  },
  firework_tower: {
    concept: {
      src: '/game-assets/firework-tower.webp',
      alt: '검붉은 종이 갑각 안에서 용암광이 새어 나오는 폭죽 포탑',
      caption: '지옥불 군단의 설치 마법 · 폭죽 포탑',
    },
  },
  frenzy_totem: {
    concept: {
      src: '/game-assets/frenzy-totem.webp',
      alt: '뿔 달린 붉은 악마 가면 모양의 군단 광란토템',
      caption: '지옥불 군단의 투하 마법 · 군단 광란토템',
    },
  },
  boulder_strike: {
    concept: {
      src: '/game-assets/boulder-strike.webp',
      alt: '초승달 모양 바람 자국을 뒤따르며 밀려 나가는 이끼 낀 바위',
      caption: '귀속 미정의 투사체 마법 · 질풍 낙석탄',
    },
  },
  spirit_bomb: {
    concept: {
      src: '/game-assets/spirit-bomb.webp',
      alt: '금색 코어에서 풀색 결정 날개가 뻗어 나가는 정령력 집속포',
      caption: '귀속 미정의 투사체 마법 · 정령력 집속포',
    },
  },
  titan_remnant: {
    concept: {
      src: '/game-assets/titan-remnant.webp',
      alt: '이끼 낀 거대한 석재 잔해가 쌓여 형태를 이룬 거신의 잔해',
      caption: '귀속 미정의 설치 마법 · 거신의 잔해',
    },
  },
  tidal_warhead: {
    concept: {
      src: '/game-assets/tidal-warhead.webp',
      alt: '어두운 눈을 가진 청록색 상어 모양의 공중 표적용 해일 탄두',
      caption: '귀속 미정의 투사체 마법 · 해일 탄두 · 공중 표적',
    },
  },
  cannon: {
    concept: {
      src: '/game-assets/cannon.webp',
      alt: '인간 마법 문명의 마도 대포 인게임 스프라이트',
      caption: '인간 마법 문명의 설치 마법 · 마도 대포',
    },
  },
  fire_slime_nest: {
    concept: {
      src: '/game-assets/fire-slime-nest.webp',
      alt: '지옥불 군단의 지옥불 산란장 인게임 스프라이트',
      caption: '지옥불 군단의 설치 마법 · 지옥불 산란장',
    },
  },
  healing_totem: {
    concept: {
      src: '/game-assets/healing-totem.webp',
      alt: '세계수 풀 정령의 세계수 치유토템 인게임 스프라이트',
      caption: '세계수 풀 정령의 설치 마법 · 세계수 치유토템',
    },
  },
  lightning_slime_nest: {
    concept: {
      src: '/game-assets/lightning-slime-nest.webp',
      alt: '세계수 전기 정령의 뇌광 정령제단 인게임 스프라이트',
      caption: '세계수 전기 정령의 설치 마법 · 뇌광 정령제단',
    },
  },
  mana_well: {
    concept: {
      src: '/game-assets/mana-well.webp',
      alt: '세계수 풀 정령의 비전 마나샘 인게임 스프라이트',
      caption: '세계수 풀 정령의 설치 마법 · 비전 마나샘',
    },
  },
  nature_slime_nest: {
    concept: {
      src: '/game-assets/nature-slime-nest.webp',
      alt: '세계수 풀 정령의 세계수 씨앗터 인게임 스프라이트',
      caption: '세계수 풀 정령의 설치 마법 · 세계수 씨앗터',
    },
  },
  pve_water_slime_nest: {
    concept: {
      src: '/game-assets/pve-water-slime-nest.webp',
      alt: '물 슬라임의 물방울 보금자리 인게임 스프라이트',
      caption: '물 슬라임의 설치 마법 · 물방울 보금자리',
    },
  },
  rock_slime_nest: {
    concept: {
      src: '/game-assets/rock-slime-nest.webp',
      alt: '돌 골렘 부족의 꼬마돌 집결지 인게임 스프라이트',
      caption: '돌 골렘 부족의 설치 마법 · 꼬마돌 집결지',
    },
  },
  tower: {
    concept: {
      src: '/game-assets/tower.webp',
      alt: '인간 마법 문명의 대공 마도탑 인게임 스프라이트',
      caption: '인간 마법 문명의 설치 마법 · 대공 마도탑',
    },
  },
  towerback: {
    concept: {
      src: '/game-assets/towerback.webp',
      alt: '인간 마법 문명의 포탑등이 인게임 스프라이트',
      caption: '인간 마법 문명의 설치 마법 · 포탑등이',
    },
  },
  vine_colony: {
    concept: {
      src: '/game-assets/vine-colony.webp',
      alt: '세계수 풀 정령의 덩굴 군락 인게임 스프라이트',
      caption: '세계수 풀 정령의 설치 마법 · 덩굴 군락',
    },
  },
  wind_slime_nest: {
    concept: {
      src: '/game-assets/wind-slime-nest.webp',
      alt: '세계수 바람 정령의 바람 정령제단 인게임 스프라이트',
      caption: '세계수 바람 정령의 설치 마법 · 바람 정령제단',
    },
  },
  bubble_generator: {
    concept: {
      src: '/game-assets/bubble-generator.webp',
      alt: '물 슬라임의 물방울 배양기 인게임 스프라이트',
      caption: '물 슬라임의 설치 마법 · 물방울 배양기',
    },
  },
  electric_tower: {
    concept: {
      src: '/game-assets/electric-tower.webp',
      alt: '세계수 전기 정령의 뇌전 마도탑 인게임 스프라이트',
      caption: '세계수 전기 정령의 설치 마법 · 뇌전 마도탑',
    },
  },
  life_tree: {
    concept: {
      src: '/game-assets/life-tree.webp',
      alt: '세계수 풀 정령의 생명의 묘목 인게임 스프라이트',
      caption: '세계수 풀 정령의 설치 마법 · 생명의 묘목',
    },
  },
  rock_turret: {
    concept: {
      src: '/game-assets/rock-turret.webp',
      alt: '돌 골렘 부족의 암석 포탑 인게임 스프라이트',
      caption: '돌 골렘 부족의 설치 마법 · 암석 포탑',
    },
  },
  wind_totem: {
    concept: {
      src: '/game-assets/wind-totem.webp',
      alt: '세계수 바람 정령의 순풍 토템 인게임 스프라이트',
      caption: '세계수 바람 정령의 설치 마법 · 순풍 토템',
    },
  },
  fire_drop: {
    concept: {
      src: '/game-assets/fire-drop.webp',
      alt: '지옥불 군단의 지옥불 강하 인게임 스프라이트',
      caption: '지옥불 군단의 투하 마법 · 지옥불 강하',
    },
  },
  leafair: {
    concept: {
      src: '/game-assets/leafair.webp',
      alt: '세계수 풀 정령의 잎바람 요정 인게임 스프라이트',
      caption: '세계수 풀 정령의 투하 마법 · 잎바람 요정',
    },
  },
  meteor_shower: {
    concept: {
      src: '/game-assets/meteor-shower.webp',
      alt: '지옥불 군단의 지옥불 유성우 인게임 스프라이트',
      caption: '지옥불 군단의 투하 마법 · 지옥불 유성우',
    },
  },
  nature_drop: {
    concept: {
      src: '/game-assets/nature-drop.webp',
      alt: '세계수 풀 정령의 뿌리 강하 인게임 스프라이트',
      caption: '세계수 풀 정령의 투하 마법 · 뿌리 강하',
    },
  },
  rallying_torch: {
    concept: {
      src: '/game-assets/rallying-torch.webp',
      alt: '인간 마법 문명의 집결 신호화 인게임 스프라이트',
      caption: '인간 마법 문명의 투하 마법 · 집결 신호화',
    },
  },
  rock_drop: {
    concept: {
      src: '/game-assets/rock-drop.webp',
      alt: '돌 골렘 부족의 거석 낙하 인게임 스프라이트',
      caption: '돌 골렘 부족의 투하 마법 · 거석 낙하',
    },
  },
  wind_drop: {
    concept: {
      src: '/game-assets/wind-drop.webp',
      alt: '세계수 바람 정령의 하강 돌풍 인게임 스프라이트',
      caption: '세계수 바람 정령의 투하 마법 · 하강 돌풍',
    },
  },
  lightning_explosion: {
    concept: {
      src: '/game-assets/lightning-explosion.webp',
      alt: '세계수 전기 정령의 뇌광 폭발 인게임 스프라이트',
      caption: '세계수 전기 정령의 폭발 마법 · 뇌광 폭발',
    },
  },
  overgrowth: {
    concept: {
      src: '/game-assets/overgrowth.webp',
      alt: '세계수 풀 정령의 세계수의 과생장 인게임 스프라이트',
      caption: '세계수 풀 정령의 폭발 마법 · 세계수의 과생장',
    },
  },
  razor_gale: {
    concept: {
      src: '/game-assets/razor-gale.webp',
      alt: '세계수 바람 정령의 면도날 회오리 인게임 스프라이트',
      caption: '세계수 바람 정령의 폭발 마법 · 면도날 회오리',
    },
  },
  sand_storm: {
    concept: {
      src: '/game-assets/sand-storm.webp',
      alt: '세계수 바람 정령의 황진 폭풍 인게임 스프라이트',
      caption: '세계수 바람 정령의 폭발 마법 · 황진 폭풍',
    },
  },
  shock_overload: {
    concept: {
      src: '/game-assets/shock-overload.webp',
      alt: '세계수 전기 정령의 뇌광 과부하 인게임 스프라이트',
      caption: '세계수 전기 정령의 폭발 마법 · 뇌광 과부하',
    },
  },
  water_explosion: {
    concept: {
      src: '/game-assets/water-explosion.webp',
      alt: '물 슬라임의 솟구치는 간헐천 인게임 스프라이트',
      caption: '물 슬라임의 폭발 마법 · 솟구치는 간헐천',
    },
  },
  wind_explosion: {
    concept: {
      src: '/game-assets/wind-explosion.webp',
      alt: '세계수 바람 정령의 터지는 돌풍 인게임 스프라이트',
      caption: '세계수 바람 정령의 폭발 마법 · 터지는 돌풍',
    },
  },
  lightning_shot: {
    concept: {
      src: '/game-assets/lightning-shot.webp',
      alt: '세계수 전기 정령의 번개 파편 인게임 스프라이트',
      caption: '세계수 전기 정령의 투사체 마법 · 번개 파편',
    },
  },
  rock_rolling: {
    concept: {
      src: '/game-assets/rock-rolling.webp',
      alt: '돌 골렘 부족의 구르는 거석 인게임 스프라이트',
      caption: '돌 골렘 부족의 투사체 마법 · 구르는 거석',
    },
  },
  tide_call: {
    concept: {
      src: '/game-assets/tide-call.webp',
      alt: '물 슬라임의 밀려드는 해일 인게임 스프라이트',
      caption: '물 슬라임의 투사체 마법 · 밀려드는 해일',
    },
  },
  vine_fan: {
    concept: {
      src: '/game-assets/vine-fan.webp',
      alt: '세계수 풀 정령의 세 갈래 덩굴 인게임 스프라이트',
      caption: '세계수 풀 정령의 투사체 마법 · 세 갈래 덩굴',
    },
  },
  vine_toss: {
    concept: {
      src: '/game-assets/vine-toss.webp',
      alt: '세계수 풀 정령의 솟구치는 덩굴 인게임 스프라이트',
      caption: '세계수 풀 정령의 투사체 마법 · 솟구치는 덩굴',
    },
  },
  water_shot: {
    concept: {
      src: '/game-assets/water-shot.webp',
      alt: '물 슬라임의 응축 물방울 인게임 스프라이트',
      caption: '물 슬라임의 투사체 마법 · 응축 물방울',
    },
  },
  will_o_wisp: {
    concept: {
      src: '/game-assets/will-o-wisp.webp',
      alt: '세계수 풀 정령의 길잡이 도깨비불 인게임 스프라이트',
      caption: '세계수 풀 정령의 투사체 마법 · 길잡이 도깨비불',
    },
  },
  wind_blade: {
    concept: {
      src: '/game-assets/wind-blade.webp',
      alt: '세계수 바람 정령의 초승달 바람칼 인게임 스프라이트',
      caption: '세계수 바람 정령의 투사체 마법 · 초승달 바람칼',
    },
  },
  aqua_archer: {
    concept: {
      src: '/game-assets/aqua-archer.webp',
      alt: '물 슬라임의 물결 궁수 인게임 스프라이트',
      caption: '물 슬라임의 소환 마법 · 물결 궁수',
    },
  },
  bubble_spirit: {
    concept: {
      src: '/game-assets/bubble-spirit.webp',
      alt: '물 슬라임의 거품 슬라임 인게임 스프라이트',
      caption: '물 슬라임의 소환 마법 · 거품 슬라임',
    },
  },
  cloud_dragon: {
    concept: {
      src: '/game-assets/cloud-dragon.webp',
      alt: '세계수 바람 정령의 구름비늘 운룡 인게임 스프라이트',
      caption: '세계수 바람 정령의 소환 마법 · 구름비늘 운룡',
    },
  },
  magma_spirit: {
    concept: {
      src: '/game-assets/magma-spirit.webp',
      alt: '지옥불 군단의 용암 갑각 악마 인게임 스프라이트',
      caption: '지옥불 군단의 소환 마법 · 용암 갑각 악마',
    },
  },
  mini_rock_swarm: {
    concept: {
      src: '/game-assets/mini-rock-swarm.webp',
      alt: '돌 골렘 부족의 꼬마돌 돌격대 인게임 스프라이트',
      caption: '돌 골렘 부족의 소환 마법 · 꼬마돌 돌격대',
    },
  },
  rock_golem: {
    concept: {
      src: '/game-assets/rock-golem.webp',
      alt: '돌 골렘 부족의 이끼바위 골렘 인게임 스프라이트',
      caption: '돌 골렘 부족의 소환 마법 · 이끼바위 골렘',
    },
  },
  rock_mage: {
    concept: {
      src: '/game-assets/rock-mage.webp',
      alt: '돌 골렘 부족의 룬바위 주술사 인게임 스프라이트',
      caption: '돌 골렘 부족의 소환 마법 · 룬바위 주술사',
    },
  },
  seed_spirit_swarm: {
    concept: {
      src: '/game-assets/seed-spirit-swarm.webp',
      alt: '세계수 풀 정령의 씨앗 정령 군락 인게임 스프라이트',
      caption: '세계수 풀 정령의 소환 마법 · 씨앗 정령 군락',
    },
  },
  storm_rider: {
    concept: {
      src: '/game-assets/storm-rider.webp',
      alt: '세계수 바람 정령의 폭풍갈기 기수 인게임 스프라이트',
      caption: '세계수 바람 정령의 소환 마법 · 폭풍갈기 기수',
    },
  },
  thunder_spirit: {
    concept: {
      src: '/game-assets/thunder-spirit.webp',
      alt: '세계수 전기 정령의 뇌광 정령 인게임 스프라이트',
      caption: '세계수 전기 정령의 소환 마법 · 뇌광 정령',
    },
  },
  tornado_strike: {
    concept: {
      src: '/game-assets/tornado-strike.webp',
      alt: '세계수 바람 정령의 회오리 정령 인게임 스프라이트',
      caption: '세계수 바람 정령의 소환 마법 · 회오리 정령',
    },
  },
  tree_golem: {
    concept: {
      src: '/game-assets/tree-golem.webp',
      alt: '세계수 풀 정령의 고목 수호자 인게임 스프라이트',
      caption: '세계수 풀 정령의 소환 마법 · 고목 수호자',
    },
  },
  vine_spirit: {
    concept: {
      src: '/game-assets/vine-spirit.webp',
      alt: '세계수 풀 정령의 덩굴 추적자 인게임 스프라이트',
      caption: '세계수 풀 정령의 소환 마법 · 덩굴 추적자',
    },
  },
  water_slime_swarm: {
    concept: {
      src: '/game-assets/water-slime-swarm.webp',
      alt: '물 슬라임의 물방울 생존자 무리 인게임 스프라이트',
      caption: '물 슬라임의 소환 마법 · 물방울 생존자 무리',
    },
  },
  wind_spirit: {
    concept: {
      src: '/game-assets/wind-spirit.webp',
      alt: '세계수 바람 정령의 질풍 정령 인게임 스프라이트',
      caption: '세계수 바람 정령의 소환 마법 · 질풍 정령',
    },
  },
  zap_mouse: {
    concept: {
      src: '/game-assets/zap-mouse.webp',
      alt: '세계수 전기 정령의 찌릿꼬리쥐 인게임 스프라이트',
      caption: '세계수 전기 정령의 소환 마법 · 찌릿꼬리쥐',
    },
  },
  thunder_bird_swarm: {
    concept: {
      src: '/game-assets/thunder-bird-swarm.webp',
      alt: '세계수 전기 정령의 천둥새 편대 인게임 스프라이트',
      caption: '세계수 전기 정령의 소환 마법 · 천둥새 편대',
    },
  },
  sea_serpent: {
    concept: {
      src: '/game-assets/sea-serpent.webp',
      alt: '귀속 미정의 심해 뱀 인게임 스프라이트',
      caption: '귀속 미정의 소환 마법 · 심해 뱀',
    },
  },
  storm_stag: {
    concept: {
      src: '/game-assets/storm-stag.webp',
      alt: '세계수 바람 정령의 폭풍 사슴 인게임 스프라이트',
      caption: '세계수 바람 정령의 소환 마법 · 폭풍 사슴',
    },
  },
  wall_golem: {
    concept: {
      src: '/game-assets/wall-golem.webp',
      alt: '귀속 미정의 성벽 골렘 인게임 스프라이트',
      caption: '귀속 미정의 소환 마법 · 성벽 골렘',
    },
  },
  bomb_sprite: {
    concept: {
      src: '/game-assets/bomb-sprite.webp',
      alt: '귀속 미정의 공습 폭탄요정 인게임 스프라이트',
      caption: '귀속 미정의 소환 마법 · 공습 폭탄요정',
    },
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
  titan_remnant: [
    {
      heading: '부속 에셋 · 솟구치는 돌주먹',
      src: '/game-assets/titan-fist.webp',
      alt: '적 위치에서 아래에서 위로 솟구치는 거대한 돌주먹',
      caption: '거신의 잔해 · 적 위치에 별도 생성되는 돌주먹 공격 · 본체와 별도 개체',
      width: 180,
      height: 247,
    },
  ],
  tidal_warhead: [
    {
      heading: '부속 에셋 · 지상 표적 변형',
      src: '/game-assets/ground-tidal-warhead.webp',
      alt: '밝은 눈을 가진 지상 표적용 해일 탄두, 몸통 실루엣은 공중형과 동일',
      caption: '해일 탄두 · 지상 표적 · 밝은 눈 · 본체와 동일 실루엣',
      width: 256,
      height: 256,
    },
  ],
  firework_tower: [
    {
      heading: '부속 에셋 · 발사 포탄',
      src: '/game-assets/firework-shell.webp',
      alt: '검붉은 갑각에 감싸인 작은 폭죽 포탄',
      caption: '폭죽 타워 · 발사되는 포탄',
      width: 128,
      height: 109,
    },
    {
      heading: '부속 에셋 · 폭발',
      src: '/game-assets/firework-explosion.webp',
      alt: '검붉은 갑각 파편이 사방으로 터지며 용암광이 번지는 폭발',
      caption: '폭죽 타워 · 착탄 시 폭발',
      width: 254,
      height: 238,
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
