import { Browser } from 'selenium-webdriver';
import getLocalDriver from './local';
import getSauceLabsDriver from './saucelabs';
import getBrowserstackDriver from './browserstack';
const debug = require('debug')('nodium');

let driver;

if (process.env.BROWSERSTACK) {
    const browser = {
        name: process.env.SELENIUM_BROWSER || 'chrome',
        platform: process.env.BROWSERSTACK_PLATFORM || 'Windows',
        resolution: process.env.BROWSERSTACK_RESOLUTION || '1280x1024',
    };
    if (process.env.BROWSERSTACK_PLATFORM_VERSION) {
        browser.platformVersion = process.env.BROWSERSTACK_PLATFORM_VERSION;
    }
    if (process.env.BROWSERSTACK_VERSION) {
        browser.version = process.env.BROWSERSTACK_VERSION;
    } else {
        switch (browser.name.toLowerCase()) {
            case Browser.CHROME:
                browser.version = '69';
                break;
            case Browser.FIREFOX:
                browser.version = '62';
                break;
            default:
                throw new Error(
                    `Cannot set default version for browser ${browser.name}`
                );
        }
    }

    const username =
        process.env.BROWSERSTACK_USER || process.env.BROWSERSTACK_USERNAME;
    const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

    require('pkginfo')(module, 'name');
    const {
        exports: { name: project },
    } = module;

    driver = getBrowserstackDriver(username, accessKey, browser, project);

    debug(`Use ${browser.name.toLowerCase()} browser`);
} else if (process.env.SAUCE) {
    const browser = {
        name: process.env.SELENIUM_BROWSER || 'chrome',
        platform: process.env.SAUCE_PLATFORM || 'Windows 10',
    };
    if (process.env.SAUCE_VERSION) {
        browser.version = process.env.SAUCE_VERSION;
    } else {
        switch (browser.name.toLowerCase()) {
            case Browser.CHROME:
                browser.version = '65';
                break;
            case Browser.FIREFOX:
                browser.version = '58';
                break;
            default:
                throw new Error(
                    `Cannot set default version for browser ${browser.name}`
                );
        }
    }

    const username = process.env.SAUCE_USERNAME;
    const accessKey = process.env.SAUCE_ACCESS_KEY;

    require('pkginfo')(module, 'name');
    const {
        exports: { name: projectName },
    } = module;

    driver = getSauceLabsDriver(username, accessKey, browser, projectName);

    debug(`Use ${browser.name.toLowerCase()} browser`);
} else {
    const binaryPath = process.env.SELENIUM_BROWSER_BINARY_PATH;
    if (!binaryPath) {
        throw new Error(
            `You must provide a browser binary path using "SELENIUM_BROWSER_BINARY_PATH" env var.`
        );
    }
    const browser = process.env.SELENIUM_BROWSER || Browser.FIREFOX;

    const options = {
        binaryPath,
        verbose: !!process.env.VERBOSE_MODE,
    };
    driver = getLocalDriver(browser.toLowerCase(), options);

    debug(`Use ${browser.toLowerCase()} browser`);
}

export default driver;
