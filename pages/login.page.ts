import { BasePage } from "@pages/base.page";
import { Page, Locator } from "@playwright/test";


export class LoginPage extends BasePage {

    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    
    
    
    constructor(page: Page) {
        super(page);
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password'});
        this.loginButton = page.getByRole('button', { name: 'Log in'});
        
    }

    async clickOnlogIn() {
        await this.loginLink.click();
    }

    async logIn(email: string, password: string) { 
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    

}