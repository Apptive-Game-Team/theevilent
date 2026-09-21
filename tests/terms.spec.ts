import { test, expect } from '@playwright/test';

test('direct entry to /terms renders the terms', async ({ page }, testInfo) => {
  await page.goto('/terms');

  await expect(page.getByRole('heading', { name: 'Terms of Service', level: 1 })).toBeVisible();

  await page.waitForTimeout(500);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_terms.png'),
    fullPage: true,
  });
  console.log('Saved screenshot_terms.png');
});

// Two clauses exist because of how this game actually behaves, and a player
// who does not read them loses progress or misreads who they are playing.
// Losing either one from the text is a real regression, not a wording change.
test('the terms disclose the two game-specific conditions', async ({ page }) => {
  await page.goto('/terms');

  await expect(
    page.getByRole('heading', { name: 'Guest accounts disappear when you close the app' }),
  ).toBeVisible();
  await expect(
    page.getByText('Your opponent may be computer-controlled rather than another player.'),
  ).toBeVisible();
});

test('the terms switch between Korean and English', async ({ page }) => {
  await page.goto('/terms');

  await page.getByRole('button', { name: '한국어' }).click();
  await expect(page.getByRole('heading', { name: '이용약관', level: 1 })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '2. 게스트 계정은 앱을 닫으면 사라집니다' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { name: 'Terms of Service', level: 1 })).toBeVisible();
});

test('the footer reaches both legal notices', async ({ page }) => {
  await page.goto('/');

  const legal = page.getByRole('navigation', { name: 'Legal' });
  await expect(legal.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
  await expect(legal.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();

  await legal.getByRole('link', { name: 'Terms of Service' }).click();
  await expect(page).toHaveURL(/\/terms$/);
  await expect(page.getByRole('heading', { name: 'Terms of Service', level: 1 })).toBeVisible();
});
