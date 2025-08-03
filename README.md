# 🧪 Saucedemo Playwright Framework

A modular, scalable end-to-end UI test automation framework built using [Playwright](https://playwright.dev/) for [SauceDemo.com](https://www.saucedemo.com/). It follows the Page Object Model (POM) structure, supports cross-browser testing, and integrates with GitHub Actions for CI/CD pipelines.

---

## 📁 Folder Structure

```
mcp/
├── pages/
│   ├── actions/      # Page action classes
│   │   ├── CartActions.js
│   │   ├── LoginActions.js
│   │   └── ProductsActions.js
│   └── locators/     # Page element locators
│       ├── CartLocators.js
│       ├── LoginLocators.js
│       └── ProductsLocators.js
├── tests/           # Test specs organized by features
│   └── cart.spec.js
├── utils/           # Helper functions and test data
│   ├── helpers.js
│   └── testData.js
├── mcp.json         # MCP configuration
├── playwright.config.js
├── script.js
└── package.json
```

---

## 🛠️ Tech Stack

- **Automation Tool:** Playwright with Model Context Protocol (MCP)
- **Language:** JavaScript (Node.js)
- **Version Control:** Git
- **Architecture:** Page Object Model (POM)
- **Testing Framework:** Playwright Test

---

## 🚀 Key Features

- Model Context Protocol (MCP) integration for enhanced test automation
- Reusable and scalable Page Object Model architecture
- Clean separation of locators and actions
- Modular test structure with organized test specs
- Built-in utilities and test data management
- Cross-browser testing support via Playwright

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/taqirazaj/PlaywrightMCP.git


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
