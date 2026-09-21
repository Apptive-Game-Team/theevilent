import { test, expect } from '@playwright/test';

// Google Play fetches the policy URL directly, so /privacy has to render on a
// cold load rather than only after in-app navigation. The Vercel rewrite is
// what makes that work; this test fails if the route stops being wired up.
test('direct entry to /privacy renders the policy', async ({ page }, testInfo) => {
  await page.goto('/privacy');

  await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();
  await expect(page.getByText('Oracle Cloud Infrastructure')).toBeVisible();

  await page.waitForTimeout(500);
  await page.screenshot({
    path: testInfo.outputPath('screenshot_privacy.png'),
    fullPage: true,
  });
  console.log('Saved screenshot_privacy.png');
});

test('the policy switches between Korean and English', async ({ page }) => {
  await page.goto('/privacy');

  await page.getByRole('button', { name: '한국어' }).click();
  await expect(page.getByRole('heading', { name: '개인정보처리방침', level: 1 })).toBeVisible();
  await expect(page.getByText('BCrypt', { exact: false }).first()).toBeVisible();

  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();
});

test.describe('Korean browser', () => {
  test.use({ locale: 'ko-KR' });

  test('opens the policy in Korean without touching the toggle', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByRole('heading', { name: '개인정보처리방침', level: 1 })).toBeVisible();
  });
});

test('the footer reaches the policy from any page', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('navigation', { name: 'Legal' })
    .getByRole('link', { name: 'Privacy Policy' })
    .click();

  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();
});

// The policy is a legal notice, not a destination, so it must stay out of the
// header navigation.
test('the policy is not in the header navigation', async ({ page }) => {
  await page.goto('/');

  const header = page.locator('nav').first();
  await expect(header.getByRole('link', { name: 'Privacy Policy' })).toHaveCount(0);
});
