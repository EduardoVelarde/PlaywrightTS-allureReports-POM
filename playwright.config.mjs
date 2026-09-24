import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', testMatch: 'runner.spec.mjs', workers: 1, retries: 0,
  reporter: [['line'], ['json', { outputFile: 'test-results/results.json' }], ['html', { open: 'never' }]],
  // This fixture uses only static local HTML and has no QA sessions or secrets.
  use: { browserName: 'chromium', headless: true, trace: 'retain-on-failure' },
});
