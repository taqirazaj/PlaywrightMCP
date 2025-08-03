const { test, expect } = require('@playwright/test');
const LoginActions = require('../pages/actions/LoginActions');

test.describe('Login Tests', () => {
    let loginActions;

    test.beforeEach(async ({ page }) => {
        loginActions = new LoginActions(page);
        await loginActions.navigateToLogin();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await loginActions.login('standard_user', 'secret_sauce');
        
        // Verify successful login by checking if we're on the products page
        const productsTitle = page.locator('.title');
        await expect(productsTitle).toBeVisible();
        await expect(productsTitle).toHaveText('Products');
    });
});
