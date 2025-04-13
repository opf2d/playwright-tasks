import { Page, Locator, expect } from '@playwright/test';

export class LoginVerifications {
  private readonly page: Page;
  private readonly userName: Locator;
  private readonly passWord: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page; // Initialize page
    this.userName = page.locator('#user-name'); // Use shorthand ID selector
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

  async validAccount(): Promise<void> {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async invalidAccount(): Promise<void> {
    await expect(this.errorMessage).toHaveText(/.*do not match any/);
  }

  async lockedAccount(): Promise<void> {
    await expect(this.errorMessage).toHaveText(/.*locked out/);
  }
}