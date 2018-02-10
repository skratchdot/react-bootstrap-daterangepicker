module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {}
};
