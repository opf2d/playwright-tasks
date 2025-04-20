import { test } from "@playwright/test";
import { LoginVerifications } from "../Pages/login";
import { ProductPage } from "../Pages/products";
import { CartPage } from "../Pages/CartPage";
import { Information } from "../Pages/information";
import { Overview } from "../Pages/overview";
import { Complete } from "../Pages/complete";
import { describe } from "node:test";

test.describe("Full Buying Process test", () => {
  let loginPage: LoginVerifications;
  let productPage: ProductPage;
  let CartPagePage: CartPage;
  let informationPage: Information;
  let overviewPage: Overview;
  let completePage: Complete;

  test.beforeEach("Navigate to login page", async ({ page }) => {
    loginPage = new LoginVerifications(page);
    productPage = new ProductPage(page);
    CartPagePage = new CartPage(page);
    informationPage = new Information(page);
    overviewPage = new Overview(page);
    completePage = new Complete(page);
    await loginPage.navigate(loginPage.mainPageUrl);
  });

  test("Buying 2 elements", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifyURL(loginPage.dashBoardUrl);
    // Add first and last item
    await productPage.addItems();
    // Go to the basket to check items
    await productPage.clickElement(productPage.basket);
    // verify if coorrect items added to the cart
    await CartPagePage.verifyUnorderedMatch(productPage.firstItemTitle, CartPagePage.firstItemTitle);
    await CartPagePage.verifyUnorderedMatch(productPage.lastItemTitle, CartPagePage.lastItemTitle);
    await CartPagePage.clickElement(CartPagePage.removeFirstItemButton);
    await CartPagePage.verifyElementPresence(CartPagePage.removeFirstItemButton, false);
    await CartPagePage.clickElement(CartPagePage.checkOutButton);
    await informationPage.myInformation("Fouad", "Lathqani", 1234);
    await informationPage.clickElement(informationPage.continueButton);
    await overviewPage.verifyElementPresence(overviewPage.verify, true);
    await overviewPage.clickElement(overviewPage.finishButton);
    await completePage.verifyElementPresence(completePage.successMSG, true);
    await completePage.clickElement(completePage.backHomeButton);
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('az');
    await productPage.sortingNameAsec(productPage.titles);
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('za');
    await productPage.sortingNameDsec(productPage.titles);
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('lohi');
    await productPage.sortingPriceAsec(productPage.prices);
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('hilo');
    await productPage.sortingPriceDsec(productPage.prices);
  });
}); 
