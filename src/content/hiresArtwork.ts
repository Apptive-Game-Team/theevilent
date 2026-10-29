/**
 * 고해상도 아트. 원본은 trailer/assets 에서 관리하고, 여기에는 사이트용 WebP(최대 1100px)만 둔다.
 * `swap` 이 있으면 기본 자세와 공격 자세를 번갈아 보여 준다. 두 장은 같은 박스로 잘라서
 * 발 위치와 배율이 같다.
 */
export interface HiresArtwork {
  src: string;
  swap?: string;
  width: number;
  height: number;
  alt: { ko: string; en: string };
}

export const hiresArtwork: Record<string, HiresArtwork> = {
  evil_ent: {
    src: '/hires/EvilEnt.webp',
    swap: '/hires/EvilEntAttack.webp',
    width: 968,
    height: 1100,
    alt: { ko: '긴 팔을 뻗어 공격하는 사악한 나무 골렘', en: 'The Evil Ent reaching out with a long arm' },
  },
  aqua_archer: {
    src: '/hires/AquaArcher.webp',
    swap: '/hires/AquaArcherRelease.webp',
    width: 1100,
    height: 938,
    alt: { ko: '활시위를 당겼다 놓는 물결 궁수', en: 'The Aqua Archer drawing and releasing a bow' },
  },
  rock_golem: {
    src: '/hires/RockGolem.webp',
    swap: '/hires/RockGolemAttack.webp',
    width: 926,
    height: 1023,
    alt: { ko: '주먹을 들어 내려치는 바위 골렘', en: 'The Rock Golem raising a fist to smash' },
  },
  storm_stag: {
    src: '/hires/StormStag.webp',
    width: 867,
    height: 1100,
    alt: { ko: '푸른 결정이 박힌 폭풍 사슴', en: 'The Storm Stag with blue crystals' },
  },
  thunder_spirit: {
    src: '/hires/ThunderSpirit.webp',
    width: 1083,
    height: 1099,
    alt: { ko: '뾰족한 금빛 면으로 이루어진 번개 정령', en: 'The Thunder Spirit made of spiky golden planes' },
  },
  wind_spirit: {
    src: '/hires/WindSpirit.webp',
    width: 1072,
    height: 910,
    alt: { ko: '청록색 잎 갈기가 날리는 바람 정령', en: 'The Wind Spirit with swept-back teal leaves' },
  },
};
