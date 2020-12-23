module.exports = {
  env: {
    node: true,
    browser: true,
    mocha: true,
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: '17.0.1',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
  },
}
