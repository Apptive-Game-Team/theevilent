import { test, expect, type Page } from '@playwright/test';

const shot = (name: string) => `/tmp/claude-1000/website-rankings-${name}.png`;

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

const rankings = {
  updatedAt: hoursAgo(2),
  players: [
    { rank: 1, name: 'Aria', mmr: 1840, wins: 52, losses: 18, draws: 2 },
    { rank: 2, name: 'Bolt', mmr: 1795, wins: 40, losses: 20, draws: 0 },
    { rank: 3, name: 'AVeryLongNicknameThatKeepsGoingAndGoing', mmr: 1730, wins: 31, losses: 29, draws: 4 },
    { rank: 4, name: 'Newcomer', mmr: 1500, wins: 0, losses: 0, draws: 5 },
  ],
};

const statistics = {
  updatedAt: hoursAgo(1),
  from: new Date(Date.now() - 30 * 86_400_000).toISOString(),
  to: new Date().toISOString(),
  totalGames: 1284,
  magics: [
    { magicId: 7, name: 'fire_shot', prefab: 'fire_shot', decks: 900, pickRate: 0.42, winRate: 0.531, casts: 15230 },
    { magicId: 9, name: 'ChainLightning', prefab: null, decks: 500, pickRate: 0.31, winRate: null, casts: 4210 },
    { magicId: 999, name: 'mystery_spell', prefab: 'nowhere', decks: 10, pickRate: 0.02, winRate: 0.4, casts: 12 },
  ],
};

const mockApi = async (page: Page, mode: 'ok' | 'fail' | 'empty') => {
  await page.route('**/api/public/rankings', (route) => {
    if (mode === 'fail') return route.abort();
    return route.fulfill({ json: mode === 'empty' ? { ...rankings, players: [] } : rankings });
  });
  await page.route('**/api/public/statistics/magics', (route) => {
    if (mode === 'fail') return route.fulfill({ status: 503, body: 'down' });
    return route.fulfill({ json: mode === 'empty' ? { ...statistics, magics: [] } : statistics });
  });
};

test('populated page shows both tables in Korean', async ({ page }) => {
  await mockApi(page, 'ok');
  await page.goto('/arcane-casters/rankings');

  await expect(page.getByRole('heading', { name: '랭킹', level: 1 })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Aria' })).toBeVisible();
  await expect(page.getByText('52/18/2')).toBeVisible();
  await expect(page.getByText('74.3%')).toBeVisible(); // 52 / (52 + 18)
  await expect(page.getByText('최근 30일 · 1,284판 기준')).toBeVisible();

  // Mapped magics link to the compendium; the unknown one is plain text.
  await expect(page.locator('a[href="/arcane-casters/magic/fire_shot"]')).toBeVisible();
  await expect(page.locator('a[href="/arcane-casters/magic/chain_lightning"]')).toBeVisible();
  await expect(page.getByText('mystery_spell')).toBeVisible();
  await expect(page.locator('a[href*="mystery"]')).toHaveCount(0);

  // A null win rate shows a dash with the explanation.
  await expect(page.getByLabel('표본이 적어 승률을 계산하지 못했어요.')).toHaveText('—');

  await page.waitForTimeout(500);
  await page.screenshot({ path: shot('populated-ko'), fullPage: true });
});

test('populated page in English', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('arcane-casters-language', 'en'));
  await mockApi(page, 'ok');
  await page.goto('/arcane-casters/rankings');

  await expect(page.getByRole('heading', { name: 'Rankings', level: 1 })).toBeVisible();
  await expect(page.getByText('Last 30 days · 1,284 games')).toBeVisible();
  await expect(page.getByLabel('Too few games to calculate a win rate.')).toBeVisible();
  await page.waitForTimeout(500);
  await page.screenshot({ path: shot('populated-en'), fullPage: true });
});

test('failed requests show the error state, not a crash', async ({ page }) => {
  await mockApi(page, 'fail');
  await page.goto('/arcane-casters/rankings');

  await expect(page.getByText('통계를 불러오지 못했어요')).toHaveCount(2);
  await expect(page.getByRole('button', { name: '다시 시도' })).toHaveCount(2);
  await page.screenshot({ path: shot('error'), fullPage: true });

  // Retry works once the API is back.
  await page.unrouteAll();
  await mockApi(page, 'ok');
  await page.getByRole('button', { name: '다시 시도' }).first().click();
  await expect(page.getByRole('rowheader', { name: 'Aria' })).toBeVisible();
});

test('empty responses show the empty state', async ({ page }) => {
  await mockApi(page, 'empty');
  await page.goto('/arcane-casters/rankings');
  await expect(page.getByText('아직 랭킹에 오른 플레이어가 없어요.')).toBeVisible();
  await expect(page.getByText('이 기간에 집계된 마법이 없어요.')).toBeVisible();
});

test.describe('phone width', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test('the page does not scroll sideways', async ({ page }) => {
    await mockApi(page, 'ok');
    await page.goto('/arcane-casters/rankings');
    await expect(page.getByRole('rowheader', { name: 'Aria' })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({ path: shot('phone'), fullPage: true });
  });
});

test('the menu reaches the page', async ({ page }) => {
  await mockApi(page, 'ok');
  await page.goto('/team');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('button', { name: '게임', exact: true }).click();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: '랭킹' }).click();
  await expect(page).toHaveURL(/\/arcane-casters\/rankings$/);
});
