import request from 'request';
import http from 'http';
import https from 'https';

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

export function enableFastSelenium() {
    var keepAliveTimeout = 30 * 1000;

    if (http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
        http.globalAgent.keepAlive = true;
        https.globalAgent.keepAlive = true;
        http.globalAgent.keepAliveMsecs = keepAliveTimeout;
        https.globalAgent.keepAliveMsecs = keepAliveTimeout;
    } else {
        var agent = new http.Agent({
            keepAlive: true,
            keepAliveMsecs: keepAliveTimeout,
        });

        var secureAgent = new https.Agent({
            keepAlive: true,
            keepAliveMsecs: keepAliveTimeout,
        });

        var httpRequest = http.request;
        var httpsRequest = https.request;

        http.request = function(options, callback) {
            if (options.protocol == 'https:') {
                options['agent'] = secureAgent;
                return httpsRequest(options, callback);
            } else {
                options['agent'] = agent;
                return httpRequest(options, callback);
            }
        };
    }
}
