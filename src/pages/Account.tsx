import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useAccount } from '../account/accountContext';
import {
  ApiError,
  accountUrl,
  classifyJoinFailure,
  lobbyUrl,
  type GamesPage,
  type StatisticsOverview,
} from '../account/api';
import Turnstile from '../account/Turnstile';
import { useCopy, useLanguage } from '../i18n/language';
import './Account.css';

const copy = {
  ko: {
    title: '내 정보',
    loginTitle: '로그인',
    restoring: '불러오고 있어요…',
    email: '이메일',
    password: '비밀번호',
    emailPlaceholder: 'name@example.com',
    submit: '로그인',
    submitting: '로그인하는 중…',
    loginFailed: '이메일이나 비밀번호가 맞지 않아요.',
    loginUnavailable: '지금은 로그인할 수 없어요. 잠시 뒤에 다시 시도해 주세요.',
    tabLogin: '로그인',
    tabSignUp: '회원가입',
    modeLabel: '로그인 또는 회원가입',
    signUpTitle: '회원가입',
    guestNotice:
      '게임에서 손님으로 플레이했다면, 진행 상황을 이어 가려면 게임 안에서 가입해 주세요. 여기서 가입하면 비어 있는 새 계정이 만들어져요.',
    nicknameField: '닉네임',
    nicknameHint: '31자까지 쓸 수 있어요.',
    passwordHint: '8자 이상으로 정해 주세요.',
    passwordConfirm: '비밀번호 확인',
    signUpSubmit: '가입하기',
    signingUp: '가입하는 중…',
    captchaWaiting: '아래 확인을 마치면 가입할 수 있어요.',
    errEmail: '이메일 형식이 맞지 않아요.',
    errNickname: '닉네임을 1자 이상 31자 이하로 적어 주세요.',
    errPassword: '비밀번호는 8자 이상이어야 해요.',
    errConfirm: '비밀번호가 서로 달라요.',
    signUpErrors: {
      captcha: '자동 가입 방지 확인에 실패했어요. 확인을 다시 마치고 시도해 주세요.',
      duplicateEmail: '이미 쓰고 있는 이메일이에요.',
      duplicate: '이미 쓰고 있는 이메일이나 닉네임이에요.',
      tooMany: '시도가 너무 많아요. 잠시 뒤에 다시 시도해 주세요.',
      invalid: '입력한 내용을 다시 확인해 주세요.',
      unavailable: '지금은 가입할 수 없어요. 잠시 뒤에 다시 시도해 주세요.',
    } as Record<string, string>,
    nickname: '닉네임',
    stats: '전적',
    total: '전체',
    wins: '승리',
    losses: '패배',
    draws: '무승부',
    recent: '최근 경기',
    noGames: '아직 경기 기록이 없어요.',
    statsFailed: '전적을 불러오지 못했어요.',
    loadMore: '더 보기',
    gameResult: { win: '승리', lose: '패배', draw: '무승부' } as Record<string, string>,
    gameType: { PVP: '대전' } as Record<string, string>,
    colDate: '날짜',
    colType: '종류',
    colResult: '결과',
    logout: '로그아웃',
    loggingOut: '로그아웃하는 중…',
    dangerTitle: '계정 삭제',
    dangerBody: '계정과 게임 데이터를 지워요. 한 번 지우면 되돌릴 수 없어요.',
    deleteOpen: '계정 삭제',
    dialogTitle: '계정을 삭제할까요?',
    dialogDeletes:
      '계정, 닉네임, 이메일, 덱, 전적을 포함한 게임 데이터가 모두 지워져요. 지운 뒤에는 되돌릴 수 없어요.',
    dialogPrompt: (name: string) => `확인을 위해 닉네임 “${name}”을(를) 그대로 입력해 주세요.`,
    cancel: '취소',
    confirmDelete: '영구 삭제',
    deleting: '삭제하는 중…',
    deleteGameFailed:
      '게임 데이터를 지우지 못했어요. 아직 계정은 그대로예요. 잠시 뒤에 다시 시도해 주세요.',
    deleteAccountFailed:
      '게임 데이터는 지웠지만 계정을 지우지 못했어요. 같은 버튼으로 다시 시도해 주세요.',
    deletedTitle: '계정을 삭제했어요',
    deletedBody: '그동안 함께해 주셔서 고마워요.',
    deletedLogin: '로그인 화면으로',
  },
  en: {
    title: 'My account',
    loginTitle: 'Log in',
    restoring: 'Loading…',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'name@example.com',
    submit: 'Log in',
    submitting: 'Logging in…',
    loginFailed: 'The email or password is incorrect.',
    loginUnavailable: 'Logging in is unavailable right now. Please try again in a moment.',
    tabLogin: 'Log in',
    tabSignUp: 'Sign up',
    modeLabel: 'Log in or sign up',
    signUpTitle: 'Sign up',
    guestNotice:
      'If you play as a guest in the game, register inside the game to keep your progress. Signing up here creates a new, empty account.',
    nicknameField: 'Nickname',
    nicknameHint: 'Up to 31 characters.',
    passwordHint: 'At least 8 characters.',
    passwordConfirm: 'Confirm password',
    signUpSubmit: 'Sign up',
    signingUp: 'Signing up…',
    captchaWaiting: 'Finish the check below to sign up.',
    errEmail: 'Enter a valid email address.',
    errNickname: 'Enter a nickname of 1 to 31 characters.',
    errPassword: 'The password must be at least 8 characters.',
    errConfirm: 'The passwords do not match.',
    signUpErrors: {
      captcha: 'The bot check failed. Complete it again and retry.',
      duplicateEmail: 'That email is already in use.',
      duplicate: 'That email or nickname is already in use.',
      tooMany: 'Too many attempts. Please try again in a moment.',
      invalid: 'Please check what you entered.',
      unavailable: 'Signing up is unavailable right now. Please try again in a moment.',
    } as Record<string, string>,
    nickname: 'Nickname',
    stats: 'Record',
    total: 'Games',
    wins: 'Wins',
    losses: 'Losses',
    draws: 'Draws',
    recent: 'Recent games',
    noGames: 'No games played yet.',
    statsFailed: 'Could not load your record.',
    loadMore: 'Show more',
    gameResult: { win: 'Win', lose: 'Loss', draw: 'Draw' } as Record<string, string>,
    gameType: { PVP: 'PvP' } as Record<string, string>,
    colDate: 'Date',
    colType: 'Mode',
    colResult: 'Result',
    logout: 'Log out',
    loggingOut: 'Logging out…',
    dangerTitle: 'Delete account',
    dangerBody: 'This deletes your account and game data. It cannot be undone.',
    deleteOpen: 'Delete account',
    dialogTitle: 'Delete your account?',
    dialogDeletes:
      'Your account, nickname, email, and game data including decks and match record will be deleted. This cannot be undone.',
    dialogPrompt: (name: string) => `To confirm, type your nickname “${name}” exactly.`,
    cancel: 'Cancel',
    confirmDelete: 'Delete permanently',
    deleting: 'Deleting…',
    deleteGameFailed:
      'Could not delete your game data. Your account is unchanged. Please try again in a moment.',
    deleteAccountFailed:
      'Your game data was deleted, but the account was not. Press the same button to try again.',
    deletedTitle: 'Your account is deleted',
    deletedBody: 'Thanks for playing with us.',
    deletedLogin: 'Back to log in',
  },
};

type Copy = typeof copy.ko;

const gamesPageSize = 10;

const LoginForm: React.FC<{ t: Copy }> = ({ t }) => {
  const { login } = useAccount();
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (caught) {
      // Wrong credentials and a malformed email are both 4xx. A network or
      // CORS failure has no status at all, and a 5xx is the server's fault.
      const rejected = caught instanceof ApiError && caught.status >= 400 && caught.status < 500;
      setError(rejected ? t.loginFailed : t.loginUnavailable);
      setPending(false);
    }
  };

  return (
    <form className="flat-card account-card account-form" onSubmit={submit} noValidate>
      <h1 className="account-heading">{t.loginTitle}</h1>
      <div className="account-field">
        <label htmlFor={emailId}>{t.email}</label>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          spellCheck={false}
          required
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      <div className="account-field">
        <label htmlFor={passwordId}>{t.password}</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      <p id={errorId} className="account-error" role="alert">
        {error}
      </p>
      <button type="submit" className="flat-btn flat-btn-primary" disabled={pending}>
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignUpField = 'email' | 'name' | 'password' | 'confirm';

const SignUpForm: React.FC<{ t: Copy }> = ({ t }) => {
  const { signUp } = useAccount();
  const ids = { email: useId(), name: useId(), password: useId(), confirm: useId() };
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<SignUpField, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const found: Partial<Record<SignUpField, string>> = {};
    if (!emailPattern.test(email.trim())) found.email = t.errEmail;
    if (name.trim() === '' || name.length > 31) found.name = t.errNickname;
    if (password.length < 8) found.password = t.errPassword;
    if (confirm !== password) found.confirm = t.errConfirm;
    return found;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token || pending) return;
    const found = validate();
    setFieldErrors(found);
    setError(null);
    const first = (['email', 'name', 'password', 'confirm'] as SignUpField[]).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPending(true);
    try {
      await signUp(email.trim(), name.trim(), password, token);
    } catch (caught) {
      setError(t.signUpErrors[classifyJoinFailure(caught)]);
      setPending(false);
      // A captcha token works once, so a failed attempt needs a fresh one.
      setResetSignal((n) => n + 1);
    }
  };

  const field = (
    key: SignUpField,
    label: string,
    value: string,
    set: (v: string) => void,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    hint?: string,
  ) => (
    <div className="account-field">
      <label htmlFor={ids[key]}>{label}</label>
      <input
        id={ids[key]}
        name={key}
        required
        value={value}
        onChange={(event) => set(event.target.value)}
        aria-invalid={fieldErrors[key] ? true : undefined}
        aria-describedby={fieldErrors[key] ? `${ids[key]}-error` : undefined}
        {...props}
      />
      {hint && !fieldErrors[key] && <span className="account-hint">{hint}</span>}
      {fieldErrors[key] && (
        <span id={`${ids[key]}-error`} className="account-error">
          {fieldErrors[key]}
        </span>
      )}
    </div>
  );

  return (
    <form ref={formRef} className="flat-card account-card account-form" onSubmit={submit} noValidate>
      <h1 className="account-heading">{t.signUpTitle}</h1>
      <p className="account-notice">{t.guestNotice}</p>
      {field('email', t.email, email, setEmail, {
        type: 'email',
        inputMode: 'email',
        autoComplete: 'email',
        spellCheck: false,
        placeholder: t.emailPlaceholder,
      })}
      {field('name', t.nicknameField, name, setName, {
        type: 'text',
        autoComplete: 'nickname',
        maxLength: 31,
        spellCheck: false,
      }, t.nicknameHint)}
      {field('password', t.password, password, setPassword, {
        type: 'password',
        autoComplete: 'new-password',
      }, t.passwordHint)}
      {field('confirm', t.passwordConfirm, confirm, setConfirm, {
        type: 'password',
        autoComplete: 'new-password',
      })}
      <Turnstile onToken={setToken} resetSignal={resetSignal} />
      <p id={errorId} className="account-error" role="alert">
        {error}
      </p>
      <button type="submit" className="flat-btn flat-btn-primary" disabled={pending || !token}>
        {pending ? t.signingUp : t.signUpSubmit}
      </button>
      {!token && !pending && <p className="account-hint">{t.captchaWaiting}</p>}
    </form>
  );
};

const AuthPanel: React.FC<{ t: Copy }> = ({ t }) => {
  const [mode, setMode] = useState<'login' | 'signUp'>('login');
  return (
    <>
      <div className="segmented account-mode" role="group" aria-label={t.modeLabel}>
        <button type="button" aria-pressed={mode === 'login'} onClick={() => setMode('login')}>
          {t.tabLogin}
        </button>
        <button type="button" aria-pressed={mode === 'signUp'} onClick={() => setMode('signUp')}>
          {t.tabSignUp}
        </button>
      </div>
      {mode === 'login' ? <LoginForm t={t} /> : <SignUpForm t={t} />}
    </>
  );
};

const Stats: React.FC<{ t: Copy }> = ({ t }) => {
  const { authorizedFetch } = useAccount();
  const { language } = useLanguage();
  const [overview, setOverview] = useState<StatisticsOverview | null>(null);
  const [games, setGames] = useState<GamesPage | null>(null);
  const [failed, setFailed] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchGames = useCallback(
    async (page: number): Promise<GamesPage> => {
      const response = await authorizedFetch(
        lobbyUrl(`/api/users/mine/statistics/games?page=${page}&size=${gamesPageSize}`),
      );
      if (!response.ok) throw new ApiError(response.status);
      return (await response.json()) as GamesPage;
    },
    [authorizedFetch],
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await authorizedFetch(lobbyUrl('/api/users/mine/statistics/overview'));
        if (!response.ok) throw new ApiError(response.status);
        const loadedOverview = (await response.json()) as StatisticsOverview;
        const firstPage = await fetchGames(0);
        if (cancelled) return;
        setOverview(loadedOverview);
        setGames(firstPage);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [authorizedFetch, fetchGames]);

  const loadMore = async () => {
    if (!games) return;
    setLoadingMore(true);
    try {
      const next = await fetchGames(games.page + 1);
      setGames({ ...next, games: [...games.games, ...next.games] });
    } catch {
      setFailed(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const formatDate = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <section className="flat-card account-card" aria-labelledby="account-stats-title">
      <h2 id="account-stats-title" className="account-subheading">
        {t.stats}
      </h2>
      {failed && (
        <p className="account-error" role="alert">
          {t.statsFailed}
        </p>
      )}
      {overview && (
        <dl className="account-totals">
          <div>
            <dt>{t.total}</dt>
            <dd>{overview.totalGameNum}</dd>
          </div>
          <div>
            <dt>{t.wins}</dt>
            <dd>{overview.totalWinNum}</dd>
          </div>
          <div>
            <dt>{t.losses}</dt>
            <dd>{overview.totalLoseNum}</dd>
          </div>
          <div>
            <dt>{t.draws}</dt>
            <dd>{overview.totalDrawNum}</dd>
          </div>
        </dl>
      )}
      {games && (
        <>
          <h3 className="account-subheading account-subheading-small">{t.recent}</h3>
          {games.games.length === 0 ? (
            <p className="account-hint">{t.noGames}</p>
          ) : (
            <div className="account-table-scroll">
              <table className="account-table">
                <thead>
                  <tr>
                    <th scope="col">{t.colDate}</th>
                    <th scope="col">{t.colType}</th>
                    <th scope="col">{t.colResult}</th>
                  </tr>
                </thead>
                <tbody>
                  {games.games.map((game, index) => (
                    <tr key={`${game.playedAt}-${index}`}>
                      <td>{formatDate.format(new Date(game.playedAt))}</td>
                      <td>{t.gameType[game.gameType] ?? game.gameType}</td>
                      <td>
                        <span className={`account-result account-result-${game.result}`}>
                          {t.gameResult[game.result] ?? game.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!games.last && (
            <button type="button" className="flat-btn" onClick={loadMore} disabled={loadingMore}>
              {t.loadMore}
            </button>
          )}
        </>
      )}
    </section>
  );
};

type DeleteFailure = 'game' | 'account' | null;

const DeleteDialog: React.FC<{
  t: Copy;
  nickname: string;
  onClose: () => void;
  onDeleted: () => void;
}> = ({ t, nickname, onClose, onDeleted }) => {
  const { authorizedFetch, logout } = useAccount();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputId = useId();
  const [typed, setTyped] = useState('');
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<DeleteFailure>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const matches = nickname !== '' && typed === nickname;

  const confirm = async () => {
    if (!matches || pending) return;
    setPending(true);
    setFailure(null);

    // Same order as the game client: the lobby's user row first, then the
    // account. A 404 means the user row is already gone (the lobby answers 404
    // for any failure to delete), which is what a retry after a half-finished
    // deletion looks like, so the account deletion goes on.
    try {
      const lobbyResponse = await authorizedFetch(lobbyUrl('/api/users/mine'), { method: 'DELETE' });
      if (!lobbyResponse.ok && lobbyResponse.status !== 404) throw new ApiError(lobbyResponse.status);
    } catch {
      setFailure('game');
      setPending(false);
      return;
    }

    try {
      const accountResponse = await authorizedFetch(accountUrl('/api/members/me'), {
        method: 'DELETE',
      });
      if (!accountResponse.ok) throw new ApiError(accountResponse.status);
    } catch {
      setFailure('account');
      setPending(false);
      return;
    }

    onDeleted();
    // The refresh token is dead with the account, so the logout call may fail.
    await logout();
  };

  return (
    <dialog
      ref={dialogRef}
      className="flat-card account-dialog"
      aria-labelledby="account-dialog-title"
      onCancel={(event) => {
        if (pending) event.preventDefault();
        else onClose();
      }}
    >
      <h2 id="account-dialog-title" className="account-subheading">
        {t.dialogTitle}
      </h2>
      <p>{t.dialogDeletes}</p>
      <div className="account-field">
        <label htmlFor={inputId}>{t.dialogPrompt(nickname)}</label>
        <input
          id={inputId}
          name="confirm-nickname"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          disabled={pending}
        />
      </div>
      <p className="account-error" role="alert">
        {failure === 'game' && t.deleteGameFailed}
        {failure === 'account' && t.deleteAccountFailed}
      </p>
      <div className="account-actions">
        <button type="button" className="flat-btn" onClick={onClose} disabled={pending}>
          {t.cancel}
        </button>
        <button
          type="button"
          className="flat-btn account-danger-btn"
          onClick={confirm}
          disabled={!matches || pending}
        >
          {pending ? t.deleting : t.confirmDelete}
        </button>
      </div>
    </dialog>
  );
};

const Profile: React.FC<{ t: Copy; onDeleted: () => void }> = ({ t, onDeleted }) => {
  const { member, logout } = useAccount();
  const [loggingOut, setLoggingOut] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!member) return null;

  return (
    <>
      <section className="flat-card account-card" aria-labelledby="account-title">
        <h1 id="account-title" className="account-heading">
          {t.title}
        </h1>
        <dl className="account-identity">
          <div>
            <dt>{t.nickname}</dt>
            <dd>{member.name}</dd>
          </div>
          <div>
            <dt>{t.email}</dt>
            <dd>{member.email}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="flat-btn"
          disabled={loggingOut}
          onClick={() => {
            setLoggingOut(true);
            void logout();
          }}
        >
          {loggingOut ? t.loggingOut : t.logout}
        </button>
      </section>

      <Stats t={t} />

      <section className="flat-card account-card" aria-labelledby="account-danger-title">
        <h2 id="account-danger-title" className="account-subheading">
          {t.dangerTitle}
        </h2>
        <p>{t.dangerBody}</p>
        <button type="button" className="flat-btn account-danger-btn" onClick={() => setDeleting(true)}>
          {t.deleteOpen}
        </button>
      </section>

      {deleting && (
        <DeleteDialog
          t={t}
          nickname={member.name}
          onClose={() => setDeleting(false)}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
};

export const Account: React.FC = () => {
  const t = useCopy(copy);
  const { status } = useAccount();
  const [deleted, setDeleted] = useState(false);

  let content: React.ReactNode;
  if (deleted) {
    content = (
      <section className="flat-card account-card" aria-labelledby="account-deleted-title">
        <h1 id="account-deleted-title" className="account-heading">
          {t.deletedTitle}
        </h1>
        <p role="status">{t.deletedBody}</p>
        <button type="button" className="flat-btn" onClick={() => setDeleted(false)}>
          {t.deletedLogin}
        </button>
      </section>
    );
  } else if (status === 'restoring') {
    content = (
      <p className="account-loading text-outline" role="status">
        {t.restoring}
      </p>
    );
  } else if (status === 'signedIn') {
    content = <Profile t={t} onDeleted={() => setDeleted(true)} />;
  } else {
    content = <AuthPanel t={t} />;
  }

  return <section className="grass account-page">{content}</section>;
};

export default Account;
