import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Cart extends BasePage {
  private readonly removeFirstItemBTN: Locator;
  private readonly removeSecondItemBTN: Locator;
  private readonly checkOutBTN: Locator;

  constructor(page: Page) {
    super(page);
    this.removeFirstItemBTN = page.locator('#remove-sauce-labs-backpack');
    this.removeSecondItemBTN = page.locator('#remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)');
    this.checkOutBTN = page.locator('#checkout');
  }

  async checkItems(): Promise<void> {
    await this.verifyElementVisibility(this.removeFirstItemBTN);
    await this.verifyElementVisibility(this.removeSecondItemBTN);
  }

  async removeItem(): Promise<void> {
    await this.clickElement(this.removeFirstItemBTN);
  }

  async checkRemovedItem(): Promise<void> {
    await this.verifyElementPresence(this.removeFirstItemBTN, false);
  }

  async goToInfo(): Promise<void> {
    await this.navigate(this.checkOutBTN);
  }
}