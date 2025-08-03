const { test, expect } = require('@playwright/test');
const LoginActions = require('../pages/actions/LoginActions');
const ProductsActions = require('../pages/actions/ProductsActions');

test.describe('Products Page Tests', () => {
    let loginActions;
    let productsActions;

    test.beforeEach(async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
        
        // Initialize actions after navigation
        loginActions = new LoginActions(page);
        productsActions = new ProductsActions(page);

        // Login using the Page Object Model
        await loginActions.login('standard_user', 'secret_sauce');
        
        // Wait for products page to load using role-based selector
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('should sort products by price high to low', async ({ page }) => {
        // Wait for products to be visible
        await expect(productsActions.locators.productItems.first()).toBeVisible();
        
        // Get initial prices
        const initialPrices = await productsActions.getAllProductPrices();
        
        // Sort products by price high to low
        await productsActions.sortProducts('hilo');
        
        // Wait for sort to take effect and get sorted prices
        await expect(productsActions.locators.inventoryItemPrice.first()).toHaveText('$49.99');
        const sortedPrices = await productsActions.getAllProductPrices();
        
        // Convert price strings to numbers and sort for comparison
        const expectedPrices = [...initialPrices]
            .map(price => parseFloat(price.replace('$', '')))
            .sort((a, b) => b - a)
            .map(price => `$${price.toFixed(2)}`);
        
        // Verify prices are sorted correctly
        expect(sortedPrices).toEqual(expectedPrices);
        
        // Verify the first item is the most expensive (Fleece Jacket - $49.99)
        const firstProduct = await productsActions.getFirstProduct();
        expect(firstProduct.name).toContain('Fleece Jacket');
        expect(firstProduct.price).toBe('$49.99');
    });

    test('should sort products alphabetically Z to A', async ({ page }) => {
        // Wait for products to be visible
        await expect(productsActions.locators.productItems.first()).toBeVisible();
        
        // Get initial product names
        const initialNames = await productsActions.getAllProductNames();
        
        // Sort products Z to A
        await productsActions.sortProducts('za');
        
        // Wait for sort to take effect and get sorted names
        await expect(productsActions.locators.inventoryItemName.first()).toContainText('Test.allTheThings()');
        const sortedNames = await productsActions.getAllProductNames();
        
        // Create expected sorted names
        const expectedNames = [...initialNames].sort((a, b) => b.localeCompare(a));
        
        // Verify names are sorted correctly
        expect(sortedNames).toEqual(expectedNames);
        
        // Verify the first item is Test.allTheThings()
        const firstProduct = await productsActions.getFirstProduct();
        expect(firstProduct.name).toContain('Test.allTheThings()');
    });
});
