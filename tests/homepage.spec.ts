// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should display the correct title and take a screenshot', async ({ page }) => {
    // Replace 'http://localhost:3000' with your Next.js app's URL
    await page.goto('http://localhost:3001');

    // Example: Check that the title is correct
    await expect(page).toHaveTitle(/Create Next App/);

    // Optionally, verify a specific element is present
    await expect(page.locator('text=Get started by editing')).toBeVisible();

    // Take a screenshot (useful for visual regression testing)
    await page.screenshot({ path: `tests/screenshots/homepage-test.png` });
  });
});
