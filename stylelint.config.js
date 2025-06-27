/** @type {import("stylelint").Config} */
export default {
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order', 'stylelint-less', 'stylelint-prettier'],
  rules: {
    'no-empty-source': null,
    'no-descending-specificity': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'media-query-no-invalid': null,
    'comment-no-empty': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'plugin',
          'apply',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'extend',
          'content',
          'use',
        ],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
  },
  overrides: [
    {
      files: ['**/*.(css|html|vue)'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global'] }],
        'selector-pseudo-element-no-unknown': [
          true,
          { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] },
        ],
      },
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
      extends: ['stylelint-config-standard-less'],
      rules: {
        'less/color-no-invalid-hex': true,
        'less/no-duplicate-variables': true,
      },
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
