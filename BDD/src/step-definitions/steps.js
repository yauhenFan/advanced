import { Given, When, Then, And } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';

import { MainPage } from '../pages/mainPage';
import { DashboardPage } from '../pages/dashboardPage';
import { LoginHelper } from '../utils/helpers/loginHelper';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();
const loginHelper = new LoginHelper();

Given('I open web site {string}', async page => {
	await mainPage.open(page);
	await mainPage.maximize();
});

When(
	'I login with default User credentials {string} and {string}',
	async (username, password) => {
		await loginHelper.login(username, password);
	}
);

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
		await expect(
			await dashboardPage.addDashboardModalWindow.isDisplayed()
		).toEqual(true);
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
	await (await dashboardPage.deleteDashboardBtn(position)).isDisplayed();
	await (await dashboardPage.deleteDashboardBtn(position)).click();
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
