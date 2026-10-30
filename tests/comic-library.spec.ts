import { test, expect } from '@playwright/test';

const key = 'arcane-casters:comic-reading:v1';

test('library shows thumbnails without reader pages and fits desktop and phone', async ({ page, request }, info) => {
  await page.goto('/arcane-casters/comic/ko');
  await expect(page.getByRole('heading', { name: '만화', exact: true })).toBeVisible();
  await expect(page.locator('.comic-episode-row')).toHaveCount(4);
  await expect(page.locator('.comic-episode-row img')).toHaveCount(4);
  await expect(page.locator('.comic-page')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveCount(0);
  await expect(page.locator('.comic-library-resume')).toHaveCount(0);
  expect(await page.evaluate(name => localStorage.getItem(name), key)).toBeNull();
  const html = await (await request.get('/arcane-casters/comic/ko')).text();
  expect(html).toContain('noindex, noimageindex');
  expect(html).toContain('https://theevilent.com/arcane-casters/comic/ko');
  await page.screenshot({ path: info.outputPath('comic-library-desktop.png') });
  await page.setViewportSize({ width: 320, height: 750 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('comic-library-mobile.png') });
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/en$/);
  await expect(page.getByRole('list', { name: 'Episode list', exact: true }).getByRole('link', { name: /Episode 2/ })).toHaveAttribute('href', '/arcane-casters/comic/2/en');
});

test('library restores old reading records and resumes at the saved page', async ({ page }) => {
  await page.addInitScript(({ key }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({
      '1': { page: 20, completed: true },
      '2': { page: 4, completed: false },
    }));
  }, { key });
  await page.goto('/arcane-casters/comic/ko');
  const episodes = page.getByRole('list', { name: '회차 목록', exact: true });
  await expect(episodes.getByRole('link', { name: /1화/ })).toContainText('읽음');
  await expect(episodes.getByRole('link', { name: /2화/ })).toContainText('읽는 중');
  await expect(page.locator('.comic-library-resume')).toHaveAttribute('href', '/arcane-casters/comic/2/ko#comic-page-4');
  await page.locator('.comic-library-resume').click();
  await expect(page.locator('#comic-page-4')).toBeInViewport();
  await page.locator('.comic-list-back').click();
  await expect(page).toHaveURL(/\/comic\/ko$/);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('.comic-library-resume')).toHaveAttribute('href', '/arcane-casters/comic/2/en#comic-page-4');
});

test('continue reading chooses the most recently read unfinished episode', async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, JSON.stringify({
    '1': { page: 3, completed: false, updatedAt: 20 },
    '2': { page: 5, completed: false, updatedAt: 10 },
  })), { key });
  await page.goto('/arcane-casters/comic/en');
  await expect(page.locator('.comic-library-resume')).toHaveAttribute('href', '/arcane-casters/comic/1/en#comic-page-3');
});
