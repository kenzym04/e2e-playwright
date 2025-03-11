import { Page, expect} from 'playwright/test'
export async function login(page: Page, email: string, password: string) {
    console.log('Logging in...');
    await page.fill('//input[@placeholder="Email"]', email);
    await page.fill('//input[@id="password"]', password);
    await page.click('//button[@type="submit"]');
    await page.waitForTimeout(5000);
    await expect(page).toHaveTitle('Web Books');
    console.log('Logged in successfully');
    
}