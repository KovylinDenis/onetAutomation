module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'object-curly-spacing': ['error', 'never'],
    'newline-before-return': 2,
    semi: ['error', 'never'],
    camelcase: [2, {properties: 'always'}]
  }
}
