import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';
import { MainPage } from '../../../src/pages/mainPage.js';
import { DashboardPage } from '../../../src/pages/dashboardPage.js';
import LoginHelper from '../../../src/utils/helpers/loginHelper.js';
// eslint-disable-next-line camelcase
import { Default_User1, Default_Pswd1 } from '../utils/credentials.js';
import { BASE_URL } from '../../../src/data/url.js';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();
const loginHelper = new LoginHelper();

Given('I open ReportPortal login page on localhost', async () => {
	await mainPage.open(BASE_URL);
	await mainPage.maximize();
});

When('I login with default User credentials', async () => {
	await loginHelper.login(Default_User1, Default_Pswd1);
});

When('Dashboard icon displays on the left side bar', async () => {
	await expect(mainPage.dashboardIcon).toBeDisplayed();
});

When(
	'I click on Dashboard icon then Add New Dashboard button displays',
	async () => {
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		await dashboardPage.addNewDashboardBtn.isDisplayed();
	}
);

Then(
	'I click on Add New Dashboard button and verify popup appears',
	async () => {
		await dashboardPage.addNewDashboardBtn.click();
		await dashboardPage.addDashboardModalWindow.waitForDisplayed({
			timeout: 2000,
		});
		await expect(dashboardPage.addDashboardModalWindow).toBeDisplayed();
	}
);

Then('Enter new dashboard name {string} and save dashboard', async name => {
	await dashboardPage.dashboardNameInput.isDisplayed();
	await dashboardPage.dashboardNameInput.setValue(name);
	await dashboardPage.addDashboardBtn.click();
	await mainPage.dashboardIcon.isDisplayed();
	await mainPage.dashboardIcon.click();
});

Then(/^I delete dashboard with number "(.*)"$/, async position => {
	await (await dashboardPage.deleteExactDashboardBtn(position)).isDisplayed();
	await (await dashboardPage.deleteExactDashboardBtn(position)).click();
	await dashboardPage.confirmDeleteBtn.isDisplayed();
	await dashboardPage.confirmDeleteBtn.click();
	await mainPage.dashboardIcon.isDisplayed();
	await mainPage.dashboardIcon.click();
});

Then('I do not see dashboard with name {string}', async title => {
	await expect(
		await (await dashboardPage.getDashboardTitle(title)).isDisplayed()
	).toEqual(false);
});

Then('Element locator {string} is displayed on the page', async elem => {
	expect(await $(elem).isDisplayed()).toEqual(true);
});

When('I click on element locator on the page {string}', async element => {
	try {
		if (await $(element).isDisplayed()) {
			await $(element).click();
		}
	} catch (err) {
		console.error(
			'Error while trying to click the element again:',
			err.message
		);
	}
});
