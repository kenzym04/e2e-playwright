# Watu Assignment - Playwright & Prisma Automation

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

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js (v18 or later)** → [Download](https://nodejs.org/)
- **Playwright** (installed via `npm`)
- **Prisma** ORM
- **Git** (optional, for version control)

### 🔧 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/watu-assignment-playwright.git  
cd watu-assignment-playwright  
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
watu-assignment-playwright
│── .github/workflows/        # GitHub Actions CI/CD setup
│── prisma/                   # Prisma ORM schema and migrations
│── tests/                    # Playwright test files
│   ├── e2e/                  # End-to-end tests (e.g., web-books-inspect.spec.ts)
│   ├── integration/          # Integration tests (e.g., prisma-user-creation.spec.ts)
│   └── utils/                # Test utilities (e.g., testPrisma.ts)
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

- **HTML Report (**``**)**
- **JSON Report (**``**)**

To view reports locally:

```bash
npx playwright show-report  
```

---

## ❓ Troubleshooting

1. **Tests failing on CI/CD?**

   - Ensure correct **Node.js** and **Playwright** versions are installed.
   - Try running tests locally using `npx playwright test --workers=4`.

2. **"Browser not found" error?**

   - Run `npx playwright install --with-deps` to install missing browsers.

3. **Database issues?**

   - Check your Prisma schema and run `npx prisma migrate dev`.

---

