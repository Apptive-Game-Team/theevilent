import { test, expect } from '@playwright/test';

test('direct entry to /arcane-casters/news lists every release, newest first', async ({ page }) => {
  await page.goto('/arcane-casters/news');

  await expect(page.getByRole('heading', { level: 1, name: '소식' })).toBeVisible();
  const titles = page.getByRole('heading', { level: 2 });
  await expect(titles).toHaveText([
    'v1.4.0 업데이트',
    'v1.3.0 업데이트',
    'v1.2.0 업데이트',
    'v1.1.0 업데이트',
    'v1.0.0 업데이트',
  ]);
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).locator('a[aria-current="page"]'),
  ).toHaveText('소식');
});

test('the news page follows the language switch', async ({ page }, testInfo) => {
  await page.goto('/arcane-casters/news');
  await page.waitForTimeout(500);
  await page.screenshot({ path: testInfo.outputPath('screenshot_news_ko.png'), fullPage: true });

  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'News' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'v1.4.0 Update' })).toBeVisible();
  await expect(page.getByText('A new map with a river is here.', { exact: false })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('screenshot_news_en.png'), fullPage: true });
});

test('a version anchor lands on that release', async ({ page }) => {
  await page.goto('/arcane-casters/news#v1-1-0');
  await expect(page.locator('#v1-1-0')).toBeInViewport();
});
