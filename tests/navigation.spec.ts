import { test, expect, type Page } from '@playwright/test';

const primaryNav = (page: Page) => page.getByRole('navigation', { name: 'Primary' });
const sectionNav = (page: Page) => page.getByRole('navigation', { name: 'Arcane Casters section' });

test('nav clicks push a single history entry', async ({ page }) => {
  await page.goto('/arcane-casters');
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');

  await primaryNav(page).getByRole('link', { name: 'HOME', exact: true }).click();
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('HOME');

  // One back step must return to Games (no extra "#" entry from the default anchor jump)
  await page.goBack();
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');
});

test('modifier click does not navigate the current tab', async ({ page }) => {
  await page.goto('/arcane-casters');

  await primaryNav(page)
    .getByRole('link', { name: 'HOME', exact: true })
    .click({ modifiers: ['ControlOrMeta'] });

  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');
});

test('legacy hash routes with a slug migrate to Arcane Casters paths', async ({ page }) => {
  await page.goto('/#magic/fire_lord_spirit');

  await expect(page).toHaveURL(/\/arcane-casters\/magic\/fire_lord_spirit$/);
  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();
});

test('legacy hash routes without a slug redirect to their section root', async ({ page }) => {
  await page.goto('/#games');
  await expect(page).toHaveURL(/\/arcane-casters$/);

  await page.goto('/#magic');
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);

  await page.goto('/#summons');
  await expect(page).toHaveURL(/\/arcane-casters\/summons$/);
});

test('direct entry to a deep Arcane Casters path renders its content', async ({ page }) => {
  await page.goto('/arcane-casters/magic/fire_lord_spirit');

  await expect(page.getByRole('heading', { name: '지옥불 군단장' })).toBeVisible();

  // The main navigation keeps GAMES highlighted, while the section sub
  // navigation shows which Arcane Casters area is active.
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');
  await expect(sectionNav(page).locator('a[aria-current="page"]')).toHaveText('MAGIC');
});

test('section sub navigation switches tabs with one history entry each, and GAMES stays active in the main nav', async ({ page }) => {
  await page.goto('/arcane-casters');
  await expect(sectionNav(page).locator('a[aria-current="page"]')).toHaveText('OVERVIEW');

  await sectionNav(page).getByRole('link', { name: 'MAGIC', exact: true }).click();
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);
  await expect(sectionNav(page).locator('a[aria-current="page"]')).toHaveText('MAGIC');
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');

  await sectionNav(page).getByRole('link', { name: 'SUMMONS', exact: true }).click();
  await expect(page).toHaveURL(/\/arcane-casters\/summons$/);
  await expect(sectionNav(page).locator('a[aria-current="page"]')).toHaveText('SUMMONS');
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('GAMES');

  // Two pushState navigations, so two back steps retrace them one at a time.
  await page.goBack();
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/arcane-casters$/);
});

test('modifier click on the section sub navigation does not navigate the current tab', async ({ page }) => {
  await page.goto('/arcane-casters');

  await sectionNav(page)
    .getByRole('link', { name: 'MAGIC', exact: true })
    .click({ modifiers: ['ControlOrMeta'] });

  await expect(page).toHaveURL(/\/arcane-casters$/);
  await expect(sectionNav(page).locator('a[aria-current="page"]')).toHaveText('OVERVIEW');
});
