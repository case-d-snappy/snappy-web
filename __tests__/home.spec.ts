import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('HomePage Intro section renders correctly', async ({ page }) => {
  await expect(page).toHaveScreenshot({
    timeout: 5000,
    maxDiffPixelRatio: 0.5,
    animations: 'disabled',
  });

  // Check intro section elements visibility
  await expect(page.getByRole('img', { name: 'Snappy Logo' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Snappy' })).toBeVisible();
  await expect(page.getByText('Draw picture diary for everyday moments special')).toBeVisible();

  // Check store buttons
  const appStoreButton = page.getByRole('link', { name: 'Download from App Store (Coming Soon)' });
  const googlePlayButton = page.getByRole('link', { name: 'Download from Google Play Store (Coming Soon)' });

  // Verify store buttons are visible and have correct styling
  await expect(appStoreButton).toBeVisible();
  await expect(appStoreButton).toHaveClass('relative cursor-pointer z-10');
  await expect(googlePlayButton).toBeVisible();
  await expect(googlePlayButton).toHaveClass('relative cursor-pointer z-10');

  // Test tooltip functionality
  await appStoreButton.click();
  await expect(page.getByText('Coming Soon')).toBeVisible();
  await expect(page.getByText('Coming Soon')).toHaveCSS('opacity', '1');

  // Wait for tooltip to disappear
  await page.waitForTimeout(3000);
  await expect(page.getByText('Coming Soon')).not.toBeVisible();

  // Test Google Play tooltip
  await googlePlayButton.click();
  await expect(page.getByText('Coming Soon')).toBeVisible();
  await expect(page.getByText('Coming Soon')).toHaveCSS('opacity', '1');

  // Wait for tooltip to disappear
  await page.waitForTimeout(3000);
  await expect(page.getByText('Coming Soon')).not.toBeVisible();
});
