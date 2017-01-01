'use strict';

/**
 * Module dependencies.
 */
var partnersPolicy = require('../policies/partners.server.policy'),
    partners = require('../controllers/partners.server.controller');

module.exports = function (app) {

    // Users collection routes
    app.route('/api/partners')
        .get(partnersPolicy.isAllowed, partners.list)
        .post(partnersPolicy.isAllowed, partners.invite);

    // Single user routes
    app.route('/api/partners/:partnerId')
        .get(partnersPolicy.isAllowed, partners.read)
        .put(partnersPolicy.isAllowed, partners.update)
        .delete(partnersPolicy.isAllowed, partners.delete);

    // Finish by binding the user middleware
    app.param('partnerId', partners.partnerByID);
};