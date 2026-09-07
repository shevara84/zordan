import { Page, Locator } from "@playwright/test";


export class BasePage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly logoutLink: Locator;
    readonly shoppingCartPageLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.shoppingCartPageLink = page.locator(`span:has-text("Shopping cart")`);
    }

    // navigate to specific url
    async navigateTo(url: string = '/'): Promise<void> {
        await this.page.goto(url);
    }

    // click on the nav menu option and click on it
    async navMenuOption(navOption: string): Promise<void> {
        await this.page.locator('ul.top-menu')
            .getByRole('link', { name: navOption, exact: true })
            .click()
    }

    // click on logout link
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    // verify that specific user is loggeg in
    accountLink(email: string): Locator {
        return this.page.getByRole('link', { name: email });
    }
    // click on shopping cart link page
    async clickOnShoppingCartPageLink(): Promise<void> {
        await this.shoppingCartPageLink.click();
    }
    // error message locator for invalid log in
    invalidLoginErrorMessage(errorMessage: string): Locator {
        return this.page.getByText(errorMessage);
    }

}