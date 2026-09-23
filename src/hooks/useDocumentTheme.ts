import { useEffect } from 'react';

const THEME_ATTRIBUTE = 'data-theme';

/**
 * How many mounted components currently ask for each theme. React StrictMode
 * mounts an effect twice in development, and a page can be replaced before the
 * one it replaces is torn down, so the attribute is only removed once the last
 * holder has gone.
 */
const holders = new Map<string, number>();

const syncThemeColorMeta = () => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) return;
  const ground = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-ground')
    .trim();
  if (ground) meta.content = ground;
};

/**
 * Puts `data-theme` on the document element for as long as the calling
 * component is mounted. :root carries Arcane Casters, the product the site is
 * about, so almost nothing calls this. The studio's own pages call it with
 * THE_EVIL_ENT_THEME to take the studio ground for as long as they are open.
 */
export const useDocumentTheme = (theme: string) => {
  useEffect(() => {
    holders.set(theme, (holders.get(theme) ?? 0) + 1);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    syncThemeColorMeta();

    return () => {
      const left = (holders.get(theme) ?? 1) - 1;
      if (left > 0) {
        holders.set(theme, left);
        return;
      }

      holders.delete(theme);
      if (document.documentElement.getAttribute(THEME_ATTRIBUTE) === theme) {
        document.documentElement.removeAttribute(THEME_ATTRIBUTE);
        syncThemeColorMeta();
      }
    };
  }, [theme]);
};

/**
 * The studio's identity: abyss black, the crimson of the Ent's eyes. Only the
 * Team page opts in. Arcane Casters pages need no call at all — the game's
 * clearing is what :root already holds.
 */
export const THE_EVIL_ENT_THEME = 'the-evil-ent';

export default useDocumentTheme;
