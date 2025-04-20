import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class LoginVerifications extends BasePage {
  private readonly userName: Locator;
  private readonly passWord: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  readonly mainPageUrl: string; 
  readonly dashBoardUrl: string;

  constructor(page: Page) {
    super(page);
    this.userName = page.locator('#user-name');
    this.passWord = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.mainPageUrl = '/';
    this.dashBoardUrl = 'https://www.saucedemo.com/inventory.html';
  }

  async login(username: string, password: string): Promise<void> {
    const fields = new Map<Locator, string>([
      [this.userName, username],
      [this.passWord, password],
    ]);
    await this.fillForm(fields);
    await this.clickElement(this.loginButton);
  }

  async checkAccountStatus(): Promise<'valid' | 'invalid' | 'locked' | 'unknown'> {
    try {
      await this.verifyURL(/.*inventory\.html/);
      return 'valid';
    } catch {
      // URL does not match
    }

    try {
      await this.verifyElementText(this.errorMessage, /.*do not match any/);
      return 'invalid';
    } catch {
      // Invalid account message not found
    }

    try {
      await this.verifyElementText(this.errorMessage, /.*locked out/);
      return 'locked';
    } catch {
      // Locked account message not found
    }

    return 'unknown';
  }
}
