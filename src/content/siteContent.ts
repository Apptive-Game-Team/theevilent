import type { LucideIcon } from 'lucide-react';
import { Play, SquarePlay } from 'lucide-react';
import type { Language } from '../i18n/language';

export type TabId = 'home' | 'magic' | 'team' | 'privacy' | 'terms';

export interface NavigationItem {
  id: TabId;
  label: Record<Language, string>;
}

export interface PlatformLink {
  href: string;
  label: string;
  subtitle: string;
  title: string;
  variant: 'google' | 'itch' | 'youtube';
  Icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  accent: string;
  avatarText: string;
  github: string;
  email: string;
}

// The home page is the game, so the menu carries only what sits beside it.
export const navigationItems: NavigationItem[] = [
  { id: 'magic', label: { ko: '마법 도감', en: 'Magic Book' } },
  { id: 'team', label: { ko: '팀', en: 'Team' } },
];

// Legal notices are not navigation, so they stay out of navigationItems and
// out of the Navbar. Footer.tsx renders them in the bottom row instead.
export const legalLinks: NavigationItem[] = [
  { id: 'terms', label: { ko: '이용약관', en: 'Terms of Service' } },
  { id: 'privacy', label: { ko: '개인정보처리방침', en: 'Privacy Policy' } },
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
  {
    href: 'https://www.youtube.com/@ArcaneCastersOfficial',
    label: 'YouTube',
    subtitle: 'WATCH ON',
    title: 'YouTube',
    variant: 'youtube',
    Icon: SquarePlay,
  },
];

// AI 기본법 제31조 1항 고지. 읽는 사람이 알아볼 수 있어야 뜻이 있어서 고른
// 언어로 보여 준다.
export const aiArtworkNotice: Record<Language, string> = {
  ko: '이 사이트의 일부 그림은 생성형 인공지능으로 제작되었습니다.',
  en: 'Some artwork on this site was created with generative AI.',
};

export const teamMembers: TeamMember[] = [
  {
    name: 'monolong',
    role: 'Unity · Backend',
    accent: '#e61e2a',
    avatarText: 'ML',
    github: 'https://github.com/monolong',
    email: 'tjdvlf0201@gmail.com',
  },
  {
    name: 'yunseong',
    role: 'Backend · Infra · Unity',
    accent: '#dfb73c',
    avatarText: 'YS',
    github: 'https://github.com/dev-yunseong',
    email: 'me@yunseong.dev',
  },
];
