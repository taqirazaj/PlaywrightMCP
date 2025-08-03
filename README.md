# 🧪 Saucedemo Playwright Framework

A modular, scalable end-to-end UI test automation framework built using [Playwright](https://playwright.dev/) for [SauceDemo.com](https://www.saucedemo.com/). It follows the Page Object Model (POM) structure, supports cross-browser testing, and integrates with GitHub Actions for CI/CD pipelines.

---

## 📁 Folder Structure

```
saucedemo-playwright/
├── pages/         # Page classes with locators and actions
├── tests/         # Test specs organized by features
├── utils/         # Custom commands, test data, and helpers
├── playwright.config.js
├── package.json
```

---

## 🛠️ Tech Stack

- **Automation Tool:** Playwright
- **Language:** JavaScript (Node.js)
- **CI/CD:** GitHub Actions
- **Version Control:** Git, GitHub
- **Architecture:** Page Object Model (POM)

---

## 🚀 Key Features

- Reusable and scalable POM-based test structure
- Randomized login with dynamic user selection
- Organized locators, actions, and test logic
- Cross-browser testing (Chromium, Firefox, WebKit)
- GitHub Actions workflow for automated execution
- Clean separation of concerns for better maintainability

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/saucedemo-playwright.git
cd saucedemo-playwright

# Install project dependencies
npm install

# Install Playwright browser binaries
npx playwright install
```

---

## ▶️ Running Tests

**Run all tests (headless mode)**

```bash
npx playwright test
```

**Run tests in UI mode**

```bash
npx playwright test --ui
```

**Run specific test file**

```bash
npx playwright test tests/login.spec.js
```

---
