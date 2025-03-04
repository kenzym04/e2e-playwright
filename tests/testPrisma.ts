import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Function to generate a sanitized username
function generateUsername(firstName: string, lastName: string) {
  return `${firstName}.${lastName}.${faker.string.alphanumeric(5)}`
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "");
}

// Function to generate a Kenyan phone number
function generateKenyanPhoneNumber() {
  return `+254${faker.string.numeric(9)}`;
}

async function main() {
  try {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = generateUsername(firstName, lastName);
    const email = faker.internet.email({ firstName, lastName, provider: 'example.com' }).toLowerCase();
    const rawPassword = faker.internet.password({ length: 12, memorable: true });
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Step 1: Create User with Unique Email & Randomized Name
    const user = await prisma.appUser.create({
      data: {
        username,
        firstname: firstName,
        lastname: lastName,
        password: hashedPassword,
        email,
        nonlocked: true,
        enabled: true,
        last_time_password_updated: new Date(),
        password_never_expires: false,
        cannot_change_password: false
      }
    });

    console.log("User created:", { ...user, rawPassword });

    // Step 2: Create Roles if they don't exist
    const [adminRole, userRole] = await Promise.all([
      prisma.role.upsert({
        where: { name: "Admin" },
        update: {},
        create: {
          name: "Admin",
          description: "Administrator role",
          is_disabled: false
        }
      }),
      prisma.role.upsert({
        where: { name: "User" },
        update: {},
        create: {
          name: "User",
          description: "Standard user role",
          is_disabled: false
        }
      })
    ]);

    console.log("Roles created:", adminRole, userRole);

    // Step 3: Assign User to a Role (Admin for now)
    await prisma.appUserRole.create({
      data: {
        appuser_id: user.id,
        role_id: adminRole.id
      }
    });

    console.log(`Assigned role '${adminRole.name}' to user '${user.username}'`);

    // Step 4: Add a Phone Number for the User
    await prisma.userPhone.create({
      data: {
        user_id: user.id,
        phone_country_id: 254,
        phone: generateKenyanPhoneNumber(),
        order_index: 1
      }
    });

    console.log(`Phone number added for user '${user.username}'`);

    return user;
  } catch (error) {
    console.error("Error in user creation process:", error);
    throw error;
  }
}

// Execute the function
main()
  .then((user) => {
    console.log("User creation process completed successfully.");
    console.log("Created user:", user);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });