import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'ko' | 'en';

export const languages: Language[] = ['ko', 'en'];

export const languageLabels: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
};

const STORAGE_KEY = 'arcane-casters-language';

// A stored choice wins; otherwise Korean readers get Korean and everyone else
// English. Storage can throw in a private window, so every access is guarded.
const getInitialLanguage = (): Language => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ko' || stored === 'en') return stored;
  } catch {
    // fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en';
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // the choice still holds for this visit
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

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
