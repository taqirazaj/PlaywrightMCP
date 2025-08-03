const ProductsLocators = require('../locators/ProductsLocators');

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
    const addToCartButton = this.locators.page.locator(`[data-test="add-to-cart-${productName}"]`);
    await addToCartButton.click();
  }

  async removeItemFromCart(productName) {
    const removeButton = this.locators.page.locator(`[data-test="remove-${productName}"]`);
    await removeButton.click();
  }

  async sortProducts(order) {
    await this.locators.sortDropdown.selectOption(order);
  }

  async getAllProductPrices() {
    return await this.locators.inventoryItemPrice.allTextContents();
  }

  async getAllProductNames() {
    return await this.locators.inventoryItemName.allTextContents();
  }

  async getFirstProduct() {
    const firstItem = this.locators.productItems.first();
    return {
      name: await firstItem.locator('.inventory_item_name').textContent(),
      price: await firstItem.locator('.inventory_item_price').textContent()
    };
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
    const addToCartButton = this.locators.page.locator(`[data-test="add-to-cart-${productName}"]`);
    return await addToCartButton.isVisible();
  }

  async isRemoveButtonVisible(productName) {
    const removeButton = this.locators.page.locator(`[data-test="remove-${productName}"]`);
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

module.exports = ProductsActions;