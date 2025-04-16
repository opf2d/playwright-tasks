import { Page, Locator, expect } from "@playwright/test";

export class Information {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly zipCode: Locator;
  private readonly continueBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.zipCode = page.locator("#postal-code");
    this.continueBTN = page.locator("#continue");
  }

  async myInformation(fName: string,lName: string,zCode: number): Promise<void> {
    await this.firstName.fill(fName);
    await this.lastName.fill(lName);
    await this.zipCode.fill(zCode.toString());
  }

  async goToOverview(): Promise<void> {
    this.continueBTN.click();
  }
}
