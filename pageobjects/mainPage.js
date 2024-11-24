const Base = require('./base');

class MainPage extends Base {
    get submitBtn() {
        return $('button[type="submit"]');
    }

    get loginInput() {
        return $('input[name="login"]');
    }

    get pswdInput() {
        return $('input[name="password"]');
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


module.exports = new MainPage();