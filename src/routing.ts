import type { TabId } from './content/siteContent';

export interface AppRoute {
  tab: TabId;
  slug?: string;
}

const tabPaths: Record<TabId, string> = {
  home: '/',
  games: '/arcane-casters',
  magic: '/arcane-casters/magic',
  summons: '/arcane-casters/summons',
  team: '/team',
};

export const getTabPath = (tab: TabId, slug?: string) =>
  `${tabPaths[tab]}${slug ? `/${encodeURIComponent(slug)}` : ''}`;

export const getRouteFromPathname = (pathname: string): AppRoute => {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { tab: 'home' };
  if (segments[0] === 'team' && segments.length === 1) return { tab: 'team' };
  if (segments[0] !== 'arcane-casters') return { tab: 'home' };
  if (segments.length === 1) return { tab: 'games' };
  if (segments[1] === 'magic') return { tab: 'magic', slug: segments[2] };
  if (segments[1] === 'summons') return { tab: 'summons', slug: segments[2] };
  return { tab: 'games' };
};

// The magic and summon compendiums live under the Arcane Casters section, so
// the top-level navigation must keep highlighting GAMES while either of them
// is the active route.
const primaryNavTabOverrides: Partial<Record<TabId, TabId>> = {
  magic: 'games',
  summons: 'games',
};

export const getPrimaryNavTab = (tab: TabId): TabId => primaryNavTabOverrides[tab] ?? tab;

export const isArcaneCastersTab = (tab: TabId): boolean =>
  tab === 'games' || tab === 'magic' || tab === 'summons';

export const getLegacyPathFromHash = (hash: string): string | null => {
  const legacy = hash.replace(/^#/, '');
  if (!legacy || legacy === 'main-content') return null;

  const [routePart, query = ''] = legacy.split('?');
  const [tab, slug] = routePart.split('/') as [TabId, string | undefined];
  if (!(tab in tabPaths)) return null;

  const path = getTabPath(tab, slug);
  return `${path}${query ? `?${query}` : ''}`;
};
