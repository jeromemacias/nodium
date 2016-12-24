import expect from 'expect';
import webdriver from 'selenium-webdriver';
import { describe, before, it, after } from 'selenium-webdriver/testing';
import driver from '../../src/driver';

describe('operation GET /api', () => {
    before(function () {
        this.server.get('/api', (req, res) => {
            return res.json({ message: 'Welcome' });
        });
    });

    it('includes api json in response', async () => {
        await driver.get('http://localhost:3030/api');
        const source = await driver.getPageSource();

        return expect(source).toContain('"message": "Welcome"');
    });

    after(function () {
        this.server.reset();
    });
});
