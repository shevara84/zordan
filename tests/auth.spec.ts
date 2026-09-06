import { test, expect } from '@fixtures/test-fixtures';
import { invalidLoginData } from '@test-data/login-data';

test.describe('auth', () => {
  test('valid login', async ({ loginPage }) => {
    // navigate to Home Page
    await loginPage.navigateTo();
    // click on the login link
    await loginPage.clickOnlogIn();
    // verify that url contains /login endpoint
    await expect(loginPage.page).toHaveURL('/login');
    //fill the form and click on log in button
    await loginPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
    //verify successful login
    await expect(loginPage.accountLink(process.env.EMAIL!)).toBeVisible();
    // click on the log out link and
    await loginPage.logout();
    // verify that log in link is visible
    await expect(loginPage.loginLink).toBeVisible();
  });

  test('invalid login', async ({ loginPage }) => {
    //navigate to Home Page
    await loginPage.navigateTo();
    //click on login
    await loginPage.clickOnlogIn();
    // verify that url contains /login endpoint
    await expect(loginPage.page).toHaveURL('/login');
    // fill the form and click on login button
    await loginPage.logIn(invalidLoginData[0].wrongEmail, invalidLoginData[0].wrongPassword);
    //verify error message
    await expect(loginPage.page.getByText(invalidLoginData[0].errorMessage)).toBeVisible();
  });
});
