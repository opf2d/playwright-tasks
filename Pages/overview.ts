import { Page, Locator, expect } from "@playwright/test";

export class Overview {
  private readonly page: Page;
  private readonly verify: Locator;
  private readonly finishBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.verify = page.locator("#item_3_title_link");
    this.finishBTN = page.locator("#finish");
  }

  async checkData(): Promise<void> {
    await expect(this.verify).toHaveCount(0);
  }
  async goToComplete(): Promise<void> {
    await this.finishBTN.click();
  }
}
