import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tslint from 'typescript-eslint';

import { config as baseConfig } from "@translux/config/eslint.base";

/** @type {import("eslint").Linter.Config} */
export default tslint.config(
  ...baseConfig,
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/no-unsafe-call': 'off'
    },
  },
);
