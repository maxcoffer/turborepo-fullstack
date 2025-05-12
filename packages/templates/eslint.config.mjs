import eslint from "@eslint/js";
import globals from "globals";
import tslint from "typescript-eslint";

import { config as baseConfig } from "@translux/config/eslint.base";

/** @type {import("eslint").Linter.Config} */
const eslintConfig = [
  ...baseConfig,
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      'plugin:prettier/recommended': pluginPrettier,
    },
  },
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      semi: 'error',
      quotes: ['error', 'single'],
      'react/react-in-jsx-scope': 'on',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-return-await': 'error',
    },
  },
];

export default eslintConfig;
