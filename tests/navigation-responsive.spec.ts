import { test, expect } from '@playwright/test';

for (const language of ['ko', 'en'] as const) {
  for (const signedIn of [false, true]) {
    test(`navigation fits intermediate widths: ${language} ${signedIn ? 'long nickname' : 'signed out'}`, async ({ page }, info) => {
      await page.addInitScript(locale => localStorage.setItem('arcane-casters-language', locale), language);
      await page.route('https://account.theevilent.com/**', route => {
        const request = route.request();
        const headers = {
          'Access-Control-Allow-Origin': request.headers()['origin'] || '',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'authorization, content-type, x-token-delivery, accept-language',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        };
        if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers });
        if (!signedIn) return route.fulfill({ status: 401, headers });
        const body = new URL(request.url()).pathname === '/api/auth/refresh'
          ? { jwt: 'fixture-access', expiresIn: 3600 }
          : { id: 7, name: 'AVeryLongNicknameThatKeepsGoingAndGoing', email: 'reader@example.com' };
        return route.fulfill({ headers, json: body });
      });
      await page.route('**/api/public/**', route => route.fulfill({ json: {
        updatedAt: new Date().toISOString(), players: [], magics: [], totalGames: 0,
        from: new Date().toISOString(), to: new Date().toISOString(),
      } }));
      await page.goto('/arcane-casters/rankings');
      await page.evaluate(() => document.fonts.ready);
      if (signedIn) await expect(page.locator('.navbar-account')).toHaveText('AVeryLongNicknameThatKeepsGoingAndGoing');
      const clipped: string[] = [];
      for (const width of [320, 390, 767, 768, 820, 900, 1024, 1100, 1101, 1199, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        const menu = page.locator('.navbar-menu-btn');
        if (await menu.isVisible()) await menu.click();
        await page.locator('.navbar-game-trigger').click();
        const overflow = await page.locator('.navbar a, .navbar button').evaluateAll(controls =>
          controls.filter(control => {
            const bounds = control.getBoundingClientRect();
            return bounds.width > 0 && bounds.height > 0
              && (bounds.left < -1 || bounds.right > innerWidth + 1 || bounds.bottom > innerHeight + 1);
          }).map(control => control.textContent || control.getAttribute('aria-label') || 'logo'),
        );
        if (overflow.length) clipped.push(`${width}px: ${overflow.join(', ')}`);
        if (width === 900) await page.screenshot({ path: info.outputPath('navigation-900.png') });
        if (await menu.isVisible()) {
          const bounds = await page.locator('.navbar-links').boundingBox();
          expect(bounds!.width).toBeLessThanOrEqual(320);
          await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveCount(6);
        }
        await page.keyboard.press('Escape');
        await expect(page.locator('.navbar-game-trigger')).toHaveAttribute('aria-expanded', 'false');
        await expect(menu).toHaveAttribute('aria-expanded', 'false');
      }
      expect(clipped).toEqual([]);
      await page.setViewportSize({ width: 820, height: 280 });
      await page.locator('.navbar-menu-btn').click();
      await page.locator('.navbar-game-trigger').click();
      const account = page.locator('.navbar-account');
      await account.scrollIntoViewIfNeeded();
      await expect(account).toBeInViewport();
      await page.keyboard.press('Escape');
      await page.setViewportSize({ width: 820, height: 900 });
      await page.locator('.navbar-menu-btn').click();
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: language === 'ko' ? '팀' : 'Team', exact: true }).click();
      await expect(page).toHaveURL(/\/team$/);
      await expect(page.locator('.navbar-menu-btn')).toHaveAttribute('aria-expanded', 'false');
      await page.goto('/');
      await page.setViewportSize({ width: 900, height: 900 });
      const homeMenu = page.locator('.navbar-menu-btn');
      await homeMenu.click();
      await page.locator('.navbar-game-trigger').click();
      const popover = await page.locator('.navbar-links').boundingBox();
      const trigger = await homeMenu.boundingBox();
      expect(popover!.width).toBeLessThanOrEqual(320);
      expect(Math.abs(popover!.x + popover!.width - trigger!.x - trigger!.width)).toBeLessThanOrEqual(2);
      await page.screenshot({ path: info.outputPath('navigation-home-900.png') });
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: language === 'ko' ? '만화' : 'Comic', exact: true }).click();
      await expect(page).toHaveURL(new RegExp('/comic/1/' + language + '$'));
    });
  }
}
