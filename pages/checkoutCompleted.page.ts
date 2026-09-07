import { Page, Locator } from '@playwright/test';
import { BasePage } from "@pages/base.page";

export class CheckoutCompletedPage extends BasePage {
    readonly thankYouHeader: Locator;
    readonly successMessage: Locator;
    readonly orderDetailsLink: Locator;

    constructor(page: Page) {
        super(page);
        this.thankYouHeader = page.getByRole('heading', { name: 'Thank you', level: 1 });
        this.successMessage = page.locator('.title strong');
        this.orderDetailsLink = page.locator('.details a');
    }
}
