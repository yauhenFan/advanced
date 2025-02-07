import Base from './base.js';
import { MainPage } from './mainPage.js';
import { expect } from '@playwright/test';

let mainPage;

export class DashboardPage extends Base {
    constructor(page) {
        super(page);
    }

mainPage = new MainPage(this.page);

get demoDashboardTitle() {
    return this.page.locator('//div[@class = "gridRow__grid-row--X9wIq"]//a[text() = "DEMO DASHBOARD"]');
}

get firstWidget() {
    return this.page.locator('div.react-grid-layout > div.react-grid-item:nth-child(1)');
}

get secondWidget() {
    return this.page.locator('div.react-grid-layout > div.react-grid-item:nth-child(2)');
}

get addNewDashboardButton() {
    return this.page.locator('.addDashboardButton__add-dashboard-btn--acseh > button');
}

get addNewDashboardWindow() {
    return this.page.locator('//div[@class = "modalLayout__modal-window--jrhO6 modal-window-animation-enter-done"]');
}

get widgetPageFooter() {
    return this.page.locator('.footer__footer-text--dOnNV:nth-child(1)');
}

get deleteDemoDeashboardBtn() {
    return this.page.locator('div.dashboardTable__icon-holder--zZvuZ > i');
}

get deleteButtonModalWindow() {
    return this.page.locator('div.modalFooter__buttons-block--Bplno div.modalFooter__button-container--V6R9X:nth-child(2)');
}

get confirmationDashboardDeleteBanner() {
    return this.page.locator('//p[text() = "Dashboard has been deleted"]');
}

get settingsIcon() {
    return this.page.locator('div.sidebar__top-block--vy9Qd div.sidebar__sidebar-btn--DE02C:nth-child(6)');
}

get demodataOption() {
    return this.page.locator('//a[text() = "Demo data"]');
}

get generateDemoDataBtn() {
    return this.page.locator('.generateDemoDataBlock__generate-data-block--HwRlK');
}

get generatedDashboardBanner() {
    return this.page.locator('//p[text() ="Demo data has been generated"]');
}

async restoreDemoData() {
    try {
    await this.mainPage.dashboardSidebarIcon.click();
    await this.deleteDemoDeashboardBtn.click();
    await this.deleteButtonModalWindow.isVisible();
    await this.deleteButtonModalWindow.click();
    await this.confirmationDashboardDeleteBanner.isVisible();
    await this.settingsIcon.click();
    await this.demodataOption.isVisible();
    await this.demodataOption.click();
    await this.generateDemoDataBtn.isVisible();
    await this.generateDemoDataBtn.click();
    await this.page.waitForSelector(this.generatedDashboardBanner, { timeout: 35000 });
    await this.mainPage.dashboardSidebarIcon.click();
    } catch (error) {
        console.error('An error occurred:', error);
    //await this.demoDashboardTitle.isVisible();
}};

async verifyDragAndDropForWidget(firstEl, secondEl) {
    await this.mainPage.dashboardSidebarIcon.isVisible();
    await this.demoDashboardTitle.click();
    const WidgetLocationOne = await this.secondWidget.boundingBox();
    await this.page.dragAndDrop(secondEl, firstEl);
    const WidgetLocationTwo = await this.secondWidget.boundingBox();
    expect(WidgetLocationOne.x).not.toEqual(WidgetLocationTwo.x);
};


// eslint-disable-next-line class-methods-use-this
async verifyElementResized(ele, x) {
    const initialSize = await ele.boundingBox();
    await ele.evaluate((el, width) => {
        el.style.width = `${width}px`;
      }, x);
      const resized = await ele.boundingBox();
    expect(initialSize.width).not.toEqual(resized.width);
}
}