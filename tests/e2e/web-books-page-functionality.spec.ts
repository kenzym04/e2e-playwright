
import { login } from '../utils/login';
import { generateUserCredentials } from '../utils/generateUserCredentials';
import { registerUser } from '../utils/registerUser';
import {test, expect} from '@playwright/test';

    const userCredentials = generateUserCredentials();
    
    test.describe('Web Books Page Functionality', () => {

        // Navigate to the web books page
        test('Test Case 1: should register new user', async ({page}) => {
            
            console.log('User registered successfully');
            await registerUser(page, userCredentials.fullName, userCredentials.email, userCredentials.phoneNumber, userCredentials.password);
            await page.waitForTimeout(5000);
            await expect(page).toHaveTitle('Web Books');
            await expect(page.locator('body')).toContainText('Welcome,' + ' ' + userCredentials.fullName);
        })

        test('Test Case 2: should login with valid credentials', async ({page}) => {
            await page.goto('https://www.rea-webbooks.com.au/login');
            await login(page, userCredentials.email, userCredentials.password);
            await page.waitForTimeout(5000)
            await expect(page).toHaveTitle('Web Books');
            await expect(page).toHaveURL('https://www.rea-webbooks.com.au/admin');
        });
});