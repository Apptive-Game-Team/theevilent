// Server base URLs. Both are same-site with theevilent.com, which is what lets
// the refresh-token cookie (SameSite=Lax) ride along on cross-origin fetches.
const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const accountBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_ACCOUNT_BASE_URL ?? 'https://account.theevilent.com',
);

export const lobbyBaseUrl = trimTrailingSlash(
  import.meta.env.VITE_LOBBY_BASE_URL ?? 'https://lobby.ac.theevilent.com',
);
