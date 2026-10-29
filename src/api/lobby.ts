// The lobby server's public, read-only API. The base address is defined once,
// in src/account/config.ts, beside the account server's.
import { lobbyBaseUrl } from '../account/config';

export interface RankedPlayer {
  rank: number;
  name: string;
  mmr: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface RankingsResponse {
  updatedAt: string;
  players: RankedPlayer[];
}

export interface MagicStatistic {
  magicId: number;
  /** `magics.name` in the database, e.g. "fire_shot". */
  name: string;
  prefab: string | null;
  decks: number;
  /** 0..1 */
  pickRate: number;
  /** null means too few games to say. */
  winRate: number | null;
  casts: number;
}

export interface MagicStatisticsResponse {
  updatedAt: string;
  from: string;
  to: string;
  totalGames: number;
  magics: MagicStatistic[];
}

const REQUEST_TIMEOUT_MS = 10_000;

const getJson = async <T>(path: string, signal: AbortSignal): Promise<T> => {
  const timeout = new AbortController();
  const timer = window.setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS);
  const abort = () => timeout.abort();
  signal.addEventListener('abort', abort);
  try {
    const response = await fetch(`${lobbyBaseUrl}${path}`, {
      method: 'GET',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: timeout.signal,
    });
    if (!response.ok) throw new Error(`${path} responded ${response.status}`);
    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timer);
    signal.removeEventListener('abort', abort);
  }
};

export const fetchRankings = (signal: AbortSignal) =>
  getJson<RankingsResponse>('/api/public/rankings', signal).then((body) => {
    if (!Array.isArray(body?.players)) throw new Error('rankings body has no players');
    return body;
  });

export const fetchMagicStatistics = (signal: AbortSignal) =>
  getJson<MagicStatisticsResponse>('/api/public/statistics/magics', signal).then((body) => {
    if (!Array.isArray(body?.magics)) throw new Error('statistics body has no magics');
    return body;
  });
