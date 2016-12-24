import expect from 'expect';
import { By } from 'selenium-webdriver';
import { describe, it } from 'selenium-webdriver/testing';
import driver from '../../src/driver';
import driverUtilsFactory from '../../src/driver/utils';

const { waitForElementVisible, click, getAttribute } = driverUtilsFactory(driver);

describe('pagination on remote server', () => {
    async function clickNext() {
        await waitForElementVisible(By.css('a.next'));

        return await click(By.css('a.next'));
    }

    it('includes value of echo parameter in response', async () => {
        const echoString = 'please echo this';
        await driver.get('https://www.npmjs.org/browse/updated');
                           // first page, no offset in URL
        await clickNext(); // second page, offset=36         (+36)
        await clickNext(); // third page, offset=79          (+43)
        await clickNext(); // fourth page, offset=118        (+39)
                           // URL for fifth page, offset=156 (+38)

        const nextPageLink = await getAttribute(By.css('a.next'), 'href');
        const offset = nextPageLink.match(/=([0-9]+)$/)[1];

        expect(Number(offset)).toBeGreaterThan(120);
    });
});
