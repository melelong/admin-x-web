import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  // 基础配置
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parser: vueParser,
      parserOptions: {
        parser: {
          ts: '@typescript-eslint/parser',
          js: '@typescript-eslint/parser', // 使用同一个解析器处理 JS 和 TS
          extraFileExtensions: ['.vue']
        }
      }
    },
    rules: {
      'no-console': 'warn',
    }
  },

  // 导入顺序配置
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      'import': eslintPluginImport
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
            'type'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal'
            },
            {
              pattern: '*.{css,scss,less}',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ]
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json']
        },
        node: true
      },
      'import/extensions': ['.js', '.ts', '.vue']
    }
  },

  // Vue 特定配置
  {
    files: ['**/*.vue'],
    plugins: {
      'vue': eslintPluginVue
    },
    rules: {
      'vue/multi-word-component-names': 'warn',
      'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
      'vue/html-self-closing': 'warn'
    }
  }
];