import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccountContext, type SessionStatus } from './accountContext';
import {
  ApiError,
  accountUrl,
  requestLogin,
  requestLogout,
  requestRefresh,
  type Member,
} from './api';

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SessionStatus>('restoring');
  const [member, setMember] = useState<Member | null>(null);
  // The access token lives here and nowhere else: not in state that renders,
  // and never in localStorage, sessionStorage or a cookie.
  const accessToken = useRef<string | null>(null);
  const refreshInFlight = useRef<Promise<string> | null>(null);

  const clearSession = useCallback(() => {
    accessToken.current = null;
    setMember(null);
    setStatus('signedOut');
  }, []);

  // One refresh at a time. The refresh token rotates, so two overlapping calls
  // (React StrictMode's double effect, or two 401s at once) would make the
  // second one fail with a token the first already replaced.
  const refreshAccessToken = useCallback((): Promise<string> => {
    if (!refreshInFlight.current) {
      refreshInFlight.current = requestRefresh()
        .then((token) => {
          accessToken.current = token;
          return token;
        })
        .finally(() => {
          refreshInFlight.current = null;
        });
    }
    return refreshInFlight.current;
  }, []);

  const authorizedFetch = useCallback(
    async (url: string, init: RequestInit = {}): Promise<Response> => {
      const send = (token: string | null) => {
        const headers = new Headers(init.headers);
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return fetch(url, { ...init, headers });
      };

      const first = await send(accessToken.current);
      if (first.status !== 401) return first;

      let token: string;
      try {
        token = await refreshAccessToken();
      } catch {
        clearSession();
        return first;
      }
      const second = await send(token);
      if (second.status === 401) clearSession();
      return second;
    },
    [refreshAccessToken, clearSession],
  );

  const loadMember = useCallback(async (): Promise<Member> => {
    const response = await authorizedFetch(accountUrl('/api/members/me'));
    if (!response.ok) throw new ApiError(response.status);
    const body = (await response.json()) as Member;
    return { id: body.id, name: body.name, email: body.email };
  }, [authorizedFetch]);

  useEffect(() => {
    let cancelled = false;
    refreshAccessToken()
      .then(loadMember)
      .then((loaded) => {
        if (cancelled) return;
        setMember(loaded);
        setStatus('signedIn');
      })
      .catch(() => {
        if (!cancelled) clearSession();
      });
    return () => {
      cancelled = true;
    };
  }, [refreshAccessToken, loadMember, clearSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      accessToken.current = await requestLogin(email, password);
      try {
        setMember(await loadMember());
        setStatus('signedIn');
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [loadMember, clearSession],
  );

  const logout = useCallback(async () => {
    try {
      await requestLogout();
    } catch {
      // The server may already have forgotten the token; the local session
      // ends either way.
    }
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ status, member, login, logout, authorizedFetch }),
    [status, member, login, logout, authorizedFetch],
  );
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export default AccountProvider;
