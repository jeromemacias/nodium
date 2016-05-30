import { until } from 'selenium-webdriver';

export default driver => ({
    waitForElementVisible: selector => driver.wait(until.elementLocated(selector)),
    getText: selector => driver.findElement(selector).getText(),
    getValue: selector => driver.findElement(selector).getAttribute('value'),
    setValue: (selector, value) => driver.findElement(selector).sendKeys(value),
    click: selector => driver.findElement(selector).click(),
});
