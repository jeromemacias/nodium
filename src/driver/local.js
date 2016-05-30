import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';

function getChromeService(binaryPath) {
    const chromeBinary = binaryPath || __dirname + '/../node_modules/webdriver-manager/selenium/chromedriver';

    return (new chrome.ServiceBuilder(chromeBinary)).build();
}

function getChromeOptions() {
    return new chrome.Options().addArguments(['--no-sandbox']);
}

function getChromeDriver(binaryPath) {
    return new chrome.Driver(getChromeOptions(), getChromeService(binaryPath));
}

function getChromeDriverWithVerboseLogging(filePath) {
    const service = getChromeService()
        .enableVerboseLogging()
        .loggingTo(filePath || __dirname + '/../chromedriver.log')
        .build();

    return new chrome.Driver(getChromeOptions(), service);
}

function getFirefoxDriver() {
    return new firefox.Driver();
}

export default function getLocalDriver(browser, options = {}) {
    switch (browser) {
    case 'chrome':
        if (options.verbose) {
            return getChromeDriverWithVerboseLogging(options.logPath)
        }
        return getChromeDriver(options.binaryPath);
    case "firefox":
        return getFirefoxDriver();
    default: throw new Error(`No local driver found for "${browser}"`);
    }
}
