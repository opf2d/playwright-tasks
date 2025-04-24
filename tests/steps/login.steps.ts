import { Given, Then, When } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "playwright/test";
import { AfterAll } from "@cucumber/cucumber";

let browser: Browser;
let page: Page;

Given("User navigates to the website", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://www.saucedemo.com/");
});

Given("User enters the username as {string}", async function (username) {
  await page.locator('[data-test="username"]').fill(username);
});

Given("User enters the password as {string}", async function (password) {
  await page.locator('[data-test="password"]').fill(password);
});

When("User clicks on Login button", async function () {
  await page.locator('[data-test="login-button"]').click();
});

Then("Login operation must be {string}", async function (status) {
  switch (status) {
    case "valid":
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html", { timeout: 5000 });
      break;
    case "invalid":
      await expect(page.locator('[data-test="error"]')).toHaveText(/.*do not match any/);
      break;
    case "locked":
      await expect(page.locator('[data-test="error"]')).toHaveText(/.*locked out/);
      break;
    default:
      throw new Error(`Unhandled login status: ${status}`);
  }
});

AfterAll(async () => {
  await browser?.close();
  await browser?.close();
  await browser?.close();
});
