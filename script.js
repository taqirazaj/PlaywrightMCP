const fs = require('fs');
const path = require('path');

// Create directory structure
const dirs = [
  'pages/locators',
  'pages/actions',
  'tests',
  'utils'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// File contents
const files = {
  'package.json': `{
  "name": "saucedemo-playwright",
  "version": "1.0.0",
  "description": "Playwright tests for SauceDemo",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  },
  "keywords": ["playwright", "testing", "automation"],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}`,

  'playwright.config.js': `const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`,

  'pages/locators/LoginLocators.js': `class LoginLocators {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }
}

module.exports = LoginLocators;`,

  'pages/locators/ProductsLocators.js': `class ProductsLocators {
  constructor(page) {
    this.page = page;
    this.productsTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test*="add-to-cart"]');
    this.removeButtons = page.locator('[data-test*="remove"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
    
    // Specific product locators
    this.backpackAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backpackRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.bikeLightAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.bikeLightRemove = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.boltTShirtAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.boltTShirtRemove = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.fleeceJacketAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.fleeceJacketRemove = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
    this.onesieAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    this.onesieRemove = page.locator('[data-test="remove-sauce-labs-onesie"]');
    this.tShirtRedAddToCart = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.tShirtRedRemove = page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]');
  }
}

module.exports = ProductsLocators;`,

  'pages/locators/CartLocators.js': `class CartLocators {
  constructor(page) {
    this.page = page;
    this.cartTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.removeButtons = page.locator('[data-test*="remove"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartQuantity = page.locator('.cart_quantity');
  }
}

module.exports = CartLocators;`,

  'pages/actions/LoginActions.js': `const LoginLocators = require('../locators/LoginLocators');

class LoginActions {
  constructor(page) {
    this.page = page;
    this.locators = new LoginLocators(page);
  }

  async navigateToLogin() {
    await this.page.goto('/');
  }

  async enterUsername(username) {
    await this.locators.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.locators.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.locators.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginPageDisplayed() {
    return await this.locators.loginLogo.isVisible();
  }

  async getErrorMessage() {
    return await this.locators.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.locators.errorMessage.isVisible();
  }
}

module.exports = LoginActions;`,

  'pages/actions/ProductsActions.js': `const ProductsLocators = require('../locators/ProductsLocators');

class ProductsActions {
  constructor(page) {
    this.page = page;
    this.locators = new ProductsLocators(page);
  }

  async isProductsPageDisplayed() {
    return await this.locators.productsTitle.isVisible();
  }

  async getProductsPageTitle() {
    return await this.locators.productsTitle.textContent();
  }

  async getProductCount() {
    return await this.locators.productItems.count();
  }

  async addItemToCart(productName) {
    const addToCartButton = this.locators.page.locator(\`[data-test="add-to-cart-\${productName}"]\`);
    await addToCartButton.click();
  }

  async removeItemFromCart(productName) {
    const removeButton = this.locators.page.locator(\`[data-test="remove-\${productName}"]\`);
    await removeButton.click();
  }

  async addBackpackToCart() {
    await this.locators.backpackAddToCart.click();
  }

  async removeBackpackFromCart() {
    await this.locators.backpackRemove.click();
  }

  async addBikeLightToCart() {
    await this.locators.bikeLightAddToCart.click();
  }

  async removeBikeLightFromCart() {
    await this.locators.bikeLightRemove.click();
  }

  async addBoltTShirtToCart() {
    await this.locators.boltTShirtAddToCart.click();
  }

  async removeBoltTShirtFromCart() {
    await this.locators.boltTShirtRemove.click();
  }

  async addFleeceJacketToCart() {
    await this.locators.fleeceJacketAddToCart.click();
  }

  async removeFleeceJacketFromCart() {
    await this.locators.fleeceJacketRemove.click();
  }

  async getCartBadgeCount() {
    if (await this.locators.shoppingCartBadge.isVisible()) {
      return await this.locators.shoppingCartBadge.textContent();
    }
    return '0';
  }

  async clickShoppingCart() {
    await this.locators.shoppingCartLink.click();
  }

  async isAddToCartButtonVisible(productName) {
    const addToCartButton = this.locators.page.locator(\`[data-test="add-to-cart-\${productName}"]\`);
    return await addToCartButton.isVisible();
  }

  async isRemoveButtonVisible(productName) {
    const removeButton = this.locators.page.locator(\`[data-test="remove-\${productName}"]\`);
    return await removeButton.isVisible();
  }

  async getAllProductNames() {
    return await this.locators.inventoryItemName.allTextContents();
  }

  async getAllProductPrices() {
    return await this.locators.inventoryItemPrice.allTextContents();
  }

  async addMultipleItemsToCart(productNames) {
    for (const productName of productNames) {
      await this.addItemToCart(productName);
    }
  }

  async removeMultipleItemsFromCart(productNames) {
    for (const productName of productNames) {
      await this.removeItemFromCart(productName);
    }
  }
}

module.exports = ProductsActions;`,

  'pages/actions/CartActions.js': `const CartLocators = require('../locators/CartLocators');

class CartActions {
  constructor(page) {
    this.page = page;
    this.locators = new CartLocators(page);
  }

  async isCartPageDisplayed() {
    return await this.locators.cartTitle.isVisible();
  }

  async getCartPageTitle() {
    return await this.locators.cartTitle.textContent();
  }

  async getCartItemCount() {
    return await this.locators.cartItems.count();
  }

  async getCartItemNames() {
    return await this.locators.cartItemNames.allTextContents();
  }

  async getCartItemPrices() {
    return await this.locators.cartItemPrices.allTextContents();
  }

  async removeItemFromCart(productName) {
    const removeButton = this.locators.page.locator(\`[data-test="remove-\${productName}"]\`);
    await removeButton.click();
  }

  async clickContinueShopping() {
    await this.locators.continueShoppingButton.click();
  }

  async clickCheckout() {
    await this.locators.checkoutButton.click();
  }

  async isCartEmpty() {
    return (await this.getCartItemCount()) === 0;
  }

  async removeAllItemsFromCart() {
    const removeButtons = await this.locators.removeButtons.all();
    for (const button of removeButtons) {
      await button.click();
    }
  }
}

module.exports = CartActions;`,

  'utils/testData.js': `const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    }
  },
  
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      price: '$29.99',
      dataTest: 'sauce-labs-backpack'
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      price: '$9.99',
      dataTest: 'sauce-labs-bike-light'
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
      dataTest: 'sauce-labs-bolt-t-shirt'
    },
    fleeceJacket: {
      name: 'Sauce Labs Fleece Jacket',
      price: '$49.99',
      dataTest: 'sauce-labs-fleece-jacket'
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      price: '$7.99',
      dataTest: 'sauce-labs-onesie'
    },
    tShirtRed: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: '$15.99',
      dataTest: 'test.allthethings()-t-shirt-(red)'
    }
  },

  productList: [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)'
  ],

  urls: {
    login: '/',
    inventory: '/inventory.html',
    cart: '/cart.html'
  }
};

module.exports = testData;`,

  'utils/helpers.js': `const testData = require('./testData');

class Helpers {
  static async loginAsStandardUser(loginActions) {
    await loginActions.navigateToLogin();
    await loginActions.login(testData.users.standard.username, testData.users.standard.password);
  }

  static async waitForPageLoad(page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async takeScreenshot(page, name) {
    await page.screenshot({ path: \`screenshots/\${name}-\${Date.now()}.png\` });
  }

  static getRandomProducts(count = 3) {
    const products = [...testData.productList];
    const randomProducts = [];
    
    for (let i = 0; i < count && products.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * products.length);
      randomProducts.push(products.splice(randomIndex, 1)[0]);
    }
    
    return randomProducts;
  }

  static async verifyCartBadge(productsActions, expectedCount) {
    const cartBadgeCount = await productsActions.getCartBadgeCount();
    return cartBadgeCount === expectedCount.toString();
  }

  static async addRandomItemsToCart(productsActions, count = 3) {
    const randomProducts = this.getRandomProducts(count);
    await productsActions.addMultipleItemsToCart(randomProducts);
    return randomProducts;
  }

  static async removeRandomItemsFromCart(productsActions, products) {
    await productsActions.removeMultipleItemsFromCart(products);
  }

  static async verifyProductInCart(cartActions, productName) {
    const cartItems = await cartActions.getCartItemNames();
    const productDisplayName = testData.products[this.getProductKey(productName)].name;
    return cartItems.includes(productDisplayName);
  }

  static getProductKey(dataTestValue) {
    const productKeys = Object.keys(testData.products);
    return productKeys.find(key => testData.products[key].dataTest === dataTestValue);
  }

  static async logTestStep(message) {
    console.log(\`[TEST STEP]: \${message}\`);
  }
}

module.exports = Helpers;`,

  'tests/cart.spec.js': `const { test, expect } = require('@playwright/test');
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
});`
};

// Create all files
Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
});

console.log('\n✅ Project setup complete!');
console.log('\nNext steps:');
console.log('1. Run: npm install');
console.log('2. Run: npx playwright install');
console.log('3. Run tests: npm test');
console.log('4. Run tests with UI: npm run test:ui');
console.log('5. Run tests in headed mode: npm run test:headed');