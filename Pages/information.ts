import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Information extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly zipCode: Locator;
  private readonly continueBTN: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zipCode = page.locator('#postal-code');
    this.continueBTN = page.locator('#continue');
  }

  async myInformation(fName: string, lName: string, zCode: number): Promise<void> {
    const fields = new Map<Locator, string>([
      [this.firstName, fName],
      [this.lastName, lName],
      [this.zipCode, zCode.toString()],
    ]);
    await this.fillForm(fields);
  }

  async goToOverview(): Promise<void> {
    await this.navigate(this.continueBTN);
  }
}