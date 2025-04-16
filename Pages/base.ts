import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(locatorOrURL: Locator | string): Promise<void> {
    if (typeof locatorOrURL === 'string') {
      await this.page.goto(locatorOrURL);
    } else {
      await locatorOrURL.click();
    }
  }

  async verifyURL(expectedURL: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL, { timeout: 5000 });
  }

   async verifyElementText(locator: Locator, expectedText: string | RegExp): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async fillForm(fields: Map<Locator, string>): Promise<void> {
    for (const [locator, value] of fields) {
      await locator.fill(value);
    }
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async verifyElementPresence(locator: Locator, shouldExist: boolean): Promise<void> {
    const expectedCount = shouldExist ? 1 : 0;
    await expect(locator).toHaveCount(expectedCount);
  }

  async verifyElementVisibility(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
