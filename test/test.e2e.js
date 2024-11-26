const mainPage = require('../pageobjects/mainPage');
const url = require('../testData/url');
require('dotenv').config();

const login = process.env.loginD;
const pswd = process.env.pswdD;

describe('Open ReportPortal', () => {
    it('Launch ReportPortal via dorect URL', async() => {
        await mainPage.open(url.BASE_URL);
        await mainPage.maximize();
    });

    it('I login with Default user credentials', async() => {
        await mainPage.enterValue(mainPage.loginInput, login);
        await mainPage.enterValue(mainPage.pswdInput, pswd);
        await mainPage.clickElement(mainPage.submitBtn);
        await browser.pause(5000);
    })
})

