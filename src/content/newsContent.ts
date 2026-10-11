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
export interface NewsRelease {
  version: string;
  /** ISO date of the client release. */
  date: string;
  ko: NewsCopy;
  en: NewsCopy;
}

export const newsAnchorId = (version: string) => version.replace(/\./g, '-');

export const newsReleases: NewsRelease[] = [
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

export const newsPageCopy: Record<Language, { title: string; intro: string }> = {
  ko: {
    title: '소식',
    intro: '버전마다 플레이어가 느낄 수 있는 변화를 적었어요.',
  },
  en: {
    title: 'News',
    intro: 'What changed for players in each version.',
  },
};
