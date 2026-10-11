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
  /** Raw response text. Only read to classify an error, never shown. */
  readonly detail: string;

  constructor(status: number, detail = '') {
    super(`HTTP ${status}`);
    this.status = status;
    this.detail = detail;
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

export const requestJoin = async (
  email: string,
  name: string,
  password: string,
  captchaToken: string,
): Promise<string> => {
  const response = await fetch(`${accountBaseUrl}/api/members`, {
    method: 'POST',
    headers: { ...cookieDelivery.headers, 'Content-Type': 'application/json' },
    credentials: cookieDelivery.credentials,
    body: JSON.stringify({ email, name, password, captchaToken }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new ApiError(response.status, detail);
  }
  return readAccessToken(response);
};

export type JoinFailure = 'captcha' | 'duplicateEmail' | 'duplicate' | 'tooMany' | 'invalid' | 'unavailable';

/**
 * The account server answers a taken email with 400 and "사용 중인 Email입니다.",
 * a database unique violation with "duplicated email", and the sign-up guard
 * with a 400 that mentions the captcha. The text is only matched here, never
 * shown.
 */
export const classifyJoinFailure = (error: unknown): JoinFailure => {
  if (!(error instanceof ApiError)) return 'unavailable';
  if (error.status === 429) return 'tooMany';
  if (error.status >= 500) return 'unavailable';
  if (error.status === 400) {
    if (/captcha|자동 가입/i.test(error.detail)) return 'captcha';
    if (/사용 중인 Email/i.test(error.detail)) return 'duplicateEmail';
    if (/duplicat/i.test(error.detail)) return 'duplicate';
    return 'invalid';
  }
  return 'invalid';
};

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
