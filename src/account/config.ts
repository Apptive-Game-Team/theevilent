// Server base URLs. Both are same-site with theevilent.com, which is what lets
// the refresh-token cookie (SameSite=Lax) ride along on cross-origin fetches.
const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const accountBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_ACCOUNT_BASE_URL ?? 'https://account.theevilent.com',
);

export const lobbyBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_LOBBY_BASE_URL ?? 'https://lobby.ac.theevilent.com',
);

// The widget registered for theevilent.com. A site key is public; the matching
// secret lives only in the account server's TURNSTILE_SECRET_KEY.
const productionTurnstileSiteKey = '0x4AAAAAAFUM-ms9zJdpMwVs';

// Cloudflare's public always-pass test key, for `npm run dev` on localhost,
// which the production widget does not list as a hostname.
const testTurnstileSiteKey = '1x00000000000000000000AA';

export const turnstileSiteKey: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ??
  (import.meta.env.DEV ? testTurnstileSiteKey : productionTurnstileSiteKey);
