module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Enables parsing of modern ECMAScript features
    sourceType: 'module', // Enables use of imports
    ecmaFeatures: {
      jsx: true, // Enables parsing of JSX
    },
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  extends: ['react-app', 'plugin:@typescript-eslint/eslint-recommended'],
  env: {
    browser: true,
  },
};
