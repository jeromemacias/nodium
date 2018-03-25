import expect from 'expect';
import { By, error } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../src/driver';
import driverUtilsFactory from '../../src/driver/utils';

const { waitForElementVisible, click, getAttribute } = driverUtilsFactory(driver);

describe('pagination on remote server', () => {
    async function clickNext() {
        await waitForElementVisible(By.linkText('Next Page', 5000));

        return click(By.linkText('Next Page'));
    }

    it('should throw error on waitForElementVisible timeout', async () => {
        const { TimeoutError } = error;
        await driver.get('https://www.npmjs.org/');
        
        await waitForElementVisible(By.css('unexistant'), 1000).catch(e => {
            expect(e instanceof TimeoutError).toBe(true);
        });
    });

    it('includes value of echo parameter in response', async () => {
        const echoString = 'please echo this';
        await driver.get('https://www.npmjs.org/browse/updated');
                           // first page, no offset in URL
        await clickNext(); // second page, offset=36         (+36)
        await clickNext(); // third page, offset=79          (+43)
        await clickNext(); // fourth page, offset=118        (+39)
                           // URL for fifth page, offset=156 (+38)

        const nextPageLink = await getAttribute(By.linkText('Next Page'), 'href');
        const offset = nextPageLink.match(/=([0-9]+)$/)[1];

        expect(Number(offset)).toBeGreaterThan(120);
    });
});
