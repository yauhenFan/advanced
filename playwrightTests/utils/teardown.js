export const teardown = async (page, browser) => {
	await page.close();
	await browser.close();
};
