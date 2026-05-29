import { test, expect } from '@playwright/test';

test('capture screenshots of all pages', async ({ page }) => {
  // Go to homepage
  await page.goto('/');
  await expect(page).toHaveTitle('The Evil Ent');

  // Allow animations to initialize
  await page.waitForTimeout(1000);

  // Take screenshot of Home page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_home.png',
    fullPage: true 
  });
  console.log('Saved screenshot_home.png');

  // Navigate to Games page
  const gamesBtn = page.locator('nav button:has-text("GAMES")');
  await gamesBtn.click();
  await page.waitForTimeout(1000);
  
  // Take screenshot of Games page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_games.png',
    fullPage: true 
  });
  console.log('Saved screenshot_games.png');

  // Navigate to Team page
  const teamBtn = page.locator('nav button:has-text("TEAM")');
  await teamBtn.click();
  await page.waitForTimeout(1000);

  // Take screenshot of Team page
  await page.screenshot({ 
    path: '/Users/jeong-yunseong/.gemini/antigravity-cli/brain/f4bb0e0e-a623-4946-ab10-f7803ca450b8/screenshot_team.png',
    fullPage: true 
  });
  console.log('Saved screenshot_team.png');
});
