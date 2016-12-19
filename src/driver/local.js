import {
    ServiceBuilder as ChromeServiceBuilder,
    Driver as ChromeDriver,
    Options as ChromeOptions,
} from 'selenium-webdriver/chrome';
import {
    ServiceBuilder as FirefoxServiceBuilder,
    Driver as FirefoxDriver,
    Options as FirefoxOptions,
} from 'selenium-webdriver/firefox';

function getChromeService(binaryPath) {
    const chromeBinary = binaryPath || __dirname + '/../node_modules/webdriver-manager/selenium/chromedriver';

    return new ChromeServiceBuilder(chromeBinary);
}

function getChromeOptions() {
    return new ChromeOptions().addArguments(['--no-sandbox']);
}

function getChromeDriver(binaryPath) {
    return ChromeDriver.createSession(getChromeOptions(), getChromeService(binaryPath).build());
}

function getChromeDriverWithVerboseLogging(binaryPath, logPath) {
    const service = getChromeService(binaryPath)
        .enableVerboseLogging()
        .loggingTo(logPath || __dirname + '/../chromedriver.log')
        .build();

    return ChromeDriver.createSession(getChromeOptions(), service);
}

function getFirefoxService(binaryPath) {
    const firefoxBinary = binaryPath || __dirname + '/../node_modules/webdriver-manager/selenium/geckodriver';

    return new FirefoxServiceBuilder(firefoxBinary);
}

function getFirefoxOptions() {
    return new FirefoxOptions();
}

function getFirefoxDriver(binaryPath) {
    return FirefoxDriver.createSession(getFirefoxOptions(), getFirefoxService(binaryPath).build());
}

function getFirefoxDriverWithVerboseLogging(binaryPath, logPath) {
    const service = getFirefoxService(binaryPath)
        .enableVerboseLogging()
        .build();

    return FirefoxDriver.createSession(getFirefoxOptions(), service);
}

export default function getLocalDriver(browser, { binaryPath, verbose, logPath }) {
    let driver;
    switch (browser) {
    case 'chrome':
        if (verbose) {
            return getChromeDriverWithVerboseLogging(binaryPath, logPath);
        }

        return getChromeDriver(binaryPath);
    case "firefox":
        if (verbose) {
            return getFirefoxDriverWithVerboseLogging(binaryPath, logPath);
        }

        return getFirefoxDriver(binaryPath);
    default: throw new Error(`No local driver found for "${browser}"`);
    }
}
