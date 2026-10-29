import { test, expect } from '@playwright/test';

for (const language of ['ko', 'en'] as const) {
  test(`home logo and play buttons fit phone and tablet widths: ${language}`, async ({ page }, info) => {
    await page.addInitScript(locale => localStorage.setItem('arcane-casters-language', locale), language);
    await page.route('**/api/auth/refresh', route => route.fulfill({ status: 401 }));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const clipped: string[] = [];
    for (const width of [320, 390, 767, 768, 820, 900, 1024, 1100, 1101, 1200, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const failures = await page.locator('.home-hero-logo img, .home-hero-buttons a').evaluateAll(elements =>
        elements.filter(element => {
          const bounds = element.getBoundingClientRect();
          return bounds.left < -1 || bounds.right > innerWidth + 1
            || element.scrollWidth > element.clientWidth + 1;
        }).map(element => element.textContent?.trim() || 'logo'),
      );
      if (failures.length) clipped.push(`${width}px: ${failures.join(', ')}`);
      await expect(page.locator('.home-hero-buttons a')).toHaveCount(3);
      if (width === 820 || width === 1200) {
        await page.locator('.home-hero').screenshot({ path: info.outputPath(`home-hero-${width}.png`) });
      }
    }
    expect(clipped).toEqual([]);
  });
}
