import { test, expect, type Page } from '@playwright/test';

// Images are loading="lazy", so a full-page screenshot needs them scrolled in.
const loadAllImages = async (page: Page) => {
  for (const image of await page.locator('.news-image').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

test('direct entry to /arcane-casters/news lists every release, newest first', async ({ page }) => {
  await page.goto('/arcane-casters/news');

  await expect(page.getByRole('heading', { level: 1, name: '소식' })).toBeVisible();
  const titles = page.getByRole('heading', { level: 2 });
  await expect(titles).toHaveText([
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
  await loadAllImages(page);
  await page.screenshot({ path: testInfo.outputPath('screenshot_news_ko.png'), fullPage: true });

  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'News' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'v1.3.0 Update' })).toBeVisible();
  await expect(page.getByText('You can play with a random deck from the lobby.')).toBeVisible();
  await loadAllImages(page);
  await page.screenshot({ path: testInfo.outputPath('screenshot_news_en.png'), fullPage: true });
});

test('a version anchor lands on that release', async ({ page }) => {
  await page.goto('/arcane-casters/news#v1-1-0');
  await expect(page.locator('#v1-1-0')).toBeInViewport();
});

test('release images load and carry alt text in both languages', async ({ page }) => {
  await page.goto('/arcane-casters/news');
  const images = page.locator('.news-image');
  await expect(images).toHaveCount(7);

  const check = async () => {
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('alt', /\S/);
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }
  };
  await check();
  const korean = await images.first().getAttribute('alt');

  await page.getByRole('button', { name: 'English', exact: true }).click();
  await check();
  expect(await images.first().getAttribute('alt')).not.toBe(korean);
});
