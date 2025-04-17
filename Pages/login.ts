import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class LoginVerifications extends BasePage {
  private readonly userName: Locator;
  private readonly passWord: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMessage: Locator;
  readonly mainPageUrl: string; 


  constructor(page: Page) {
    super(page);
    this.userName = page.locator('#user-name');
    this.passWord = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.mainPageUrl = '/';
  }

  async login(username: string, password: string): Promise<void> {
    const fields = new Map<Locator, string>([
      [this.userName, username],
      [this.passWord, password],
    ]);
    await this.fillForm(fields);
    await this.clickElement(this.loginBtn);
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

  async goToURL(): Promise<void> {
    await this.navigate('/');
  }
}