import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('HomePage renders correctly', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: 'Snappy' })).toBeVisible();
});
