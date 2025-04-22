import { test, expect } from "@playwright/test";

test("mocks super heroes and doesn't call the real API", async ({ page }) => {
    await page.route(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
      async (route) => {
        const json = {
          squadName: "Super Hero Squad",
          homeTown: "Metro City",
          formed: 2025,
          secretBase: "Super tower",
          active: true,
          members: [
            {
              name: "Batman",
              age: 23,
              secretIdentity: "Fouad Lathqani",
              powers: ["Wall-crawling", "Super strength", "Spider-sense"],
            },
          ],
        };
  
        await route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(json),
        });
      }
    );
  
    await page.goto(
      "https://mdn.github.io/learning-area/javascript/oojs/json/heroes-finished.html"
    );
  
    await expect(page.getByText("SpiderMan")).toBeVisible();
    await expect(page.getByText("Peter Parker")).toBeVisible();
    await expect(page.getByText("Wall-crawling")).toBeVisible();
  });
  