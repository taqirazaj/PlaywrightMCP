const testData = require('./testData');

class Helpers {
  static async loginAsStandardUser(loginActions) {
    await loginActions.navigateToLogin();
    await loginActions.login(testData.users.standard.username, testData.users.standard.password);
  }

  static async waitForPageLoad(page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async takeScreenshot(page, name) {
    await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
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
    console.log(`[TEST STEP]: ${message}`);
  }
}

module.exports = Helpers;