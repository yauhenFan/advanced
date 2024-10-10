const mainPage = require('../pageobjects/mainPage');
const url = require('../testData/url');

describe('Open ReportPortal', () => {
    it('Launch ReportPortal via dorect URL', async() => {
        await mainPage.open(url.BASE_URL);
        await mainPage.maximize();
    })
})

