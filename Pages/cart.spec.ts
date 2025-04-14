import { Page, Locator, expect } from "@playwright/test";

export class Cart {
  private readonly page: Page;
  private readonly RemoveFirstItemBTN: Locator;
  private readonly RemoveSecondItemBTN: Locator;
  private readonly CheckOutBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.RemoveFirstItemBTN = page.locator("#remove-sauce-labs-backpack");
    this.RemoveSecondItemBTN = page.locator("#remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)");
    this.CheckOutBTN = page.locator("#checkout");
  }

  async CheckItems(): Promise<void> {
    await expect(this.RemoveFirstItemBTN).toBeVisible();
    await expect(this.RemoveSecondItemBTN).toBeVisible();
  }

  async RemoveItem(): Promise<void> {
    await this.RemoveFirstItemBTN.click();
  }
  async CheckRemovedItem(): Promise<void> {
    await expect(this.RemoveFirstItemBTN).toHaveCount(0);
  }

  async GoToInfo(): Promise<void> {
    this.CheckOutBTN.click();
  }
}
