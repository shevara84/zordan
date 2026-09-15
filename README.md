# Playwright Automation Project

E2E test automation project built with Playwright and TypeScript.

## Project Structure

- **Page Object Model (POM)** – Page-specific logic is separated from test cases.
- **Custom Fixtures** – Used for browser context and page setup.
- **Test Data** – Test data is stored in the `test-data` folder and used for data-driven testing (DDT).
- **Environment Variables** – Test credentials and the application URL are loaded from `.env` using `dotenv`.
- **TypeScript** – Used for type safety and project configuration.
- **ESLint & Prettier** – Used for linting and code formatting.

## Tests

- `auth.spec.ts` – Login with valid credentials and validation of invalid login attempts.
- `cart-operations.spec.js` – Shopping cart flows using saved authentication state (`storageState`).
- `product-search.spec.ts` – Product search and layout checks for unauthenticated users.

## Test Execution

Tests run in parallel by default.

`cart-operations.spec.js` runs in **serial mode** because the tests use the same user and shared shopping cart state. Running these tests in parallel could result in flaky tests caused by concurrent changes to the same cart.

## GitHub Actions

Tests are automatically executed when a Pull Request is opened or updated against the `main` branch.

The workflow runs:

- ESLint
- Playwright tests

The workflow can also be triggered manually through GitHub Actions.

After a successful workflow on `main`, the Playwright HTML report is automatically deployed to GitHub Pages. The latest report can be accessed directly below:

**[View Playwright Report](https://shevara84.github.io/zordan/)**

You can also view workflow runs, logs, test results, and deployment history in GitHub Actions:

**[View Deployments](https://github.com/shevara84/zordan/deployments)**

## Local Setup

### Requirements

- Node.js (LTS recommended)
- npm

### Installation

Clone the repository and install all project dependencies from `package.json`:

```bash
git clone <repository-url>

cd <project-directory>

npm ci