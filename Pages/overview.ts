
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Overview extends BasePage {
  readonly verify: Locator;
  readonly finishBTN: Locator;

  constructor(page: Page) {
    super(page);
    this.verify = page.locator('#item_3_title_link');
    this.finishBTN = page.locator('#finish');
  }
}
