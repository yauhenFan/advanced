import { MainPage } from '../pages/mainPage';
import { BASE_URL, WEB_URL } from '../data/url';
import { DashboardPage } from '../pages/dashboardPage';
import { expect } from 'chai';

import {
	Default_User,
	Default_Pswd,
	Invited_User,
	Invited_Pswd,
} from '../utils/credentials';

const mainPage = new MainPage();
const dashboardPage = new DashboardPage();

describe('Open Demo dashboard and widget loads', () => {
	before(async () => {
		await mainPage.open(BASE_URL);
		await mainPage.maximize();
		await mainPage.enterValue(mainPage.loginInput, Default_User);
		await mainPage.enterValue(mainPage.pswdInput, Default_Pswd);
		await mainPage.clickElement(mainPage.submitBtn);
	});

	it('Verify Demo Dashboard displays in the list', async () => {
		await mainPage.dashboardIcon.isDisplayed();
		await mainPage.dashboardIcon.click();
		expect(await dashboardPage.demoDashBoardIcon.isDisplayed()).equals(true);
	});

	it('Click on Demo dashboard and verify it is loaded', async () => {
		await dashboardPage.demoDashBoardIcon.isDisplayed();
		await dashboardPage.demoDashBoardIcon.click();
		expect(await dashboardPage.demoDashboardWidget.isDisplayed()).equals(true);
	});
});
