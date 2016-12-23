import { before, afterEach, after } from 'selenium-webdriver/testing';
import { jsonServerStart } from '../../src/hook/jsonServer';
import { postJobUpdate as browserstackPostUpdateJob } from '../../src/hook/browserstack';
import { postJobUpdate as saucePostUpdateJob } from '../../src/hook/saucelabs';
import driver from '../../src/driver';

let server;
let allPassed = true;

before(function () {
    const port = 3030;
    this.server = jsonServerStart({}, port);
    this.baseUrl = `http://localhost:${port}/`;
});

afterEach(function () { // we need to keep the original this (do not use arrow function)
    allPassed = allPassed && (this.currentTest.state === 'passed');
});

if (process.env.BROWSERSTACK) {
    after(async () => {
        const message = await browserstackPostUpdateJob(
            driver,
            process.env.BROWSERSTACK_USER || process.env.BROWSERSTACK_USERNAME,
            process.env.BROWSERSTACK_ACCESS_KEY,
            allPassed
        );
        console.log(message);
    });

} else if (process.env.SAUCE) {
    after(async () => {
        const message = await saucePostUpdateJob(
            driver,
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            allPassed
        );
        console.log(message);
    });
}

after(function () {
    return driver.quit();
});
