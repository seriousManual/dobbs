var MountPoint = require('../../../lib/MountPoint');

function Route1 () {}

Route1.prototype.mountPoint = function () {
    return new MountPoint('get', '/route1', ['perkins']);
};

Route1.prototype.route = function (req, res, next) {

};

Route1.prototype.route.bind = function (req, res, next) {
    return 'route to route1';
};

Route1.routeName = 'Route1';

module.exports = Route1;