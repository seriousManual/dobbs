# dobbs [![Build Status](https://travis-ci.org/zaphod1984/dobbs.png)](https://travis-ci.org/zaphod1984/dobbs)

dobbs is a routesloader for express that is as opinionated as Prime Overseer Joe Dobbs himself.

Utilizes the `furg` Injector to specify dependencies for routes.

````javascript
var express = require('express');
var dobbs = require('dobbs');

var app = express();

var injector = new dobbs.Injector();
injector.register('foo', 'fooValue');

new dobbs.RoutesLoader(path.join(__dirname, './routes'), injector)
    .load()
    .mount(app);
````

Specify a route:
````javascript
var util = require('util');

var dobbs = require('dobbs');
var Route = dobbs.Route;
var MountPoint = dobbs.MountPoint;

function Route1 (foo) {
    Route.call(this);

    this._foo = foo;
}

util.inherits(Route1, Route);

Route1.prototype.mountPoint = function () {
    return new MountPoint('get', '/route1', []);
};

Route1.prototype.route = function (req, res, next) {};

Route1.routeName = 'Route1';

module.exports = Route1;
````

The second route is preceeded by `Route1`:
````javascript
var util = require('util');

var dobbs = require('dobbs');
var Route = dobbs.Route;
var MountPoint = dobbs.MountPoint;

function Route2 (foo) {
    Route.call(this);

    this._foo = foo;
}

util.inherits(Route2, Route);

Route2.prototype.mountPoint = function () {
    return new MountPoint('get', '/route2', ['Route1']);
};

Route2.prototype.route = function (req, res, next) {};

Route2.routeName = 'Route2';

module.exports = Route2;
````