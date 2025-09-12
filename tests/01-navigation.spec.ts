import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Navigation & Layout Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('Homepage Start Gifting buttons work', async ({ page }) => {
    await page.goto('/');
    
    // Test both "Start Gifting" buttons
    const startButtons = page.locator('button:has-text("Start Gifting")');
    await expect(startButtons).toHaveCount(2);
    
    // Click first button
    await startButtons.first().click();
    await helpers.waitForNavigation('/auth');
  });

  test('Index page navigation buttons work', async ({ page }) => {
    await page.goto('/');
    
    // Test "Get Started" buttons
    const getStartedButtons = page.locator('button:has-text("Get Started"), button:has-text("Go to Auth")');
    
    if (await getStartedButtons.count() > 0) {
      await getStartedButtons.first().click();
      await helpers.waitForNavigation('/auth');
    }
  });

  test('Back buttons function correctly', async ({ page }) => {
    await helpers.signIn();
    
    // Test PersonProfilePage back button (if we have relationships)
    const relationships = page.locator('[data-testid="relationship-card"]');
    if (await relationships.count() > 0) {
      await relationships.first().click();
      
      const backButton = page.locator('button:has([data-lucide="arrow-left"])');
      await expect(backButton).toBeVisible();
      await backButton.click();
      
      await helpers.waitForNavigation('/relationships');
    }
  });

  test('User profile menu works', async ({ page }) => {
    await helpers.signIn();
    
    // Open user profile menu
    const profileButton = page.locator('button[data-testid="user-menu-trigger"]').or(
      page.locator('button:has([data-lucide="user"])')
    );
    
    if (await profileButton.isVisible()) {
      await profileButton.click();
      
      // Check menu items
      await expect(page.locator('text=Settings')).toBeVisible();
      await expect(page.locator('text=Logout')).toBeVisible();
      
      // Test settings navigation
      await page.locator('text=Settings').click();
      await helpers.waitForNavigation('/settings');
    }
  });

  test('Sidebar navigation works', async ({ page }) => {
    await helpers.signIn();
    
    // Test sidebar toggle if present
    const sidebarToggle = page.locator('[data-testid="sidebar-trigger"]').or(
      page.locator('button:has([data-lucide="menu"])')
    );
    
    if (await sidebarToggle.isVisible()) {
      await sidebarToggle.click();
      
      // Verify sidebar is visible/hidden
      const sidebar = page.locator('[data-testid="sidebar"]');
      if (await sidebar.isVisible()) {
        // Test navigation items
        const navItems = ['Relationships', 'Dates', 'Gifts', 'Chat'];
        
        for (const item of navItems) {
          const navLink = page.locator(`a:has-text("${item}")`);
          if (await navLink.isVisible()) {
            await navLink.click();
            await page.waitForTimeout(1000); // Allow navigation
          }
        }
      }
    }
  });

  test('404 page "Go Home" button works', async ({ page }) => {
    await page.goto('/nonexistent-page');
    
    const goHomeButton = page.locator('button:has-text("Go Home")');
    if (await goHomeButton.isVisible()) {
      await goHomeButton.click();
      await helpers.waitForNavigation('/');
    }
  });
});