import { test, expect } from '@playwright/test';

test.describe('Web Books Login Page', () => {
  test('should load login page and verify elements', async ({ page }) => {
    // Navigate to the Web Books login page
    await page.goto('https://www.rea-webbooks.com.au/login');

    // Verify the title
    await expect(page).toHaveTitle('Web Books');

    // Check if email input is visible
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // Check if password input is visible
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();

    // Check if login button is visible and enabled
    const loginButton = page.locator('button', { hasText: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // Take a screenshot
    await page.screenshot({ path: 'test-results/web-books-login.png', fullPage: true });
  });
});
