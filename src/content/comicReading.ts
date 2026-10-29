import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { comicEpisodes, getComicEpisode } from './comic';

export const comicReadingKey = 'arcane-casters:comic-reading:v1';
type Reading = { page: number; completed: boolean; updatedAt: number };
type History = Record<string, Reading>;

function readHistory(): History {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(comicReadingKey) ?? '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const result: History = {};
    for (const episode of comicEpisodes) {
      const value = (raw as Record<string, unknown>)[episode.id];
      if (!value || typeof value !== 'object') continue;
      const entry = value as Partial<Reading>;
      const total = getComicEpisode(episode.id)!.pages.length;
      if (typeof entry.page !== 'number' || !Number.isInteger(entry.page)) continue;
      result[episode.id] = {
        page: Math.max(1, Math.min(total, entry.page)), completed: entry.completed === true,
        updatedAt: typeof entry.updatedAt === 'number' && Number.isFinite(entry.updatedAt) ? entry.updatedAt : 0,
      };
    }
    return result;
  } catch {
    return {};
  }
}

export function useComicHistory() {
  const [history, setHistory] = useState(readHistory);
  useEffect(() => {
    const refresh = () => setHistory(readHistory());
    const sync = (event: StorageEvent) => {
      if (event.key === comicReadingKey || event.key === null) refresh();
    };
    window.addEventListener('storage', sync);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);
  return history;
}

export function useComicReading(episode: string, total: number) {
  const [history, setHistory] = useState(readHistory);
  const [initial] = useState(() => history[episode]);
  const pagesRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const match = /^#comic-page-(\d+)$/.exec(window.location.hash);
    if (!match || !total) return;
    const page = Number(match[1]);
    if (page < 1 || page > total) return;
    pagesRef.current?.querySelector(`[data-page="${page}"]`)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [episode, total]);

  useEffect(() => {
    if (!total || !pagesRef.current || !endRef.current || !('IntersectionObserver' in window)) return;
    let current = readHistory();
    const record = (page: number, completed = false) => {
      if (document.visibilityState === 'hidden') return;
      const previous = current[episode];
      const next = { page, completed: completed || previous?.completed === true, updatedAt: Date.now() };
      if (previous?.page === next.page && previous.completed === next.completed) return;
      current = { ...current, ...readHistory(), [episode]: next };
      try { localStorage.setItem(comicReadingKey, JSON.stringify(current)); } catch { /* 저장을 막은 브라우저에서도 읽기는 계속한다. */ }
      setHistory(current);
    };
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const page = Math.max(...visible.map(entry => Number((entry.target as HTMLElement).dataset.page)));
      record(page);
    }, { threshold: 0.35 });
    pagesRef.current.querySelectorAll('[data-page]').forEach(element => observer.observe(element));
    const endObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) record(total, true);
    }, { threshold: 1 });
    endObserver.observe(endRef.current);
    const sync = (event: StorageEvent) => {
      if (event.key === comicReadingKey || event.key === null) {
        current = readHistory();
        setHistory(current);
      }
    };
    window.addEventListener('storage', sync);
    return () => {
      observer.disconnect();
      endObserver.disconnect();
      window.removeEventListener('storage', sync);
    };
  }, [episode, total]);

  return {
    history, pagesRef, endRef,
    resumePage: initial && !initial.completed ? initial.page : 1,
  };
}
