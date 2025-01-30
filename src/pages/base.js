/* eslint-disable class-methods-use-this */
import { browser } from '@wdio/globals';

class Base {
	async open(url) {
		await browser.url(url);
	}

	async maximize() {
		await browser.maximizeWindow();
	}
}

export default Base;
