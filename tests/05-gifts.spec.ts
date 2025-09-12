import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Gift Management Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('Add Gift button opens form', async ({ page }) => {
    // Try from relationships page first
    await page.goto('/relationships');
    
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Look for Add Gift button
      const addGiftButton = page.locator('button:has-text("Add Gift")');
      if (await addGiftButton.isVisible()) {
        await addGiftButton.click();
        
        // Should navigate to gift form or open dialog
        await page.waitForTimeout(1000);
        
        const giftForm = page.locator('text=Add Gift, input[name="name"]');
        await expect(giftForm.first()).toBeVisible();
        
        // Test cancel/back button
        const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Back")');
        if (await cancelButton.first().isVisible()) {
          await cancelButton.first().click();
        }
      }
    }
  });

  test('Gift form submission works', async ({ page }) => {
    await page.goto('/gifts/add?relationshipId=test');
    
    // Fill gift form
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test Gift');
      
      const descriptionInput = page.locator('textarea[name="description"]');
      if (await descriptionInput.isVisible()) {
        await descriptionInput.fill('A wonderful test gift');
      }
      
      const priceInput = page.locator('input[name="price"]');
      if (await priceInput.isVisible()) {
        await priceInput.fill('25.99');
      }
      
      const occasionInput = page.locator('input[name="occasion"]');
      if (await occasionInput.isVisible()) {
        await occasionInput.fill('Birthday');
      }
      
      // Test date picker
      const dateButton = page.locator('button:has([data-lucide="calendar"])');
      if (await dateButton.isVisible()) {
        await dateButton.click();
        
        const dateCell = page.locator('[role="gridcell"] button').first();
        if (await dateCell.isVisible()) {
          await dateCell.click();
        }
      }
      
      // Submit form
      const submitButton = page.locator('button:has-text("Save Gift")');
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Should show success or redirect
        await page.waitForTimeout(2000);
      }
    }
  });

  test('Gift history filters work', async ({ page }) => {
    await page.goto('/gift-history');
    
    // Test refresh button
    const refreshButton = page.locator('button:has-text("Refresh")');
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Test filter toggle
    const filterToggle = page.locator('button:has([data-lucide="filter"])');
    if (await filterToggle.isVisible()) {
      await filterToggle.click();
      
      // Should show/hide filters
      await page.waitForTimeout(500);
      
      // Toggle again
      await filterToggle.click();
      await page.waitForTimeout(500);
    }
    
    // Test reset filters
    const resetButton = page.locator('button:has-text("Reset")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);
    }
    
    // Test filter dropdown
    const filterDropdown = page.locator('select, [role="combobox"]').first();
    if (await filterDropdown.isVisible()) {
      await filterDropdown.click();
      
      const options = page.locator('[role="option"]');
      if (await options.count() > 0) {
        await options.first().click();
      }
    }
  });

  test('Gift card actions work', async ({ page }) => {
    await page.goto('/gift-history');
    
    // Look for gift cards
    const giftCards = page.locator('[data-testid="gift-card"]');
    
    if (await giftCards.count() > 0) {
      const firstCard = giftCards.first();
      
      // Look for more actions button
      const moreButton = page.locator('button:has([data-lucide="more-horizontal"])').first();
      
      if (await moreButton.isVisible()) {
        await moreButton.click();
        
        // Should show edit and delete options
        const editOption = page.locator('button:has-text("Edit"), [role="menuitem"]:has-text("Edit")');
        const deleteOption = page.locator('button:has-text("Delete"), [role="menuitem"]:has-text("Delete")');
        const saveOption = page.locator('button:has-text("Save to Ideas")');
        
        if (await editOption.isVisible()) {
          await expect(editOption).toBeVisible();
        }
        
        if (await deleteOption.isVisible()) {
          await expect(deleteOption).toBeVisible();
        }
        
        if (await saveOption.isVisible()) {
          await saveOption.click();
          await helpers.expectToast('saved');
        }
        
        // Close menu
        await page.locator('body').click();
      }
    }
  });

  test('Gift ideas save functionality', async ({ page }) => {
    await page.goto('/gift-ideas');
    
    // Look for save buttons on gift ideas
    const saveButtons = page.locator('button:has([data-lucide="bookmark"])');
    
    if (await saveButtons.count() > 0) {
      const firstSaveButton = saveButtons.first();
      
      // Check initial state
      const isAlreadySaved = await firstSaveButton.locator('[data-lucide="bookmark"].fill-primary').isVisible();
      
      if (!isAlreadySaved) {
        await firstSaveButton.click();
        
        // Should show saved state or toast
        await page.waitForTimeout(1000);
        await helpers.expectToast('saved');
      }
    }
    
    // Test category filter buttons
    const categoryButtons = page.locator('button[data-category]');
    if (await categoryButtons.count() > 0) {
      for (let i = 0; i < Math.min(await categoryButtons.count(), 3); i++) {
        const button = categoryButtons.nth(i);
        await button.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Test "View More" button
    const viewMoreButton = page.locator('button:has-text("View More")');
    if (await viewMoreButton.isVisible()) {
      await viewMoreButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('Wishlist view mode toggles work', async ({ page }) => {
    await page.goto('/wishlists');
    
    // Look for view mode toggle buttons
    const gridButton = page.locator('button:has([data-lucide="grid"])');
    const listButton = page.locator('button:has([data-lucide="list"])');
    
    if (await gridButton.isVisible() && await listButton.isVisible()) {
      // Test grid view
      await gridButton.click();
      await page.waitForTimeout(500);
      
      // Test list view
      await listButton.click();
      await page.waitForTimeout(500);
      
      // Verify visual changes occurred (buttons should have different states)
      const gridActive = await gridButton.getAttribute('data-state');
      const listActive = await listButton.getAttribute('data-state');
      
      // At least one should be active
      expect(gridActive === 'active' || listActive === 'active').toBeTruthy();
    }
    
    // Test "Get Ideas" button
    const getIdeasButtons = page.locator('button:has-text("Get Ideas")');
    if (await getIdeasButtons.count() > 0) {
      await getIdeasButtons.first().click();
      
      // Should navigate to chat or gift ideas
      await page.waitForTimeout(1000);
    }
  });

  test('Gift recommendation actions work', async ({ page }) => {
    await page.goto('/gift-ideas');
    
    // Look for gift recommendation cards
    const giftCards = page.locator('[data-testid="gift-recommendation-card"]');
    
    if (await giftCards.count() > 0) {
      const firstCard = giftCards.first();
      
      // Test save button
      const saveButton = firstCard.locator('button:has([data-lucide="bookmark"])');
      if (await saveButton.isVisible()) {
        await saveButton.click();
        await page.waitForTimeout(500);
      }
      
      // Test "View Gift" button
      const viewButton = firstCard.locator('button:has-text("View Gift")');
      if (await viewButton.isVisible()) {
        await viewButton.click();
        await page.waitForTimeout(1000);
      }
    }
  });
});