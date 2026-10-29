import { test, expect, type Page } from '@playwright/test';

const primaryNav = (page: Page) => page.getByRole('navigation', { name: 'Primary' });

test('nav clicks push a single history entry', async ({ page }) => {
  await page.goto('/arcane-casters/news');
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('소식');

  await primaryNav(page).getByRole('link', { name: '마법 도감', exact: true }).click();
  await expect(page).toHaveURL(/\/arcane-casters\/magic$/);
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('마법 도감');

  // 뒤로가기는 기본 앵커 이동이 만든 중복 이력 없이 소식 페이지로 돌아가야 합니다.
  await page.goBack();
  await expect(page).toHaveURL(/\/arcane-casters\/news$/);
  await expect(primaryNav(page).locator('a[aria-current="page"]')).toHaveText('소식');
});

test('modifier click does not navigate the current tab', async ({ page }) => {
  await page.goto('/arcane-casters/news');

  await primaryNav(page)
    .getByRole('link', { name: '마법 도감', exact: true })
    .click({ modifiers: ['ControlOrMeta'] });

  await expect(page).toHaveURL(/\/arcane-casters\/news$/);
});

test('the old Arcane Casters overview lands on the home page', async ({ page }) => {
  await page.goto('/arcane-casters');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Arcane Casters' })).toBeVisible();

  // A hash is only read on a full load, so enter it from another path.
  await page.goto('/arcane-casters/news');
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
  await page.goto('/arcane-casters/news');
  await page.getByRole('button', { name: 'English', exact: true }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(primaryNav(page).getByRole('link', { name: 'Magic Book', exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: 'English', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: '한국어', exact: true }).click();
  await expect(primaryNav(page).getByRole('link', { name: '마법 도감', exact: true })).toBeVisible();
});

test('제거된 팀 주소는 홈으로 이동하고 한영 팀 메뉴가 표시되지 않는다', async ({ page }) => {
  for (const path of ['/team', '/team/', '/#team']) {
    await page.goto('/privacy');
    await page.goto(path);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Arcane Casters' })).toBeVisible();
  }
  for (const language of ['한국어', 'English']) {
    await page.getByRole('button', { name: language, exact: true }).click();
    await expect(primaryNav(page).locator('a[href="/team"]')).toHaveCount(0);
    await expect(primaryNav(page).getByRole('link', { name: /^(팀|Team)$/ })).toHaveCount(0);
  }
});
