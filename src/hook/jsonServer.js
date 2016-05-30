export function jsonServerStart(defaults = {}, port = 3030) {
    const server = jsonServer.create();
    server.use(bodyParser.json());
    server.use(jsonServer.defaults(defaults));

    const defaultRoute = server._router.stack.slice();

    server.reset = function () {
        server._router.stack = defaultRoute.slice();
    };

    server.listen(port);

    return server;
}
