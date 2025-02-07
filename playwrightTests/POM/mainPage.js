import Base from './base';

export class MainPage extends Base {
	constructor(page) {
		super(page);
	}

	get loginInput() {
		return this.page.locator('input[name="login"]');
	}

	get pswdInput() {
		return this.page.locator('input[name="password"]');
	}

	get submitLoginButton() {
		return this.page.locator('button[type="submit"]');
	}

	get dashboardSidebarIcon() {
		return this.page.locator(
			'div.sidebar__top-block--vy9Qd > div.sidebar__sidebar-btn--DE02C:nth-child(1)'
		);
	}

	get dashboardIconToolTip() {
		return this.page.locator('.tooltip__tooltip-content--Tr22J');
	}

	get dashboardToolTipText() {
		return this.page.locator('.sidebarButton__sidebar-tooltip--AkvYG');
	}

	get addDashboardCancelBtn() {
		return this.page.locator('//button[text() = "Cancel"]');
	}

	async enterLoginData(userName, password) {
		await this.loginInput.fill(userName);
		await this.pswdInput.isVisible();
		await this.pswdInput.fill(password);
		await this.submitLoginButton.click();
		await this.page.setViewportSize({ width: 1920, height: 1080 });
	}
}
