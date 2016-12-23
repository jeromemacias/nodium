import expect from 'expect';
import { By } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../src/driver';
import driverUtilsFactory from '../../src/driver/utils';

const { click, setValue } = driverUtilsFactory(driver);

describe('access to remote servers', () => {
    it('can search from Wikipedia\'s home page', async () => {
        await driver.get('http://en.wikipedia.org');
        await setValue(By.name('search'), 'webdriver');
        await click(By.name('go'));

        expect(await driver.getTitle()).toContain('Selenium (software) - Wikipedia');
    });

    it('can see the example repo on GitHub', async () => {
        await driver.get('http://github.com/gleneivey/mocha-node-webdriver.git');
        const elements = await driver.findElements(By.css('.octicon.octicon-git-pull-request'));

        expect(!!elements.length).toEqual(true);
    });
});
