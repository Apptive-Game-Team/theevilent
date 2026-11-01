import { test, expect } from '@playwright/test';

const historyKey = 'arcane-casters:comic-reading:v1';
const episodes = [
  { id: '5', directory: '005', pages: 12, title: '5화 · 대피' },
  { id: '6', directory: '006', pages: 14, title: '6화 · 무너진 방어선' },
  { id: '7', directory: '007', pages: 14, title: '7화 · 반격' },
];

for (const episode of episodes) {
  test(`${episode.id}화가 목록에서 열리고 모든 이미지·진행 저장·회차 이동이 동작한다`, async ({ page, request }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/arcane-casters/comic/ko');
    const card = page.getByRole('list', { name: '회차 목록', exact: true }).getByRole('link', { name: new RegExp(episode.title) });
    await card.locator('img').scrollIntoViewIfNeeded();
    await card.locator('img').evaluate((image: HTMLImageElement) => image.decode());
    await expect(card.locator('img')).toHaveJSProperty('naturalWidth', 1024);
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/comic/${episode.id}/ko$`));
    await expect(page.getByRole('heading', { name: episode.title, exact: true })).toBeVisible();
    await expect(page.locator('.comic-page > img')).toHaveCount(episode.pages);
    await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(({ key, id }) => JSON.parse(localStorage.getItem(key) ?? '{}')[id]?.page, { key: historyKey, id: episode.id })).toBe(4);
    await page.reload();
    await expect(page.getByRole('link', { name: '이어서 읽기', exact: true })).toHaveAttribute('href', '#comic-page-4');
    await page.getByRole('link', { name: '이어서 읽기', exact: true }).click();
    await expect(page.locator('#comic-page-4')).toBeInViewport();
    const html = await (await request.get(`/arcane-casters/comic/${episode.id}/ko`)).text();
    expect(html).toContain(`https://theevilent.com/arcane-casters/comic/${episode.id}/ko`);
    expect(html).toContain(`/arcane-casters/comic/${episode.directory}/cover.webp`);
    expect(html).not.toContain(`hreflang="en" href="https://theevilent.com/arcane-casters/comic/${episode.id}/en"`);
    const share = new URL((await page.getByRole('link', { name: 'X · 이 이야기 공유하기', exact: true }).getAttribute('href'))!);
    expect(share.searchParams.get('url')).toBe(`https://theevilent.com/arcane-casters/comic/${episode.id}/ko`);
    const navigation = page.getByRole('navigation', { name: '회차 이동', exact: true });
    await expect(navigation.getByRole('link', { name: /이전화/ })).toHaveAttribute('href', `/arcane-casters/comic/${Number(episode.id) - 1}/ko`);
    if (episode.id !== '7') await expect(navigation.getByRole('link', { name: /다음화/ })).toHaveAttribute('href', `/arcane-casters/comic/${Number(episode.id) + 1}/ko`);
    else await expect(navigation.getByRole('link', { name: /다음화/ })).toHaveCount(0);
    await page.setViewportSize({ width: 320, height: 750 });
    for (let number = 1; number <= episode.pages; number++) {
      const image = page.locator(`#comic-page-${number} > img`);
      const source = `/arcane-casters/comic/${episode.directory}/ko/page-${String(number).padStart(2, '0')}.webp`;
      await expect(image).toHaveAttribute('src', source);
      const response = await request.get(source);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('image/webp');
      const bytes = await response.body();
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element: HTMLImageElement) => element.decode());
      await expect(image).toHaveJSProperty('naturalWidth', 1024);
      await expect(image).toHaveJSProperty('naturalHeight', 1536);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: info.outputPath(`episode-${episode.id}-mobile.png`) });
    await page.locator('.comic-reading-end').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(({ key, id }) => JSON.parse(localStorage.getItem(key) ?? '{}')[id]?.completed, { key: historyKey, id: episode.id })).toBe(true);
    await page.locator('.comic-list-back').click();
    await expect(page.getByRole('list', { name: '회차 목록', exact: true }).getByRole('link', { name: new RegExp(episode.title) })).toContainText('읽음');
    expect(errors).toEqual([]);
  });
}

test('미준비 영어판은 이미지 요청 없이 안내하고 한국어 진행 위치를 유지한다', async ({ page }, info) => {
  const missingImages: string[] = [];
  page.on('request', request => {
    if (/\/comic\/00[567]\/en\/.*\.webp/.test(request.url())) missingImages.push(request.url());
  });
  await page.goto('/arcane-casters/comic/5/ko');
  await page.locator('#comic-page-4').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{}')['5']?.page, historyKey)).toBe(4);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/comic\/5\/en/);
  await expect(page.getByRole('heading', { name: 'The English edition is not available yet.', exact: true })).toBeVisible();
  await expect(page.locator('.comic-page')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Read in Korean', exact: true })).toHaveAttribute('href', '/arcane-casters/comic/5/ko#comic-page-4');
  await page.setViewportSize({ width: 320, height: 750 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: info.outputPath('unavailable-english-mobile.png') });
  await page.getByRole('link', { name: 'Read in Korean', exact: true }).click();
  await expect(page.locator('#comic-page-4')).toBeInViewport();
  await page.goto('/arcane-casters/comic/en');
  await expect(page.locator('.comic-episode-row')).toHaveCount(4);
  await expect(page.locator('.comic-library-resume')).toHaveCount(0);
  await expect(page.getByRole('list', { name: 'Episode list', exact: true }).getByRole('link', { name: /Episode 5/ })).toHaveCount(0);
  await page.goto('/arcane-casters/comic/4/en');
  await expect(page.getByRole('navigation', { name: 'Episode navigation', exact: true }).getByRole('link', { name: /Next episode/ })).toHaveCount(0);
  await page.goto('/arcane-casters/comic/4/ko');
  await page.getByRole('navigation', { name: '회차 이동', exact: true }).getByRole('link', { name: /다음화/ }).click();
  await expect(page.getByRole('heading', { name: '5화 · 대피', exact: true })).toBeVisible();
  expect(missingImages).toEqual([]);
});
