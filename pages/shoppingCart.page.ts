import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ShoppingCartPage extends BasePage {
    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly updateCartButton: Locator;
    readonly totalPrice: Locator;
    readonly termsCheckbox: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator('.product-name');
        this.productQuantity = page.locator('.qty-input');
        this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
        this.totalPrice = page.locator('.product-price.order-total strong');
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    /**
  * Checks if the cart contains items. If so, selects all "Remove" 
  * checkboxes and clicks "Update shopping cart" to empty it.
  */
    async clearCartIfNotEmpty() {
        await this.page.goto('/cart');
        const isCartPopulated = await this.productQuantity.first().isVisible();
        if (isCartPopulated) {
            const removeCheckboxes = this.page.locator('[name="removefromcart"]');
            const count = await removeCheckboxes.count();
            for (let i = 0; i < count; i++) {
                await removeCheckboxes.nth(i).check();
            }
            await this.updateCartButton.click();
        }
    }
    //confirm terms and go to checkout
    async proceedToCheckout() {
        await this.termsCheckbox.check();
        await this.checkoutButton.click();
    }
}
