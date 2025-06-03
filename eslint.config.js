import typescriptParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  // 需要忽略的一些文件
  {
    ignores: ['eslint.config.js', 'src/i18n/extractor.js'],
  },

  // 基础配置
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },

  // 导入排序配置
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      'import': eslintPluginImport,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '*.{css,scss,less}',
              group: 'object',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts', '.vue'],
        },
      },
      'import/extensions': ['.js', '.ts', '.vue'],
    },
  },

  // Vue 配置
  {
    files: ['**/*.vue'],
    plugins: {
      'vue': eslintPluginVue,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
    },
  },
];