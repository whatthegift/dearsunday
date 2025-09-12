import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for navigation to complete and check URL
   */
  async waitForNavigation(expectedPath: string, timeout = 5000) {
    await this.page.waitForURL(`**${expectedPath}`, { timeout });
    expect(this.page.url()).toContain(expectedPath);
  }

  /**
   * Sign in a test user
   */
  async signIn(email = 'test@example.com', password = 'testpassword') {
    await this.page.goto('/');
    
    // Check if already signed in
    const authButton = this.page.locator('button:has-text("Start Gifting")');
    if (await authButton.isVisible()) {
      await authButton.click();
    }

    // Handle auth form
    const emailInput = this.page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill(email);
      await this.page.locator('input[type="password"]').fill(password);
      await this.page.locator('button[type="submit"]').click();
      
      // Wait for successful login
      await this.page.waitForURL('**/dashboard', { timeout: 10000 });
    }
  }

  /**
   * Check if button exists and is clickable
   */
  async checkButtonClickable(selector: string, text?: string) {
    const button = text 
      ? this.page.locator(`button:has-text("${text}")`)
      : this.page.locator(selector);
    
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    return button;
  }

  /**
   * Click button and wait for response
   */
  async clickAndWait(selector: string, waitFor?: string) {
    await this.page.locator(selector).click();
    if (waitFor) {
      await this.page.waitForSelector(waitFor);
    }
  }

  /**
   * Fill form and submit
   */
  async fillAndSubmitForm(formData: Record<string, string>, submitText = 'Submit') {
    for (const [field, value] of Object.entries(formData)) {
      await this.page.locator(`[name="${field}"], [id="${field}"]`).fill(value);
    }
    await this.page.locator(`button:has-text("${submitText}")`).click();
  }

  /**
   * Check for toast messages
   */
  async expectToast(message: string, type: 'success' | 'error' = 'success') {
    const toast = this.page.locator('[data-sonner-toast]').filter({ hasText: message });
    await expect(toast).toBeVisible({ timeout: 5000 });
  }

  /**
   * Check dropdown menu functionality
   */
  async testDropdown(triggerSelector: string, menuItems: string[]) {
    await this.page.locator(triggerSelector).click();
    
    for (const item of menuItems) {
      await expect(this.page.locator(`text=${item}`)).toBeVisible();
    }
    
    // Close dropdown by clicking outside
    await this.page.locator('body').click();
  }

  /**
   * Test modal dialog functionality
   */
  async testModal(triggerSelector: string, modalTitle: string, closeMethod: 'button' | 'escape' = 'button') {
    await this.page.locator(triggerSelector).click();
    await expect(this.page.locator(`text=${modalTitle}`)).toBeVisible();
    
    if (closeMethod === 'button') {
      await this.page.locator('button:has-text("Cancel"), button:has-text("Close")').first().click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    
    await expect(this.page.locator(`text=${modalTitle}`)).not.toBeVisible();
  }
}