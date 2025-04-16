# E2E Playwright & Prisma Automation: End-to-End Web Books Page Testing, Database Management with SQL Migration

## 📌 Project Overview

This repository integrates **automated testing (Playwright)** and **database management (Prisma with SQLite)** into a single workflow.

### 🔹 Playwright (Web Books Testing)

- Visual inspection tests for the **Web Books Login Page**
- Cross-browser & mobile testing (**Chromium, Firefox, WebKit, Safari, Chrome, Mobile Safari, Mobile Chrome**)
- CI/CD integration with **GitHub Actions**
- Test artifacts (screenshots, traces, reports) for debugging

### 🔹 Prisma (SQLite Database)

#### Features
- **User Management**: Store and manage users in the `AppUser` table.
- **Role-Based Access Control (RBAC)**: Define roles and associate users with permissions.
- **Phone Number Storage**: Maintain a list of user phone numbers.
- **Secure Authentication**: Passwords are hashed using **bcrypt**.
- **Database Migrations**: Managed via Prisma's migration system.
- **Testing with TypeScript**: Validate database operations with test scripts.

### 🔹 Key Functionality Tests

- **Login Page Element Verification**: Automated tests to verify the visibility and functionality of login page elements.
- **User Registration**: Automated tests for user registration process.
- **Database Storage**: Verification of registered users being stored in the SQLite database.
- **Login Functionality**: Tests to ensure registered users can successfully log in.
- **Data Integrity**: Checks to confirm user data consistency between the web interface and database.

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js (v18 or later)** → [Download](https://nodejs.org/)
- **Playwright** (installed via `npm`)
- **Prisma** ORM
- **Git** (optional, for version control)
- **Docker-compose**

### 🔧 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/e2e-playwright.git
cd e2e-playwright
npm install
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

Set up Prisma database:

```bash
npx prisma migrate dev
```

---

## 🧪 Running Tests

### Run all tests in parallel (default):

```bash
npx playwright test --workers=5
```

### Run login page element verification test:

```bash
npx playwright test tests/e2e/web-books-inspect.spec.ts
```

### Run registration and login tests:

```bash
npx playwright test tests/e2e/web-books-page-functionality.spec.ts
```

### Run database storage verification tests:

```bash
npx playwright test tests/integration/prisma-user-creation.spec.ts
```

### Run only Prisma tests:

```bash
npx playwright test tests/integration --workers=2
```

### Run only Web Books tests:

```bash
npx playwright test tests/e2e --workers=3
```

### Run tests in shard mode (for CI/CD optimization):

```bash
npx playwright test --shard=1/2
```

### Run tests sequentially for debugging:

```bash
npx playwright test --workers=1 --debug
```

---

## 📂 Project Structure

```
e2e-playwright
│── .github/workflows/        # GitHub Actions CI/CD setup
│── prisma/                   # Prisma ORM schema and migrations
+---database_migration
|       .env
|       docker-compose.yml
|       init.sql
|       migration.sql
|
+---e2e
|   |   login-test.spec.ts
|   |   web-books-inspect.spec.ts
|   |   web-books-page-functionality.spec.ts
|   |
|   \---test-results
|       prisma-user-creation.spec.ts
|
|
\---utils
        generateUserCredentials.ts
        login.ts
        registerUser.ts
        testPrisma.ts
│── docs/                     # Documentation and test reports
│── screenshots/              # Screenshot files
│── test-results/             # Test artifacts (screenshots, traces)
│── prisma-test-report/       # Prisma-specific test reports
│── prisma-test-results/      # Prisma-specific test results
│── .env                      # Environment variables
│── playwright.config.ts      # Playwright configuration
│── package.json              # Project dependencies
│── tsconfig.json             # TypeScript configuration
│── README.md                 # Project documentation

```

---

## 🔄 Database Management (Prisma)

### Run Prisma migrations:

```bash
npx prisma migrate dev
```

### Open SQLite database viewer:

```bash
npx prisma studio
```

### Seed database (if applicable):

```bash
node prisma/seed.js
```

---

## 📊 CI/CD Integration (GitHub Actions)

- **Triggers**: Runs on `push` and `pull_request` events
- **Executes Playwright & Prisma tests**
- **Uploads reports & artifacts**

Manually trigger tests:

```bash
gh workflow run ci.yml
```

---

## 📑 Test Reporting

Test reports are stored in:

- **HTML Report (`playwright-report/`)**
- **JSON Report (`test-results/`)**

To view reports locally:

```bash
npx playwright show-report
```
---
## 🔄 Database Migration

### Database Schema

The provided SQL script sets up a database schema for a fictional e-commerce platform called "WATU". The script creates the following tables:

1. `Clients`: Stores information about clients, such as their ID, name, address, and phone number.
2. `Users`: Stores user information, including their ID, username, password, registration date, and the client they belong to (if any).
3. `Orders`: Stores order information, including their ID, user ID, client ID, order date, and total amount.
4. `Products`: Stores product information, including their ID, name, and price.
5. `OrderItems`: Stores the relationship between orders and products, including the order ID, product ID, and quantity.

### init.sql

The `init.sql` file contains the SQL script for creating the database schema and inserting sample data. It is used to initialize the database with the necessary tables and data for testing and development purposes.

### Migration Script

The `migration.sql` file contains the SQL script for creating the database schema and inserting sample data. You can use this script to migrate the database schema to your MySQL server.

### Docker Compose

The `docker-compose.yml` file provides a configuration for running a MySQL server using Docker. You can use this file to set up a local development environment for testing and development purposes.

### Environment Variables

The `.env` file contains environment variables that can be used to configure the database connection. You can set the following variables:

- `DB_HOST`: The host address of the MySQL server.
- `DB_PORT`: The port number of the MySQL server.
- `DB_NAME`: The name of the database.
- `DB_USER`: The username for connecting to the database.
- `DB_PASSWORD`: The password for connecting to the database.

### Running the Migration Script

To migrate the database schema, follow these steps:

1. Make sure you have Docker installed and running.
2. Open a terminal and navigate to the directory containing the `docker-compose.yml` file.
3. Run `docker-compose up -d` to start the MySQL server using Docker.
4. Run `docker-compose exec db bash` to open a bash shell inside the Docker container.
5. Inside the Docker container, run `mysql -u root -p < init.sql` to execute the `init.sql` script and create the database schema.
6. Run `mysql -u root -p < migration.sql` to execute the migration script and apply the database migrations.

### Testing with Prisma

The `prisma` directory contains the Prisma schema and migration files. You can use Prisma to interact with the database and perform CRUD operations.

To test the database migration with Prisma, follow these steps:

1. Make sure you have Prisma installed and set up in your project.
2. Run `npx prisma migrate dev` to apply the database migrations.
3. Use Prisma queries and mutations to interact with the database and perform CRUD operations.

This section provides a clear overview of the purpose and contents of the database migration, as well as instructions on how to use the `init.sql` file, migration script, Docker Compose, environment variables, and Prisma to initialize the database for testing and development purposes.

---
## ❓ Troubleshooting

1. **Tests failing on CI/CD?**
   
   - Ensure correct **Node.js** and **Playwright** versions are installed.
   - Try running tests locally using `npx playwright test --workers=4`.

2. **"Browser not found" error?**
   
   - Run `npx playwright install --with-deps` to install missing browsers.

3. **Database issues?**
   
   - Check your Prisma schema and run `npx prisma migrate dev`.

4. **Registration or login tests failing?**
   
   - Check the Web Books site accessibility.
   - Verify that the test user credentials are unique for each test run.
   - Ensure the database is properly reset between test runs.

5. **User data not appearing in the database?**
   
   - Confirm that the Prisma schema matches the expected database structure.
   - Check for any errors in the user creation process in the logs.

6. **Login page element verification test failing?**
   
   - Ensure the Web Books site structure hasn't changed.
   - Check for any CSS or layout changes that might affect element visibility.
   - Verify network connectivity to the Web Books site.

---