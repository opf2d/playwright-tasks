import { test } from "@playwright/test";
import { LoginVerifications } from "../Pages/LoginPage";
import { ProductPage } from "../Pages/ProductsPage";
import { CartPage } from "../Pages/CartPage";
import { Information } from "../Pages/InformationPage";
import { Overview } from "../Pages/OverviewPage";
import { Complete } from "../Pages/CompletePage";
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
    // verifying shopping cart badge is visible after adding the elements
    await productPage.verifyElementVisibility(productPage.cartBadge);
    // Go to the basket to check items
    await productPage.clickElement(productPage.basket);
    // verify if coorrect items added to the cart
    await CartPagePage.verifyUnorderedMatch(productPage.firstItemTitle, CartPagePage.firstItemTitle);
    await CartPagePage.verifyUnorderedMatch(productPage.lastItemTitle, CartPagePage.lastItemTitle);
    // removing the 1st element the user added
    await CartPagePage.clickElement(CartPagePage.removeFirstItemButton);
    // verify the element was removed correctly
    await CartPagePage.verifyElementPresence(CartPagePage.removeFirstItemButton, false);
    // go to Information page
    await CartPagePage.clickElement(CartPagePage.checkOutButton);
    // entering the name, last name and the zipcode
    await informationPage.myInformation("Fouad", "Lathqani", 1234);
    // go to Overview page
    await informationPage.clickElement(informationPage.continueButton);
    // checking the selected items are the right ones
    await overviewPage.verifyElementPresence(overviewPage.verify, true);
    // go to Complete page
    await overviewPage.clickElement(overviewPage.finishButton);
    // verifying the process was completely done perfectly
    await completePage.verifyElementPresence(completePage.successMSG, true);
    // go back to home page
    await completePage.clickElement(completePage.backHomeButton);
    // checking sort page is working correctly, sortig the elements by name Ascending 
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('az');
    await productPage.sortingNameAsec(productPage.titles);
    // checking sort page is working correctly, sortig the elements by name Dscending 
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('za');
    await productPage.sortingNameDsec(productPage.titles);
    // checking sort page is working correctly, sortig the elements by price Ascending 
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('lohi');
    await productPage.sortingPriceAsec(productPage.prices);
    // checking sort page is working correctly, sortig the elements by price Dscending 
    await productPage.clickElement(productPage.productSort);
    await productPage.sortByOption('hilo');
    await productPage.sortingPriceDsec(productPage.prices);
  });
}); 
