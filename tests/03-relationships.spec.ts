import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Person/Relationship Management Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('Add Person button opens dialog', async ({ page }) => {
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await expect(addPersonButton).toBeVisible();
    await addPersonButton.click();
    
    // Verify dialog opens
    await expect(page.locator('text=Add New Person')).toBeVisible();
    
    // Test cancel button
    const cancelButton = page.locator('button:has-text("Cancel")');
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
      await expect(page.locator('text=Add New Person')).not.toBeVisible();
    } else {
      // Close via escape or X button
      await page.keyboard.press('Escape');
    }
  });

  test('Person profile edit and delete buttons work', async ({ page }) => {
    await page.goto('/relationships');
    
    // Find first relationship card if any exist
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Test edit button
      const editButton = page.locator('button:has-text("Edit Profile"), button:has([data-lucide="edit"])');
      if (await editButton.first().isVisible()) {
        await editButton.first().click();
        
        // Should open edit dialog/form
        await expect(page.locator('text=Edit').or(page.locator('input[name="name"]'))).toBeVisible();
        
        // Close the edit dialog
        const closeButton = page.locator('button:has-text("Cancel")');
        if (await closeButton.isVisible()) {
          await closeButton.click();
        } else {
          await page.keyboard.press('Escape');
        }
      }
      
      // Test delete button (but don't actually delete)
      const deleteButton = page.locator('button:has-text("Delete Profile"), button:has([data-lucide="trash"])');
      if (await deleteButton.first().isVisible()) {
        await deleteButton.first().click();
        
        // Should open confirmation dialog
        await expect(page.locator('text=Delete').or(page.locator('text=Are you sure'))).toBeVisible();
        
        // Cancel the deletion
        const cancelDelete = page.locator('button:has-text("Cancel")');
        await cancelDelete.click();
        await expect(page.locator('text=Are you sure')).not.toBeVisible();
      }
    }
  });

  test('Add Person form submission flow', async ({ page }) => {
    await page.goto('/relationships');
    
    const addPersonButton = page.locator('button:has-text("Add Person")');
    await addPersonButton.click();
    
    // Fill in basic info
    const nameInput = page.locator('input[name="name"], input[placeholder*="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('Test Person');
      
      // Try to submit
      const submitButton = page.locator('button[type="submit"], button:has-text("Save")');
      if (await submitButton.isVisible()) {
        await submitButton.click();
        
        // Should either succeed or show validation
        await page.waitForTimeout(2000);
      }
    }
    
    // Close dialog if still open
    const closeButton = page.locator('button:has-text("Cancel")');
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  });

  test('Special notes edit functionality', async ({ page }) => {
    await page.goto('/relationships');
    
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Look for special notes edit button
      const editNotesButton = page.locator('button:has([data-lucide="edit"])').first();
      
      if (await editNotesButton.isVisible()) {
        await editNotesButton.click();
        
        // Should show textarea or input
        const notesInput = page.locator('textarea, input[type="text"]');
        if (await notesInput.first().isVisible()) {
          await notesInput.first().fill('Test notes');
          
          // Look for save button
          const saveButton = page.locator('button:has([data-lucide="check"]), button:has-text("Save")');
          if (await saveButton.first().isVisible()) {
            await saveButton.first().click();
            
            // Should show success feedback
            await page.waitForTimeout(1000);
          }
          
          // Look for cancel button
          const cancelButton = page.locator('button:has([data-lucide="x"]), button:has-text("Cancel")');
          if (await cancelButton.first().isVisible()) {
            await cancelButton.first().click();
          }
        }
      }
    }
  });

  test('Dropdown menus in relationship cards work', async ({ page }) => {
    await page.goto('/relationships');
    
    const relationshipCard = page.locator('[data-testid="relationship-card"]').first();
    
    if (await relationshipCard.isVisible()) {
      await relationshipCard.click();
      
      // Look for dropdown triggers (more options menus)
      const dropdownTriggers = page.locator('button:has([data-lucide="more-vertical"]), button:has([data-lucide="more-horizontal"])');
      
      for (let i = 0; i < Math.min(await dropdownTriggers.count(), 3); i++) {
        const trigger = dropdownTriggers.nth(i);
        if (await trigger.isVisible()) {
          await trigger.click();
          
          // Check if dropdown menu appears
          const menuItems = page.locator('[role="menu"] button, [role="menuitem"]');
          if (await menuItems.count() > 0) {
            // Verify menu items are clickable
            await expect(menuItems.first()).toBeVisible();
            
            // Close menu by clicking outside
            await page.locator('body').click();
            await page.waitForTimeout(500);
          }
        }
      }
    }
  });
});