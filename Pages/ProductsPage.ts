import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base";

export class ProductPage extends BasePage {
  readonly firstItemTitle: Locator;
  readonly lastItemTitle: Locator;
  readonly firstItemPrice: Locator;
  readonly lastItemPrice: Locator;
  readonly firstItemDescription: Locator;
  readonly lastItemDescription: Locator;
  readonly firstItemButton: Locator;
  readonly lastItemButton: Locator;
  readonly cartBadge: Locator;
  readonly basket: Locator;
  readonly titles: Locator;
  readonly prices: Locator;
  readonly productSort: Locator;

  constructor(page: Page) {
    super(page);

    this.titles = page.locator('[data-test="inventory-item-name"]');
    this.prices = page.locator('[data-test="inventory-item-price"]');
    const descriptions = page.locator('[data-test="inventory-item-desc"]');
    const buttons = page.locator('[class="btn btn_primary btn_small btn_inventory "]');
    this.firstItemTitle = this.titles.first();
    this.lastItemTitle = this.titles.last();
    this.firstItemPrice = this.prices.first();
    this.lastItemPrice = this.prices.last();
    this.firstItemDescription = descriptions.first();
    this.lastItemDescription = descriptions.last();
    this.firstItemButton = buttons.first();
    this.lastItemButton = buttons.last();
    this.basket = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.productSort = page.locator('[data-test="product-sort-container"]');
  }

  async addItems(): Promise<void> {
    await this.clickElement(this.firstItemButton);
    await this.clickElement(this.lastItemButton);
  }
  async sortByOption(type: string): Promise<void> {
    type = type.toLowerCase();
    let optionValue: string;

    switch (type) {
      case "az":
        optionValue = "az";
        break;
      case "za":
        optionValue = "za";
        break;
      case "lohi":
        optionValue = "lohi";
        break;
      case "hilo":
        optionValue = "hilo";
        break;
      default:
        throw new Error(`Unsupported sort type: ${type}`);
    }

    await this.productSort.selectOption(optionValue);
  }
}
