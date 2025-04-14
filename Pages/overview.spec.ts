import { Page, Locator, expect } from "@playwright/test";

export class Overview {
  private readonly page: Page;
  private readonly Verify: Locator;
  private readonly FinishBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Verify = page.locator("#item_3_title_link");
    this.FinishBTN = page.locator("#finish");
  }

  async CheckData(): Promise<void> {
    await expect(this.Verify).toHaveCount(0);
  }
  async GoToComplete(): Promise<void> {
    await this.FinishBTN.click();
  }
}
