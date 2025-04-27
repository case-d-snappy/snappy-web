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
    const title = page.getByRole('heading', { level: 1, name: 'Snappy' });
    const description = page.getByRole('heading', {
      level: 2,
      name: 'Draw picture diary for everyday moments special',
    });

    // Check elements are visible
    await expect(title).toBeVisible();
    await expect(description).toBeVisible();

    // Check initial animation states
    await expect(title).toHaveCSS('opacity', '1');
    await expect(description).toHaveCSS('opacity', '1');

    // Check store buttons
    const appStoreButton = page.getByRole('link', { name: 'Download from App Store (Coming Soon)' });
    const googlePlayButton = page.getByRole('link', { name: 'Download from Google Play Store (Coming Soon)' });

    // Verify store buttons are visible and have correct styling
    await expect(appStoreButton).toBeVisible();
    await expect(googlePlayButton).toBeVisible();

    // Verify button animations
    await expect(appStoreButton).toHaveCSS('opacity', '1');
    await expect(googlePlayButton).toHaveCSS('opacity', '1');

    // Test tooltip functionality for App Store
    await appStoreButton.click();
    const appStoreTooltip = page.getByText('Coming Soon');
    await expect(appStoreTooltip).toBeVisible();
    await expect(appStoreTooltip).toHaveCSS('opacity', '1');
    await expect(appStoreTooltip).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');

    // Wait for tooltip to disappear
    await page.waitForTimeout(3000);
    await expect(appStoreTooltip).not.toBeVisible();

    // Test tooltip functionality for Google Play
    await googlePlayButton.click();
    const googlePlayTooltip = page.getByText('Coming Soon');
    await expect(googlePlayTooltip).toBeVisible();
    await expect(googlePlayTooltip).toHaveCSS('opacity', '1');
    await expect(googlePlayTooltip).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');

    // Wait for tooltip to disappear
    await page.waitForTimeout(3000);
    await expect(googlePlayTooltip).not.toBeVisible();

    // Verify Sparkles component
    const sparkles = page.locator('.absolute.inset-x-0.-bottom-14');
    await expect(sparkles).toBeVisible();
    await expect(sparkles).toHaveCSS('z-index', '2');
    await expect(sparkles).toHaveCSS('height', '400px');
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
