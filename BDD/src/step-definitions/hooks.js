import { After } from '@wdio/cucumber-framework';
import { MainPage } from '../pages/mainPage';

const mainPage = new MainPage();

After({ tags: '@logout' }, async () => {
	await mainPage.avatarIcon.isDisplayed();
	await mainPage.avatarIcon.click();
	await mainPage.logOutOption.isDisplayed();
	await mainPage.logOutOption.click();
});
