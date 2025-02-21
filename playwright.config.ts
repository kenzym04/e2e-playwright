import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    trace: 'on',  // Enables tracing for debugging
    screenshot: 'on',  // Captures screenshots
    video: 'retain-on-failure',  // Saves video only if test fails
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // Generates an HTML report
    ['json', { outputFile: 'test-results/results.json' }], // JSON report for structured data
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  outputDir: 'test-results/', // Stores test artifacts (traces, videos, screenshots)
});
