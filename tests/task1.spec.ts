import { expect, test, Page } from "@playwright/test";

async function login(page: Page, userName: string, passWord: string) {
  await page.locator('[id="user-name"]').fill(userName);
  await page.locator('[id="password"]').fill(passWord);
  await page.locator('[id="login-button"]').click();
}

test.describe("Login Test Cases", () => {
  test.beforeEach("Opening ", async ({ page }) => {
    await page.goto("/");
  });
  test("Verify logging in sucessfully", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await expect(page.locator("[id='react-burger-menu-btn']")).toBeVisible();
  });

  test("Verify invalid login", async ({ page }) => {
    await login(page, "invalid_user", "invalidPassword");
    await expect(page.locator("[data-test='error']")).toHaveText(/.*do not match any/);
  });

  test("Verify locked account logging in", async ({ page }) => {
    await login(page, "locked_out_user", "secret_sauce");
    await expect(page.locator("[data-test='error']")).toHaveText(/.*locked out./);
  });
});
