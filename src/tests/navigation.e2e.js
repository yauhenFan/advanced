/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { MainPage } from '../pages/mainPage';
import { BASE_URL, WEB_URL } from '../data/url.mjs';
import { DashboardPage } from '../pages/dashboardPage';
import { expect } from 'chai';
import { Invited_User, Invited_Pswd } from '../utils/credentials';
import { LoginHelper } from '../utils/helpers/loginHelper';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();
const loginHelper = new LoginHelper();

describe('Open Demo dashboard and widget loads', () => {
	before(async () => {
		await mainPage.open(WEB_URL);
		await mainPage.maximize();
		await loginHelper.login(Invited_User, Invited_Pswd);
	});

	it('Verify Demo Dashboard displays in the list', async () => {
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		expect(
			await dashboardPage.demoDashBoardIcon.waitForDisplayed({ timeout: 3000 })
		).equals(true);
	});

	it('Click on Demo dashboard and verify it is loaded', async () => {
		await dashboardPage.demoDashBoardIcon.isDisplayed();
		await dashboardPage.demoDashBoardIcon.click();
		expect(
			await dashboardPage.demoDashboardWidget.waitForDisplayed({
				timeout: 3000,
			})
		).equals(true);
	});
});
