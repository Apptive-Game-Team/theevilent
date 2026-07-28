import { test, expect } from '@playwright/test';

test('capture screenshots of all pages', async ({ page }) => {
  // Go to homepage
  await page.goto('/');
  await expect(page).toHaveTitle('The Evil Ent');

  // Allow animations to initialize
  await page.waitForTimeout(1000);

  // Take screenshot of Home page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_home.png',
    fullPage: true 
  });
  console.log('Saved screenshot_home.png');

  // Navigate to Games page
  await page.locator('nav').getByRole('link', { name: 'GAMES', exact: true }).click();
  await page.waitForTimeout(1000);
  
  // Take screenshot of Games page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_games.png',
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
  await expect(page.getByRole('img', { name: /지옥불 군단장 인게임 에셋/ })).toBeVisible();
  await page.screenshot({
    path: 'test-results/screenshot_magic-detail.png',
    fullPage: true,
  });

  await page.goto('/#magic/fire_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 하급 악마' })).toBeVisible();
  await expect(page.getByRole('img', { name: /생체 분사구/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /하급 악마 인게임 에셋/ })).toBeVisible();

  // Navigate to Team page
  await page.goto('/#team');
  await page.waitForTimeout(1000);

  // Take screenshot of Team page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_team.png',
    fullPage: true 
  });
  console.log('Saved screenshot_team.png');
});

test('magic compendium remains usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#magic');

  await expect(page.getByRole('heading', { name: '마법 컨셉 도감' })).toBeVisible();
  await expect(page.locator('.magic-concept-card')).toHaveCount(24);

  await page.goto('/#magic/fire_lord_spirit');
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await page.screenshot({
    path: 'test-results/screenshot_magic-mobile.png',
    fullPage: true,
  });
});
