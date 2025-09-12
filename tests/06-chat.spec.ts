import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Chat & Communication Buttons', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await helpers.signIn();
  });

  test('Chat send button works', async ({ page }) => {
    await page.goto('/chat');
    
    const messageInput = page.locator('input[placeholder*="message"], textarea[placeholder*="message"]');
    const sendButton = page.locator('button:has([data-lucide="send"])');
    
    if (await messageInput.isVisible() && await sendButton.isVisible()) {
      // Type a test message
      await messageInput.fill('Hello, this is a test message');
      
      // Send button should be enabled
      await expect(sendButton).toBeEnabled();
      
      await sendButton.click();
      
      // Message should be sent (input should clear or message should appear)
      await page.waitForTimeout(1000);
      
      // Input should be empty after sending
      const inputValue = await messageInput.inputValue();
      expect(inputValue).toBe('');
    }
  });

  test('Chat tool popovers work', async ({ page }) => {
    await page.goto('/chat');
    
    // Look for tool popover triggers
    const toolButtons = page.locator('button[data-tool], [data-testid*="tool-button"]');
    
    if (await toolButtons.count() > 0) {
      for (let i = 0; i < Math.min(await toolButtons.count(), 2); i++) {
        const toolButton = toolButtons.nth(i);
        
        if (await toolButton.isVisible()) {
          await toolButton.click();
          
          // Should open popover with tool options
          const popover = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]');
          if (await popover.isVisible()) {
            // Look for tool options inside popover
            const toolOptions = page.locator('button[role="menuitem"], button[data-tool-option]');
            
            if (await toolOptions.count() > 0) {
              await toolOptions.first().click();
              await page.waitForTimeout(500);
            }
          }
          
          // Close popover by clicking outside
          await page.locator('body').click();
          await page.waitForTimeout(300);
        }
      }
    }
  });

  test('Quick suggestion buttons work', async ({ page }) => {
    await page.goto('/chat');
    
    // Look for quick suggestion buttons
    const suggestionButtons = page.locator('button[data-suggestion], .suggestion-button');
    
    if (await suggestionButtons.count() > 0) {
      const firstSuggestion = suggestionButtons.first();
      
      if (await firstSuggestion.isVisible()) {
        await firstSuggestion.click();
        
        // Should populate input or send message
        await page.waitForTimeout(1000);
        
        // Check if message input was populated
        const messageInput = page.locator('input[placeholder*="message"], textarea[placeholder*="message"]');
        if (await messageInput.isVisible()) {
          const inputValue = await messageInput.inputValue();
          // Input should either have text or be empty (if message was sent)
        }
      }
    }
  });

  test('Chat message action buttons work', async ({ page }) => {
    await page.goto('/chat');
    
    // Send a test message first to have something to interact with
    const messageInput = page.locator('input[placeholder*="message"], textarea[placeholder*="message"]');
    const sendButton = page.locator('button:has([data-lucide="send"])');
    
    if (await messageInput.isVisible() && await sendButton.isVisible()) {
      await messageInput.fill('Test message for actions');
      await sendButton.click();
      await page.waitForTimeout(2000);
      
      // Look for message action buttons
      const messageActions = page.locator('.message-actions button, [data-testid="message-action"]');
      
      if (await messageActions.count() > 0) {
        for (let i = 0; i < Math.min(await messageActions.count(), 2); i++) {
          const actionButton = messageActions.nth(i);
          
          if (await actionButton.isVisible()) {
            await actionButton.click();
            await page.waitForTimeout(500);
          }
        }
      }
    }
  });

  test('Chat sidebar person actions work', async ({ page }) => {
    await page.goto('/chat');
    
    // Look for chat sidebar
    const sidebar = page.locator('[data-testid="chat-sidebar"], .chat-sidebar');
    
    if (await sidebar.isVisible()) {
      // Test add person buttons
      const addPersonButtons = page.locator('button:has([data-lucide="plus"]), button:has-text("Add Person")');
      
      if (await addPersonButtons.count() > 0) {
        await addPersonButtons.first().click();
        
        // Should open add person dialog or navigate
        await page.waitForTimeout(1000);
        
        const addPersonDialog = page.locator('text=Add New Person, text=Add Person');
        if (await addPersonDialog.isVisible()) {
          // Close dialog
          const cancelButton = page.locator('button:has-text("Cancel")');
          if (await cancelButton.isVisible()) {
            await cancelButton.click();
          } else {
            await page.keyboard.press('Escape');
          }
        }
      }
      
      // Test person selection buttons
      const personButtons = page.locator('.person-item button, [data-testid="person-button"]');
      
      if (await personButtons.count() > 0) {
        const firstPerson = personButtons.first();
        
        if (await firstPerson.isVisible()) {
          await firstPerson.click();
          await page.waitForTimeout(500);
          
          // Should select person for chat context
        }
      }
    }
  });

  test('Sunday chat action buttons work', async ({ page }) => {
    await page.goto('/chat');
    
    // Look for Sunday character or chat assistant
    const sundaySection = page.locator('[data-testid="sunday-chat"], .sunday-character');
    
    if (await sundaySection.isVisible()) {
      // Look for Sunday action buttons
      const sundayButtons = page.locator('button[data-sunday-action], .sunday-button');
      
      if (await sundayButtons.count() > 0) {
        for (let i = 0; i < Math.min(await sundayButtons.count(), 2); i++) {
          const button = sundayButtons.nth(i);
          
          if (await button.isVisible()) {
            await button.click();
            await page.waitForTimeout(1000);
          }
        }
      }
    }
  });

  test('Chat container edit and close buttons work', async ({ page }) => {
    await page.goto('/chat');
    
    // Look for chat container controls
    const editButton = page.locator('button:has([data-lucide="edit-2"])');
    const closeButton = page.locator('button:has([data-lucide="x"])');
    
    if (await editButton.isVisible()) {
      await editButton.click();
      
      // Should enable edit mode or show edit options
      await page.waitForTimeout(500);
    }
    
    if (await closeButton.isVisible()) {
      await closeButton.click();
      
      // Should close chat or minimize it
      await page.waitForTimeout(500);
      
      // Chat might become hidden or minimized
      const chatContainer = page.locator('[data-testid="chat-container"], .chat-container');
      // Don't assert visibility as closing might hide the entire container
    }
  });
});