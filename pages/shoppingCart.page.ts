import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page'; // Proveri da li ti je path alias tačno ovako napisan

export class ShoppingCartPage extends BasePage {
    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly updateCartButton: Locator;
    readonly totalPrice: Locator;
    readonly termsCheckbox: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        // Link sa nazivom proizvoda u tabeli korpe
        this.productName = page.locator('.product-name');
        
        // Input polje za količinu (Qty.)
        this.productQuantity = page.locator('.qty-input');
        
        // Dugme za ažuriranje korpe
        this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
        
        // Ukupna cena u tabeli za porudžbinu
        this.totalPrice = page.locator('.product-price.order-total strong');
        
        // Elementi za uslove i prelazak na kasu
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    /**
     * Proverava da li u korpi ima artikala. Ako ima, selektuje sve "Remove" 
     * checkbox-ove i klikće na "Update shopping cart" dugme da isprazni korpu.
     */
    async clearCartIfNotEmpty() {
        // Idemo direktno na stranicu korpe
        await this.page.goto('/cart');
        
        // Proveravamo da li je polje za količinu uopšte vidljivo (ako jeste, korpa ima artikle)
        const isCartPopulated = await this.productQuantity.first().isVisible();
        
        if (isCartPopulated) {
            // Pronalazimo sve checkbox-ove u koloni "Remove"
            const removeCheckboxes = this.page.locator('[name="removefromcart"]');
            const count = await removeCheckboxes.count();
            
            // Prolazimo kroz sve pronađene checkbox-ove i čekiramo ih za brisanje
            for (let i = 0; i < count; i++) {
                await removeCheckboxes.nth(i).check();
            }
            
            // Klikom na Update praznimo korpu
            await this.updateCartButton.click();
        }
    }

    /**
     * Metoda za prihvatanje uslova korišćenja i odlazak na kasu
     */
    async proceedToCheckout() {
        await this.termsCheckbox.check();
        await this.checkoutButton.click();
    }
}
