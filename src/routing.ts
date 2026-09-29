import type { TabId } from './content/siteContent';
import { summonConcepts } from './content/summonConcepts';

export interface AppRoute {
  tab: TabId;
  slug?: string;
}

const tabPaths: Record<TabId, string> = {
  home: '/',
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

/**
 * Addresses that no longer have a page of their own. The summon compendium was
 * folded into the magic compendium, and the Arcane Casters overview became the
 * home page, so `/arcane-casters` and anything under it that is not the magic
 * compendium lands on `/`.
 */
export const getRedirectPath = (pathname: string): string | null => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] !== 'arcane-casters') return null;
  if (segments[1] === 'summons') return summonRedirectPath(segments[2]);
  if (segments[1] === 'magic') return null;
  return getTabPath('home');
};

export const getRouteFromPathname = (pathname: string): AppRoute => {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) return { tab: 'home' };
  if (segments[0] === 'team' && segments.length === 1) return { tab: 'team' };
  if (segments[0] === 'privacy' && segments.length === 1) return { tab: 'privacy' };
  if (segments[0] === 'terms' && segments.length === 1) return { tab: 'terms' };
  if (segments[0] === 'arcane-casters' && segments[1] === 'magic') {
    return { tab: 'magic', slug: segments[2] };
  }
  return { tab: 'home' };
};

export const getLegacyPathFromHash = (hash: string): string | null => {
  const legacy = hash.replace(/^#/, '');
  if (!legacy || legacy === 'main-content') return null;

  const [routePart, query = ''] = legacy.split('?');
  const [tab, slug] = routePart.split('/') as [string, string | undefined];
  if (tab === 'summons') return summonRedirectPath(slug);
  if (tab === 'games') return getTabPath('home');
  if (!(tab in tabPaths)) return null;

  const path = getTabPath(tab as TabId, slug);
  return `${path}${query ? `?${query}` : ''}`;
};
