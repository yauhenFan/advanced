/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { MainPage } from '../pages/mainPage';
import { WEB_URL } from '../data/url.mjs';
import { DashboardPage } from '../pages/dashboardPage';
import { expect } from 'chai';
import { Invited_User, Invited_Pswd } from '../utils/credentials';
import { LoginHelper } from '../utils/helpers/loginHelper';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();
const loginHelper = new LoginHelper();

describe('Add and delete new dashboard', async () => {
	before(async () => {
		await mainPage.open(WEB_URL);
		await mainPage.maximize();
		await loginHelper.login(Invited_User, Invited_Pswd);
	});

	it('Click on Add New Dashboard button and verify popup appears', async () => {
		await dashboardPage.addNewDashboardBtn.isDisplayed();
		await dashboardPage.addNewDashboardBtn.click();
		await dashboardPage.addDashboardModalWindow.waitForDisplayed({
			timeout: 2000,
		});
		expect(await dashboardPage.addDashboardModalWindow.isDisplayed()).equals(
			true
		);
	});

	it('Enter new dashboard name and save dashboard', async () => {
		await dashboardPage.dashboardNameInput.isDisplayed();
		await dashboardPage.dashboardNameInput.setValue('New Dashboard');
		await dashboardPage.addDashboardBtn.click();
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		await expect(
			await (
				await dashboardPage.getDashboardTitle('New Dashboard')
			).isDisplayed()
		).equals(true);
	});

	it('Delete newly created dashboard and verify it is not displayed', async () => {
		await (await dashboardPage.deleteDashboardBtn(2)).isDisplayed();
		await (await dashboardPage.deleteDashboardBtn(2)).click();
		await dashboardPage.confirmDeleteBtn.isDisplayed();
		await dashboardPage.confirmDeleteBtn.click();
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		expect(
			await (
				await dashboardPage.getDashboardTitle('New Dashboard')
			).isDisplayed()
		).equals(false);
	});
});
