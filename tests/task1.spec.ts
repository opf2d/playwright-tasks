import { expect, test, Page } from "@playwright/test";
// const mainUrl: string = "https://www.saucedemo.com/";

async function login(page: Page, userName: string, passWord: string) {
  await page.goto('/');
  await page.locator('[id="user-name"]').fill(userName);
  await page.locator('[id="password"]').fill(passWord);
  await page.locator('[id="login-button"]').click();
}

test("Verify Test successful login on saucedemo", async ({ page }) => {
  await login(page, "standard_user", "secret_sauce");
  await expect(page.locator('[id="react-burger-menu-btn"]')).toBeVisible();
  await page.locator('[id="react-burger-menu-btn"]').click();
  await page.locator('[id="logout_sidebar_link"]').click();
});

test("Verify Test login with invalid credentials on saucedemo", async ({ page }) => {
  await login(page, "invalid_user", "invalidPassword");
  await expect(page.locator('[data-test="error"]')).toHaveText(/.*do not match any/);
});

test("Verify Test login with a locked account on saucedemo", async ({ page }) => {
  await login(page, "locked_out_user", "secret_sauce");
  await expect(page.locator('[data-test="error"]')).toHaveText(/.*locked out./);
});
