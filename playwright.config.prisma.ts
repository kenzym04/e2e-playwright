import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 5 * 60 * 1000, // Set timeout to 5 minutes
  workers: 1, // Ensures tests run sequentially
  use: {
    headless: false, // Runs tests in headed mode
    trace: 'on', // Enables tracing for debugging
    video: 'on', // Records video for verification
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'prisma-test-report' }],
    ['json', { outputFile: 'prisma-test-results/results.json' }],
  ],
  outputDir: 'prisma-test-results/',
  retries: 1, // Retry failed tests once
  fullyParallel: false, // Ensure tests run sequentially
});
