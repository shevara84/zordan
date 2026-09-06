import { BasePage } from "./base.page";
import { Page, Locator } from "playwright/test";

export class ProductsPage extends BasePage {

    readonly quantity: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly successMessageBanner: Locator;

    constructor(page: Page) {
        super(page);
        this.quantity = page.getByRole('textbox', { name: 'Qty:' });
        this.productPrice = page.locator(`.product-price`);
        this.addToCartButton = page.locator('[id="add-to-cart-button-75"]');
        this.successMessageBanner = page.locator('p:has-text("The product has been added to your")');
    }
    // choose product category 
    async choseProduct(product: string): Promise<void> {
        await this.page.getByRole('heading', { name: product, level: 2 }).click()
    }

    //choose product title
    async chooseProductTitle(productTile: string): Promise<void> {
        await this.page.getByRole('link', { name: productTile, exact: true }).click()
    }
    //choose radio options
    radioButtonoptions(radioOption: string): Locator {
        return this.page.getByLabel(radioOption);
    }
    //enter quantity
    async enterQuantity(quantityInput: number | string = 1) {
        await this.quantity.fill(quantityInput.toString());
    }
    //click on add to cart button
    async clickAddToCart() {
        await this.addToCartButton.click();
    }
    //add product to cart
    async addSimpleComputerToCart(quantity: number) {
        await this.navMenuOption('Computers');
        await this.choseProduct('Desktops');
        await this.chooseProductTitle('Simple Computer');
        await this.radioButtonoptions('Slow').click();
        await this.enterQuantity(quantity);
        await this.clickAddToCart();
    }
}