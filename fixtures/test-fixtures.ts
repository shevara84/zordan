import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ProductsPage } from '@pages/products.page';
import { ShoppingCartPage } from '@pages/shoppingCart.page';
import { CheckoutPage } from '@pages/checkout.page';
import { CheckoutCompletedPage } from '@pages/checkoutCompleted.page';
import { SearchPage } from '@pages/search.page';

type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    shoppingCartPage: ShoppingCartPage;
    checkoutPage: CheckoutPage;
    checkoutCompletedPage: CheckoutCompletedPage;
    searchPage: SearchPage;
    cartSetup: { 
        clearBeforeTest: () => Promise<void> 
        populateBeforeTest: () => Promise<void>;
    }; // Promenjen tip u objekat sa metodom
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    shoppingCartPage: async ({ page }, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    checkoutCompletedPage: async ({ page }, use) => {
        const checkoutCompletedPage = new CheckoutCompletedPage(page);
        await use(checkoutCompletedPage);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
    
    
     // POSREDNIK ZA PRIPREMU STANJA KORPE PRE TESTOVA
    cartSetup: async ({ shoppingCartPage, productsPage }, use) => {
        const setupObject = {
            // Metoda koja samo čisti korpu (za add-to-cart test)
            clearBeforeTest: async () => {
                await shoppingCartPage.page.goto('/');
                await shoppingCartPage.clearCartIfNotEmpty();
            },
            // Metoda koja čisti korpu pa dodaje 1 proizvod (za remove-from-cart test)
            populateBeforeTest: async () => {
                // 1. Očistimo korpu
                await shoppingCartPage.page.goto('/');
                await shoppingCartPage.clearCartIfNotEmpty();
                
                // 2. Pozivamo čistu POM metodu za dodavanje 1 računara
                await productsPage.addSimpleComputerToCart(1);
                
                // 3. Čekamo baner uspešnosti
                await expect(productsPage.successMessageBanner).toBeVisible({ timeout: 7000 });
            }
        };
        await use(setupObject);
    }
});

export { expect } from '@playwright/test';
