import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Ignoriši foldere koji se generišu sami
  { 
    ignores: ['node_modules/', 'playwright-report/', 'test-results/'] 
  },
  
  // Preporučena JS i TypeScript pravila
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Zvanična Playwright pravila za testove
  {
    ...playwright.configs['flat/recommended'],
    files: ['/tests/**/*.spec.ts', '/tests/**/*.test.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Ovde možete dodati specifična Playwright pravila ako želite
      'playwright/no-focused-test': 'error', // Javlja grešku ako zaboravite .only na testu
      'playwright/expect-expect': 'error', 
    },
  },
  
  // Opšta pravila za ceo projekat (Pages, Fixtures, Tests...)
  {
    files: ['/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // OVA LINIJA POVEZUJE ESLINT I TSCONFIG
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
    },
  }, // Ovde je nedostajao zarez!

  eslintConfigPrettier
);
