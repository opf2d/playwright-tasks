import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base';

export class Overview extends BasePage {
  readonly verify: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.verify = page.locator('#item_3_title_link');
    this.finishButton = page.locator('#finish');
  }
}
