import { test, expect } from '@playwright/test';

test('필요한 앞선 장면을 제목 없이 보여주고 본편 쪽수와 진행 상태를 유지한다', async ({ page }) => {
  await page.goto('/arcane-casters/comic/3/ko');
  await expect(page.locator('.comic-context-page > img')).toHaveCount(1);
  await expect(page.locator('.comic-context-page > img')).toHaveAttribute('src', '/arcane-casters/comic/002/ko/page-10.webp');
  await expect(page.locator('.comic-context h1, .comic-context h2')).toHaveCount(0);
  await expect(page.locator('.comic-page')).toHaveCount(12);
  await expect(page.getByRole('link', { name: '읽기 시작', exact: true })).toHaveAttribute('href', '#comic-context-start');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['3'])).toBeUndefined();
  await page.getByRole('link', { name: '본문부터 읽기', exact: true }).click();
  await expect(page.locator('#comic-page-1')).toBeInViewport();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('arcane-casters:comic-reading:v1') ?? '{}')['3']?.page)).toBe(1);
});

test('연속되는 화에는 장면을 덧붙이지 않고 회상 화에는 차원문 장면을 연결한다', async ({ page }) => {
  await page.goto('/arcane-casters/comic/2/ko');
  await expect(page.locator('.comic-context')).toHaveCount(0);
  await expect(page.getByRole('link', { name: '읽기 시작', exact: true })).toHaveAttribute('href', '#comic-page-1');
  await page.goto('/arcane-casters/comic/4/en');
  await expect(page.locator('.comic-context-page > img')).toHaveCount(2);
  await expect(page.locator('.comic-context-page > img').nth(0)).toHaveAttribute('src', '/arcane-casters/comic/002/en/page-06.webp');
  await expect(page.locator('.comic-context-page > img').nth(1)).toHaveAttribute('src', '/arcane-casters/comic/002/en/page-07.webp');
  await expect(page.locator('.comic-page')).toHaveCount(12);
});
