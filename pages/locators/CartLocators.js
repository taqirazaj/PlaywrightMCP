class CartLocators {
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

module.exports = CartLocators;