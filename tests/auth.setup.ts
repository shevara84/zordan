import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  //go to home page
  await loginPage.navigateTo();
  //click on the log in link
  await loginPage.loginLink.click();
  //verify that url contains /login
  await expect(page).toHaveURL('/login');
  // fill the form and click on log in button
  await loginPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
  // verify that email for specific user is visible
  await expect(loginPage.accountLink(process.env.EMAIL!)).toBeVisible();
  // Extract cookies from the browser and save them to user.json
  await page.context().storageState({ path: authFile });
});
