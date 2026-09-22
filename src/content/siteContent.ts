import type { LucideIcon } from 'lucide-react';
import { Play } from 'lucide-react';

export type TabId = 'home' | 'games' | 'magic' | 'summons' | 'team' | 'privacy' | 'terms';

export interface NavigationItem {
  id: TabId;
  label: string;
  footerLabel: string;
}

export interface SectionNavigationItem {
  id: TabId;
  label: string;
}

export interface PlatformLink {
  href: string;
  label: string;
  subtitle: string;
  title: string;
  variant: 'google' | 'itch';
  Icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  accent: string;
  avatarText: string;
  github: string;
  email: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'HOME', footerLabel: 'Home' },
  { id: 'games', label: 'GAMES', footerLabel: 'Games' },
  { id: 'team', label: 'TEAM', footerLabel: 'Team Members' },
];

// Section-level sub navigation shown only inside the Arcane Casters section
// (the games/magic/summons routes under /arcane-casters). Keeps the magic and
// summon compendiums out of the top-level navigationItems above.
export const arcaneCastersSectionNav: SectionNavigationItem[] = [
  { id: 'games', label: 'OVERVIEW' },
  { id: 'magic', label: 'MAGIC' },
  { id: 'summons', label: 'SUMMONS' },
];

// The footer still needs a site-wide link to each compendium even though the
// top-level navigationItems above no longer carries them. Footer.tsx renders
// these indented beneath the Games entry.
export const arcaneCastersFooterLinks: NavigationItem[] = [
  { id: 'magic', label: 'MAGIC', footerLabel: 'Magic Compendium' },
  { id: 'summons', label: 'SUMMONS', footerLabel: 'Summon Compendium' },
];

// Legal notices are not navigation, so they stay out of navigationItems and
// out of the Navbar. Footer.tsx renders them in the bottom row instead.
export const legalLinks: NavigationItem[] = [
  { id: 'terms', label: 'TERMS', footerLabel: 'Terms of Service' },
  { id: 'privacy', label: 'PRIVACY', footerLabel: 'Privacy Policy' },
];

export const platformLinks: PlatformLink[] = [
  {
    href: 'https://play.google.com/store/apps/details?id=com.team6515.wordonline',
    label: 'Google Play (Android)',
    subtitle: 'GET IT ON',
    title: 'Google Play',
    variant: 'google',
    Icon: Play,
  },
  {
    href: 'https://theevilent.itch.io/arcane-casters',
    label: 'itch.io',
    subtitle: 'PLAY ON',
    title: 'itch.io',
    variant: 'itch',
    Icon: Play,
  },
];

// AI 기본법 제31조 1항 고지. 고지는 읽는 사람이 알아볼 수 있어야 뜻이 있어서
// 문구를 두 벌 둔다. footer 는 전체가 영어라 영어를 쓰고, 마법·소환수 도감은
// 본문이 한국어라 한국어를 쓴다.
export const aiArtworkNoticeEn =
  'Some artwork on this site was created with generative AI.';

export const aiArtworkNoticeKo =
  '이 사이트의 일부 그림은 생성형 인공지능으로 제작되었습니다.';

export const teamMembers: TeamMember[] = [
  {
    name: 'monolong',
    role: 'Game Developer (Unity / Backend)',
    bio: '아케인 캐스터즈의 Unity 클라이언트 코어 콘텐츠 개발 및 실시간 매치 플레이를 위한 인게임 백엔드 시스템 구축을 전담하고 있습니다.',
    accent: '#e61e2a',
    avatarText: 'ML',
    github: 'https://github.com/monolong',
    email: 'tjdvlf0201@gmail.com',
  },
  {
    name: 'yunseong',
    role: 'Server Developer (Backend / Unity / Infra)',
    bio: '안정적이고 중단 없는 실시간 PvP 매치를 서비스하기 위한 백엔드 분산 서버 아키텍처 설계와 인프라 파이프라인 구축을 담당하며, 클라이언트 기능 개발을 공유합니다.',
    accent: '#dfb73c',
    avatarText: 'YS',
    github: 'https://github.com/dev-yunseong',
    email: 'me@yunseong.dev',
  },
];
