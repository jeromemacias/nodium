import request from 'request';

export function postJobUpdate(driver, user, pass, passed, callback) {
    driver.getSession().then(session => {
        request({
            url: `https://saucelabs.com/rest/v1/${user}/jobs/${session.getId()}`,
            method: 'PUT',
            auth: { user, pass },
            json: { passed }
        }, function (error, response, body) {
            if (error) {
                return callback(error);
            }
            console.log(`SauceLabs results available at https://saucelabs.com/beta/tests/${session.getId()}`);
            callback();
        });
    });
}
