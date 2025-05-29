// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, node: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // 只保留一个简单规则用于测试
    'no-console': 'warn',
  },
};
