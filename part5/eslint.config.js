// eslint.config.js
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  // Base ESLint recommended settings
  js.configs.recommended,

  // React plugin settings
  {
    files: ['**/*.jsx', '**/*.js'],
    ignores: ['node_modules', 'dist', '.eslintrc.cjs', 'vite.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      'parserOptions': {
        'ecmaFeatures': {
          'jsx': true,
          'modules': true
        }
      },
      globals: {
	  window: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        document: 'readonly'
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
    },
  },
]
