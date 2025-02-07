class Base {
	constructor(page) {
		this.page = page;
	}
	async openApp(url) {
		await this.page.goto(url);
	}
}

export default Base;
