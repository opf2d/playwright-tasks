import { test } from "@playwright/test";
import { loginVerifications } from "../Pages/login.spec";
import { productSelection } from "../Pages/products.spec";
import { cart } from "../Pages/cart.spec";
import { information } from "../Pages/information.spec";
import { overview } from "../Pages/overview.spec";
import { successfulMSG } from "../Pages/complete.spec";

test.describe("Login Test Cases", () => {
  let loginPage: loginVerifications;
  let addingItems: productSelection;
  let theBasket: cart;
  let formFilling: information;
  let overviewCheck: overview;
  let finish: successfulMSG;

  test.beforeEach("Navigate to login page", async ({ page }) => {
    loginPage = new loginVerifications(page);
    addingItems = new productSelection(page);
    theBasket = new cart(page);
    formFilling = new information(page);
    overviewCheck = new overview(page);
    finish = new successfulMSG(page);
    await loginPage.goToURL();
  });

  test("Full Buying Process test", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await addingItems.addItem();
    await addingItems.goToCart();
    await theBasket.checkItems();
    await theBasket.removeItem();
    await theBasket.checkRemovedItem();
    await theBasket.goToInfo();
    await formFilling.myInformation("Fouad", "Lathqani", 1234);
    await formFilling.goToOverview();
    await overviewCheck.checkData();
    await overviewCheck.goToComplete();
    await finish.sucessful();
    await finish.goBackHome();
  });
});
