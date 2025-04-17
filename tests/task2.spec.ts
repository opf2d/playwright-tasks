import { test } from "@playwright/test";
import { LoginVerifications } from "../Pages/login";
import { ProductSelection } from "../Pages/products";
import { Cart } from "../Pages/cart";
import { Information } from "../Pages/information";
import { Overview } from "../Pages/overview";
import { Complete } from "../Pages/complete";
import { describe } from "node:test";

test.describe("Full Buying Process test", () => {
  let loginPage: LoginVerifications;
  let productPage: ProductSelection;
  let cartPage: Cart;
  let informationPage: Information;
  let overviewPage: Overview;
  let completePage: Complete;
  let mainPage: URL;

  test.beforeEach("Navigate to login page", async ({ page }) => {
    loginPage = new LoginVerifications(page);
    productPage = new ProductSelection(page);
    cartPage = new Cart(page);
    informationPage = new Information(page);
    overviewPage = new Overview(page);
    completePage = new Complete(page);
    await loginPage.navigate('/');
  });

  test("Buying 2 elements", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifyURL(/.*inventory\.html/);
    await productPage.addItem();
    await productPage.navigate(productPage.basket);
    await cartPage.verifyUnorderedMatch(productPage.firstItemTitle, cartPage.firstItemTitle);
    await cartPage.verifyUnorderedMatch(productPage.lastItemTitle, cartPage.lastItemTitle);
    await cartPage.checkItems();
    await cartPage.clickElement(cartPage.removeFirstItemButton);
    await cartPage.verifyElementPresence(cartPage.removeFirstItemButton, false);
    await cartPage.navigate(cartPage.checkOutButton);
    await informationPage.myInformation("Fouad", "Lathqani", 1234);
    await informationPage.navigate(informationPage.continueBTN);
    await overviewPage.verifyElementPresence(overviewPage.verify, true);
    await overviewPage.navigate(overviewPage.finishBTN);
    await completePage.verifyElementPresence(completePage.successMSG, true);
    await completePage.navigate(completePage.backHomeBTN);
  });
}); 
