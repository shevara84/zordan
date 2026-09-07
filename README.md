# Playwright Automation Project

E2E test automation project built with Playwright and TypeScript.

## Project Structure

* **Page Object Model (POM)** – Page-specific logic is separated from test cases.
* **Custom Fixtures** – Used for browser context and page setup.
* **Test Data** – Test data is stored in the `test-data` folder and used for data-driven testing (DDT).
* **Environment Variables** – Test credentials are loaded from `.env` using `dotenv`.
* **TypeScript** – Used for type safety and project configuration.
* **ESLint & Prettier** – Used for linting and code formatting.

## Tests

* `auth.spec.ts` – Login with valid credentials and validation of invalid login attempts.
* `cart-operations.spec.js` – Shopping cart flows using saved authentication state (`storageState`).
* `product-search.spec.ts` – Product search and layout checks for unauthenticated users.

## Test Execution

Tests run in parallel by default.

`cart-operations.spec.js` runs in **serial mode** because the tests use the same user and shared shopping cart state. Running these tests in parallel could result in flaky tests caused by concurrent changes to the same cart.

## GitHub Actions

Tests can also be triggered manually through GitHub Actions.

After the workflow finishes, a link to the generated test report is available in the repository's **Deployments** section. This allows the test results to be accessed without downloading or setting up the project locally.

[View Deployments](https://github.com/shevara84/zordan/deployments)

## Local Setup

### Requirements

* Node.js (LTS recommended)
* npm

### Installation

Clone the repository and install all project dependencies from `package.json`:

```bash
git clone <repository-url>
cd <project-directory>
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

`npm ci` installs all dependencies defined in `package.json`, including `dotenv`.

### Environment Variables

Create a `.env` file in the project root using `.env.example` as a template:

```bash
cp .env.example .env
```

Update `.env` with your test credentials:

```env
EMAIL=your_actual_email@example.com
PASSWORD=your_secure_password_123
```

Do not commit `.env` or any file containing real credentials.

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Run a specific test:

```bash
npx playwright test tests/product-search.spec.ts
```

## Linting and Formatting

Run ESLint:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

## Test Report

Open the Playwright HTML report after running the tests:

```bash
npx playwright show-report
```
