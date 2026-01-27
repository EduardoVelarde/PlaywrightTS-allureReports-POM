import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  reporter: [['list'], ['allure-playwright']],
  use: {
    trace: 'retain-on-failure'
  }
});
