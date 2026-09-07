import { test, expect } from '@fixtures/test-fixtures';
import { invalidLoginData } from '@test-data/login-data';

test.describe('auth', () => {
  test('valid login', async ({ loginPage }) => {
    // navigate to Home Page
    await loginPage.navigateTo();
    // click on the login link
    await loginPage.loginLink.click();
    // verify that url contains /login
    await expect(loginPage.page).toHaveURL('/login');
    // fill the form and click on log in button
    await loginPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
    // verify that email for specific user is visible
    await expect(loginPage.accountLink(process.env.EMAIL!)).toBeVisible();
    // click on the log out link
    await loginPage.logout();
    // verify that log in link is visible
    await expect(loginPage.loginLink).toBeVisible();
  });

  test('invalid login', async ({ loginPage }) => {
    // navigate to Home Page
    await loginPage.navigateTo();
    // click on login
    await loginPage.loginLink.click();
    // verify that url contains /login
    await expect(loginPage.page).toHaveURL('/login');
    // fill the form and click on login button
    await loginPage.logIn(invalidLoginData[0].wrongEmail, invalidLoginData[0].wrongPassword);
    // verify that error message for invalid login is visible
    await expect(
      loginPage.invalidLoginErrorMessage(invalidLoginData[0].errorMessage),
    ).toBeVisible();
  });
});
