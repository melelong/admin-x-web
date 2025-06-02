import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    // 基本配置
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },

  // 导入顺序配置
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      import: eslintPluginImport,
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
            },
            {
              pattern: '*.{css,scss,less}',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // 指向你的 tsconfig
        },
        node: true,
      },
      'import/extensions': ['.js', '.ts', '.vue'], // 支持的文件扩展
    },
  },
];
