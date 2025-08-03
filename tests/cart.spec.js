const { test, expect } = require('@playwright/test');
const LoginActions = require('../pages/actions/LoginActions');
const ProductsActions = require('../pages/actions/ProductsActions');
const CartActions = require('../pages/actions/CartActions');
const testData = require('../utils/testData');
const Helpers = require('../utils/helpers');

test.describe('Shopping Cart Tests', () => {
  let loginActions, productsActions, cartActions;

  test.beforeEach(async ({ page }) => {
    loginActions = new LoginActions(page);
    productsActions = new ProductsActions(page);
    cartActions = new CartActions(page);
    
    // Login before each test
    await Helpers.loginAsStandardUser(loginActions);
    await expect(productsActions.locators.productsTitle).toBeVisible();
  });

  test('should add single item to cart and verify cart badge', async () => {
    await Helpers.logTestStep('Adding backpack to cart');
    await productsActions.addBackpackToCart();
    
    // Verify cart badge shows 1
    const cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
    
    // Verify remove button is visible
    expect(await productsActions.isRemoveButtonVisible(testData.products.backpack.dataTest)).toBe(true);
    expect(await productsActions.isAddToCartButtonVisible(testData.products.backpack.dataTest)).toBe(false);
  });

  test('should add multiple items to cart and verify cart badge', async () => {
    await Helpers.logTestStep('Adding multiple items to cart');
    
    // Add 3 items to cart
    await productsActions.addBackpackToCart();
    await productsActions.addBikeLightToCart();
    await productsActions.addBoltTShirtToCart();
    
    // Verify cart badge shows 3
    const cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('3');
    
    // Verify all items have remove buttons visible
    expect(await productsActions.isRemoveButtonVisible(testData.products.backpack.dataTest)).toBe(true);
    expect(await productsActions.isRemoveButtonVisible(testData.products.bikeLight.dataTest)).toBe(true);
    expect(await productsActions.isRemoveButtonVisible(testData.products.boltTShirt.dataTest)).toBe(true);
  });

  test('should remove single item from cart on products page', async () => {
    await Helpers.logTestStep('Adding item to cart first');
    await productsActions.addBackpackToCart();
    
    // Verify item was added
    let cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
    
    await Helpers.logTestStep('Removing item from cart');
    await productsActions.removeBackpackFromCart();
    
    // Verify cart badge is no longer visible (empty cart)
    cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('0');
    
    // Verify add to cart button is visible again
    expect(await productsActions.isAddToCartButtonVisible(testData.products.backpack.dataTest)).toBe(true);
    expect(await productsActions.isRemoveButtonVisible(testData.products.backpack.dataTest)).toBe(false);
  });

  test('should remove multiple items from cart on products page', async () => {
    await Helpers.logTestStep('Adding multiple items to cart');
    
    // Add 3 items to cart
    await productsActions.addBackpackToCart();
    await productsActions.addBikeLightToCart();
    await productsActions.addBoltTShirtToCart();
    
    // Verify all items were added
    let cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('3');
    
    await Helpers.logTestStep('Removing one item from cart');
    await productsActions.removeBackpackFromCart();
    
    // Verify cart badge shows 2
    cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('2');
    
    await Helpers.logTestStep('Removing remaining items from cart');
    await productsActions.removeBikeLightFromCart();
    await productsActions.removeBoltTShirtFromCart();
    
    // Verify cart is empty
    cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('0');
  });

  test('should add items to cart and verify them in cart page', async () => {
    await Helpers.logTestStep('Adding items to cart');
    
    // Add items to cart
    await productsActions.addBackpackToCart();
    await productsActions.addBikeLightToCart();
    
    await Helpers.logTestStep('Navigating to cart page');
    await productsActions.clickShoppingCart();
    
    // Verify cart page is displayed
    expect(await cartActions.isCartPageDisplayed()).toBe(true);
    expect(await cartActions.getCartPageTitle()).toBe('Your Cart');
    
    // Verify items are in cart
    const cartItems = await cartActions.getCartItemNames();
    expect(cartItems).toContain(testData.products.backpack.name);
    expect(cartItems).toContain(testData.products.bikeLight.name);
    expect(await cartActions.getCartItemCount()).toBe(2);
  });

  test('should add all products to cart and verify cart functionality', async () => {
    await Helpers.logTestStep('Adding all products to cart');
    
    // Add all products using helper method
    await productsActions.addMultipleItemsToCart(testData.productList);
    
    // Verify cart badge shows correct count
    const cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe(testData.productList.length.toString());
    
    await Helpers.logTestStep('Verifying cart contents');
    await productsActions.clickShoppingCart();
    
    // Verify all items are in cart
    const cartItemCount = await cartActions.getCartItemCount();
    expect(cartItemCount).toBe(testData.productList.length);
  });

  test('should add and remove items randomly', async () => {
    await Helpers.logTestStep('Adding random items to cart');
    
    // Add random items
    const randomProducts = await Helpers.addRandomItemsToCart(productsActions, 3);
    
    // Verify cart badge
    let cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('3');
    
    await Helpers.logTestStep('Removing random items from cart');
    
    // Remove 2 random items
    await Helpers.removeRandomItemsFromCart(productsActions, randomProducts.slice(0, 2));
    
    // Verify cart badge shows 1
    cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
    
    // Remove last item
    await Helpers.removeRandomItemsFromCart(productsActions, [randomProducts[2]]);
    
    // Verify cart is empty
    cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('0');
  });

  test('should maintain cart state when navigating between pages', async () => {
    await Helpers.logTestStep('Adding items and navigating to cart');
    
    // Add items to cart
    await productsActions.addBackpackToCart();
    await productsActions.addBikeLightToCart();
    
    // Navigate to cart
    await productsActions.clickShoppingCart();
    expect(await cartActions.getCartItemCount()).toBe(2);
    
    await Helpers.logTestStep('Returning to products page');
    
    // Navigate back to products
    await cartActions.clickContinueShopping();
    expect(await productsActions.isProductsPageDisplayed()).toBe(true);
    
    // Verify cart badge still shows 2
    const cartBadgeCount = await productsActions.getCartBadgeCount();
    expect(cartBadgeCount).toBe('2');
    
    // Verify remove buttons are still visible
    expect(await productsActions.isRemoveButtonVisible(testData.products.backpack.dataTest)).toBe(true);
    expect(await productsActions.isRemoveButtonVisible(testData.products.bikeLight.dataTest)).toBe(true);
  });
});