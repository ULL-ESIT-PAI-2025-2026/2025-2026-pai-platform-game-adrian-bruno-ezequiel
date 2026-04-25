module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/typedef': [
      'error',
      {
        variableDeclaration: true,
        memberVariableDeclaration: true,
        parameter: true,
        propertyDeclaration: true,
        arrowParameter: true,
      },
    ],
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-type': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
