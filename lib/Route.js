function Route() {

}

Route.prototype.mountPoint = function() {
    throw new Error('mountPoint method not implemented');
};

Route.prototype.route = function() {
    throw new Error('route method is not implemented');
};

module.exports = Route;