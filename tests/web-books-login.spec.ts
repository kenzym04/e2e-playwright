import { test, expect } from '@playwright/test';

test.describe('Web Books Page Visibility', () => {
  test('should load login page and verify elements', async ({ page }) => {
    // Navigate to the Web Books login page
    await page.goto('https://www.rea-webbooks.com.au/login');

    // Verify the title
    await expect(page).toHaveTitle('Web Books');

    // Check if email input is visible
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();

    // Check if password input is visible
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();

    // Check if login button is visible and enabled
    const loginButton = page.locator('button', { hasText: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // Verify register button
    const registerButton = page.locator('//a[contains(text(),"Register")]');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();

    // Verify forgot password link
    const forgotPasswordLink = page.locator('a', { hasText: 'Forgot Your Password?' });
    await expect(forgotPasswordLink).toBeVisible();
    await expect(registerButton).toBeEnabled();

    // Take a screenshot
    await page.screenshot({ path: 'test-results/web-books-login.png', fullPage: true });
  });
});
