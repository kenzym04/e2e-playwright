import {test, expect} from '@playwright/test';
 test.describe('Login to the UI', () => {
    test('should login successfully', async ( {page} ) => {
        //go to url
        await page.goto('https://demoqa.com/login');
        //verify page title
        await expect(page).toHaveTitle('DEMOQA');
        //enter email
        await page.fill('//input[@id="userName"]', 'testuser');
        //enter password
        await page.fill('//input[@id="password"]', 'testpassword');
        //click login button
        await page.click('//button[@id="login"]');

    });
 });

