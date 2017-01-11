'use strict';

/**
 * Module dependencies.
 */
var Jobs = require('../controllers/jobs.server.controller.js'),
    JobsPolicy = require('../policies/jobs.server.policy.js');

module.exports = function (app) {

    app.route('/api/jobs/list').all(JobsPolicy.isAllowed)
        .get(Jobs.getList);
        // .post(Services.bulkInsert);

    app.route('/api/page/:id').all(JobsPolicy.isAllowed)
        .get(Jobs.getUserPage);
    
    app.route('/api/contactus/send').all(JobsPolicy.isAllowed)
        .post(Jobs.contactus);
    
    // app.route('/api/jobs/page').all(JobsPolicy.isAllowed)
    //     .get(Jobs.getList);
    // // .post(Services.bulkInsert);
};