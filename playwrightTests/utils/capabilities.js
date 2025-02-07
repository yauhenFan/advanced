import { LT_ACCESS_KEY, LT_USERNAME } from '../../src/utils/credentials';

export const capabilities = [
	{
		'browserName': 'Chrome',
		'browserVersion': '132.0',
		'LT:Options': {
			user: `${LT_USERNAME}`,
			accessKey: `${LT_ACCESS_KEY}`,
			build: 'Playwright JS Build',
			name: 'Playwright Test',
			video: true,
			platform: 'Windows 11',
			console: true,
			network: false,
		},
	},
	{
		'browserName': 'MicrosoftEdge',
		'browserVersion': '132.0',
		'LT:Options': {
			user: `${LT_USERNAME}`,
			accessKey: `${LT_ACCESS_KEY}`,
			build: 'Playwright JS Build',
			name: 'Playwright Test',
			video: true,
			platform: 'Windows 11',
			console: true,
		},
	},
];
