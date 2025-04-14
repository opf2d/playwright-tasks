import { Page, Locator, expect } from "@playwright/test";

export class ProductSelection {
  private readonly page: Page;
  private readonly FirstItemBTN: Locator;
  private readonly LastItemBTN: Locator;
  private readonly Basket: Locator;

  constructor(page: Page) {
    this.page = page;
    this.FirstItemBTN = page.locator("#add-to-cart-sauce-labs-backpack");
    this.LastItemBTN = page.locator("#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)");
    this.Basket = page.locator(".shopping_cart_link");
  }

  async AddItem(): Promise<void> {
    await this.FirstItemBTN.click();
    await this.LastItemBTN.click();
  }

  async GoToCart(): Promise<void> {
    await this.Basket.click();
  }
}
