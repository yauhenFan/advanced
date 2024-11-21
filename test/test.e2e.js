const mainPage = require('../pageobjects/mainPage');
const url = require('../testData/url');
const credetials = require('../testData/credentials')

describe('Open ReportPortal', () => {
    it('Launch ReportPortal via dorect URL', async() => {
        await mainPage.open(url.BASE_URL);
        await mainPage.maximize();
    });

    it('I login with Default user credentials', async() => {
        await mainPage.enterValue(mainPage.loginInput, credetials.Default_C.login);
        await mainPage.enterValue(mainPage.pswdInput, credetials.Default_C.pswd);
        await mainPage.clickElement(mainPage.submitBtn);
        await browser.pause(5000);
    })
})

