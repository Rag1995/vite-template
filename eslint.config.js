import js from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  prettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'vue/multi-word-component-names': 'off',
      'no-multi-spaces': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 120,
          semi: false,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // 沒有內容的標籤如 <br> 總是自閉合
            normal: 'always', // 正常的 HTML 標籤如 <div> 總是自閉合
            component: 'always', // 自訂元件標籤總是自閉合
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
)
