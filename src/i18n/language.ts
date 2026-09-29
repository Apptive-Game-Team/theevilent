import { createContext, useContext } from 'react';

export type Language = 'ko' | 'en';

export const languages: Language[] = ['ko', 'en'];

export const languageLabels: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
};

export const STORAGE_KEY = 'arcane-casters-language';

// A stored choice wins; otherwise Korean readers get Korean and everyone else
// English. Storage can throw in a private window, so every access is guarded.
export const getInitialLanguage = (): Language => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ko' || stored === 'en') return stored;
  } catch {
    // fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en';
};

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = (): LanguageContextValue => {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
};

/**
 * Picks the current language's copy out of a dictionary the calling component
 * owns. Each component keeps its own strings beside it:
 *
 *   const copy = { ko: { play: '지금 플레이!' }, en: { play: 'Play Now!' } };
 *   const t = useCopy(copy);
 */
export const useCopy = <T,>(copy: Record<Language, T>): T => copy[useLanguage().language];
