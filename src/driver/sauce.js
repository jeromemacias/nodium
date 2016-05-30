import webdriver from 'selenium-webdriver';

export default function getSauceLabsDriver(username, accessKey, browser, projectName = 'ssw sample test', tunnelName = 'local', build = 'local-0', capabilities = {}) {
    // auto detect tunnel name and build depends on travis-ci or circle-ci env var
    if (process.env.TRAVIS_JOB_NUMBER) {
        tunnelName = process.env.TRAVIS_JOB_NUMBER;
        build = 'travis-' + process.env.TRAVIS_BUILD_NUMBER;
    }
    if (process.env.CIRCLE_BUILD_NUM) {
        tunnelName = process.env.CIRCLE_BUILD_NUM;
        build = 'circle-' + tunnelName;
    }

    return (new webdriver.Builder()).
        usingServer('http://ondemand.saucelabs.com:80/wd/hub').
        withCapabilities({
            browserName: browser.name.charAt(0).toUpperCase() + browser.name.slice(1).toLowerCase(),
            platform: browser.platform,
            version: browser.version,
            name: projectName,
            build,
            username,
            accessKey,
            'tunnel-identifier': tunnelName,
            ...capabilities
        }).
        build();
}
