import { test, expect } from '@fixtures/test-fixtures';
import { searchTestData } from '@test-data/search-data';

test('search product', async ({ searchPage }) => {
  // go to home page
  await searchPage.navigateTo();
  //enter product and click on search button
  await searchPage.fillFiedAndClickOnSearch(searchTestData[0].searchTerm);
  // verify that search term and search keyword are matching
  await expect(searchPage.searchKeyword).toHaveValue(searchTestData[0].searchTerm);
  //check if every element contains word computer
  expect(
    (await searchPage.getProductTitlesArray()).every((title) =>
      title.toLowerCase().includes(searchTestData[0].searchTerm.toLowerCase()),
    ),
  ).toBe(true);
  // verify that log in link is visible
  await expect(searchPage.loginLink).toBeVisible();
});
