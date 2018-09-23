import request from 'request';

export function postJobUpdate(driver, user, pass, passed) {
    return driver.getSession().then(session => {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `https://saucelabs.com/rest/v1/${user}/jobs/${session.getId()}`,
                    method: 'PUT',
                    auth: { user, pass },
                    json: { passed },
                },
                function(error, response, body) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(
                        `SauceLabs results available at https://saucelabs.com/beta/tests/${session.getId()}`
                    );
                }
            );
        });
    });
}
