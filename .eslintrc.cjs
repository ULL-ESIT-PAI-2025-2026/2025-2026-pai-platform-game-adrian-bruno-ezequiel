module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'], // Adiós jsdoc
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'valid-jsdoc': 'off', 
    
    // Solo mantenemos las reglas de TypeScript puro
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
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};