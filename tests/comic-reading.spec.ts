import { test, expect } from '@playwright/test';

const storageKey = 'arcane-casters:comic-reading:v1';

test('episode two preserves language, uses its own assets and shares its own URL', async ({ page, request }, info) => {
  await page.goto('/arcane-casters/comic/2/ko');
  await expect(page.getByRole('heading', { name: '2화 · 문 너머', exact: true })).toBeVisible();
  await expect(page.locator('.comic-page > img')).toHaveCount(10);
  await expect(page.locator('.comic-list-back')).toHaveAttribute('href', '/arcane-casters/comic/ko');
  await expect(page.locator('.comic-episodes')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/2\/en$/);
  await expect(page.getByRole('heading', { name: 'Episode 2 · Beyond the Gate', exact: true })).toBeVisible();
  const sources = await page.locator('.comic-page > img').evaluateAll(images => images.map(image => image.getAttribute('src')!));
  for (const source of sources) {
    expect(source).toContain('/comic/002/en/');
    const response = await request.get(source);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/webp');
  }
  const href = new URL((await page.getByRole('link', { name: 'X · Share this story', exact: true }).getAttribute('href'))!);
  expect(href.searchParams.get('url')).toBe('https://theevilent.com/arcane-casters/comic/2/en');
  const html = await (await request.get('/arcane-casters/comic/2/en')).text();
  expect(html).toContain('noindex, noimageindex');
  expect(html).toContain('https://theevilent.com/arcane-casters/comic/002/cover.webp');
  await page.setViewportSize({ width: 320, height: 750 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('episode-two-mobile.png') });
  await page.getByRole('navigation', { name: 'Episode navigation', exact: true }).getByRole('link', { name: /Previous episode/ }).click();
  await expect(page).toHaveURL(/\/comic\/1\/en$/);
  await expect(page.locator('.comic-page > img')).toHaveCount(20);
});

test('reading position survives reload and language changes without marking the episode read', async ({ page }) => {
  await page.goto('/arcane-casters/comic/2/ko');
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{}')['2']?.page, storageKey)).toBe(4);
  await page.reload();
  await expect(page.getByRole('link', { name: '이어서 읽기', exact: true })).toHaveAttribute('href', '#comic-page-4');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Continue reading', exact: true })).toHaveAttribute('href', '#comic-page-4');
  await page.getByRole('link', { name: 'Continue reading', exact: true }).click();
  await expect(page.locator('#comic-page-4')).toBeInViewport();
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{}')['2'].completed, storageKey)).toBe(false);
});

test('reaching the end marks only the current episode read and retains that state', async ({ page }) => {
  await page.goto('/arcane-casters/comic/2/ko');
  await page.locator('.comic-reading-end').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{}')['2']?.completed, storageKey)).toBe(true);
  await page.goto('/arcane-casters/comic/ko');
  const episodes = page.getByRole('list', { name: '회차 목록', exact: true });
  await expect(episodes.getByRole('link', { name: /2화/ })).toContainText('읽음');
  await expect(episodes.getByRole('link', { name: /1화/ })).not.toContainText('읽음');
  await episodes.getByRole('link', { name: /1화/ }).click();
  await page.locator('.comic-list-back').click();
  await expect(page.getByRole('list', { name: '회차 목록', exact: true }).getByRole('link', { name: /2화/ })).toContainText('읽음');
});

for (const storage of ['corrupt', 'blocked']) {
  test(`comic still reads when reading storage is ${storage}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(({ key, mode }) => {
      if (mode === 'corrupt') {
        localStorage.setItem(key, '{broken');
      } else {
        const get = Storage.prototype.getItem;
        const set = Storage.prototype.setItem;
        Storage.prototype.getItem = function (name) {
          if (name === key) throw new DOMException('Blocked', 'SecurityError');
          return get.call(this, name);
        };
        Storage.prototype.setItem = function (name, value) {
          if (name === key) throw new DOMException('Blocked', 'QuotaExceededError');
          return set.call(this, name, value);
        };
      }
    }, { key: storageKey, mode: storage });
    await page.goto('/arcane-casters/comic/2/ko');
    await expect(page.locator('.comic-page')).toHaveCount(10);
    await page.locator('.comic-reading-end').scrollIntoViewIfNeeded();
    expect(errors).toEqual([]);
  });
}
