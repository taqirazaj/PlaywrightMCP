const LoginLocators = require('../locators/LoginLocators');

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

module.exports = LoginActions;