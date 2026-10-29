import { test, expect } from '@playwright/test';

test('comic language links preserve the episode and load all selected pages', async ({ page, request }, info) => {
  await page.goto('/arcane-casters/comic/1/ko');
  await expect(page.getByRole('heading', { name: '1화 · 첫 현장 연구', exact: true })).toBeVisible();
  await expect(page.locator('.comic-page > img')).toHaveCount(20);
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/1\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'Episode 1 · First Fieldwork', exact: true })).toBeVisible();
  const sources = await page.locator('.comic-page > img').evaluateAll(images => images.map(image => image.getAttribute('src')!));
  for (const src of sources) {
    const response = await request.get(src);
    expect(response.ok(), src).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/webp');
  }
  await page.screenshot({ path: info.outputPath('comic-desktop.png') });
  await page.goBack();
  await expect(page).toHaveURL(/\/comic\/1\/ko$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

test('social buttons open composers with the current language URL', async ({ page }) => {
  await page.goto('/arcane-casters/comic/1/en');
  const expected = 'https://theevilent.com/arcane-casters/comic/1/en';
  for (const name of ['X', 'Bluesky', 'Telegram', 'LINE']) {
    const link = page.getByRole('link', { name: new RegExp(`^${name} ·`) });
    const href = new URL((await link.getAttribute('href'))!);
    expect(href.protocol).toBe('https:');
    expect(name === 'Bluesky' ? href.searchParams.get('text') : href.searchParams.get('url')).toContain(expected);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});

test('copy reports success only after writing and offers a manual fallback', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async (value: string) => { sessionStorage.setItem('copied', value); },
    } });
  });
  await page.goto('/arcane-casters/comic/1/en');
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Link copied.');
  expect(await page.evaluate(() => sessionStorage.getItem('copied'))).toBe('https://theevilent.com/arcane-casters/comic/1/en');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
  await page.getByRole('button', { name: 'Copy link', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Select the link and copy it.');
  await expect(page.getByRole('textbox', { name: 'Link to share' })).toHaveValue('https://theevilent.com/arcane-casters/comic/1/en');
});

test('canceling native sharing does not copy or display an error', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { value: async () => { throw new DOMException('Cancelled', 'AbortError'); } });
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Must not copy'); } } });
  });
  await page.goto('/arcane-casters/comic/1/en');
  await page.getByRole('button', { name: 'Share to another app', exact: true }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  await expect(page.getByRole('textbox')).toHaveCount(0);
});

test('mobile reading has no horizontal overflow and supports navigation back', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/arcane-casters/comic/1/ko');
  await page.getByRole('link', { name: '읽기 시작', exact: true }).click();
  await expect(page.locator('#comic-page-1')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('comic-mobile.png') });
  await page.locator('.comic-sharing').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('comic-mobile-share.png') });
});

test('unknown episodes do not show episode one as if it were another episode', async ({ page }) => {
  await page.goto('/arcane-casters/comic/999/en');
  await expect(page.getByRole('heading', { name: 'This episode has not been published yet.' })).toBeVisible();
  await expect(page.locator('.comic-page')).toHaveCount(0);
});
