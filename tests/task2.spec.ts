import { test } from "@playwright/test";
import { LoginVerifications } from "../Pages/login.spec";
import { ProductSelection } from "../Pages/products.spec";
import { Cart } from "../Pages/cart.spec";
import { Information } from "../Pages/information.spec";
import { Overview } from "../Pages/overview.spec";
import { SuccessfulMSG } from "../Pages/complete.spec";

test.describe("Login Test Cases", () => {
  let loginPage: LoginVerifications;
  let AddingItems: ProductSelection;
  let TheBasket: Cart;
  let FormFilling: Information;
  let OverviewCheck: Overview;
  let Finish: SuccessfulMSG;

  test.beforeEach("Navigate to login page", async ({ page }) => {
    loginPage = new LoginVerifications(page);
    AddingItems = new ProductSelection(page);
    TheBasket = new Cart(page);
    FormFilling = new Information(page);
    OverviewCheck = new Overview(page);
    Finish = new SuccessfulMSG(page);
    await loginPage.goToURL();
  });

  test("Full Buying Process test", async () => {
    await loginPage.login("standard_user", "secret_sauce");
    await AddingItems.AddItem();
    await AddingItems.GoToCart();
    await TheBasket.CheckItems();
    await TheBasket.RemoveItem();
    await TheBasket.CheckRemovedItem();
    await TheBasket.GoToInfo();
    await FormFilling.MyInformation("Fouad", "Lathqani", 1234);
    await FormFilling.GoToOverview();
    await OverviewCheck.CheckData();
    await OverviewCheck.GoToComplete();
    await Finish.Sucessful();
    await Finish.GoBackHome();
  });
});
