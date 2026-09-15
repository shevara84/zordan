# Playwright Automation Project

E2E test automation project built with Playwright and TypeScript.

## Project Structure

- **Page Object Model (POM)** – Page-specific logic is separated from test cases.

- **Custom Fixtures** – Used for browser context and page setup.

- **Test Data** – Test data is stored in the `test-data` folder and used for data-driven testing (DDT).

- **Environment Variables** – Test credentials and application URL are loaded from `.env` using `dotenv`.

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

The project uses GitHub Actions for automated test execution.

- Pull requests targeting `main` automatically run ESLint and Playwright tests.
- The workflow can also be triggered manually through GitHub Actions.
- After a successful workflow on `main` or a manual run, the Playwright HTML report is deployed to GitHub Pages.
- The latest generated report can be accessed directly without downloading or setting up the project locally.
- GitHub Actions keeps the history of previous workflow runs, including branch, commit, and trigger information.

**[View Playwright Report](https://shevara84.github.io/zordan/)**

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