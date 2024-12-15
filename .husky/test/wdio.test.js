const mainPage = require('../POM/mainPage');
const subPage = require('../POM/subPage');
const searchModalWindow = require('../POM/components/searchWindow');

/* eslint-disable no-undef */
describe('Test suit for WDIO home site',() => {
    before(async() => {
        await mainPage.openPage('https://webdriver.io/');
        await browser.maximizeWindow();
        await mainPage.mainNavMenu.isDisplayed();
    });

    it('Sub-menu appears when click on DOcs item and URL is updated', async() => {
        await mainPage.clickOnNavMenuOption(3);
        await subPage.leftHandLIst.isDisplayed();
        expect(await browser.getUrl()).toContain('/gettingstarted');
    });

    it('Anoucement banner is not displayed after close', async() => {
        await mainPage.closeAnouncementBanner();
        await expect(mainPage.anouncementBanner).not.toBeDisplayed();
    });

    it('Anoucement banner is not displayed in a new window', async() => {
        await browser.newWindow('https://webdriver.io/');
        await mainPage.switchToWindowNumber(1);
        await expect(mainPage.anouncementBanner).not.toBeDisplayed();
    });

    it('Search using search input in Nav menu', async() => {
        await browser.closeWindow();
        await mainPage.switchToWindowNumber(0);
        await mainPage.mainNavMenu.isDisplayed();
        await searchModalWindow.findBySearch('navigateTo');
        await subPage.navigateToProtocol.isDisplayed();
        await expect(subPage.navigateToProtocol).toBeDisplayed();
    });

});