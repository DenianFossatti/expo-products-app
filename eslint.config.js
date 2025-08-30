// https://docs.expo.dev/guides/using-eslint/
const {defineConfig} = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const tailwind = require('eslint-plugin-tailwindcss')
const prettier = require('eslint-plugin-prettier/recommended')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = defineConfig([
  expoConfig,
  ...tailwind.configs['flat/recommended'],
  prettier,
  {
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLine: false,
          bracketSpacing: false,
          jsxSingleQuote: true,
          parser: 'typescript',
          printWidth: 120,
          quoteProps: 'as-needed',
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
    },
    ignores: ['dist/*'],
    plugins: {
      'unused-imports': unusedImports,
    },
  },
])
