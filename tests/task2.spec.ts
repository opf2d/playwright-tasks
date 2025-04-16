import { test } from "@playwright/test";
import { LoginVerifications } from "../Pages/login";
import { ProductSelection } from "../Pages/products";
import { Cart } from "../Pages/cart";
import { Information } from "../Pages/information";
import { Overview } from "../Pages/overview";
import { SuccessfulMSG } from "../Pages/complete";

test.describe("Login Test Cases", () => {
  let loginPage: LoginVerifications;
  let addingItems: ProductSelection;
  let theBasket: Cart;
  let formFilling: Information;
  let overviewCheck: Overview;
  let finish: SuccessfulMSG;

  test.beforeEach("Navigate to login page", async ({ page }) => {
    loginPage = new LoginVerifications(page);
    addingItems = new ProductSelection(page);
    theBasket = new Cart(page);
    formFilling = new Information(page);
    overviewCheck = new Overview(page);
    finish = new SuccessfulMSG(page);
    await loginPage.goToURL();
  });

  test("Full Buying Process test", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.checkAccountStatus();
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
