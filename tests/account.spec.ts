import { test, expect, type Page, type Route } from '@playwright/test';

const ACCOUNT = 'https://account.theevilent.com';
const LOBBY = 'https://lobby.ac.theevilent.com';
const SHOTS = '/tmp/claude-1000';

interface MockOptions {
  signedIn?: boolean;
  lobbyDelete?: number;
  accountDelete?: number | number[];
  games?: unknown[];
}

// Every call is answered here; nothing reaches a real server. The browser still
// enforces CORS on fulfilled responses, so the mock answers preflights and
// sends the headers a credentialed cross-origin call needs.
const mockServers = async (page: Page, options: MockOptions = {}) => {
  const state = {
    signedIn: options.signedIn ?? false,
    calls: [] as string[],
    accountDeletes: [...[options.accountDelete ?? 200].flat()],
    accessSeq: 0,
    expireNextAccess: false,
    stale: false,
  };

  const reply = (route: Route, status: number, body?: unknown) => {
    const origin = route.request().headers()['origin'] ?? '';
    return route.fulfill({
      status,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'authorization, content-type, x-token-delivery, accept-language',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      },
      body: body === undefined ? '' : JSON.stringify(body),
    });
  };

  const handle = (side: 'account' | 'lobby') => async (route: Route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') return reply(route, 204);
    const url = new URL(request.url());
    const key = `${request.method()} ${url.pathname}`;
    state.calls.push(key);
    const bearer = request.headers()['authorization'];

    if (side === 'account') {
      if (key === 'POST /api/members/login') {
        const credentials = request.postDataJSON() as { email: string; password: string };
        expect(request.headers()['x-token-delivery']).toBe('cookie');
        if (credentials.password !== 'correct-horse') return reply(route, 401);
        state.signedIn = true;
        return reply(route, 200, { jwt: `access-${++state.accessSeq}`, expiresIn: 3600 });
      }
      if (key === 'POST /api/auth/refresh') {
        expect(request.headers()['x-token-delivery']).toBe('cookie');
        if (!state.signedIn) return reply(route, 401);
        return reply(route, 200, { jwt: `access-${++state.accessSeq}`, expiresIn: 3600 });
      }
      if (key === 'POST /api/auth/logout') {
        state.signedIn = false;
        return reply(route, 204);
      }
      if (key === 'GET /api/members/me') {
        if (state.expireNextAccess) {
          state.expireNextAccess = false;
          return reply(route, 401);
        }
        if (!bearer) return reply(route, 401);
        return reply(route, 200, { id: 7, name: 'Merlin', email: 'merlin@example.com' });
      }
      if (key === 'DELETE /api/members/me') {
        const status = state.accountDeletes.length > 1 ? state.accountDeletes.shift()! : state.accountDeletes[0];
        if (status < 300) state.signedIn = false;
        return reply(route, status);
      }
    } else {
      if (key === 'GET /api/users/mine/statistics/overview') {
        return reply(route, 200, { totalGameNum: 12, totalWinNum: 7, totalLoseNum: 4, totalDrawNum: 1 });
      }
      if (key === 'GET /api/users/mine/statistics/games') {
        const games = options.games ?? [
          { opponentId: 99, opponentName: 'Opponent', result: 'win', gameType: 'PVP', playedAt: '2026-10-01T12:30:00Z' },
          { opponentId: 98, opponentName: null, result: 'lose', gameType: 'PVP', playedAt: '2026-09-30T09:00:00Z' },
        ];
        return reply(route, 200, { games, page: 0, size: 10, totalPages: 1, last: true });
      }
      if (key === 'DELETE /api/users/mine') return reply(route, options.lobbyDelete ?? 200);
    }
    return reply(route, 404);
  };

  await page.route(`${ACCOUNT}/**`, handle('account'));
  await page.route(`${LOBBY}/**`, handle('lobby'));
  return state;
};

const logIn = async (page: Page) => {
  await page.getByLabel('이메일').fill('merlin@example.com');
  await page.getByLabel('비밀번호').fill('correct-horse');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
};

test('logged out shows the form, login shows the profile, nothing is stored', async ({ page }, testInfo) => {
  await mockServers(page);
  await page.goto('/arcane-casters/account');

  const email = page.getByLabel('이메일');
  await expect(email).toHaveAttribute('autocomplete', 'username');
  await expect(page.getByLabel('비밀번호')).toHaveAttribute('autocomplete', 'current-password');
  await expect(page.getByText('계정은 게임에서 만들 수 있어요.')).toBeVisible();
  await page.screenshot({ path: `${SHOTS}/website-account-login-ko.png`, fullPage: true });

  await logIn(page);

  await expect(page.getByRole('heading', { name: '내 정보', level: 1 })).toBeVisible();
  await expect(page.getByText('merlin@example.com')).toBeVisible();
  await expect(page.getByRole('main').getByText('Merlin', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Merlin' })).toBeVisible();
  await expect(page.getByText('승리', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '대전' }).first()).toBeVisible();
  expect(await page.getByRole('row').count()).toBe(3);
  // The opponent is an id only; it must not be shown.
  await expect(page.getByText('99')).toHaveCount(0);
  await page.screenshot({ path: `${SHOTS}/website-account-profile-ko.png`, fullPage: true });

  const storage = await page.evaluate(() => ({
    local: Object.entries(localStorage),
    session: Object.entries(sessionStorage),
    cookie: document.cookie,
  }));
  expect(JSON.stringify(storage)).not.toMatch(/access-\d/);
  expect(storage.session).toEqual([]);
  expect(storage.cookie).toBe('');
  testInfo.annotations.push({ type: 'storage', description: JSON.stringify(storage.local) });

  await page.getByRole('button', { name: /EN|English/ }).click();
  await expect(page.getByRole('heading', { name: 'My account', level: 1 })).toBeVisible();
  await page.screenshot({ path: `${SHOTS}/website-account-profile-en.png`, fullPage: true });
});

test('a wrong password shows a generic message and re-enables the form', async ({ page }) => {
  await mockServers(page);
  await page.goto('/arcane-casters/account');
  await page.getByLabel('이메일').fill('merlin@example.com');
  await page.getByLabel('비밀번호').fill('wrong-password');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: '맞지 않아요' })).toBeVisible();
  await expect(page.getByRole('button', { name: '로그인', exact: true })).toBeEnabled();
});

test('a failed network call is a normal login error', async ({ page }) => {
  await page.route(`${ACCOUNT}/**`, (route) => route.abort());
  await page.goto('/arcane-casters/account');
  await page.getByLabel('이메일').fill('merlin@example.com');
  await page.getByLabel('비밀번호').fill('correct-horse');
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: '지금은 로그인할 수 없어요' })).toBeVisible();
});

test('a reload restores the session from the refresh cookie', async ({ page }) => {
  const state = await mockServers(page);
  await page.goto('/arcane-casters/account');
  await logIn(page);
  await expect(page.getByRole('heading', { name: '내 정보', level: 1 })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: '내 정보', level: 1 })).toBeVisible();
  expect(state.calls).toContain('POST /api/auth/refresh');
});

test('an expired access token is refreshed once and the call retried', async ({ page }) => {
  const state = await mockServers(page, { signedIn: true });
  state.expireNextAccess = true;
  await page.goto('/arcane-casters/account');
  await expect(page.getByRole('heading', { name: '내 정보', level: 1 })).toBeVisible();
  expect(state.calls.filter((call) => call === 'POST /api/auth/refresh')).toHaveLength(2);
});

test('logout returns to the form', async ({ page }) => {
  const state = await mockServers(page);
  await page.goto('/arcane-casters/account');
  await logIn(page);
  await page.getByRole('button', { name: '로그아웃' }).click();
  await expect(page.getByRole('heading', { name: '로그인', level: 1 })).toBeVisible();
  expect(state.calls).toContain('POST /api/auth/logout');
  await expect(page.getByRole('link', { name: '로그인', exact: true })).toBeVisible();
});

const openDeleteDialog = async (page: Page) => {
  await page.getByRole('button', { name: '계정 삭제' }).click();
  return page.getByRole('dialog', { name: '계정을 삭제할까요?' });
};

test('delete needs the exact nickname, then removes lobby data and the account', async ({ page }) => {
  const state = await mockServers(page);
  await page.goto('/arcane-casters/account');
  await logIn(page);

  const dialog = await openDeleteDialog(page);
  const confirm = dialog.getByRole('button', { name: '영구 삭제' });
  await expect(confirm).toBeDisabled();
  await dialog.getByLabel(/닉네임/).fill('merlin');
  await expect(confirm).toBeDisabled();
  await dialog.getByLabel(/닉네임/).fill('Merlin');
  await expect(confirm).toBeEnabled();
  await page.screenshot({ path: `${SHOTS}/website-account-delete-dialog.png` });

  await confirm.click();
  await expect(page.getByRole('heading', { name: '계정을 삭제했어요' })).toBeVisible();
  const deletes = state.calls.filter((call) => call.startsWith('DELETE'));
  expect(deletes).toEqual(['DELETE /api/users/mine', 'DELETE /api/members/me']);
  expect(state.calls).toContain('POST /api/auth/logout');
});

test('a lobby 404 still deletes the account', async ({ page }) => {
  const state = await mockServers(page, { lobbyDelete: 404 });
  await page.goto('/arcane-casters/account');
  await logIn(page);
  const dialog = await openDeleteDialog(page);
  await dialog.getByLabel(/닉네임/).fill('Merlin');
  await dialog.getByRole('button', { name: '영구 삭제' }).click();
  await expect(page.getByRole('heading', { name: '계정을 삭제했어요' })).toBeVisible();
  expect(state.calls).toContain('DELETE /api/members/me');
});

test('a lobby failure stops before the account is touched', async ({ page }) => {
  const state = await mockServers(page, { lobbyDelete: 500 });
  await page.goto('/arcane-casters/account');
  await logIn(page);
  const dialog = await openDeleteDialog(page);
  await dialog.getByLabel(/닉네임/).fill('Merlin');
  await dialog.getByRole('button', { name: '영구 삭제' }).click();
  await expect(dialog.getByRole('alert').filter({ hasText: '게임 데이터를 지우지 못했어요' })).toBeVisible();
  expect(state.calls).not.toContain('DELETE /api/members/me');
});

test('an account failure shows a retry message and the retry succeeds after a lobby 404', async ({ page }) => {
  let lobbyDeletes = 0;
  const state = await mockServers(page, { accountDelete: [500, 200] });
  // The first lobby DELETE succeeds; on the retry the user row is gone.
  await page.route(`${LOBBY}/api/users/mine`, async (route) => {
    if (route.request().method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': route.request().headers()['origin'],
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'authorization',
          'Access-Control-Allow-Methods': 'DELETE',
        },
      });
    }
    lobbyDeletes += 1;
    state.calls.push('DELETE /api/users/mine');
    return route.fulfill({
      status: lobbyDeletes === 1 ? 200 : 404,
      headers: {
        'Access-Control-Allow-Origin': route.request().headers()['origin'],
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  });

  await page.goto('/arcane-casters/account');
  await logIn(page);
  const dialog = await openDeleteDialog(page);
  await dialog.getByLabel(/닉네임/).fill('Merlin');
  await dialog.getByRole('button', { name: '영구 삭제' }).click();
  await expect(dialog.getByRole('alert').filter({ hasText: '다시 시도해 주세요' })).toBeVisible();

  await dialog.getByRole('button', { name: '영구 삭제' }).click();
  await expect(page.getByRole('heading', { name: '계정을 삭제했어요' })).toBeVisible();
  expect(lobbyDeletes).toBe(2);
});

test('the account page fits a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockServers(page);
  await page.goto('/arcane-casters/account');
  await logIn(page);
  await expect(page.getByRole('heading', { name: '내 정보', level: 1 })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await page.screenshot({ path: `${SHOTS}/website-account-phone.png`, fullPage: true });
});
