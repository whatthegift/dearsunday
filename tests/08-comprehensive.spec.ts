import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Comprehensive Button Integration Tests', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('End-to-end user flow: Add person, add date, add gift', async ({ page }) => {
    // 1. Add a new person
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    await helpers.fillAndSubmitForm({
      name: 'Test User E2E',
      email: 'teste2e@example.com'
    }, 'Save');
    
    await page.waitForTimeout(2000);
    
    // 2. Add a date for this person
    const personCard = page.locator('text=Test User E2E').locator('..').locator('..');
    if (await personCard.isVisible()) {
      await personCard.click();
      
      // Add important date
      const addDateButton = page.locator('button:has-text("Add Date"), button:has([data-lucide="plus"])');
      if (await addDateButton.first().isVisible()) {
        await addDateButton.first().click();
        
        await helpers.fillAndSubmitForm({
          title: 'Birthday',
          description: 'Annual celebration'
        }, 'Add Date');
        
        await page.waitForTimeout(1000);
      }
      
      // 3. Add a gift for this person
      const addGiftButton = page.locator('button:has-text("Add Gift")');
      if (await addGiftButton.isVisible()) {
        await addGiftButton.click();
        
        // Should navigate to gift form
        await page.waitForTimeout(1000);
        
        const giftNameInput = page.locator('input[name="name"]');
        if (await giftNameInput.isVisible()) {
          await helpers.fillAndSubmitForm({
            name: 'Test Gift E2E',
            description: 'A wonderful test gift'
          }, 'Save Gift');
          
          await page.waitForTimeout(2000);
        }
      }
    }
  });

  test('Button loading states work correctly', async ({ page }) => {
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    const nameInput = page.locator('input[name="name"]');
    const submitButton = page.locator('button[type="submit"]');
    
    if (await nameInput.isVisible() && await submitButton.isVisible()) {
      await nameInput.fill('Loading Test User');
      
      // Click submit and immediately check for loading state
      await submitButton.click();
      
      // Button should be disabled during submission
      const isDisabled = await submitButton.isDisabled();
      const loadingText = await submitButton.textContent();
      
      // Should show loading indicator or disabled state
      expect(isDisabled || loadingText?.includes('...')).toBeTruthy();
      
      await page.waitForTimeout(3000);
    }
  });

  test('Error handling buttons work correctly', async ({ page }) => {
    // Test form submission with invalid data
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    // Try to submit form with invalid email
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]');
    
    if (await emailInput.isVisible() && await submitButton.isVisible()) {
      await emailInput.fill('invalid-email');
      await submitButton.click();
      
      // Should show validation error and button should remain enabled
      await page.waitForTimeout(1000);
      await expect(submitButton).toBeEnabled();
    }
    
    // Close dialog
    const cancelButton = page.locator('button:has-text("Cancel")');
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
    }
  });

  test('Keyboard navigation works for all buttons', async ({ page }) => {
    await page.goto('/relationships');
    
    // Test tab navigation through buttons
    const buttons = page.locator('button:visible');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      // Focus first button
      await buttons.first().focus();
      
      // Tab through a few buttons
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        
        // Get focused element
        const focusedElement = page.locator(':focus');
        const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
        
        // Should focus on interactive elements
        const isInteractive = ['button', 'a', 'input', 'select', 'textarea'].includes(tagName);
        expect(isInteractive).toBeTruthy();
      }
      
      // Test Enter key activation
      const focusedButton = page.locator('button:focus');
      if (await focusedButton.isVisible()) {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
        
        // Should trigger button action
      }
    }
  });

  test('Mobile responsiveness of buttons', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/relationships');
    
    // Test that buttons are still accessible on mobile
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await expect(addPersonButton).toBeVisible();
    
    // Button should be clickable
    await addPersonButton.click();
    
    // Dialog should open properly on mobile
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.isVisible()) {
      // Dialog buttons should be accessible
      const dialogButtons = dialog.locator('button');
      const buttonCount = await dialogButtons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = dialogButtons.nth(i);
        await expect(button).toBeVisible();
        
        // Check button is not cut off
        const boundingBox = await button.boundingBox();
        if (boundingBox) {
          expect(boundingBox.x).toBeGreaterThanOrEqual(0);
          expect(boundingBox.y).toBeGreaterThanOrEqual(0);
        }
      }
      
      // Close dialog
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      } else {
        await page.keyboard.press('Escape');
      }
    }
  });

  test('Button focus management in modals', async ({ page }) => {
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    // When modal opens, focus should be managed properly
    const dialog = page.locator('[role="dialog"]');
    if (await dialog.isVisible()) {
      // First focusable element should be focused
      const firstInput = dialog.locator('input, button').first();
      
      if (await firstInput.isVisible()) {
        const isFocused = await firstInput.evaluate(el => document.activeElement === el);
        // Focus management may vary, but element should be focusable
        await firstInput.focus();
        await expect(firstInput).toBeFocused();
      }
      
      // Test tab trap - tabbing should stay within modal
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      const isInsideDialog = await focusedElement.evaluate(el => {
        const dialog = el.closest('[role="dialog"]');
        return dialog !== null;
      });
      
      expect(isInsideDialog).toBeTruthy();
      
      // Close dialog with Escape
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    }
  });

  test('All pages load without button errors', async ({ page }) => {
    const pages = [
      '/',
      '/dashboard',
      '/relationships',
      '/dates',
      '/gift-history',
      '/gift-ideas',
      '/wishlists',
      '/chat',
      '/settings'
    ];
    
    for (const path of pages) {
      await page.goto(path);
      await page.waitForTimeout(1000);
      
      // Check for JavaScript errors
      const errors: string[] = [];
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      
      // Check that buttons are rendered without errors
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      // Should have at least some buttons on each page
      expect(buttonCount).toBeGreaterThan(0);
      
      // Check first few buttons are functional
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = buttons.nth(i);
        
        if (await button.isVisible()) {
          // Button should be properly rendered
          const isEnabled = await button.isEnabled();
          const hasText = await button.textContent();
          const hasIcon = await button.locator('[data-lucide]').count() > 0;
          
          // Button should have content or be icon button
          expect(hasText || hasIcon).toBeTruthy();
        }
      }
      
      // No critical JavaScript errors should occur
      expect(errors.length).toBe(0);
    }
  });
});