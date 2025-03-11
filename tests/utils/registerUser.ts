import {Page, expect } from '@playwright/test';

export async function registerUser(page: Page, fullName: string, email: string, phoneNumber: string, password: string) {
    await page.goto('https://www.rea-webbooks.com.au/');
    await expect(page).toHaveTitle('Web Books');
    // Click on the register button
    await page.click('//a[normalize-space()="Register"]');
    console.log('Clicked on the register button');
    // Fill the registration form
    await page.fill('//label[normalize-space()="Name"]', fullName);
    await page.fill('//label[normalize-space()="Email Address"]', email);
    await page.fill('//input[@id="phone_number"]', phoneNumber);
    await page.fill('//input[@id="password"]', password);
    await page.fill('//input[@id="password-confirm"]', password);

    // Click on the register button
    const registerButton = await page.locator('//button[normalize-space()="Register"]');
    await registerButton.click();
}