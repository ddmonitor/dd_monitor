module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'vue/no-unused-components': 'off',
    'vue/no-side-effects-in-computed-properties': 'warning',
    'vue/no-unused-vars': 'warning',
    'vue/this-in-template': 'warning'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
