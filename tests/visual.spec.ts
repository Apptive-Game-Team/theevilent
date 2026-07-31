import { test, expect } from '@playwright/test';

test('capture screenshots of all pages', async ({ page }, testInfo) => {
  // Go to homepage
  await page.goto('/');
  await expect(page).toHaveTitle('The Evil Ent');

  // Allow animations to initialize
  await page.waitForTimeout(1000);

  // Take screenshot of Home page
  await page.screenshot({ 
    path: testInfo.outputPath('screenshot_home.png'),
    fullPage: true 
  });
  console.log('Saved screenshot_home.png');

  // Navigate to Games page
  await page.locator('nav').getByRole('link', { name: 'GAMES', exact: true }).click();
  await page.waitForTimeout(1000);
  
  // Take screenshot of Games page
  await page.screenshot({ 
    path: testInfo.outputPath('screenshot_games.png'),
    fullPage: true 
  });
  console.log('Saved screenshot_games.png');

  // Navigate to Magic compendium
  await page.locator('nav').getByRole('link', { name: 'MAGIC', exact: true }).click();
  await expect(page.getByRole('heading', { name: '마법 컨셉 도감' })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(24);

  // Filter state stays in URL
  await page.getByRole('link', { name: '공중 부유형', exact: true }).click();
  await expect(page).toHaveURL(/#magic\?mobility=/);
  await expect(page.getByText('6개 기록')).toBeVisible();

  // Direct detail route
  await page.goto('/#magic/fire_lord_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await expect(page.getByText('공중 부유형', { exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: /지옥불 차원의 하늘/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: '소환 개체 · 화염탄 비행 악마' })).toBeVisible();
  await expect(page.getByRole('img', { name: /FireChildSpirit 컨셉 아트/ })).toBeVisible();

  await page.goto('/#magic/ember_spirit_swarm');
  await expect(page.getByRole('heading', { name: '잿불 악마 무리' })).toBeVisible();
  await expect(page.getByRole('img', { name: /잿불 척후악마 컨셉 아트/ })).toBeVisible();

  await page.goto('/#magic/dimension_toad');
  await expect(page.getByRole('heading', { name: '경계 운반자' })).toBeVisible();
  await expect(page.getByRole('img', { name: /화산편 컨셉 아트/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /폭풍편 컨셉 아트/ })).toBeVisible();
  await page.getByRole('link', { name: '소환 개체 · 화산편' }).click();
  await expect(page.getByRole('heading', { name: '화산편' })).toBeVisible();
  await expect(page.getByRole('link', { name: '경계 운반자 상세 보기' })).toBeVisible();

  await page.goto('/#summons');
  await expect(page.getByRole('heading', { name: /소환수/ })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(10);
  await expect(page.getByRole('link', { name: /화염탄 비행 악마/ })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath('screenshot_magic-detail.png'),
    fullPage: true,
  });

  await page.goto('/#magic/fire_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 하급 악마' })).toBeVisible();
  await expect(page.getByRole('img', { name: /생체 분사구/ })).toBeVisible();

  await page.goto('/#magic/chicken_commando');
  await expect(page.getByRole('heading', { name: '비전 강하대' })).toBeVisible();
  await expect(page.getByRole('img', { name: /인간 비전 강하대/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /공중 프레임과 낙하산 없는 지상 프레임/ })).toBeVisible();

  // Navigate to Team page
  await page.goto('/#team');
  await page.waitForTimeout(1000);

  // Take screenshot of Team page
  await page.screenshot({ 
    path: testInfo.outputPath('screenshot_team.png'),
    fullPage: true 
  });
  console.log('Saved screenshot_team.png');
});

test('new summon records expose their approved artwork and source magic', async ({ page }) => {
  for (const [slug, name] of [
    ['fire_lord_spirit', '지옥불 군단장'],
    ['dimension_toad', '경계 운반자'],
    ['rock_golem', '이끼바위 골렘'],
    ['water_slime', '물방울 생존자'],
  ]) {
    await page.goto(`/#summons/${slug}`);
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
  await page.goto('/#magic');

  await expect(page.getByRole('heading', { name: '마법 컨셉 도감' })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(24);

  await page.goto('/#magic/fire_lord_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath('screenshot_magic-mobile.png'),
    fullPage: true,
  });
});

test('skip link keeps the active tab instead of resetting to home', async ({ page }) => {
  await page.goto('/#team');
  await expect(page.getByRole('heading', { name: 'THE SUMMONERS' })).toBeVisible();

  await page.getByRole('link', { name: 'Skip To Main Content' }).click();

  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.getByRole('heading', { name: 'THE SUMMONERS' })).toBeVisible();
});
