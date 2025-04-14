import { Page, Locator, expect } from "@playwright/test";

export class Information {
  private readonly page: Page;
  private readonly FirstName: Locator;
  private readonly LastName: Locator;
  private readonly ZipCode: Locator;
  private readonly ContinueBTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.FirstName = page.locator("#first-name");
    this.LastName = page.locator("#last-name");
    this.ZipCode = page.locator("#postal-code");
    this.ContinueBTN = page.locator("#continue");
  }

  async MyInformation(fName: string,lName: string,zCode: number): Promise<void> {
    await this.FirstName.fill(fName);
    await this.LastName.fill(lName);
    await this.ZipCode.fill(zCode.toString());
  }

  async GoToOverview(): Promise<void> {
    this.ContinueBTN.click();
  }
}
