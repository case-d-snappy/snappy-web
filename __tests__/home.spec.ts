import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('HomePage renders correctly', () => {
  test('Screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({
      timeout: 5000,
      maxDiffPixelRatio: 0.5,
      animations: 'disabled',
    });
  });

  test('1. Intro section', async ({ page }) => {
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

  test('2. Strengths section', async ({ page }) => {
    // Check main heading and description
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Record precious moments specially and check them at a glance.',
      })
    ).toBeVisible();

    await expect(
      page.getByText('Record your precious daily moments with AI styling, and check your diary and photos at a glance.')
    ).toBeVisible();

    // Check first feature section
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: 'Make your memories shine brighter with AI-powered photo styling',
      })
    ).toBeVisible();
    await expect(
      page.getByText('Capture the moment you want to remember, choose a style, and let AI make it special.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Day Card"]')).toBeVisible();

    // Check second feature section
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: "Write it down, Snappy's AI turn them into a beautiful picture diary",
      })
    ).toBeVisible();
    await expect(
      page.getByText('Write your daily diary and emotions, and AI will create a picture diary for you.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Detail Card"]')).toBeVisible();

    // Check third feature section
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: 'See all your days at a glance',
      })
    ).toBeVisible();
    await expect(
      page.getByText('View all your days in one place, displayed in card or calendar format.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Calender Screen"]')).toBeVisible();
  });
});
