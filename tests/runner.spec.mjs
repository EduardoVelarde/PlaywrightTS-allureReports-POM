import { test, expect } from '@playwright/test';

test('@smoke deterministic success', async ({ page }, testInfo) => {
  console.log('ReleaseReady QA runner fixture: success');
  await page.setContent('<h1>ReleaseReady QA runner fixture</h1>');
  await expect(page.getByRole('heading')).toHaveText('ReleaseReady QA runner fixture');
  await testInfo.attach('qa-evidence', { body: Buffer.from('ReleaseReady QA runner fixture'), contentType: 'text/plain' });
});

test('@failure deterministic failure', async ({ page }) => {
  console.log('ReleaseReady QA runner fixture: intentional failure');
  await page.setContent('<h1>Release blocked</h1>');
  await expect(page.getByRole('heading')).toHaveText('Release ready', { timeout: 100 });
});
