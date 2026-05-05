import js from '@eslint/js';
import nextPlugin from 'eslint-config-next';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const nextRules = Array.isArray(nextPlugin) ? nextPlugin : [nextPlugin];

export default tseslint.config(
  {
    ignores: ['.next/**', 'coverage/**', 'node_modules/**', 'playwright-report/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...nextRules,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
);

