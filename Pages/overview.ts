
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Overview extends BasePage {
  private readonly verify: Locator;
  private readonly finishBTN: Locator;

  constructor(page: Page) {
    super(page);
    this.verify = page.locator('#item_3_title_link');
    this.finishBTN = page.locator('#finish');
  }

  async checkData(): Promise<void> {
    await this.verifyElementPresence(this.verify, true);
  }

  async goToComplete(): Promise<void> {
    await this.navigate(this.finishBTN);
  }
}
