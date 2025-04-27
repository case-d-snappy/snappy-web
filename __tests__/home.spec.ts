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
    await expect(appStoreTooltip).not.toBeVisible({ timeout: 5000 });

    // Verify Sparkles component
    const sparkles = page.locator('.absolute.inset-x-0.-bottom-22');
    await expect(sparkles).toBeVisible();

    // Test tooltip functionality for Google Play
    await googlePlayButton.click();
    const googlePlayTooltip = page.getByText('Coming Soon');
    await expect(googlePlayTooltip).toBeVisible();
    await expect(googlePlayTooltip).toHaveCSS('opacity', '1');
    await expect(googlePlayTooltip).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    // Wait for tooltip to disappear
    await expect(googlePlayTooltip).not.toBeVisible({ timeout: 5000 });
  });

  test('2. Strengths section', async ({ page }) => {
    // Check main heading and description
    const mainHeading = page.getByRole('heading', {
      level: 2,
      name: 'Record precious moments specially and check them at a glance.',
    });
    await expect(mainHeading).toBeVisible();
    await mainHeading.scrollIntoViewIfNeeded();
    await expect(
      page.getByText('Record your precious daily moments with AI styling, and check your diary and photos at a glance.')
    ).toBeVisible();

    // Check first feature section
    const firstFeatureHeading = page.getByRole('heading', {
      level: 3,
      name: 'Make your memories shine brighter with AI-powered photo styling',
    });
    await expect(firstFeatureHeading).toBeVisible();
    await firstFeatureHeading.scrollIntoViewIfNeeded();
    await expect(
      page.getByText('Capture the moment you want to remember, choose a style, and let AI make it special.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Day Card"]')).toBeVisible();

    // Check second feature section
    const secondFeatureHeading = page.getByRole('heading', {
      level: 3,
      name: "Write it down, Snappy's AI turn them into a beautiful picture diary",
    });
    await expect(secondFeatureHeading).toBeVisible();
    await secondFeatureHeading.scrollIntoViewIfNeeded();
    await expect(
      page.getByText('Write your daily diary and emotions, and AI will create a picture diary for you.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Detail Card"]')).toBeVisible();

    // Check third feature section
    const thirdFeatureHeading = page.getByRole('heading', {
      level: 3,
      name: 'See all your days at a glance',
    });
    await expect(thirdFeatureHeading).toBeVisible();
    await thirdFeatureHeading.scrollIntoViewIfNeeded();
    await expect(
      page.getByText('View all your days in one place, displayed in card or calendar format.')
    ).toBeVisible();
    await expect(page.locator('img[alt="Calender Screen"]')).toBeVisible();
  });

  test('3. Subscription section', async ({ page }) => {
    // Check main heading and description
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Enhance Your Memories with Pro Features',
      })
    ).toBeVisible();

    await expect(
      page.getByText('Make special moments even more extraordinary with unlimited AI styling')
    ).toBeVisible();

    // Check subscription plans
    const plans = [
      {
        name: 'Free Plan',
        price: '0',
        interval: 'month',
        description: 'For beginners to explore our service and start your journey',
        buttonText: 'Start for free',
      },
      {
        name: 'Pro Plan',
        price: '9.99',
        interval: 'month',
        description: 'For active users to enjoy unlimited AI styling',
        buttonText: 'Start Free 7 Days Trial',
        isPopular: true,
      },
      {
        name: 'Pro Plan (Yearly)',
        price: '42.99',
        interval: 'year',
        description: 'For long-term users to save more with annual payment',
        buttonText: 'Start Free 7 Days Trial',
      },
    ];

    // Check each plan card
    for (const plan of plans) {
      // Check plan name
      const planName = page.getByText(plan.name, { exact: true });
      await expect(planName).toBeVisible();
      await planName.scrollIntoViewIfNeeded();

      // Check price and interval
      await expect(page.getByText(`$${plan.price}/${plan.interval}`)).toBeVisible();

      // Check description
      await expect(page.getByText(plan.description)).toBeVisible();

      // Check popular badge if applicable
      if (plan.isPopular) {
        await expect(page.getByText('POPULAR')).toBeVisible();
      }

      // Check features section header
      const featureHeaders = await page.locator('text=STAND OUR FEATURES').all();
      expect(featureHeaders).toHaveLength(3);
    }
  });
});
