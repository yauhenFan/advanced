const mainPage = require('../pageobjects/mainPage');
const url = require('../testData/url');
require('dotenv').config();

const login = process.env.loginD;
const pswd = process.env.pswdD;
const loginI = process.env.loginI;
const pswdI = process.env.pswdI;

describe('Open ReportPortal on localhost', () => {
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

describe('Open RP in Wed', async() => {
    it('Launch ReportPortal via RP url', async() => {
        await browser.newWindow(url.WEB_URL);
        await mainPage.maximize();
    });

    it('I login with Invited user credentials', async() => {
        await mainPage.enterValue(mainPage.loginInput, loginI);
        await mainPage.enterValue(mainPage.pswdInput, pswdI);
        await mainPage.clickElement(mainPage.submitBtn);
        await browser.pause(5000);
    })
})
