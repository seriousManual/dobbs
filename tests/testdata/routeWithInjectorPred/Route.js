var util = require('util');

var Route = require('../../../lib/Route');
var MountPoint = require('../../../lib/MountPoint');

function GnaRoute () {
    Route.call(this);
}

util.inherits(GnaRoute, Route);

GnaRoute.prototype.mountPoint = function () {
    return new MountPoint('get', '/route1', ['gna']);
};

GnaRoute.prototype.route = function (req, res, next) {
};

GnaRoute.prototype.route.bind = function () {
    return 'gnaRoute';
};

GnaRoute.routeName = 'gnaRoute';

module.exports = GnaRoute;