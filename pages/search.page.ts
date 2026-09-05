import { BasePage } from "@pages/base.page";
import { Page, Locator } from "@playwright/test";


export class SearchPage extends BasePage {
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly searchKeyword: Locator;


    constructor(page: Page) {
        super(page)
        this.searchField = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchKeyword = page.getByRole('textbox', { name: 'Search keyword:' });
    }


    //fill search field and click on search button
    async fillFiedAndClickOnSearch(categoryName: string): Promise<void> {
        await this.searchField.fill(categoryName)
        await this.searchButton.click()
    }
}