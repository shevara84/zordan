import { test, expect } from '@fixtures/test-fixtures';
import { billingAddressData } from '../test-data/checkout-data';

// using global session (user is logged in)
test.use({ storageState: '.auth/user.json' });

test.describe('cart operations', () => {
  // Sprečavamo sudaranje testova na istom nalogu (izvršavaju se serijski)
  test.describe.configure({ mode: 'serial' });

  test('happy flow - add to cart and checkout', async ({page,productsPage,shoppingCartPage,checkoutPage,checkoutCompletedPage,cartSetup,}) => {
    // clean cart before running test 
    await cartSetup.clearBeforeTest();

    // Akcija: Dodajemo Simple Computer direktno preko jedne POM metode sa količinom 2
    await productsPage.addSimpleComputerToCart(2);
    await expect(productsPage.successMessageBanner).toBeVisible();

    // go to cart and check details
    await productsPage.clickOnShoppingCartPageLink();
    await expect(page).toHaveURL('/cart');
    await expect(shoppingCartPage.productName).toContainText('Simple Computer');
    await expect(shoppingCartPage.productQuantity).toHaveValue('2');
    await expect(shoppingCartPage.totalPrice).toBeVisible();

    // go to checkout 
    await shoppingCartPage.proceedToCheckout();
    await expect(page).toHaveURL('/onepagecheckout');

    // Korak 1 na kasi: Popunjavanje adrese iz eksternih podataka
    await checkoutPage.fillBillingAddress(
      billingAddressData[0].country,
      billingAddressData[0].city,
      billingAddressData[0].address1,
      billingAddressData[0].zipCode,
      billingAddressData[0].phoneNumber,
    );

    // Preostali koraci kase (otvaraju se jedan po jedan na klik)
    await checkoutPage.confirmShippingAddress();
    await checkoutPage.selectShippingMethod('Ground');
    await checkoutPage.selectPaymentMethod('Cash On Delivery');
    await checkoutPage.confirmPaymentInfo();
    await checkoutPage.confirmOrder();

    // Finalna verifikacija uspešnog kraja kupovine uz ignorisanje kose crte na kraju URL-a
    await expect(page).toHaveURL('/checkout/completed/');
    await expect(checkoutCompletedPage.thankYouHeader).toBeVisible();
    await expect(checkoutCompletedPage.successMessage).toContainText('successfully processed');
  });

  // --- TEST 2: USPEŠNO BRISANJE PROIZVODA IZ KORPE ---
  test('should successfully remove item from shopping cart', async ({productsPage,shoppingCartPage,cartSetup,}) => {
    // Priprema stanja: Ovaj fixture u pozadini koristi istu POM metodu da ubaci 1 računar
    await cartSetup.populateBeforeTest();

    // Odlazak u korpu
    await productsPage.clickOnShoppingCartPageLink();
    await expect(shoppingCartPage.productName).toContainText('Simple Computer');

    // Akcija brisanja: Pozivamo metodu iz klase koja čekira "Remove" i klikće na "Update"
    await shoppingCartPage.clearCartIfNotEmpty();

    // Verify that cart is empty
    const emptyCartMessage = shoppingCartPage.page.locator('.order-summary-content');
    await expect(emptyCartMessage).toContainText('Your Shopping Cart is empty!');
  });
});
