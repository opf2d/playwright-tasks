import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base';

export class CartPage extends BasePage {
  readonly firstItemTitle: Locator;
  readonly lastItemTitle: Locator;
  readonly firstItemPrice: Locator;
  readonly lastItemPrice: Locator;
  readonly firstItemDescription: Locator;
  readonly lastItemDescription: Locator;
  readonly removeFirstItemButton: Locator;
  readonly removeSecondItemButton: Locator;
  readonly checkOutButton: Locator;

  constructor(page: Page) {
    super(page);
    const titles = page.locator('[data-test="inventory-item-name"]');
    const prices = page.locator('[data-test="inventory-item-price"]');
    const descriptions = page.locator('[data-test="inventory-item-desc"]');
    this.firstItemTitle = titles.first();
    this.lastItemTitle = titles.last();
    this.firstItemPrice = prices.first();
    this.lastItemPrice = prices.last();
    this.firstItemDescription = descriptions.first();
    this.lastItemDescription = descriptions.last();
    this.removeFirstItemButton = page.locator('[data-test="remove-sauce-labs-backpack"]');    
    this.removeSecondItemButton = page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]');
    this.checkOutButton = page.locator('#checkout');
  }

  async checkItems(): Promise<void> {
    await this.verifyElementVisibility(this.removeFirstItemButton);
    await this.verifyElementVisibility(this.removeSecondItemButton);
  }

  async goToInfo(): Promise<void> {
    await this.navigate(this.checkOutButton);
  }
}
