import { test, expect, type Page } from '@playwright/test';

const primaryNav = (page: Page) => page.getByRole('navigation', { name: 'Primary' });

test('nav clicks push a single history entry', async ({ page }) => {
  await page.goto('/team');
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('팀');

  await primaryNav(page).getByRole('link', { name: '마법 도감', exact: true }).click();
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('마법 도감');

  // One back step must return to Team (no extra "#" entry from the default anchor jump)
  await page.goBack();
  await expect(page).toHaveURL(/\/team$/);
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('팀');
});

test('modifier click does not navigate the current tab', async ({ page }) => {
  await page.goto('/team');

  await primaryNav(page)
    .getByRole('link', { name: '마법 도감', exact: true })
    .click({ modifiers: ['ControlOrMeta'] });

  await expect(page).toHaveURL(/\/team$/);
});

test('the old Arcane Casters overview lands on the home page', async ({ page }) => {
  await page.goto('/arcane-casters');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Arcane Casters' })).toBeVisible();

  // A hash is only read on a full load, so enter it from another path.
  await page.goto('/team');
  await page.goto('/#games');
  await expect(page).toHaveURL(/\/$/);
});

test('legacy hash routes with a slug migrate to Arcane Casters paths', async ({ page }) => {
  await page.goto('/#magic/fire_lord_spirit');

  await expect(page).toHaveURL(/\/arcane-casters\/magic\/fire_lord_spirit$/);
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
});

test('legacy hash routes without a slug redirect to their section root', async ({ page }) => {
  await page.goto('/#magic');
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);

  // The summon compendium was folded into the magic compendium.
  await page.goto('/#summons');
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);
});

test('direct entry to a magic detail path renders its content', async ({ page }) => {
  await page.goto('/arcane-casters/magic/fire_lord_spirit');

  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('마법 도감');
});

test('the language switch changes the copy and is remembered', async ({ page }) => {
  await page.goto('/team');
  await page.getByRole('button', { name: 'English', exact: true }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(primaryNav(page).getByRole('link', { name: 'Magic Book', exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: '한국어', exact: true }).click();
  await expect(primaryNav(page).getByRole('link', { name: '마법 도감', exact: true })).toBeVisible();
});
