# dobbs [![Build Status](https://travis-ci.org/zaphod1984/dobbs.png)](https://travis-ci.org/zaphod1984/dobbs)

dobbs is a routesloader for express that is as opinionated as Prime Overseer Joe Dobbs himself.

Utilizes the `furg` Injector to specify dependencies for routes.

````
var express = require('express');
var dobbs = require('dobbs');

var app = express();

var injector = new dobbs.Injector();
injector.register('foo', 'fooValue');

new dobbs.RoutesLoader(path.join(__dirname, './routes'), injector)
    .load()
    .mount(app);
````

