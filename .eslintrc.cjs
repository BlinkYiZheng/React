module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  extends: ['plugin:prettier/recommended', 'react-app'],

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
      },
      extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended',
      ],
      rules:{}
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/internal-regex': '^@',
    'import/resolver': {
      alias: {
        map: ['@, ./src'],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
      },
    },
  },
};
