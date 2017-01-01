'use strict';

/**
 * Module dependencies.
 */
var ActivityPolicy = require('../policies/activity.server.policy'),
    Activities = require('../controllers/activity.server.controller');

module.exports = function (app) {
    // Activities collection routes
    app.route('/api/activities').all(ActivityPolicy.isAllowed)
        .get(Activities.list);

    // Single activity routes
    app.route('/api/activities/:activityId').all(ActivityPolicy.isAllowed)
        .get(Activities.read);

    // Finish by binding the activity middleware
    app.param('activityId', Activities.activityByID);
};