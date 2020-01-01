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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'vue/no-unused-components': 'off',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/this-in-template': 'warn'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
