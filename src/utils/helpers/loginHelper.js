import { MainPage } from '../../pages/mainPage';

const mainPage = new MainPage();

export default class LoginHelper {
	async login(userLogin, userPassword) {
		await mainPage.enterValue(mainPage.loginInput, userLogin);
		await mainPage.enterValue(mainPage.pswdInput, userPassword);
		await mainPage.clickElement(mainPage.submitBtn);
	}
}
