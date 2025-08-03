const CartLocators = require('../locators/CartLocators');

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
    const removeButton = this.locators.page.locator(`[data-test="remove-${productName}"]`);
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

module.exports = CartActions;