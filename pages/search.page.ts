import { BasePage } from "@pages/base.page";
import { Page, Locator } from "@playwright/test";


export class SearchPage extends BasePage {
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly searchKeyword: Locator;
    readonly productTitles: Locator;


    constructor(page: Page) {
        super(page)
        this.searchField = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchKeyword = page.getByRole('textbox', { name: 'Search keyword:' });
        this.productTitles = page.locator('.product-title a');
    }


    //fill search field and click on search button
    async fillFiedAndClickOnSearch(categoryName: string): Promise<void> {
        await this.searchField.fill(categoryName)
        await this.searchButton.click()
    }

    // gets all product titles from the page as an array
    async getProductTitlesArray(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }
}