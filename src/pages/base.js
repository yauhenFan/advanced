class Base {
	async open(url) {
		await browser.url(url);
	}

	async maximize() {
		await browser.maximizeWindow();
	}
}

export default Base;
