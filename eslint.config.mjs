import fs from 'node:fs'
import { fixupPluginRules } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import-x'
import promise from 'eslint-plugin-promise'
import regex from 'eslint-plugin-regex'
import sonarjs from 'eslint-plugin-sonarjs'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

const autoImports = JSON.parse(fs.readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8'))

export default [
  { ignores: ['node_modules/**', 'dist/**', 'src/@iconify/*.js', '**/*.d.ts'] },
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,vue}'],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...autoImports.globals },
    },
    plugins: { '@stylistic': stylistic, import: importPlugin, promise, regex: fixupPluginRules(regex), sonarjs, vue },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: './jsconfig.json',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue', '.json', '.png', '.jpg', '.svg', '.scss', '.css'],
        }),
      ],
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/attributes-order': 'warn',
      'vue/block-order': 'warn',
      'vue/no-lone-template': 'warn',
      'vue/no-multiple-slot-args': 'warn',
      'vue/no-v-html': 'warn',
      'vue/order-in-components': 'warn',
      'vue/this-in-template': 'warn',
      'import/no-unresolved': [
        2,
        {
          ignore: ['~pages$', 'virtual:generated-layouts', '.*?raw'],
        },
      ],
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'warn',
      'promise/always-return': 'off',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'off',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/elseif-without-else': 'off',
      'sonarjs/max-switch-cases': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-collection-size-mischeck': 'error',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-element-overwrite': 'error',
      'sonarjs/no-empty-collection': 'error',
      'sonarjs/no-extra-arguments': 'error',
      'sonarjs/no-gratuitous-expressions': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-ignored-return': 'error',
      'sonarjs/no-inverted-boolean-check': 'error',
      'sonarjs/no-nested-switch': 'error',
      'sonarjs/no-nested-template-literals': 'off',
      'no-unreachable-loop': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-redundant-jump': 'error',
      'sonarjs/no-same-line-conditional': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/non-existent-operator': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-object-literal': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/prefer-while': 'error',
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below',
        },
      ],
      'vue/multi-word-component-names': 'off',
      'import/prefer-default-export': 'off',
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'no-restricted-imports': ['error', 'vuetify/components'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'no-shadow': 'off',
      'vue/block-tag-newline': 'error',
      'vue/component-api-style': 'error',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/custom-event-name-casing': [
        'error',
        'camelCase',
        {
          ignores: ['/^(click):[a-z]+((d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/'],
        },
      ],
      'vue/define-macros-order': 'error',
      'vue/html-comment-content-newline': 'error',
      'vue/html-comment-content-spacing': 'error',
      'vue/html-comment-indent': 'error',
      'vue/match-component-file-name': 'error',
      'vue/no-child-content': 'error',
      'vue/require-default-prop': 'off',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-reserved-component-names': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/v-on-handler-style': ['error', ['method', 'inline-function']],
      'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true,
        },
      ],
      'vue/no-irregular-whitespace': 'error',
      'vue/template-curly-spacing': 'error',
      'regex/invalid': [
        'error',
        [
          {
            regex: '@/assets/images',
            replacement: '@images',
            message: "Use '@images' path alias for image imports",
          },
          {
            regex: '@/styles',
            replacement: '@styles',
            message: "Use '@styles' path alias for importing styles from 'src/styles'",
          },
          {
            regex: '@core/\\w',
            message: "You can't use @core when you are in @layouts module",
            files: {
              inspect: '@layouts/.*',
            },
          },
          {
            regex: 'useLayouts\\(',
            message:
              '`useLayouts` composable is only allowed in @layouts & @core directory. Please use `useThemeConfig` composable instead.',
            files: {
              inspect: '^(?!.*(@core|@layouts)).*',
            },
          },
          {
            regex: "import axios from 'axios'",
            replacement: "import axios from '@axios'",
            message: "Use axios instances created in 'src/plugin/axios.js' instead of unconfigured axios",
            files: {
              ignore: '^.*plugins/axios.js.*',
            },
          },
        ],
        'eslint\\.config\\.mjs',
      ],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/key-spacing': [
        'error',
        {
          afterColon: true,
        },
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/max-len': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        {
          blankLine: 'always',
          prev: 'expression',
          next: 'const',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'expression',
        },
        {
          blankLine: 'always',
          prev: 'multiline-const',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-const',
        },
      ],
    },
  },
]
