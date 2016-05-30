import pm2 from 'pm2';

export function pm2start(name, config = {}, callback = () => {}) {
    pm2.connect(err => {
        if (err) {
            callback(err);
            return;
        }

        pm2.start({
            name: name,
            ...config
        }, (err, apps) => {
            pm2.disconnect();
            callback(err);
        });
    });
}

export function pm2stop(name, callback) {
    pm2.connect(err => {
        if (err) {
            callback(err);
            return;
        }

        pm2.delete(name, () => {
            pm2.disconnect();
            callback();
        });
    });
}
