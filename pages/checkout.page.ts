import { Page, Locator } from '@playwright/test';
import { BasePage } from "@pages/base.page";

export class CheckoutPage extends BasePage {
    readonly countrySelect: Locator;
    readonly cityInput: Locator;
    readonly address1Input: Locator;
    readonly zipInput: Locator;
    readonly phoneInput: Locator;
    readonly billingContinueButton: Locator;
    
    readonly shippingContinueButton: Locator;
    readonly shippingMethodContinueButton: Locator;
    readonly paymentMethodContinueButton: Locator;
    readonly paymentInfoContinueButton: Locator;
    readonly confirmOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        
        // Lokatori za Billing adresu
        this.countrySelect = page.locator('#BillingNewAddress_CountryId');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
        
        // Dugmići za nastavak koraka
        this.billingContinueButton = page.locator('#billing-buttons-container .new-address-next-step-button');
        this.shippingContinueButton = page.getByRole('listitem').filter({ hasText: 'Shipping address' }).getByRole('button', { name: 'Continue' });
        this.shippingMethodContinueButton = page.locator('.button-1.shipping-method-next-step-button');
        this.paymentMethodContinueButton = page.locator('.button-1.payment-method-next-step-button');
        this.paymentInfoContinueButton = page.locator('.button-1.payment-info-next-step-button');
        this.confirmOrderButton = page.locator('.button-1.confirm-order-next-step-button');
    }

    /**
     * Pametno popunjavanje Billing adrese u zavisnosti od toga da li nalog već ima sačuvanu adresu
     */
    async fillBillingAddress(country: string, city: string, address: string, zip: string, phone: string) {
        // Proveravamo da li je forma vidljiva na ekranu
        const isFormVisible = await this.countrySelect.isVisible();

        if (isFormVisible === false) {
            // Ako forma NIJE vidljiva, znači da nalog već ima sačuvanu adresu.
            // Samo klikćemo na Continue da otvorimo sledeći korak.
            await this.billingContinueButton.click();
        } else {
            // Ako je forma vidljiva, popunjavamo sva obavezna polja pre klika
            await this.countrySelect.selectOption({ label: country });
            await this.cityInput.fill(city);
            await this.address1Input.fill(address);
            await this.zipInput.fill(zip);
            await this.phoneInput.fill(phone);
            await this.billingContinueButton.click();
        }
    }

    // Korak 2: Potvrda adrese za slanje
    async confirmShippingAddress() {
        await this.shippingContinueButton.click();
    }

    // Korak 3: Izbor metode dostave
    async selectShippingMethod(methodName: string) {
        await this.page.getByLabel(methodName, { exact: false }).check();
        await this.shippingMethodContinueButton.click();
    }

    // Korak 4: Izbor metode plaćanja
    async selectPaymentMethod(methodName: string) {
        await this.page.getByLabel(methodName, { exact: false }).check();
        await this.paymentMethodContinueButton.click();
    }

    // Korak 5: Potvrda informacija o plaćanju
    async confirmPaymentInfo() {
        await this.paymentInfoContinueButton.click();
    }

    // Korak 6: Finalni klik za potvrdu cele porudžbine
    async confirmOrder() {
        await this.confirmOrderButton.click();
    }
}
