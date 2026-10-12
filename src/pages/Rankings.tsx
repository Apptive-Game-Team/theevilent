import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import {
  fetchMagicStatistics,
  fetchRankings,
  type MagicStatisticsResponse,
  type RankingsResponse,
} from '../api/lobby';
import { findMagicConcept } from '../content/magicLookup';
import { getMagicName } from '../content/magicConcepts';
import { useCopy, useLanguage, type Language } from '../i18n/language';
import { getTabPath } from '../routing';
import { getSprite } from '../content/magicSprite';
import './Rankings.css';

const copy = {
  ko: {
    title: '랭킹',
    updated: '갱신',
    playersHeading: '플레이어 랭킹',
    magicsHeading: '마법 통계',
    window: (days: number) => `최근 ${days}일`,
    games: (count: string) => `${count}판 기준`,
    rank: '순위',
    player: '플레이어',
    mmr: 'MMR',
    record: '승/패/무',
    winRate: '승률',
    magic: '마법',
    pickRate: '선택률',
    casts: '사용 횟수',
    tooFew: '표본이 적어 승률을 계산하지 못했어요.',
    tooFewShort: '판 수가 적어요',
    noPlayers: '아직 랭킹에 오른 플레이어가 없어요.',
    noMagics: '이 기간에 집계된 마법이 없어요.',
    error: '통계를 불러오지 못했어요',
    errorHint: '잠시 뒤에 다시 시도해 주세요.',
    retry: '다시 시도',
    loading: '불러오는 중…',
    playersTable: '플레이어 랭킹 표',
    magicsTable: '마법 통계 표',
  },
  en: {
    title: 'Rankings',
    updated: 'Updated',
    playersHeading: 'Player Ranking',
    magicsHeading: 'Magic Statistics',
    window: (days: number) => `Last ${days} days`,
    games: (count: string) => `${count} games`,
    rank: 'Rank',
    player: 'Player',
    mmr: 'MMR',
    record: 'W/L/D',
    winRate: 'Win rate',
    magic: 'Magic',
    pickRate: 'Pick rate',
    casts: 'Casts',
    tooFew: 'Too few games to calculate a win rate.',
    tooFewShort: 'Too few games',
    noPlayers: 'No players are ranked yet.',
    noMagics: 'No magic was counted in this period.',
    error: 'Could not load the statistics',
    errorHint: 'Please try again in a moment.',
    retry: 'Try again',
    loading: 'Loading…',
    playersTable: 'Player ranking table',
    magicsTable: 'Magic statistics table',
  },
};

/* -------------------------------------------------------------------------
   Loading: the result is stored with the attempt that produced it, so a retry
   reads as "loading" until its own result lands, without a setState in the
   effect body.
   ------------------------------------------------------------------------- */
type Settled<T> = { attempt: number; data: T | null };

type Remote<T> = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: T };

const useRemote = <T,>(load: (signal: AbortSignal) => Promise<T>): [Remote<T>, () => void] => {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setSettled({ attempt, data });
      },
      () => {
        if (!controller.signal.aborted) setSettled({ attempt, data: null });
      },
    );
    return () => controller.abort();
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  if (!settled || settled.attempt !== attempt) return [{ status: 'loading' }, retry];
  if (!settled.data) return [{ status: 'error' }, retry];
  return [{ status: 'ready', data: settled.data }, retry];
};

/* -------------------------------------------------------------------------
   Formatting
   ------------------------------------------------------------------------- */
const localeOf = (language: Language) => (language === 'ko' ? 'ko-KR' : 'en-US');

const formatPercent = (ratio: number, language: Language) =>
  new Intl.NumberFormat(localeOf(language), { style: 'percent', maximumFractionDigits: 1 }).format(ratio);

const formatCount = (count: number, language: Language) =>
  new Intl.NumberFormat(localeOf(language)).format(count);

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['day', 86_400_000],
  ['hour', 3_600_000],
  ['minute', 60_000],
];

const formatRelative = (iso: string, language: Language) => {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return null;
  const diff = time - Date.now();
  const format = new Intl.RelativeTimeFormat(localeOf(language), { numeric: 'auto' });
  for (const [unit, size] of UNITS) {
    if (Math.abs(diff) >= size) return format.format(Math.round(diff / size), unit);
  }
  return format.format(0, 'minute');
};

const formatLocal = (iso: string, language: Language) => {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return '';
  return new Intl.DateTimeFormat(localeOf(language), { dateStyle: 'medium', timeStyle: 'short' }).format(time);
};

const windowDays = (statistics: MagicStatisticsResponse) => {
  const span = Date.parse(statistics.to) - Date.parse(statistics.from);
  return Number.isFinite(span) && span > 0 ? Math.max(1, Math.round(span / 86_400_000)) : null;
};

/* -------------------------------------------------------------------------
   Pieces
   ------------------------------------------------------------------------- */
const UpdatedAt: React.FC<{ iso: string }> = ({ iso }) => {
  const { language } = useLanguage();
  const t = useCopy(copy);
  const relative = formatRelative(iso, language);
  if (!relative) return null;
  return (
    <time className="rankings-updated" dateTime={iso} title={formatLocal(iso, language)}>
      {t.updated} {relative}
    </time>
  );
};

const SkeletonRows: React.FC<{ columns: number; label: string }> = ({ columns, label }) => (
  <div className="rankings-skeleton" role="status" aria-live="polite">
    <span className="rankings-visually-hidden">{label}</span>
    {Array.from({ length: 6 }, (_, row) => (
      <div className="rankings-skeleton-row" key={row} aria-hidden="true">
        {Array.from({ length: columns }, (_, column) => (
          <span key={column} className={column === 1 ? 'is-wide' : undefined} />
        ))}
      </div>
    ))}
  </div>
);

const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const t = useCopy(copy);
  return (
    <div className="rankings-state" role="alert">
      <p className="rankings-state-title">{t.error}</p>
      <p>{t.errorHint}</p>
      <button type="button" className="flat-btn rankings-retry" onClick={onRetry}>
        <RefreshCw size={18} strokeWidth={3} aria-hidden="true" />
        {t.retry}
      </button>
    </div>
  );
};

const PlayersSection: React.FC = () => {
  const { language } = useLanguage();
  const t = useCopy(copy);
  const [remote, retry] = useRemote<RankingsResponse>(fetchRankings);

  return (
    <section className="rankings-section" aria-labelledby="rankings-players-heading">
      <header className="rankings-section-head">
        <h2 id="rankings-players-heading" className="text-title">{t.playersHeading}</h2>
        {remote.status === 'ready' && <UpdatedAt iso={remote.data.updatedAt} />}
      </header>

      <div className="flat-card rankings-card">
        {remote.status === 'loading' && <SkeletonRows columns={5} label={t.loading} />}
        {remote.status === 'error' && <ErrorState onRetry={retry} />}
        {remote.status === 'ready' && remote.data.players.length === 0 && (
          <p className="rankings-state">{t.noPlayers}</p>
        )}
        {remote.status === 'ready' && remote.data.players.length > 0 && (
          <div className="rankings-scroll" tabIndex={0} role="region" aria-label={t.playersTable}>
            <table className="rankings-table">
              <thead>
                <tr>
                  <th scope="col" className="is-number">{t.rank}</th>
                  <th scope="col">{t.player}</th>
                  <th scope="col" className="is-number">{t.mmr}</th>
                  <th scope="col" className="is-number">{t.record}</th>
                  <th scope="col" className="is-number">{t.winRate}</th>
                </tr>
              </thead>
              <tbody>
                {remote.data.players.map((player) => {
                  const decided = player.wins + player.losses;
                  return (
                    <tr key={`${player.rank}-${player.name}`}>
                      <td className="is-number rankings-rank">{player.rank}</td>
                      <th scope="row" className="rankings-name" translate="no">{player.name}</th>
                      <td className="is-number">{formatCount(player.mmr, language)}</td>
                      <td className="is-number">
                        {player.wins}/{player.losses}/{player.draws}
                      </td>
                      <td className="is-number">
                        {decided > 0 ? formatPercent(player.wins / decided, language) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

const MagicName: React.FC<{ name: string; prefab: string | null }> = ({ name, prefab }) => {
  const { language } = useLanguage();
  const concept = findMagicConcept(name, prefab);
  if (!concept) {
    return (
      <span className="rankings-magic">
        <span className="rankings-sprite" aria-hidden="true" />
        <span className="rankings-magic-name" translate="no">{name}</span>
      </span>
    );
  }
  const sprite = getSprite(concept.bean);
  return (
    <a className="rankings-magic" href={getTabPath('magic', concept.bean)}>
      <span className="rankings-sprite">
        {sprite && (
          <img alt="" src={sprite.src} width={sprite.width} height={sprite.height} loading="lazy" decoding="async" />
        )}
      </span>
      <span className="rankings-magic-name">{getMagicName(concept, language)}</span>
    </a>
  );
};

const MagicsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = useCopy(copy);
  const [remote, retry] = useRemote<MagicStatisticsResponse>(fetchMagicStatistics);
  const days = remote.status === 'ready' ? windowDays(remote.data) : null;

  const magics =
    remote.status === 'ready' ? [...remote.data.magics].sort((a, b) => b.pickRate - a.pickRate) : [];

  return (
    <section className="rankings-section" aria-labelledby="rankings-magics-heading">
      <header className="rankings-section-head">
        <h2 id="rankings-magics-heading" className="text-title">{t.magicsHeading}</h2>
        {remote.status === 'ready' && <UpdatedAt iso={remote.data.updatedAt} />}
      </header>
      {remote.status === 'ready' && (
        <p className="rankings-note">
          {days !== null && `${t.window(days)} · `}
          {t.games(formatCount(remote.data.totalGames, language))}
        </p>
      )}

      <div className="flat-card rankings-card">
        {remote.status === 'loading' && <SkeletonRows columns={4} label={t.loading} />}
        {remote.status === 'error' && <ErrorState onRetry={retry} />}
        {remote.status === 'ready' && magics.length === 0 && <p className="rankings-state">{t.noMagics}</p>}
        {remote.status === 'ready' && magics.length > 0 && (
          <div className="rankings-scroll" tabIndex={0} role="region" aria-label={t.magicsTable}>
            <table className="rankings-table">
              <thead>
                <tr>
                  <th scope="col">{t.magic}</th>
                  <th scope="col" className="is-number">{t.pickRate}</th>
                  <th scope="col" className="is-number">{t.winRate}</th>
                  <th scope="col" className="is-number">{t.casts}</th>
                </tr>
              </thead>
              <tbody>
                {magics.map((magic) => (
                  <tr key={magic.magicId}>
                    <th scope="row" className="rankings-magic-cell">
                      <MagicName name={magic.name} prefab={magic.prefab} />
                    </th>
                    <td className="is-number">{formatPercent(magic.pickRate, language)}</td>
                    <td className="is-number">
                      {magic.winRate === null ? (
                        <span className="rankings-unknown" title={t.tooFew} aria-label={t.tooFew}>
                          —
                        </span>
                      ) : (
                        formatPercent(magic.winRate, language)
                      )}
                    </td>
                    <td className="is-number">{formatCount(magic.casts, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

const Rankings: React.FC = () => {
  const t = useCopy(copy);
  return (
    <div className="container rankings-page">
      <h1 className="text-title rankings-title">{t.title}</h1>
      <PlayersSection />
      <MagicsSection />
    </div>
  );
};

export default Rankings;
