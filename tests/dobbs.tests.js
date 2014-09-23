var path = require('path');

var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var dobbs = require('../dobbs');

function createAppMock () {
    return {
        get: sinon.spy()
    };
}

describe('routing', function () {
    describe('loadRoutes', function () {
        var i, appMock, rl;

        before(function () {
            i = new dobbs.Injector();
            i.register('foo', 'fooValue');
            i.register('bar', 'barValue');
            appMock = createAppMock();

            rl = new dobbs.RoutesLoader(path.join(__dirname, './testdata/routes'), i)
                .load()
                .mount(appMock);
        });

        it('should mount the route', function () {
            expect(appMock.get).to.be.calledWithExactly('/route2', 'route to route1', 'route to route2');
            expect(appMock.get).to.be.calledWithExactly('/route1', 'route to route1');
        });

        it('should have the correct dependencies injected', function () {
            expect(rl._routes.Route1._foo).to.equal('fooValue');
            expect(rl._routes.Route2._bar).to.equal('barValue');
        });
    });

    describe('loadRoutes route is not a Route', function () {
        var i, appMock, rl;

        before(function () {
            i = new dobbs.Injector();
            appMock = createAppMock();

            rl = new dobbs.RoutesLoader(path.join(__dirname, './testdata/routeNotInstance'), i);
        });

        it('should throw on unmet dependency', function () {
            expect(function () {
                rl.load();
            }).to.throw('route has to inherit from Route: Route1');
        });
    });

    describe('loadRoutes /w damaged dependencies', function () {
        var i, appMock, rl;

        before(function () {
            i = new dobbs.Injector();
            appMock = createAppMock();

            rl = new dobbs.RoutesLoader(path.join(__dirname, './testdata/routes'), i);
        });

        it('should throw on unmet dependency', function () {
            expect(function () {
                rl.load();
            }).to.throw('unmet dependency: foo');
        });
    });

    describe('loadRoutes with predecessor error', function () {
        var i, appMock, rl;

        before(function () {
            i = new dobbs.Injector();
            i.register('foo', 'fooValue');
            i.register('bar', 'barValue');
            appMock = createAppMock();
            rl = new dobbs.RoutesLoader(path.join(__dirname, './testdata/routesFaulty'), i)
                .load();
        });

        it('should throw if predecessor is not found', function () {
            expect(function () {
                rl.mount(appMock);
            }).to.throw('could not load predecessor: perkins');
        });
    });

    describe('loadRoutes without routename', function () {
        it('should throw if unique identifier is not set', function () {
            expect(function () {
                new dobbs.RoutesLoader(path.join(__dirname, './testdata/routesNoName'), new dobbs.Injector()).load();
            }).to.throw('route has no unique identifier');
        });
    });

    describe('loadRoutes with non unique names', function () {
        it('should throw if route is non unique', function () {
            expect(function () {
                new dobbs.RoutesLoader(path.join(__dirname, './testdata/routesNonUnique'), new dobbs.Injector()).load();
            }).to.throw('route already exists: fooRoute');
        });
    });
});