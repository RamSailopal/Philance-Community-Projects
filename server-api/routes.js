'use strict';

module.exports = function (app) {
    /* eslint-disable global-require */
    app.use('/philance/users', require('./users'));
    app.use('/philance/projects', require('./projects'));
    app.use('/philance/lookups', require('./lookups'));
    app.use('/philance/files', require('./files'));
    // app.use('/philance/notifications', require('./notifications'));
};
