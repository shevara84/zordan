import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page'; 

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Instanciraš tvoju već postojeću klasu unutar setup-a
  const loginPage = new LoginPage(page);

  // 1. Odlazak na početnu stranu
  await loginPage.navigateTo();

  // 2. Klik na login link u zaglavlju (korak koji je falio!)
  await loginPage.clickOnlogIn();

  // Verifikacija da smo na pravom URL-u
  await expect(page).toHaveURL('/login');

  // 3. Popunjavanje forme i klik na Log In dugme preko tvoje POM metode
  await loginPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);

  // 4. Potvrda uspešnog logovanja preko tvog lokatora iz klase
  await expect(loginPage.accountLink(process.env.EMAIL!)).toBeVisible();

  // 5. Playwright uzima kolačiće iz browsera i puni user.json
  await page.context().storageState({ path: authFile });
});
