import { Page, Locator, expect } from '@playwright/test';

export class LoginVerifications {
  private readonly page: Page;
  private readonly userName: Locator;
  private readonly passWord: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('#user-name'); 
    this.passWord = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goToURL(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
      await this.userName.fill(username);
      await this.passWord.fill(password);
      await this.loginBtn.click();
  }

  async checkAccountStatus(): Promise<'valid' | 'invalid' | 'locked' | 'unknown'> {
    // Check for valid account by URL
    try {
      await expect(this.page).toHaveURL(/.*inventory\.html/, { timeout: 5000 });
      return 'valid';
    } catch {
      // URL does not match, proceed to check error message
    }
  
    // Check for invalid account
    try {
      await expect(this.errorMessage).toHaveText(/.*do not match any/, { timeout: 5000 });
      return 'invalid';
    } catch {
      // Invalid account message not found, proceed to check locked account
    }
  
    // Check for locked account
    try {
      await expect(this.errorMessage).toHaveText(/.*locked out/, { timeout: 5000 });
      return 'locked';
    } catch {
      // Locked account message not found, return unknown
    }
  
    // Fallback for unexpected cases
    return 'unknown';
  }
}
