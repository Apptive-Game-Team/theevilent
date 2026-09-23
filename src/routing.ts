import type { TabId } from './content/siteContent';
import { summonConcepts } from './content/summonConcepts';

export interface AppRoute {
  tab: TabId;
  slug?: string;
}

const tabPaths: Record<TabId, string> = {
  home: '/',
  games: '/arcane-casters',
  magic: '/arcane-casters/magic',
  team: '/team',
  privacy: '/privacy',
  terms: '/terms',
};

export const getTabPath = (tab: TabId, slug?: string) =>
  `${tabPaths[tab]}${slug ? `/${encodeURIComponent(slug)}` : ''}`;

/**
 * The summon compendium was folded into the magic compendium. An old summon
 * address lands on the page of the magic that summons it, and the bare
 * `/arcane-casters/summons` lands on the magic list.
 */
const summonRedirectPath = (summonSlug?: string) => {
  const source = summonSlug
    ? summonConcepts.find((summon) => summon.slug === decodeURIComponent(summonSlug))?.sourceMagic.slug
    : undefined;
  return getTabPath('magic', source);
};

export const getSummonRedirectPath = (pathname: string): string | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] !== 'arcane-casters' || segments[1] !== 'summons') return null;
  return summonRedirectPath(segments[2]);
};

export const getRouteFromPathname = (pathname: string): AppRoute => {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { tab: 'home' };
  if (segments[0] === 'team' && segments.length === 1) return { tab: 'team' };
  if (segments[0] === 'privacy' && segments.length === 1) return { tab: 'privacy' };
  if (segments[0] === 'terms' && segments.length === 1) return { tab: 'terms' };
  if (segments[0] !== 'arcane-casters') return { tab: 'home' };
  if (segments.length === 1) return { tab: 'games' };
  if (segments[1] === 'magic') return { tab: 'magic', slug: segments[2] };
  return { tab: 'games' };
};

// The magic compendium lives under the Arcane Casters section, so the
// top-level navigation keeps highlighting GAMES while it is the active route.
const primaryNavTabOverrides: Partial<Record<TabId, TabId>> = {
  magic: 'games',
};

export const getPrimaryNavTab = (tab: TabId): TabId => primaryNavTabOverrides[tab] ?? tab;

export const isArcaneCastersTab = (tab: TabId): boolean =>
  tab === 'games' || tab === 'magic';

export const getLegacyPathFromHash = (hash: string): string | null => {
  const legacy = hash.replace(/^#/, '');
  if (!legacy || legacy === 'main-content') return null;

  const [routePart, query = ''] = legacy.split('?');
  const [tab, slug] = routePart.split('/') as [string, string | undefined];
  if (tab === 'summons') return summonRedirectPath(slug);
  if (!(tab in tabPaths)) return null;

  const path = getTabPath(tab as TabId, slug);
  return `${path}${query ? `?${query}` : ''}`;
};
