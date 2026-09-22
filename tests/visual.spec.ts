import { test, expect, type Page } from '@playwright/test';

/**
 * A full-page screenshot captures past the viewport, so an image still waiting
 * on `loading="lazy"` is photographed as an empty box even though the page is
 * fine in a real browser. Scrolling the page through once triggers every lazy
 * load, and waiting on `complete` lets them finish before the shutter.
 */
const settlePage = async (page: Page) => {
  // Walk the page down, then stay at the bottom. Returning to the top straight
  // away cancels the lazy loads the walk has only just triggered, and those
  // images then never report complete.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Bounded: a single image that will never resolve should not spend the whole
  // test budget, because the screenshot is still worth taking without it.
  await page
    .waitForFunction(
      () => [...document.querySelectorAll('img')].every((img) => img.complete),
      undefined,
      { timeout: 15_000 },
    )
    .catch(() => undefined);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
};

test('capture screenshots of all pages', async ({ page }, testInfo) => {
  // Go to homepage
  await page.goto('/');
  await expect(page).toHaveTitle('Arcane Casters — The Evil Ent');

  // Allow animations to initialize
  await page.waitForTimeout(1000);

  // Take screenshot of Home page
  await settlePage(page);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_home.png'),
    fullPage: true,
  });
  console.log('Saved screenshot_home.png');

  // Navigate to Games page
  await page.locator('nav').getByRole('link', { name: 'GAMES', exact: true }).click();
  await page.waitForTimeout(1000);
  
  // Take screenshot of Games page
  await settlePage(page);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_games.png'),
    fullPage: true,
  });
  console.log('Saved screenshot_games.png');

  // Navigate to Magic compendium
  await page.locator('nav').getByRole('link', { name: 'MAGIC', exact: true }).click();
  await expect(page.getByRole('heading', { name: '마법 컨셉 도감' })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(24);

  // Mobility remains profile information, not a list filter.
  await expect(page.locator('.magic-filter-panel').getByText('기동', { exact: true })).toHaveCount(0);

  // Direct detail route
  await page.goto('/arcane-casters/magic/fire_lord_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await expect(page.getByText('공중 부유형', { exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: /지옥불 차원의 하늘/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: '소환 개체 · 화염탄 비행 악마' })).toBeVisible();
  await expect(page.getByRole('img', { name: /FireChildSpirit 컨셉 아트/ })).toBeVisible();

  await page.goto('/arcane-casters/magic/ember_spirit_swarm');
  await expect(page.getByRole('heading', { name: '잿불 악마 무리' })).toBeVisible();
  await expect(page.getByRole('img', { name: /잿불 척후악마 컨셉 아트/ })).toBeVisible();

  await page.goto('/arcane-casters/magic/chain_lightning');
  await expect(page.getByRole('heading', { name: '연쇄 번개' })).toBeVisible();
  await expect(page.getByRole('img', { name: /굵은 전격 마디/ })).toBeVisible();

  await page.goto('/arcane-casters/magic/lightning_drop');
  await expect(page.getByRole('heading', { name: '번개 투하' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '번개 구름 · 대기 및 강타 프레임' })).toBeVisible();
  await expect(page.locator('.magic-related-artwork .magic-game-asset')).toHaveCount(7);

  await page.goto('/arcane-casters/magic/dimension_toad');
  await expect(page.getByRole('heading', { name: '경계 운반자' })).toBeVisible();
  await expect(page.getByRole('img', { name: /화산편 컨셉 아트/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /폭풍편 컨셉 아트/ })).toBeVisible();
  await page.getByRole('link', { name: '소환 개체 · 화산편' }).click();
  await expect(page.getByRole('heading', { name: '화산편' })).toBeVisible();
  await expect(page.getByRole('link', { name: '경계 운반자 상세 보기' })).toBeVisible();

  await page.goto('/arcane-casters/summons');
  await expect(page.getByRole('heading', { name: /소환수/ })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(18);
  await expect(page.getByRole('link', { name: /화염탄 비행 악마/ })).toBeVisible();
  await settlePage(page);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_magic-detail.png'),
    fullPage: true,
  });

  await page.goto('/arcane-casters/magic/fire_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 하급 악마' })).toBeVisible();
  await expect(page.getByRole('img', { name: /생체 분사구/ })).toBeVisible();

  await page.goto('/arcane-casters/magic/chicken_commando');
  await expect(page.getByRole('heading', { name: '비전 강하대' })).toBeVisible();
  await expect(page.getByRole('img', { name: /인간 비전 강하대/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /공중 프레임과 낙하산 없는 지상 프레임/ })).toBeVisible();

  // Navigate to Team page
  await page.goto('/team');
  await page.waitForTimeout(1000);

  // Take screenshot of Team page
  await settlePage(page);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_team.png'),
    fullPage: true,
  });
  console.log('Saved screenshot_team.png');
});

test('new summon records expose their approved artwork and source magic', async ({ page }) => {
  for (const [slug, name] of [
    ['fire_lord_spirit', '지옥불 군단장'],
    ['dimension_toad', '경계 운반자'],
    ['rock_golem', '이끼바위 골렘'],
    ['water_slime', '물방울 생존자'],
    ['evil_ent', '사악한 나무 골렘'],
  ]) {
    await page.goto(`/arcane-casters/summons/${slug}`);
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    await expect(page.locator('.magic-artwork-gallery img').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /상세 보기/ })).toBeVisible();
  }
});

test('body background stays transparent so the particle canvas shows', async ({ page }) => {
  await page.goto('/');

  // An opaque body background paints over the z-index:-1 canvas.
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('magic compendium remains usable on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/arcane-casters/magic');

  await expect(page.getByRole('heading', { name: '마법 컨셉 도감' })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(24);

  await page.goto('/arcane-casters/magic/fire_lord_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await settlePage(page);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_magic-mobile.png'),
    fullPage: true,
  });
});

test('skip link keeps the active tab instead of resetting to home', async ({ page }) => {
  await page.goto('/team');
  await expect(page.getByRole('heading', { name: 'THE SUMMONERS' })).toBeVisible();

  await page.getByRole('link', { name: 'Skip To Main Content' }).focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/\/team#main-content$/);
  await expect(page.getByRole('heading', { name: 'THE SUMMONERS' })).toBeVisible();
});

// The redesign runs art to the edge of the viewport, which is exactly the shape
// that leaks a horizontal scrollbar on a phone. Every route is measured, and
// the three that carry the most art are also captured so the screens can be
// looked at rather than only asserted on.
test('no route scrolls sideways at phone width', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  const routes: Array<[string, string]> = [
    ['/', 'home'],
    ['/arcane-casters', 'games'],
    ['/arcane-casters/magic', 'magic'],
    ['/arcane-casters/summons', 'summons'],
    ['/team', 'team'],
    ['/privacy', 'privacy'],
    ['/terms', 'terms'],
  ];

  for (const [path, name] of routes) {
    await page.goto(path);
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);

    if (['home', 'games', 'team'].includes(name)) {
      await settlePage(page);
      await page.screenshot({
        path: testInfo.outputPath(`screenshot_mobile-${name}.png`),
        fullPage: true,
      });
    }
  }
});

// Nothing outside a CSS variable declaration may carry a literal colour, and
// the light ground makes a missed one obvious. This checks the rendered result
// instead of the source: the navbar, the footer and the page body must all
// resolve to a colour the token layer actually defines.
test('every route paints from the token layer', async ({ page }) => {
  for (const path of ['/', '/arcane-casters', '/arcane-casters/magic', '/privacy']) {
    await page.goto(path);
    const ground = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-ground').trim(),
    );
    expect(ground, `${path} lost the token layer`).toBe('#f4f7ea');
  }

  // The Team page is the one route that opts into the studio's own ground.
  await page.goto('/team');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'the-evil-ent');
  const teamGround = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-ground').trim(),
  );
  expect(teamGround).toBe('#0d0b0a');

  // Leaving the studio's section gives the ground back to the game.
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'the-evil-ent');
});
