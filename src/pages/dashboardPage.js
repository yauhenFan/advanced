/* eslint-disable max-len */
import Base from './base';

export class DashboardPage extends Base {
	get demoDashBoardIcon() {
		return $(
			'//div[@class = "gridRow__grid-row--X9wIq"]//a[text() = "DEMO DASHBOARD"]'
		);
	}

	get addNewDashboardBtn() {
		return $('//span[text() = "Add New Dashboard"]');
	}

	get addDashboardModalWindow() {
		return $(
			'//div[@class = "modalLayout__modal-window--jrhO6 modal-window-animation-enter-done"]'
		);
	}

	get dashboardNameInput() {
		return $(
			'//input[@class="input__input--iYEmM type-text variant-standard input__error--qY4dY"]'
		);
	}

	get addDashboardBtn() {
		return $('//button[text() = "Add"]');
	}

	async deleteDashboardBtn(number) {
		return $(
			`//div[@class  ='pageLayout__page-content--DCfUt']//div[@class = 'gridRow__grid-row-wrapper--xj8DG'][${number}]//i[@class = 'icon__icon--coE7b icon__icon-delete--lwBwP']`
		);
	}

	get confirmDeleteBtn() {
		return $('//button[text() = "Delete"]');
	}

	get demoDashboardWidget() {
		return $('div.react-grid-layout > div.react-grid-item:nth-child(1)');
	}

	async getDashboardTitle(title) {
		return $(
			`//div[@class = "gridRow__grid-row--X9wIq"]//a[text() = "${title}"]`
		);
	}
}
