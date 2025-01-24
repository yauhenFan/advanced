import { MainPage } from '../pages/mainPage';
import { BASE_URL, WEB_URL } from '../data/url.mjs';
import { DashboardPage } from '../pages/dashboardPage';
import { expect } from 'chai';
import { Default_User, Default_Pswd } from '../utils/credentials';
import { LoginHelper } from '../utils/helpers/loginHelper';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();
const loginHelper = new LoginHelper();

describe('Add and delete new dashboard', async () => {
	before(async () => {
		await mainPage.open(BASE_URL);
		await mainPage.maximize();
		await loginHelper.login(Default_User, Default_Pswd);
	});

	it('Click on Add New Dashboard button and verify popup appears', async () => {
		await dashboardPage.addNewDashboardBtn.isDisplayed();
		await dashboardPage.addNewDashboardBtn.click();
		await dashboardPage.addDashboardModalWindow.waitForDisplayed({
			timeout: 2000,
		});
		await expect(
			await dashboardPage.addDashboardModalWindow.isDisplayed()
		).equals(true);
	});

	it('Enter new dashboard name and save dashboard', async () => {
		await dashboardPage.dashboardNameInput.isDisplayed();
		await dashboardPage.dashboardNameInput.setValue('New_Dashboard');
		await dashboardPage.addDashboardBtn.click();
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		expect(
			await (
				await dashboardPage.getDashboardTitle('New_Dashboard')
			).isDisplayed()
		).equals(true);
	});

	it('Delete newly created dashboard and verify it is not displayed', async () => {
		await dashboardPage.deleteDashboardBtn.isDisplayed();
		await dashboardPage.deleteDashboardBtn.click();
		await dashboardPage.confirmDeleteBtn.isDisplayed();
		await dashboardPage.confirmDeleteBtn.click();
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		expect(
			await (
				await dashboardPage.getDashboardTitle('New_Dashboard')
			).isDisplayed()
		).equals(false);
	});
});
