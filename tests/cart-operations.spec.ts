import { test, expect } from '@fixtures/test-fixtures';
import { billingAddressData } from '../test-data/checkout-data';


test.describe('cart operations', () => {
  // Using serial mode to avoid conflict on the same account
  test.describe.configure({ mode: 'serial' });

  test('happy flow - add to cart and checkout', async ({ page, productsPage, shoppingCartPage, checkoutPage, checkoutCompletedPage, cartSetup, }) => {
    // clean cart before running test 
    await cartSetup.clearBeforeTest();
    // add Simple Computer to Cart and quantity 2
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

    // fill the address
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


  test('remove item from shopping cart', async ({ productsPage, shoppingCartPage, cartSetup, }) => {
    // Priprema stanja: Ovaj fixture u pozadini koristi istu POM metodu da ubaci 1 računar
    await cartSetup.populateBeforeTest();

    // Go to cart page
    await productsPage.clickOnShoppingCartPageLink();
    await expect(shoppingCartPage.productName).toContainText('Simple Computer');

    // Remove products from cart
    await shoppingCartPage.clearCartIfNotEmpty();

    // Verify that cart is empty
    const emptyCartMessage = shoppingCartPage.page.locator('.order-summary-content');
    await expect(emptyCartMessage).toContainText('Your Shopping Cart is empty!');
  });
});
