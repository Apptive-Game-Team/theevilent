import { test, expect } from '@playwright/test';

test('nav clicks push a single history entry', async ({ page }) => {
  await page.goto('/arcane-casters');
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('GAMES');

  await page.locator('nav').getByRole('link', { name: 'HOME', exact: true }).click();
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('HOME');

  // One back step must return to Games (no extra "#" entry from the default anchor jump)
  await page.goBack();
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('GAMES');
});

test('modifier click does not navigate the current tab', async ({ page }) => {
  await page.goto('/arcane-casters');

  await page
    .locator('nav')
    .getByRole('link', { name: 'HOME', exact: true })
    .click({ modifiers: ['ControlOrMeta'] });

  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('GAMES');
});

test('legacy hash routes migrate to Arcane Casters paths', async ({ page }) => {
  await page.goto('/#magic/fire_lord_spirit');

  await expect(page).toHaveURL(/\/arcane-casters\/magic\/fire_lord_spirit$/);
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
});
