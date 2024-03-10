module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  };
  