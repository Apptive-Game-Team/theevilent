import React, { useEffect, useRef } from 'react';
import { turnstileSiteKey } from './config';
import { useLanguage } from '../i18n/language';

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      language: string;
      theme: 'light' | 'dark' | 'auto';
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const scriptUrl = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<TurnstileApi> | null = null;

// Loaded the first time a sign-up form opens, never on other pages.
const loadTurnstile = (): Promise<TurnstileApi> => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = () =>
        window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing'));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('turnstile failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

interface TurnstileProps {
  onToken: (token: string | null) => void;
  /** Change this number to reset the widget; a token works once. */
  resetSignal: number;
}

export const Turnstile: React.FC<TurnstileProps> = ({ onToken, resetSignal }) => {
  const { language } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useEffect(() => {
    let cancelled = false;
    const element = container.current;
    onTokenRef.current(null);
    loadTurnstile()
      .then((api) => {
        if (cancelled || !element) return;
        widgetId.current = api.render(element, {
          sitekey: turnstileSiteKey,
          language,
          theme: 'light',
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [language]);

  const firstReset = useRef(true);
  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false;
      return;
    }
    onTokenRef.current(null);
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetSignal]);

  return <div ref={container} className="account-turnstile" />;
};

export default Turnstile;
