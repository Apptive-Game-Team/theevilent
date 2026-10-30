import { test, expect } from '@playwright/test';

test('fourth episode opens from the library and third episode, translates and remembers progress', async ({ page, request }, info) => {
  await page.goto('/arcane-casters/comic/ko');
  const fourth = page.getByRole('list', { name: '회차 목록', exact: true }).getByRole('link', { name: /4화 · 소리가 멎은 뒤/ });
  await expect(fourth).toContainText('읽기 전');
  await fourth.click();
  await expect(page).toHaveURL(/\/comic\/4\/ko$/);
  await expect(page.getByRole('heading', { name: '4화 · 소리가 멎은 뒤', exact: true })).toBeVisible();
  await expect(page.locator('.comic-page > img')).toHaveCount(12);
  for (const locale of ['ko', 'en']) {
    for (let number = 1; number <= 12; number++) {
      const response = await request.get(`/arcane-casters/comic/004/${locale}/page-${String(number).padStart(2, '0')}.webp`);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('image/webp');
    }
    const html = await (await request.get(`/arcane-casters/comic/4/${locale}`)).text();
    expect(html).toContain('noindex, noimageindex');
    expect(html).toContain('https://theevilent.com/arcane-casters/comic/004/cover.webp');
  }
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['4']?.page)).toBe(4);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/4\/en/);
  await expect(page.getByRole('heading', { name: 'Episode 4 · When the Noise Stops', exact: true })).toBeAttached();
  await expect(page.getByRole('link', { name: 'Continue reading', exact: true })).toHaveAttribute('href', '#comic-page-4');
  await page.getByRole('link', { name: 'Continue reading', exact: true }).click();
  await expect(page.locator('#comic-page-4')).toBeInViewport();
  await expect(page.locator('.comic-page > img').first()).toHaveAttribute('src', '/arcane-casters/comic/004/en/page-01.webp');
  const share = new URL((await page.getByRole('link', { name: 'X · Share this story', exact: true }).getAttribute('href'))!);
  expect(share.searchParams.get('url')).toBe('https://theevilent.com/arcane-casters/comic/4/en');
  await page.setViewportSize({ width: 320, height: 750 });
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await page.locator('#comic-page-4 > img').evaluate((image: HTMLImageElement) => image.decode());
  await expect(page.locator('#comic-page-4 > img')).toHaveJSProperty('naturalWidth', 1024);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('episode-four-mobile.png') });
  await page.locator('.comic-reading-end').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['4']?.completed)).toBe(true);
  await page.locator('.comic-list-back').click();
  await expect(page.getByRole('list', { name: 'Episode list', exact: true }).getByRole('link', { name: /Episode 4/ })).toContainText('Read');
  await page.goto('/arcane-casters/comic/3/en');
  await page.getByRole('navigation', { name: 'Episode navigation', exact: true }).getByRole('link', { name: /Next episode/ }).click();
  await expect(page).toHaveURL(/\/comic\/4\/en/);
  await expect(page.locator('.comic-page > img')).toHaveCount(12);
});
