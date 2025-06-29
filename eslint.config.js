import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        L: 'readonly',
        GeoTIFF: 'readonly',
        parseGeoraster: 'readonly',
        GeoRasterLayer: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn'],
      'no-console': ['warn', { 'allow': ['warn', 'error', 'log'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error'
    }
  }
]; 