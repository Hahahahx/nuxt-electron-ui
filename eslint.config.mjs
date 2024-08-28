// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  // jsonc: false,
  // yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    'node_modules',
    'dist',
    '**/*.js',
    '.nuxt',
    '.output',
    '.cache',
    '.history',
    '.temp',
    '.vscode',
    // ...globs
  ],
  files: [
    '**/*.{ts,vue}',
  ],

  rules: {
    'ts/no-unused-expressions': 'off',
    'ts/no-require-imports': 'off',
    'ts/ban-ts-comment': 'off',
    'ts/no-var-requires': 'off',
    'style/max-statements-per-line': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'warn',
    'unicorn/throw-new-error': 'off',
  },
})
