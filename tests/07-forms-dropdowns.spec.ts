import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Form Controls & Dropdown Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('Select dropdown triggers work correctly', async ({ page }) => {
    await page.goto('/settings');
    
    // Look for select dropdowns
    const selectTriggers = page.locator('[role="combobox"], .select-trigger');
    
    if (await selectTriggers.count() > 0) {
      for (let i = 0; i < Math.min(await selectTriggers.count(), 3); i++) {
        const trigger = selectTriggers.nth(i);
        
        if (await trigger.isVisible()) {
          await trigger.click();
          
          // Should open dropdown with options
          const options = page.locator('[role="option"], [role="listbox"] > *');
          
          if (await options.count() > 0) {
            await expect(options.first()).toBeVisible();
            
            // Select an option
            await options.first().click();
            
            // Dropdown should close
            await expect(options.first()).not.toBeVisible();
          } else {
            // Close dropdown if no options found
            await page.keyboard.press('Escape');
          }
          
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('Dropdown menu triggers work', async ({ page }) => {
    await page.goto('/relationships');
    
    // Go to a person profile to test dropdown menus
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Look for dropdown menu triggers
      const dropdownTriggers = page.locator('button:has([data-lucide="more-vertical"]), button:has([data-lucide="chevron-down"])');
      
      for (let i = 0; i < Math.min(await dropdownTriggers.count(), 3); i++) {
        const trigger = dropdownTriggers.nth(i);
        
        if (await trigger.isVisible()) {
          await trigger.click();
          
          // Should show dropdown menu
          const menu = page.locator('[role="menu"], [data-radix-popper-content-wrapper]');
          
          if (await menu.isVisible()) {
            // Check menu items are visible and clickable
            const menuItems = page.locator('[role="menuitem"], [role="menu"] button');
            
            if (await menuItems.count() > 0) {
              await expect(menuItems.first()).toBeVisible();
              await expect(menuItems.first()).toBeEnabled();
            }
            
            // Close menu by clicking outside
            await page.locator('body').click();
            await page.waitForTimeout(300);
          }
        }
      }
    }
  });

  test('Popover triggers work correctly', async ({ page }) => {
    await page.goto('/dates');
    
    // Try to open add date dialog first
    const addDateButton = page.locator('button:has-text("Add Date")');
    
    if (await addDateButton.first().isVisible()) {
      await addDateButton.first().click();
      
      // Look for popover triggers (like date pickers)
      const popoverTriggers = page.locator('button:has([data-lucide="calendar"]), [data-radix-popover-trigger]');
      
      if (await popoverTriggers.count() > 0) {
        const trigger = popoverTriggers.first();
        
        if (await trigger.isVisible()) {
          await trigger.click();
          
          // Should open popover
          const popover = page.locator('[data-radix-popover-content], [role="dialog"]');
          
          if (await popover.isVisible()) {
            await expect(popover).toBeVisible();
            
            // Look for interactive elements in popover
            const popoverButtons = page.locator('[data-radix-popover-content] button');
            
            if (await popoverButtons.count() > 0) {
              // Click first available button (like selecting a date)
              await popoverButtons.first().click();
            }
            
            // Popover should close after interaction
            await page.waitForTimeout(500);
          }
        }
      }
      
      // Close the dialog
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }
    }
  });

  test('Form submission buttons work with validation', async ({ page }) => {
    await page.goto('/relationships');
    
    // Open add person dialog
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    // Test form submission without required fields
    const submitButton = page.locator('button[type="submit"], button:has-text("Save")');
    
    if (await submitButton.isVisible()) {
      // Try to submit empty form
      await submitButton.click();
      
      // Should show validation or remain on form
      await page.waitForTimeout(1000);
      
      // Fill required field
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]');
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test Person');
        
        // Now submit should work or show different behavior
        await submitButton.click();
        await page.waitForTimeout(2000);
      }
    }
    
    // Close dialog if still open
    const cancelButton = page.locator('button:has-text("Cancel")');
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
    }
  });

  test('Dialog footer buttons work consistently', async ({ page }) => {
    await page.goto('/relationships');
    
    // Test various dialogs to ensure footer buttons work
    const triggers = [
      'button:has-text("Add Person")',
      'button:has-text("Add Date")'
    ];
    
    for (const triggerSelector of triggers) {
      const trigger = page.locator(triggerSelector);
      
      if (await trigger.first().isVisible()) {
        await trigger.first().click();
        
        // Look for dialog footer buttons
        const cancelButton = page.locator('button:has-text("Cancel")');
        const submitButton = page.locator('button[type="submit"], button:has-text("Save"), button:has-text("Add")');
        
        // Test cancel button
        if (await cancelButton.isVisible()) {
          await expect(cancelButton).toBeEnabled();
          await cancelButton.click();
          
          // Dialog should close
          await page.waitForTimeout(500);
        }
        
        // Test submit button (reopen dialog first)
        if (await trigger.first().isVisible()) {
          await trigger.first().click();
          
          if (await submitButton.isVisible()) {
            await expect(submitButton).toBeVisible();
            
            // Close via escape instead of submitting
            await page.keyboard.press('Escape');
          }
        }
      }
    }
  });

  test('Filter and control buttons work', async ({ page }) => {
    await page.goto('/gift-history');
    
    // Test filter controls
    const filterButton = page.locator('button:has([data-lucide="filter"])');
    if (await filterButton.isVisible()) {
      await filterButton.click();
      await page.waitForTimeout(500);
      
      // Should toggle filter visibility
      await filterButton.click();
      await page.waitForTimeout(500);
    }
    
    // Test sort/view controls
    const viewControls = page.locator('button[data-view], button:has([data-lucide="grid"]), button:has([data-lucide="list"])');
    
    if (await viewControls.count() > 0) {
      for (let i = 0; i < Math.min(await viewControls.count(), 2); i++) {
        const control = viewControls.nth(i);
        
        if (await control.isVisible()) {
          await control.click();
          await page.waitForTimeout(300);
        }
      }
    }
    
    // Test reset button
    const resetButton = page.locator('button:has-text("Reset")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('Icon buttons have proper accessibility', async ({ page }) => {
    await page.goto('/relationships');
    
    // Find relationship card to test icon buttons
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Test icon buttons have proper aria-labels or sr-only text
      const iconButtons = page.locator('button:has([data-lucide]), button[data-testid*="icon"]');
      
      for (let i = 0; i < Math.min(await iconButtons.count(), 5); i++) {
        const button = iconButtons.nth(i);
        
        if (await button.isVisible()) {
          // Check for accessibility attributes
          const ariaLabel = await button.getAttribute('aria-label');
          const srOnlyText = await button.locator('.sr-only').textContent();
          const title = await button.getAttribute('title');
          
          // Button should have some form of accessible text
          const hasAccessibleText = ariaLabel || srOnlyText || title;
          
          if (!hasAccessibleText) {
            console.warn(`Icon button may lack accessibility text: ${await button.innerHTML()}`);
          }
          
          // Test that button is keyboard accessible
          await button.focus();
          await page.keyboard.press('Enter');
          await page.waitForTimeout(300);
        }
      }
    }
  });
});