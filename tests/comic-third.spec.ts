import { test, expect } from '@playwright/test';

test('third episode opens from the library and second episode, translates and remembers progress', async ({ page, request }, info) => {
  await page.goto('/arcane-casters/comic/ko');
  const third = page.getByRole('list', { name: '회차 목록', exact: true }).getByRole('link', { name: /3화 · 추락/ });
  await expect(third).toContainText('읽기 전');
  await third.click();
  await expect(page).toHaveURL(/\/comic\/3\/ko$/);
  await expect(page.getByRole('heading', { name: '3화 · 추락', exact: true })).toBeVisible();
  await expect(page.locator('.comic-page > img')).toHaveCount(12);
  for (const locale of ['ko', 'en']) {
    for (let number = 1; number <= 12; number++) {
      const response = await request.get(`/arcane-casters/comic/003/${locale}/page-${String(number).padStart(2, '0')}.webp`);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('image/webp');
    }
    const html = await (await request.get(`/arcane-casters/comic/3/${locale}`)).text();
    expect(html).toContain('noindex, noimageindex');
    expect(html).toContain('https://theevilent.com/arcane-casters/comic/003/cover.webp');
  }
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['3']?.page)).toBe(4);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/3\/en/);
  await expect(page.getByRole('heading', { name: 'Episode 3 · The Fall', exact: true })).toBeAttached();
  await expect(page.getByRole('link', { name: 'Continue reading', exact: true })).toHaveAttribute('href', '#comic-page-4');
  await page.getByRole('link', { name: 'Continue reading', exact: true }).click();
  await expect(page.locator('#comic-page-4')).toBeInViewport();
  await expect(page.locator('.comic-page > img').first()).toHaveAttribute('src', '/arcane-casters/comic/003/en/page-01.webp');
  const share = new URL((await page.getByRole('link', { name: 'X · Share this story', exact: true }).getAttribute('href'))!);
  expect(share.searchParams.get('url')).toBe('https://theevilent.com/arcane-casters/comic/3/en');
  await page.setViewportSize({ width: 320, height: 750 });
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await page.locator('#comic-page-4 > img').evaluate((image: HTMLImageElement) => image.decode());
  await expect(page.locator('#comic-page-4 > img')).toHaveJSProperty('naturalWidth', 1024);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('episode-three-mobile.png') });
  await page.locator('.comic-reading-end').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['3']?.completed)).toBe(true);
  await page.locator('.comic-list-back').click();
  await expect(page.getByRole('list', { name: 'Episode list', exact: true }).getByRole('link', { name: /Episode 3/ })).toContainText('Read');
  await page.goto('/arcane-casters/comic/2/en');
  await page.getByRole('navigation', { name: 'Episode navigation', exact: true }).getByRole('link', { name: /Next episode/ }).click();
  await expect(page).toHaveURL(/\/comic\/3\/en/);
  await expect(page.locator('.comic-page > img')).toHaveCount(12);
});
