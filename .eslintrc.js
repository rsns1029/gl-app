module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': ['error', {singleQuote: true}],
    'react-hooks/exhaustive-deps': 0,
  },
};
