## Watu Assignment - Playwright Test Automation

### Project Overview
This project contains automated tests for the **Web Books Login Page** using [Playwright](https://playwright.dev/). The tests validate the presence of essential login elements and ensure compatibility across multiple browsers and mobile devices.

### Features
- Automated end-to-end tests using **Playwright**
- Cross-browser and mobile testing (**Chromium, Firefox, WebKit, Safari, Chrome, Mobile Safari, Mobile Chrome**)
- CI/CD integration using **GitHub Actions**
- Test artifacts (screenshots, traces, reports) for debugging

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js (v18 or later)** → [Download](https://nodejs.org/)
- **Playwright** (installed via `npm`)
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

---

## Running Tests
### Run all tests:
```bash
npx playwright test
```

### Run tests in a specific browser or device:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=chrome
npx playwright test --project=mobile-safari
npx playwright test --project=mobile-chrome
```

### Run a specific test file:
```bash
npx playwright test tests/web-books-login.spec.ts
```

### Capture screenshots:
```bash
npx playwright test --update-snapshots
```

### Debugging mode:
```bash
npx playwright test --debug
```

---

## Test Case: **Web Books Login Page**
### **Test Steps**
1. Navigate to the **Web Books Login Page** → [https://www.rea-webbooks.com.au/login](https://www.rea-webbooks.com.au/login)
2. Verify the presence of:
   - Email input field
   - Password input field
   - Login button
   - Register button
   - "Forgot Your Password?" link
3. Execute tests across multiple browsers and mobile devices
4. Capture execution results

### **Test Assertions**
- The login page loads successfully
- All UI elements are visible and enabled
- The browser title is correctly set to **"Web Books"**

---

## Test Execution Results
| Browser  | Test Status |
|----------|------------|
| Chromium | ✅ Passed  |
| Firefox  | ✅ Passed  |
| WebKit   | ✅ Passed  |
| Safari   | ✅ Passed  |
| Chrome   | ✅ Passed  |
| Mobile Safari | ✅ Passed  |
| Mobile Chrome | ✅ Passed  |

Test artifacts (screenshots, reports) are stored in:
```
test-results/
playwright-report/
```

---

## CI/CD Integration (GitHub Actions)
This project is set up with **GitHub Actions** for automated test execution on every push and pull request.

### Workflow: `.github/workflows/ci.yml`
- **Triggers**: Runs on `push` and `pull_request` events
- **Runs Playwright tests** in a GitHub-hosted Linux environment
- **Uploads test reports** (HTML & JSON)

### Manually trigger tests:
```bash
gh workflow run ci.yml
```

---

## Project Structure
```
watu-assignment-playwright/
│── tests/                      # Playwright test files
│── docs/                       # Documentation and test reports
│── playwright.config.ts         # Playwright configuration
│── package.json                 # Project dependencies
│── .github/workflows/           # GitHub Actions CI/CD config
│── test-results/                # Test artifacts (screenshots, traces)
│── playwright-report/           # HTML reports
│── README.md                    # Project documentation
│── tsconfig.json                 # TypeScript configuration
```

---

## Reporting
Test reports are automatically generated in:
- **HTML Report (`playwright-report/`)**
- **JSON Report (`test-results/results.json`)**

To view the report locally:
```bash
npx playwright show-report
```
---

## Troubleshooting
1. **Tests failing on CI/CD?**
   - Ensure correct **Node.js** and **Playwright** versions are installed.
   - Try running tests locally using `npx playwright test`.

2. **"Browser not found" error?**
   - Run `npx playwright install --with-deps` to install missing browsers.

3. **Seeing different test results locally vs. CI?**
   - Check the **test environment**, ensure fonts and dependencies are available.
---
