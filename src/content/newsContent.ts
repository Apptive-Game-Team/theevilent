import type { Language } from '../i18n/language';

export interface NewsCopy {
  title: string;
  items: string[];
}

/**
 * One entry per client release. `version` is the client version players
 * download; the server and database changes that shipped in the same window are
 * folded into the entry. Newest first.
 *
 * Only what a player notices is listed. Refactors, CI, tooling, infra and
 * account/admin work are left out on purpose. Magic names are the ones in the
 * client's Korean and English localization.
 */
export interface NewsImage {
  /** Path under `public/`, such as `/news/v1.4.0/river-map.webp`. */
  src: string;
  width: number;
  height: number;
  alt: { ko: string; en: string };
}

export interface NewsRelease {
  version: string;
  /** ISO date of the client release. */
  date: string;
  ko: NewsCopy;
  en: NewsCopy;
  /** Up to three pictures, one per main change. Optional. */
  images?: NewsImage[];
}

export const newsAnchorId = (version: string) => version.replace(/\./g, '-');

export const newsReleases: NewsRelease[] = [
  {
    version: 'v1.5.0',
    date: '2026-10-19',
    ko: {
      title: 'v1.5.0 업데이트',
      items: [
        '새 마법 3개가 생겼어요. 비전 보병은 응축된 마법 곤봉으로 지상 적을 때려요. 분화구 운반수는 돌 박격포를 세우고 지상 적에게 폭발탄을 쏴요. 콩알 사수는 가장 가까운 지상 적에게 콩을 일직선으로 쏴요.',
        '요새 모험의 마지막 시나리오 보스가 벽돌 골렘으로 바뀌었어요. 움직이지 않고, 경고 표시가 뜨는 내려찍기와 휩쓸기로 공격해요.',
        '차원문 모험의 이야기와 경기 중 대사를 새로 썼어요.',
        '모험 전투에 배경음악이 나와요. 숲과 요새 테마마다 곡이 다르고, 보스가 나오면 보스 음악으로 바뀌어요.',
        '팀 색이 내 진영 기준으로 보여요. 유닛 sprite 에는 팀 색 윤곽선이 생겼어요.',
        '집결의 토템이 목표 지점에 떨어져요. 땅에 집결 범위 원이 보이고 남은 시간 게이지가 떠요. 모인 아군은 범위 안에서 공격해요.',
        '정령 폭탄이 누른 방향의 조준선을 따라 사거리 끝까지 직선 레이저를 쏴요. 맞은 날아다니는 유닛의 높이에 맞춰 조준해요.',
        '찌릿쥐의 겁쟁이 특성이 없어졌어요.',
      ],
    },
    en: {
      title: 'v1.5.0 Update',
      items: [
        'Three new magics are here. Arcane Infantry hits ground enemies with a club of condensed magic. Crater Carrier plants a stone mortar and fires explosive shells at ground enemies. Bean Shooter shoots beans in a straight line at the closest ground enemy.',
        'The boss of the last scenario in the Fortress adventure is now the Brick Golem. It does not move, and attacks with a slam that shows a warning marker and a sweep.',
        'The Gate adventure story and the in-match dialogue are rewritten.',
        'Adventure battles now have music. Each theme (forest and fortress) has its own battle track, and the music switches to the boss track when a boss appears.',
        'Team colors are now shown from your own side. Unit sprites get a team-color outline.',
        'Rallying Totem is now dropped onto the target point. It shows the rally zone ring on the ground and a remaining-time gauge, and gathered allies attack inside the zone.',
        'Spirit Bomb now fires a straight laser along the aim line to the end of its range in the direction you click. It aims at the height of flying units it hits.',
        'Zap mouse lost its coward trait.',
      ],
    },
    images: [
      {
        src: '/news/v1.5.0/new-units-and-brick-golem.webp',
        width: 1600,
        height: 900,
        alt: {
          ko: '왼쪽부터 비전 보병, 분화구 운반수, 콩알 사수, 벽돌 골렘',
          en: 'Arcane Infantry, Crater Carrier, Bean Shooter and Brick Golem, from left to right',
        },
      },
    ],
  },
  {
    version: 'v1.4.0',
    date: '2026-10-12',
    ko: {
      title: 'v1.4.0 업데이트',
      items: [
        '강이 흐르는 새 맵이 생겼어요. 경기마다 맵이 무작위로 정해지고, 강에는 다리가 놓여 있어요.',
        '친구 목록과 친구 관리, 친선전 초대가 추가됐어요. 로비 메뉴에서 친구를 열어요.',
        '튜토리얼이 손가락 그림으로 눌러야 할 버튼과 카드를 짚어줘요. 화면 위에는 한 줄 안내가 뜨고, 덱 화면 요소 6개도 설명해줘요.',
        '불, 물, 자연, 번개, 바위, 바람 원소 아이콘 6개가 새 그림체로 바뀌었어요.',
        '공격을 맞은 대상이 공격 반대 방향으로 밀렸다가 돌아와요.',
        '손패 바를 올려 두면 그대로 유지되고, 조준하는 동안에만 잠시 내려가요.',
        '서버의 tick rate 에 맞춰 위치를 보간해서 움직임이 더 부드러워졌어요.',
        '매칭할 때 게임 서버 핑을 재서, 핑이 낮은 서버를 골라요.',
      ],
    },
    en: {
      title: 'v1.4.0 Update',
      items: [
        'A new map with a river is here. The map is picked at random for each match, and bridges cross the river.',
        'Friends are added: a friend list, friend management, and invites to friendly matches. Open Friends from the lobby menu.',
        'The tutorial now points a finger at the button or card you need to tap. A one-line hint shows at the top, and the deck step explains 6 parts of the deck screen.',
        'The 6 element icons (fire, water, nature, lightning, rock, wind) are redrawn in a new style.',
        'A target that gets hit is pushed back away from the attack and then returns.',
        'A raised hand bar now stays up and only lowers briefly while you aim.',
        'Positions are interpolated at the server tick rate, so movement looks smoother.',
        'When matching, the game measures ping to each game server and picks the one with the lowest ping.',
      ],
    },
    images: [
      {
        src: '/news/v1.4.0/river-map.webp',
        width: 1152,
        height: 640,
        alt: {
          ko: '다리 두 개가 놓인 강 맵',
          en: 'The river map with two bridges',
        },
      },
      {
        src: '/news/v1.4.0/tutorial-fire-shot.webp',
        width: 1280,
        height: 720,
        alt: {
          ko: '튜토리얼에서 손가락이 화염탄 카드를 짚고, 위에 한 줄 안내가 뜬 화면',
          en: 'The tutorial finger tapping the Fire Shot card, with a one-line hint at the top',
        },
      },
      {
        src: '/news/v1.4.0/element-icons.webp',
        width: 1204,
        height: 200,
        alt: {
          ko: '새 그림체의 불, 물, 자연, 번개, 바위, 바람 원소 아이콘',
          en: 'The new fire, water, nature, lightning, rock and wind element icons',
        },
      },
    ],
  },
  {
    version: 'v1.3.0',
    date: '2026-10-05',
    ko: {
      title: 'v1.3.0 업데이트',
      items: [
        '새 모험 차원문이 열렸어요. 스테이지가 2개이고, 열리는 문을 막으며 타락한 정령에 맞서요.',
        '요새 모험이 추가됐어요. 숲 모험은 다시 만들어서 덩굴 마녀와의 싸움으로 끝나요.',
        '모험 지도 끝에 보물 상자가 생겼어요. 눌러서 보상을 받아요.',
        '프로필에 퀘스트 목록과 외형 선택 화면이 생겼어요. 로비에서 프로필을 누르면 바로 가요.',
        '로비에서 랜덤 덱으로 플레이할 수 있어요.',
        '도감과 덱 화면에서 카드를 종류와 마나 구간으로 나눠 볼 수 있고, 덱에 넣고 남은 장수가 보여요.',
        '유닛이나 건물을 소환할 자리가 막혀 있으면 가장 가까운 빈자리로 옮겨 소환해요.',
        '로그인할 때 인터넷이 끊긴 경우와 서버 문제를 나눠서 알려줘요.',
      ],
    },
    en: {
      title: 'v1.3.0 Update',
      items: [
        'A new adventure, the Gate, is open. It has 2 stages: shut the gates as they open and face the corrupted spirit.',
        'The Fortress adventure is added, and the Forest adventure is rebuilt and ends with the Vine Witch.',
        'A treasure chest now waits at the end of the adventure map. Click it to claim your reward.',
        'The profile has a quest list and an appearance screen. Click your profile in the lobby to open it.',
        'You can play with a random deck from the lobby.',
        'The magic book and deck screens filter cards by type and mana range, and the deck screen shows how many copies you have left.',
        'When the spot for a unit or building is taken, it is summoned at the nearest free spot.',
        'At login, a lost internet connection and a server problem now show different messages.',
      ],
    },
  },
  {
    version: 'v1.2.0',
    date: '2026-09-28',
    ko: {
      title: 'v1.2.0 업데이트',
      items: [
        '경기 중 이모티콘 5종을 보낼 수 있어요. 한 번 보내면 3초 뒤에 다시 보낼 수 있고, 봇도 성향에 따라 보내요.',
        '모든 화면이 외곽선이 있는 평면 디자인으로 바뀌었어요. 제목과 버튼에는 Lilita One 글꼴을 써요.',
        '앱 아이콘과 플레이어의 지팡이가 말린 지팡이로 바뀌었고, 앱 이름은 Arcane Casters예요.',
        '설정에 크레딧 화면이 생겼어요.',
        '도감에서 고른 마법이 왼쪽 페이지에 보이고, 원소가 여러 개인 마법은 원소를 전부 보여줘요.',
        '덱 편집에서 카드를 검색하고 필터로 걸러 볼 수 있어요. 덱 안의 마법에 마우스를 올리면 도감 설명이 떠요.',
        '마나 샘의 소수점 마나 보너스가 이제 쌓여요. 승패가 정해져도 1초 더 진행한 뒤 결과를 보여줘요.',
        '마나 슬라이더를 손으로 움직일 수 있던 문제와, 튜토리얼 안내가 짚는 칸이 가려지던 문제를 고쳤어요.',
      ],
    },
    en: {
      title: 'v1.2.0 Update',
      items: [
        'You can send 5 emotes during a match. After one, you wait 3 seconds before the next, and bots send them too, depending on their temperament.',
        'Every screen now uses a flat style with outlines. Titles and buttons are set in Lilita One.',
        'The app icon and the player staff now show a curled staff, and the app is named Arcane Casters.',
        'Settings has a credits screen.',
        'The magic you pick in the magic book shows on the left page, and a magic with several elements shows all of them.',
        'Deck editing has card search and filters. Hover a magic in your deck to see its magic book entry.',
        'The fractional mana bonus from Mana Well now adds up. After a win or loss is decided, the match runs 1 more second before the result shows.',
        'Fixed the mana slider that could be dragged by hand, and tutorial highlights that were hidden behind the mask.',
      ],
    },
  },
  {
    version: 'v1.1.0',
    date: '2026-09-21',
    ko: {
      title: 'v1.1.0 업데이트',
      items: [
        '로그인이 저장돼서 앱을 다시 켜도 이어져요. 로그아웃 버튼도 생겼어요.',
        'Linux 버전이 추가됐고, Windows · macOS · Linux 버전을 itch.io 에서도 받을 수 있어요. v1.1.1 에서 itch.io 의 데스크톱 배포를 다시 열었어요.',
        '필드 바닥과 나무가 low-poly 스타일로 바뀌었고, 남은 이펙트와 배경 그림 7장도 새 스타일로 바뀌었어요.',
        '마법 70개의 마나 비용을 다시 정했어요. 가장 가벼운 마법은 10, 가장 무거운 마법은 70~80이에요.',
        '마그마 폭발, 전격 과부하 등 폭발 마법 3개의 범위가 0.5에서 1.5로, 피해가 80에서 100으로 늘었어요.',
        '씨앗 정령 무리가 풀씨 둥지로 바뀌었어요. 갖고 있던 카드와 덱 안의 카드도 풀씨 둥지로 옮겨져요.',
        '정령 폭탄 빔의 양 끝 높이와 바람 토템이 미는 범위를 고쳤어요.',
        '넓은 화면에서 배경과 패널이 어긋나던 것을 고쳤어요.',
      ],
    },
    en: {
      title: 'v1.1.0 Update',
      items: [
        'Your login is now saved, so it carries over when you reopen the app. There is also a logout button.',
        'A Linux build is added, and the Windows, macOS and Linux builds are also on itch.io. v1.1.1 reopened the desktop downloads on itch.io.',
        'The field ground and trees are redone in a low-poly style, and the 7 remaining effect and background images got the new style too.',
        'The mana cost of 70 magics was set again. The lightest magic costs 10 and the heaviest costs 70 to 80.',
        'Radius of the 3 explosion magics, including Magma Explosion and Shock Overload, went from 0.5 to 1.5, and their damage from 80 to 100.',
        'Seed Spirit Swarm is replaced by Seed Nest. Copies you own and copies in your decks move to Seed Nest.',
        'Fixed the end heights of the Spirit Bomb beam and the area Wind Totem pushes.',
        'Fixed backgrounds and panels that were misaligned on wide screens.',
      ],
    },
  },
  {
    version: 'v1.0.0',
    date: '2026-09-17',
    ko: {
      title: 'v1.0.0 업데이트',
      items: [
        '마나 바를 누르면 고른 마법이 취소돼요.',
        '폰에서 화면이 세로로 돌아가지 않고, 가로 두 방향만 쓸 수 있어요.',
      ],
    },
    en: {
      title: 'v1.0.0 Update',
      items: [
        'Tap the mana bar to cancel the magic you picked.',
        'On phones the screen no longer turns upright; only the two landscape directions work.',
      ],
    },
  },
];

export const newsPageCopy: Record<Language, { title: string }> = {
  ko: {
    title: '소식',
  },
  en: {
    title: 'News',
  },
};
