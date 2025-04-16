import { Page, Locator, expect } from "@playwright/test";

export class ProductSelection {
  private readonly page: Page;
  private readonly addToCartButtons: Locator;
  private readonly firstItemBTN: Locator;
  private readonly lastItemBTN: Locator;
  private readonly basket: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('[id^="add-to-cart-"]'); 
    this.firstItemBTN = this.addToCartButtons.nth(0);
    this.lastItemBTN = this.addToCartButtons.last();
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

