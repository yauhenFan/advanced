import { MainPage } from '../pages/mainPage';
import { BASE_URL, WEB_URL } from '../data/url';
import {
	Default_User,
	Default_Pswd,
	Invited_User,
	Invited_Pswd,
} from '../utils/credentials';

const mainPage = new MainPage();

describe('Open ReportPortal on localhost', () => {
	it('Launch ReportPortal via localhost URL', async () => {
		await mainPage.open(BASE_URL);
		await mainPage.maximize();
	});

	it('I login with Default user credentials', async () => {
		await mainPage.enterValue(mainPage.loginInput, Default_User);
		await mainPage.enterValue(mainPage.pswdInput, Default_Pswd);
		await mainPage.clickElement(mainPage.submitBtn);
		await browser.pause(5000);
	});
});

describe('Open RP in Wed', async () => {
	it('Launch ReportPortal via web ReportPortal url', async () => {
		await browser.newWindow(WEB_URL);
		await mainPage.maximize();
	});

	it('I login with Invited user credentials', async () => {
		await mainPage.enterValue(mainPage.loginInput, Invited_User);
		await mainPage.enterValue(mainPage.pswdInput, Invited_Pswd);
		await mainPage.clickElement(mainPage.submitBtn);
		await browser.pause(5000);
	});
});
