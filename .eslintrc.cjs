module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    'no-duplicate-imports': 'error',
    'no-console': 'warn',
    'max-len': [
      'warn',
      {
        code: 140,
      },
    ],
    camelcase: 'warn',
    'no-underscore-dangle': 'error',
    'no-const-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-constant-condition': 'error',
    'no-debugger': 'error',
    'no-self-compare': 'error',
    'no-unreachable': 'error',
    'comma-spacing': 'warn',
  },
};
