import { test, expect } from '@playwright/test';  
import { PrismaClient } from "@prisma/client";  
import { faker } from "@faker-js/faker";  
import bcrypt from "bcrypt";  
import { exec } from 'child_process';

const prisma = new PrismaClient();  
let createdUser: { username: string; email: string; rawPassword: string };  
let prismaStudioProcess: any;

function generateUsername(firstName: string, lastName: string) {  
  return `${firstName}.${lastName}.${faker.string.alphanumeric(5)}`  
    .toLowerCase()  
    .replace(/[^a-z0-9.]/g, "");  
}  

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

test.describe.serial('Prisma User Tests', () => {  

  test('Open Prisma Studio', async () => {  
    console.log('🚀 Starting Prisma Studio...');
    prismaStudioProcess = exec('npx prisma studio');  
    console.log('✅ Prisma Studio opened. Check at http://localhost:5555');  

    // Wait for Prisma Studio to fully load
    await new Promise(resolve => setTimeout(resolve, 8000));  
  });

  test('Verify user exists in the database', async () => {  
    // Step 1: Create a new user  
    createdUser = await createNewUser();  
    console.log('✅ User Created:', createdUser);  

    // Step 2: Verify user exists in the database  
    const user = await prisma.appUser.findUnique({
      where: { username: createdUser.username },
    });

    console.log(`🔍 Searching for user: ${createdUser.username}`);
    
    expect(user).not.toBeNull();
    console.log('✅ User found in database');

  });

  test('Filter user by username in Prisma Studio', async ({ page }) => {  
    // Step 3: Navigate to Prisma Studio  
    await page.goto("http://localhost:5555/");  
    await page.waitForSelector('text="AppUser"');  

    // Click on the AppUser model  
    await page.getByText('AppUser', { exact: true }).click();  
    await page.getByTestId('where-filter').getByText('Filters').click();  
    await page.getByTestId('create-where-filter-btn').click();  
    await page.getByTestId('where-filter__row__field').getByTestId('dropdown__item--selected').click();  
    await page.getByTestId('modal').getByText('username').click();  
    await page.getByTestId('where-filter__row__value').fill(createdUser.username);    

    // Validate that only one user is found  
    const count = await page.locator(`text=${createdUser.username}`).count();  
    expect(count).toBe(1);  
    console.log(`✅ Found exactly 1 record for username: ${createdUser.username}`);  
  });

  test.afterAll(async () => {  
    // Close Prisma Studio  
    if (prismaStudioProcess) {  
      prismaStudioProcess.kill();  
      console.log("✅ Prisma Studio closed.");  
    }  

    // Delete test user from the database  
    if (createdUser) {  
      await prisma.appUser.delete({ where: { username: createdUser.username } });  
      console.log("🗑️ Test user deleted.");  
    }  

    await prisma.$disconnect();
  });

});
