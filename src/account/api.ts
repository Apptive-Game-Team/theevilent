import { accountBaseUrl, lobbyBaseUrl } from './config';

export interface Member {
  id: number;
  name: string;
  email: string;
}

export interface StatisticsOverview {
  totalGameNum: number;
  totalWinNum: number;
  totalLoseNum: number;
  totalDrawNum: number;
}

export interface GameRecord {
  result: string;
  gameType: string;
  playedAt: string;
}

export interface GamesPage {
  games: GameRecord[];
  page: number;
  last: boolean;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

// The refresh token only ever travels as an HttpOnly cookie, so every call to
// the account server's auth endpoints asks for cookie delivery and includes
// credentials. Nothing here reads or stores a token outside memory.
const cookieDelivery = {
  headers: { 'X-Token-Delivery': 'cookie' },
  credentials: 'include' as const,
};

const readAccessToken = async (response: Response): Promise<string> => {
  if (!response.ok) throw new ApiError(response.status);
  const body: unknown = await response.json();
  const jwt = (body as { jwt?: unknown } | null)?.jwt;
  if (typeof jwt !== 'string' || jwt === '') throw new ApiError(response.status);
  return jwt;
};

export const requestLogin = async (email: string, password: string): Promise<string> =>
  readAccessToken(
    await fetch(`${accountBaseUrl}/api/members/login`, {
      method: 'POST',
      headers: { ...cookieDelivery.headers, 'Content-Type': 'application/json' },
      credentials: cookieDelivery.credentials,
      body: JSON.stringify({ email, password }),
    }),
  );

export const requestRefresh = async (): Promise<string> =>
  readAccessToken(
    await fetch(`${accountBaseUrl}/api/auth/refresh`, {
      method: 'POST',
      ...cookieDelivery,
    }),
  );

export const requestLogout = async (): Promise<void> => {
  await fetch(`${accountBaseUrl}/api/auth/logout`, { method: 'POST', ...cookieDelivery });
};

export const accountUrl = (path: string) => `${accountBaseUrl}${path}`;
export const lobbyUrl = (path: string) => `${lobbyBaseUrl}${path}`;
