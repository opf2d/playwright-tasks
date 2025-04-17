import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class ProductSelection extends BasePage {
  readonly firstItemTitle: Locator;
  readonly lastItemTitle: Locator;
  readonly firstItemPrice: Locator;
  readonly lastItemPrice: Locator;
  readonly firstItemDescription: Locator;
  readonly lastItemDescription: Locator;
  readonly firstItemButton: Locator;
  readonly lastItemButton: Locator;
  readonly basket: Locator;

  constructor(page: Page) {
    super(page);

    const titles = page.locator('[data-test="inventory-item-name"]');
    const prices = page.locator('[data-test="inventory-item-price"]');
    const descriptions = page.locator('[data-test="inventory-item-desc"]');
    const buttons = page.locator('[class="btn btn_primary btn_small btn_inventory "]');
    this.firstItemTitle = titles.first();
    this.lastItemTitle = titles.last();
    this.firstItemPrice = prices.first();
    this.lastItemPrice = prices.last();
    this.firstItemDescription = descriptions.first();
    this.lastItemDescription = descriptions.last();
    this.firstItemButton = buttons.first();
    this.lastItemButton = buttons.last();
    this.basket = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItem(): Promise<void> {
    await this.clickElement(this.firstItemButton);
    await this.clickElement(this.lastItemButton);
  }
}
