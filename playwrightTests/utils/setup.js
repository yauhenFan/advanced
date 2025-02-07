import { chromium } from 'playwright';

// eslint-disable-next-line arrow-parens
export const connectToBrowser = async (capability) => {
	const browser = await chromium.connect({
		wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`,
	});
	return browser;
};
