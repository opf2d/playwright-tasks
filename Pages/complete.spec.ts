import { Page, Locator, expect } from "@playwright/test";

export class SuccessfulMSG {
  private readonly page: Page;
  private readonly SuccessfulMSG: Locator;
  private readonly BackHomeBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SuccessfulMSG = page.locator("#checkout_complete_container");
    this.BackHomeBTN = page.locator("#back-to-products");
  }

  async Sucessful(): Promise<void> {
    await expect(this.SuccessfulMSG).toHaveCount(1);
  }

  async GoBackHome(): Promise<void> {
    await this.BackHomeBTN.click();
  }
}
