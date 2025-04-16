import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class ProductSelection extends BasePage {
  private readonly addToCartButtons: Locator;
  private readonly firstItemBTN: Locator;
  private readonly lastItemBTN: Locator;
  private readonly basket: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButtons = page.locator('[id^="add-to-cart-"]');
    this.firstItemBTN = this.addToCartButtons.nth(0);
    this.lastItemBTN = this.addToCartButtons.last();
    this.basket = page.locator('.shopping_cart_link');
  }

  async addItem(): Promise<void> {
    await this.clickElement(this.firstItemBTN);
    await this.clickElement(this.lastItemBTN);
  }

  async goToCart(): Promise<void> {
    await this.navigate(this.basket);
  }
}
