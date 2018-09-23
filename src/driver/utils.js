import { until } from 'selenium-webdriver';

export default driver => ({
    waitForElementVisible: (selector, timeout, message) =>
        driver.wait(until.elementLocated(selector), timeout, message),
    getText: selector => driver.findElement(selector).getText(),
    getAttribute: (selector, name) =>
        driver.findElement(selector).getAttribute(name),
    getValue: selector => driver.findElement(selector).getAttribute('value'),
    setValue: (selector, value) => driver.findElement(selector).sendKeys(value),
    click: selector => driver.findElement(selector).click(),
    find: selector => driver.findElement(selector),
});
