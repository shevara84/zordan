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
        this.countrySelect = page.locator('#BillingNewAddress_CountryId');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingContinueButton = page.locator('#billing-buttons-container .new-address-next-step-button');
        this.shippingContinueButton = page.getByRole('listitem').filter({ hasText: 'Shipping address' }).getByRole('button', { name: 'Continue' });
        this.shippingMethodContinueButton = page.locator('.button-1.shipping-method-next-step-button');
        this.paymentMethodContinueButton = page.locator('.button-1.payment-method-next-step-button');
        this.paymentInfoContinueButton = page.locator('.button-1.payment-info-next-step-button');
        this.confirmOrderButton = page.locator('.button-1.confirm-order-next-step-button');
    }

    async fillBillingAddress(country: string, city: string, address: string, zip: string, phone: string) {
        //check if form is visible 
        const isFormVisible = await this.countrySelect.isVisible();
        if (isFormVisible === false) {
            //click on the next step
            await this.billingContinueButton.click();
        } else {
            //if visible fill form and click on button
            await this.countrySelect.selectOption({ label: country });
            await this.cityInput.fill(city);
            await this.address1Input.fill(address);
            await this.zipInput.fill(zip);
            await this.phoneInput.fill(phone);
            await this.billingContinueButton.click();
        }
    }

    //confirm shipping address
    async confirmShippingAddress() {
        await this.shippingContinueButton.click();
    }

    //select and click on shipping method
    async selectShippingMethod(methodName: string) {
        await this.page.getByLabel(methodName, { exact: false }).check();
        await this.shippingMethodContinueButton.click();
    }

    //select and click on payment method
    async selectPaymentMethod(methodName: string) {
        await this.page.getByLabel(methodName, { exact: false }).check();
        await this.paymentMethodContinueButton.click();
    }

    //click on payment info
    async confirmPaymentInfo() {
        await this.paymentInfoContinueButton.click();
    }

    //click for confirming order
    async confirmOrder() {
        await this.confirmOrderButton.click();
    }
}
