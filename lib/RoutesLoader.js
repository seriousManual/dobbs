var path = require('path');
var fs = require('fs');

var Route = require('./Route');

function RoutesLoader (baseDir, injector) {
    this._baseDir = baseDir;
    this._injector = injector;
    this._routes = {};
}

RoutesLoader.prototype.load = function () {
    var that = this;

    fs
        .readdirSync(this._baseDir)
        .forEach(function (file) {
            var route = require(path.join(that._baseDir, file));

            var routeInstance = that._injector.equip(route);

            if (!route.routeName) {
                throw new Error('route has no unique identifier');
            }

            that.addRoute(route.routeName, routeInstance);
        });

    return this;
};

RoutesLoader.prototype.mount = function (app) {
    var that = this;

    Object.keys(this._routes).forEach(function (routeKey) {
        var route = that._routes[routeKey];
        var mountPoint = route.mountPoint();

        var mountParameters = [mountPoint.path()];

        mountPoint.predecessors().forEach(function (predKey) {
            var routePredecessor = that.getRoute(predKey);
            if (routePredecessor) {
                return mountParameters.push(routePredecessor.route.bind(routePredecessor));
            }

            try {
                return mountParameters.push(that._injector.create(predKey));
            } catch (error) {
            }

            throw new Error('could not load predecessor: ' + predKey)
        });

        mountParameters.push(route.route.bind(route));

        app[mountPoint.method()].apply(app, mountParameters);
    });

    return this;
};

RoutesLoader.prototype.addRoute = function (key, route) {
    if (!(route instanceof Route)) {
        throw new Error('route has to inherit from Route: ' + key);
    }

    if (this._routes[key]) {
        throw new Error('route already exists: ' + key);
    }

    this._routes[key] = route;
};

RoutesLoader.prototype.getRoute = function (key) {
    return this._routes[key] || null;
};

module.exports = RoutesLoader;