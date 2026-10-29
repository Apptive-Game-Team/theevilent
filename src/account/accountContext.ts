import { createContext, useContext } from 'react';
import type { Member } from './api';

export type SessionStatus = 'restoring' | 'signedOut' | 'signedIn';

export interface AccountContextValue {
  status: SessionStatus;
  member: Member | null;
  /** Throws ApiError on a rejected login. */
  login: (email: string, password: string) => Promise<void>;
  /** Creates the account, then signs in with the tokens it returns. */
  signUp: (email: string, name: string, password: string, captchaToken: string) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * Fetch with the in-memory access token. A 401 triggers one refresh and one
   * retry; a second 401 ends the session.
   */
  authorizedFetch: (url: string, init?: RequestInit) => Promise<Response>;
}

export const AccountContext = createContext<AccountContextValue | null>(null);

export const useAccount = (): AccountContextValue => {
  const value = useContext(AccountContext);
  if (!value) throw new Error('useAccount must be used inside AccountProvider');
  return value;
};
