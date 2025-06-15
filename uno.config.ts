import {
  defineConfig,
  presetAttributify,
  transformerDirectives,
  presetMini
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|ts|js|tsx|jsx)$/,
      ],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.git/**',
        '**/*.md'
      ]
    }
  },
  presets: [
    presetMini(),
    presetAttributify()
  ],
  transformers: [
    transformerDirectives()
  ]
})