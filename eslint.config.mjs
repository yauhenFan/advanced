import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['src/**/e2e.js'],
		ignores: [
			'**/*.config.js',
			'!**/eslint.config.js',
			'node_modules/',
			'allure-results/',
			'allure-report',
			'combined.log',
		],
		rules: {
			semi: 'error',
		},
	},
];
