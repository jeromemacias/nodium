import request from 'request';

export function postJobUpdate(driver, user, pass, passed) {
    return driver.session_.then(sessionData => {
        return new Promise((resolve, reject) => {
            request(
                {
                    uri: `https://www.browserstack.com/automate/sessions/${
                        sessionData.id_
                    }.json`,
                    method: 'PUT',
                    auth: { user, pass },
                    form: {
                        status: passed ? 'completed' : 'error',
                    },
                },
                function(error, response, body) {
                    if (error) {
                        return reject(error);
                    }

                    request(
                        {
                            uri: `https://www.browserstack.com/automate/sessions/${
                                sessionData.id_
                            }.json`,
                            auth: { user, pass },
                            json: true,
                        },
                        function(error, response, body) {
                            if (error) {
                                return reject(error);
                            }

                            return resolve(
                                `Browserstack results available at ${
                                    body.automation_session.browser_url
                                }`
                            );
                        }
                    );
                }
            );
        });
    });
}
