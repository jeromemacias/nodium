import { before, afterEach, after } from 'selenium-webdriver/testing';
import driver from '../../src/driver';

let allPassed = true;

afterEach(function () { // we need to keep the original this (do not use arrow function)
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

after(() => {
    driver.quit();
});
