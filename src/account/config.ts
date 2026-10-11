// Server base URLs. Both are same-site with theevilent.com, which is what lets
// the refresh-token cookie (SameSite=Lax) ride along on cross-origin fetches.
const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const accountBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_ACCOUNT_BASE_URL ?? 'https://account.theevilent.com',
);

export const lobbyBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_LOBBY_BASE_URL ?? 'https://lobby.ac.theevilent.com',
);

// Cloudflare's public always-pass test key. The real site key replaces it
// through VITE_TURNSTILE_SITE_KEY at build time.
export const turnstileSiteKey: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';
