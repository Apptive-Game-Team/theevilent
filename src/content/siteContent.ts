import type { LucideIcon } from 'lucide-react';
import { Globe, Play } from 'lucide-react';

export type TabId = 'home' | 'games' | 'magic' | 'team';

export interface NavigationItem {
  id: TabId;
  label: string;
  footerLabel: string;
}

export interface PlatformLink {
  href: string;
  label: string;
  subtitle: string;
  title: string;
  variant: 'google' | 'itch' | 'ping';
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
  { id: 'magic', label: 'MAGIC', footerLabel: 'Magic Compendium' },
  { id: 'team', label: 'TEAM', footerLabel: 'Team Members' },
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
    href: 'https://www.game-ping.kr/games/arcane-casters',
    label: 'game-ping',
    subtitle: 'EXPLORE ON',
    title: 'game-ping',
    variant: 'ping',
    Icon: Globe,
  },
];

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
