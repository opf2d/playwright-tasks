import { Page, Locator, expect } from "@playwright/test";

export class Cart {
  private readonly page: Page;
  private readonly removeFirstItemBTN: Locator;
  private readonly removeSecondItemBTN: Locator;
  private readonly checkOutBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeFirstItemBTN = page.locator("#remove-sauce-labs-backpack");
    this.removeSecondItemBTN = page.locator("#remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)");
    this.checkOutBTN = page.locator("#checkout");
  }

  async checkItems(): Promise<void> {
    await expect(this.removeFirstItemBTN).toBeVisible();
    await expect(this.removeSecondItemBTN).toBeVisible();
  }

  async removeItem(): Promise<void> {
    await this.removeFirstItemBTN.click();
  }
  async checkRemovedItem(): Promise<void> {
    await expect(this.removeFirstItemBTN).toHaveCount(0);
  }
  async goToInfo(): Promise<void> {
    this.checkOutBTN.click();
  }
}

