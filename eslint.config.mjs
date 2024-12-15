/* eslint-disable quote-props */
import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {ignores: [
    '**/node_modules/**',
    'allure-results',
    'allure-report',
    '**/**/credentials.js',
    '**/wdio.test.js'
  ]
  },
  {rules: {
    semi: 'error',
			'max-len': ['error', { code: 180 }],
			curly: ['error', 'multi-line'],
			indent: 'off',
			yoda: 'error',
			'default-case': 'error',
			camelcase: ['warn', { ignoreDestructuring: true, properties: 'never' }],    
      'no-trailing-spaces': 'off',
			'no-console': 'off',
			'no-undef': 1,
      'no-sync': 'error',
			'no-var': 'warn',
			'no-shadow': 'error',
			'no-nested-ternary': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-constant-binary-expression': 'error',
			'no-return-assign': 'error',
			'no-duplicate-imports': 'error',
			'no-bitwise': 'error',
			'no-proto': 'error',
			'no-self-compare': 'error',
			'no-await-in-loop': 'error',
			'no-loop-func': 'error',
			'no-iterator': 'error',
			'no-unused-vars': 'off',
			'no-implicit-coercion': ['error', { allow: ['!!'] }],
			'for-direction': 'error',
			 quotes: ['warn', 'single', { allowTemplateLiterals: true }],
			'guard-for-in': 'error',
			'quote-props': ['warn', 'consistent'],
			'arrow-parens': ['warn', 'as-needed'],
			'dot-notation': 'warn',
			'class-methods-use-this': ['warn'],
      'no-restricted-syntax': [
				'error',
				{
					selector: 'ForInStatement',
					message:
					
						// eslint-disable-next-line max-len
						'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
				},
				{
					selector: 'LabeledStatement',
					message:
						'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
				},
				{
					selector: 'WithStatement',
					message:
						'with is disallowed in strict mode because it makes code impossible to predict and optimize.',
				},
			],
    }},
      
    ];