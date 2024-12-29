import Base from './base.js';

export class MainPage extends Base {
	get submitBtn() {
		return $('button[type="submit"]');
	}

	get loginInput() {
		return $('input[name="login"]');
	}

	get pswdInput() {
		return $('input[name="password"]');
	}

	get dashboardIcon() {
		return $(
			'//a[@class  = "sidebarButton__nav-link--gZnHQ sidebarButton__active--GG93E"]'
		);
	}

	get avatarIcon() {
		return $('.userBlock__avatar-wrapper--aeZeo');
	}

	get logOutOption() {
		return $('div.userBlock__menu-item--MKb1c');
	}

	async enterValue(elem, value) {
		await elem.isDisplayed();
		await elem.setValue(value);
	}

	async clickElement(element) {
		await element.isDisplayed();
		await element.click();
	}
}
