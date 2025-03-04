import { test, expect } from '@playwright/test';  
import { PrismaClient } from "@prisma/client";  
import { faker } from "@faker-js/faker";  
import bcrypt from "bcrypt";  

const prisma = new PrismaClient();  
let createdUser: { username: string; email: string; rawPassword: string };  

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

  await prisma.appUser.delete({ where: { username: createdUser.username } });
  console.log('🗑️ Test user deleted.');

});
