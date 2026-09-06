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
    }; 
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
    
    
    cartSetup: async ({ shoppingCartPage, productsPage }, use) => {
        const setupObject = {
            // Method for cleaning cart(add to cart test)
            clearBeforeTest: async () => {
                await shoppingCartPage.page.goto('/');
                await shoppingCartPage.clearCartIfNotEmpty();
            },
            // Method for cleaning cart and adding 1 product (remove from cart test)
            populateBeforeTest: async () => {
                //Clear cart if not empty
                await shoppingCartPage.page.goto('/');
                await shoppingCartPage.clearCartIfNotEmpty();
                
                // Add product to cart
                await productsPage.addSimpleComputerToCart(1);
                
                //Verify that banner is visible
                await expect(productsPage.successMessageBanner).toBeVisible({ timeout: 7000 });
            }
        };
        await use(setupObject);
    }
});

export { expect } from '@playwright/test';
