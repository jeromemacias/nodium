import jsonServer from 'json-server';

export function jsonServerStart(defaults = {}, port = 3030) {
    defaults.logger = false;

    const server = jsonServer.create();
    server.use(jsonServer.bodyParser);
    server.use(jsonServer.defaults(defaults));

    const defaultRoute = server._router.stack.slice();

    server.reset = function () {
        server._router.stack = defaultRoute.slice();
    };

    server.listen(port);

    return server;
}
