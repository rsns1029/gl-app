module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': ['error', {singleQuote: true}],
    'react-hooks/exhaustive-deps': 0,
  },
};
