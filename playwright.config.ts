import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Number of workers on CI */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter to use */
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://demowebshop.tricentis.com/',

    /* Collect trace when test fails */
    trace: 'retain-on-failure',

    /* Take a screenshot when a test fails. */
    screenshot: 'only-on-failure',

    /* Retain video when a test fails. */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',

      testMatch: /auth\.setup\.ts/,

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'cart-project',

      testMatch: ['**/cart-operations.spec.ts'],

      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'chromium',

      testMatch: ['**/auth.spec.ts', '**/product-search.spec.ts'],

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */

    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },

    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */

    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },

    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});