import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { 
      globals: globals.browser 
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'indent': ['error', 2],
      'no-console': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-spacing': ['error', {'before': false, 'after': true}]
    },
  },
];

