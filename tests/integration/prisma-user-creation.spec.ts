import { test, expect } from '@playwright/test';  
import { PrismaClient } from "@prisma/client";  
import { faker } from "@faker-js/faker";  
import bcrypt from "bcrypt";  
import { exec } from 'child_process';

const prisma = new PrismaClient();  
let createdUser: { username: string; email: string; rawPassword: string };  
let prismaStudioProcess: any;

/**
 * Generates a unique username using first name, last name, and random characters.
 */
function generateUsername(firstName: string, lastName: string) {  
  return `${firstName}.${lastName}.${faker.string.alphanumeric(5)}`  
    .toLowerCase()  
    .replace(/[^a-z0-9.]/g, "");  
}

/**
 * Creates a new test user in the Prisma database.
 */
async function createNewUser() {  
  const firstName = faker.person.firstName();  
  const lastName = faker.person.lastName();  
  const username = generateUsername(firstName, lastName);  
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();  
  const rawPassword = faker.internet.password({ length: 12, memorable: true });  
  const hashedPassword = await bcrypt.hash(rawPassword, 10);  

  const user = await prisma.appUser.create({
    data: {
      username,
      firstname: firstName,
      lastname: lastName,
      email,
      password: hashedPassword,
      nonlocked: true,
      enabled: true,
    },
  });

  return { username, email, rawPassword };
}

test.describe('Prisma User Tests', () => {  

  test.beforeAll(async () => {  
    console.log('🏃 Starting Prisma Studio...');
    if (!prismaStudioProcess) {  
      prismaStudioProcess = exec('npx prisma studio');  
      console.log('✅ Prisma Studio opened. Check at http://localhost:5555');  
      await new Promise(resolve => setTimeout(resolve, 4000));  
    }
  });

  test('Verify user exists in the database', async () => {  
    createdUser = await createNewUser();  
    console.log('✅ User Created:', createdUser);  

    const user = await prisma.appUser.findUnique({
      where: { username: createdUser.username },
    });

    console.log(`🔍 Searching for user: ${createdUser.username}`);
    
    expect(user).not.toBeNull();
    console.log('✅ User found in database');
  });

  test('Filter user by username in Prisma Studio', async ({ page }) => {  
    await page.goto("http://localhost:5555/");  
    await page.waitForSelector('text="AppUser"');  

    await page.getByText('AppUser', { exact: true }).click();  
    await page.getByTestId('where-filter').getByText('Filters').click();  
    await page.getByTestId('create-where-filter-btn').click();  
    try {
      console.log('Waiting for dropdown item...');
      await page.getByTestId('where-filter__row__field').getByTestId('dropdown__item--selected').waitFor({ state: 'visible', timeout: 10000 });
      console.log('Dropdown item found, clicking...');
      await page.getByTestId('where-filter__row__field').getByTestId('dropdown__item--selected').click();
      console.log('Dropdown item clicked successfully');
    } catch (error) {
      console.error('Error while interacting with dropdown:', error);
      throw error; // Re-throw the error to fail the test
    } 
    await page.getByTestId('modal').getByText('username').click();  
    await page.getByTestId('where-filter__row__value').fill(createdUser.username);    

    // const count = await page.locator(`text=${createdUser.username}`).count();  
    // expect(count).toBe(1);  
    // console.log(`✅ Found exactly 1 record for username: ${createdUser.username}`);  

    await page.waitForTimeout(1500); // Ensure filtered result is visible
    await page.screenshot({ path: `screenshots/${createdUser.username}.png` });
  });

  test.afterAll(async () => {  
    if (prismaStudioProcess) {  
      prismaStudioProcess.kill();  
      console.log("✅ Prisma Studio closed.");  
    }  

    if (createdUser) {  
      await prisma.appUser.delete({ where: { username: createdUser.username } });  
      console.log("🗑️ Test user deleted.");  
    }  

    await prisma.$disconnect();
  });
});
