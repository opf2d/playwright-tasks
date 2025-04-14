import { Page, Locator, expect } from "@playwright/test";

export class successfulMSG {
  private readonly page: Page;
  private readonly successMSG: Locator;
  private readonly backHomeBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMSG = page.locator("#checkout_complete_container");
    this.backHomeBTN = page.locator("#back-to-products");
  }

  async sucessful(): Promise<void> {
    await expect(this.successMSG).toHaveCount(1);
  }

  async goBackHome(): Promise<void> {
    await this.backHomeBTN.click();
  }
}
