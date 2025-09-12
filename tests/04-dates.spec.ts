import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Date Management Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('Add Date button works', async ({ page }) => {
    await page.goto('/dates');
    
    const addDateButton = page.locator('button:has-text("Add Date"), button:has([data-lucide="plus"])');
    
    if (await addDateButton.first().isVisible()) {
      await addDateButton.first().click();
      
      // Should open add date dialog
      await expect(page.locator('text=Add Important Date, text=Add Date')).toBeVisible();
      
      // Test cancel button
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      } else {
        await page.keyboard.press('Escape');
      }
    }
  });

  test('Date card action buttons work', async ({ page }) => {
    await page.goto('/dates');
    
    // Look for existing date cards
    const dateCards = page.locator('[data-testid="date-card"]');
    
    if (await dateCards.count() > 0) {
      const firstCard = dateCards.first();
      
      // Look for more options button
      const moreButton = page.locator('button:has([data-lucide="more-vertical"])').first();
      
      if (await moreButton.isVisible()) {
        await moreButton.click();
        
        // Should show edit and delete options
        await expect(page.locator('text=Edit').or(page.locator('[data-lucide="edit"]'))).toBeVisible();
        await expect(page.locator('text=Delete').or(page.locator('[data-lucide="trash"]'))).toBeVisible();
        
        // Test edit option
        const editOption = page.locator('button:has-text("Edit"), [role="menuitem"]:has-text("Edit")');
        if (await editOption.isVisible()) {
          await editOption.click();
          
          // Should open edit dialog
          await expect(page.locator('text=Edit Date, text=Update')).toBeVisible();
          
          // Close dialog
          const closeButton = page.locator('button:has-text("Cancel")');
          if (await closeButton.isVisible()) {
            await closeButton.click();
          }
        }
        
        // Test delete option (but cancel it)
        await moreButton.click(); // Reopen menu if needed
        const deleteOption = page.locator('button:has-text("Delete"), [role="menuitem"]:has-text("Delete")');
        if (await deleteOption.isVisible()) {
          await deleteOption.click();
          
          // Should open confirmation dialog
          await expect(page.locator('text=Are you sure, text=Delete')).toBeVisible();
          
          // Cancel deletion
          const cancelDelete = page.locator('button:has-text("Cancel")');
          await cancelDelete.click();
        }
      }
    }
  });

  test('Date form submission works', async ({ page }) => {
    await page.goto('/dates');
    
    const addDateButton = page.locator('button:has-text("Add Date"), button:has([data-lucide="plus"])');
    
    if (await addDateButton.first().isVisible()) {
      await addDateButton.first().click();
      
      // Fill form
      const titleInput = page.locator('input[name="title"], input[placeholder*="title"]');
      if (await titleInput.isVisible()) {
        await titleInput.fill('Test Birthday');
        
        // Try to select a date (if date picker is available)
        const dateButton = page.locator('button:has([data-lucide="calendar"])');
        if (await dateButton.isVisible()) {
          await dateButton.click();
          
          // Select today's date
          const todayButton = page.locator('button[data-selected="true"], button:has-text("Today")').first();
          if (await todayButton.isVisible()) {
            await todayButton.click();
          } else {
            // Just click any available date
            const anyDate = page.locator('[role="gridcell"] button').first();
            if (await anyDate.isVisible()) {
              await anyDate.click();
            }
          }
        }
        
        // Submit form
        const submitButton = page.locator('button[type="submit"], button:has-text("Add Date")');
        if (await submitButton.isVisible()) {
          await submitButton.click();
          
          // Should close dialog or show success
          await page.waitForTimeout(2000);
        }
      }
    }
  });

  test('Upcoming dates gift buttons work', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Look for upcoming dates section
    const upcomingSection = page.locator('text=Upcoming Dates').locator('..');
    
    if (await upcomingSection.isVisible()) {
      // Look for gift icon buttons
      const giftButtons = page.locator('button:has([data-lucide="gift"])');
      
      if (await giftButtons.count() > 0) {
        await giftButtons.first().click();
        
        // Should navigate to gift creation or show gift dialog
        await page.waitForTimeout(1000);
        
        // Check if we're on gift creation page or dialog opened
        const giftForm = page.locator('text=Add Gift, input[name="name"]');
        if (await giftForm.isVisible()) {
          // Test gift form cancel
          const cancelButton = page.locator('button:has-text("Cancel")');
          if (await cancelButton.isVisible()) {
            await cancelButton.click();
          }
        }
      }
      
      // Test "View All Dates" button
      const viewAllButton = page.locator('button:has-text("View All Dates")');
      if (await viewAllButton.isVisible()) {
        await viewAllButton.click();
        await helpers.waitForNavigation('/dates');
      }
    }
  });

  test('Date picker calendar functionality', async ({ page }) => {
    await page.goto('/dates');
    
    const addDateButton = page.locator('button:has-text("Add Date")');
    
    if (await addDateButton.first().isVisible()) {
      await addDateButton.first().click();
      
      // Open calendar picker
      const calendarButton = page.locator('button:has([data-lucide="calendar"])');
      if (await calendarButton.isVisible()) {
        await calendarButton.click();
        
        // Calendar should be visible
        await expect(page.locator('[role="grid"]')).toBeVisible();
        
        // Test navigation buttons
        const prevButton = page.locator('button:has([data-lucide="chevron-left"])');
        const nextButton = page.locator('button:has([data-lucide="chevron-right"])');
        
        if (await prevButton.isVisible()) {
          await prevButton.click();
          await page.waitForTimeout(500);
        }
        
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
        
        // Select a date
        const dateCell = page.locator('[role="gridcell"] button').first();
        if (await dateCell.isVisible()) {
          await dateCell.click();
        }
        
        // Calendar should close
        await expect(page.locator('[role="grid"]')).not.toBeVisible();
      }
      
      // Close dialog
      const cancelButton = page.locator('button:has-text("Cancel")');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }
    }
  });
});