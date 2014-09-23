var util = require('util');

var Route = require('../../../lib/Route');
var MountPoint = require('../../../lib/MountPoint');

function Route1 () {
    Route.call(this);
}

util.inherits(Route1, Route);

Route1.prototype.mountPoint = function () {
    return new MountPoint('get', '/route1', []);
};

Route1.prototype.route = function (req, res, next) {};

Route1.routeName = 'fooRoute';

module.exports = Route1;