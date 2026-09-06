# 🎭 Playwright Automation Project

This repository contains End-to-End (E2E) automated tests built with the **Playwright** framework using **TypeScript**.

## 🛠️ Architecture & Core Features
- **Page Object Model (POM)** – Clean separation of page logic and test scripts.
- **Custom Fixtures** – Optimized browser context and page initialization.
- **Test Data & Dotenv** – Externalized test data and secure environment variables.
- **TypeScript & TSConfig** – Strictly typed development for robust code.
- **Code Quality** – Automated linting and formatting via ESLint and Prettier.

## 📊 Core Test Scenarios
1. **Authentication (`auth.spec.ts`)** – Validates successful login and error handling for invalid credentials (executed from a clean state).
2. **Cart Operations (`cart-operations.spec.js`)** – Tests end-to-end shopping cart functionality using pre-saved authentication state (`storageState`).
3. **Product Search (`product-search.spec.ts`)** – Verifies search capabilities and layout constraints for guest (unauthenticated) users.

---

## 💻 Local Setup & Execution

### Prerequisites
- **Node.js** (LTS version recommended)

### 1. Installation
Clone the repository and install all required dependencies and browser binaries:
```bash
npm ci
npx playwright install --with-deps
```

### 2. Environment Configuration
Create a `.env` file in the root directory of the project. Fill it with your own actual test credentials using the format below (this file is automatically ignored by Git):
```env
EMAIL=your_actual_email@example.com
PASSWORD=your_secure_password_123
```

### 3. Running Tests
```bash
# Run all tests in headless mode
npx playwright test

# Run all tests in UI Mode (interactive)
npx playwright test --ui

# Run a specific test file
npx playwright test tests/product-search.spec.ts
```

### 4. Code Quality Commands
Keep the codebase clean and formatted using these built-in scripts:
```bash
# Run linter check
npm run lint

# Format code automatically
npm run format
```

### 5. Viewing Test Reports
After the test run completes, open the interactive HTML report using:
```bash
npx playwright show-report
```
