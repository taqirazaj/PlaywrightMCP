class ProductsLocators {
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
    this.sortDropdown = page.getByRole('combobox');
    
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

module.exports = ProductsLocators;