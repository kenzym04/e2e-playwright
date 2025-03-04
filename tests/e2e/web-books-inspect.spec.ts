import { test, expect } from '@playwright/test';

/**
 * 🏃 Web Books Login Page Test
 * ✅ This test verifies the visibility and functionality of login page elements.
 */
test.describe('Web Books Page Visibility', () => {
  test('should load login page and verify elements', async ({ page }) => {
    // 🌐 Navigate to the Web Books login page
    await page.goto('https://www.rea-webbooks.com.au/login');

    // 🏷️ Verify page title
    await expect(page).toHaveTitle('Web Books');

    // 📧 Verify email input field visibility and enablement
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();

    // 🔒 Verify password input field visibility and enablement
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toBeEnabled();

    // 🔑 Verify login button visibility and enablement
    const loginButton = page.locator('button', { hasText: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // 🆕 Verify register button visibility and enablement
    const registerButton = page.locator('//a[contains(text(),"Register")]');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();

    // ❓ Verify "Forgot Your Password?" link visibility (No enablement check needed for hyperlinks)
    const forgotPasswordLink = page.locator('a', { hasText: 'Forgot Your Password?' });
    await expect(forgotPasswordLink).toBeVisible();

    // 📸 Take a screenshot for verification
    await page.screenshot({ path: 'test-results/web-books-login.png', fullPage: true });
  });
});
