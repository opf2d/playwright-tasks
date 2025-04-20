import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Complete extends BasePage {
  readonly successMSG: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.successMSG = page.locator('#checkout_complete_container');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async sucessful(): Promise<void> {
    await this.verifyElementPresence(this.successMSG, true);
  }

  async goBackHome(): Promise<void> {
    await this.navigate(this.backHomeButton);
  }
}
