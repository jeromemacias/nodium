import request from 'request';

export function postJobUpdate(driver, user, pass, passed, callback) {
    driver.session_.then(function(sessionData) {
        request({
            uri: `https://www.browserstack.com/automate/sessions/${sessionData.id_}.json`,
            method: 'PUT',
            auth: { user, pass },
            form: {
                'status': passed ? 'completed' : 'error'
            }
        }, function (error, response, body) {
            if (error) {
                return callback(error);
            }
            request({
                uri: `https://www.browserstack.com/automate/sessions/${sessionData.id_}.json`,
                auth: { user, pass },
                json: true
            }, function (error, response, body) {
                if (error) {
                    return callback(error);
                }
                console.log(`Browserstack results available at ${body.automation_session.browser_url}`);
                callback();
            });
        });
    });
}
