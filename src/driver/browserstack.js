import webdriver from 'selenium-webdriver';

export default function getBrowserstackDriver(username, accessKey, browser, project = 'ssw sample test', localIdentifier = 'local', build = 'local', capabilities = {}) {
    // auto detect tunnel name and build depends on travis-ci or circle-ci env var
    if (process.env.TRAVIS_JOB_NUMBER) {
        localIdentifier = process.env.TRAVIS_JOB_NUMBER;
        build = 'Travis #' + process.env.TRAVIS_BUILD_NUMBER;
    }
    if (process.env.CIRCLE_BUILD_NUM) {
        localIdentifier = process.env.CIRCLE_BUILD_NUM;
        build = 'Circle #' + localIdentifier;
    }

    return (new webdriver.Builder()).
        usingServer('http://hub.browserstack.com/wd/hub').
        withCapabilities({
            browserName: browser.name.charAt(0).toUpperCase() + browser.name.slice(1).toLowerCase(),
            os: browser.platform,
            os_version: browser.platformVersion,
            browser_version: browser.version,
            build,
            project,
            'browserstack.user': username,
            'browserstack.key': accessKey,
            'browserstack.local' : 'true',
            'browserstack.localIdentifier' : localIdentifier,
            ...capabilities
        }).
        build();
}
