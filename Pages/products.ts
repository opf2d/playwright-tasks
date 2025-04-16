import { Page, Locator, expect } from "@playwright/test";

export class ProductSelection {
  private readonly page: Page;
  private readonly firstItemBTN: Locator;
  private readonly lastItemBTN: Locator;
  private readonly basket: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstItemBTN = page.locator("#add-to-cart-sauce-labs-backpack");
    this.lastItemBTN = page.locator("#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)");
    this.basket = page.locator(".shopping_cart_link");
  }

  async addItem(): Promise<void> {
    await this.firstItemBTN.click();
    await this.lastItemBTN.click();
  }

  async goToCart(): Promise<void> {
    await this.basket.click();
  }
}
