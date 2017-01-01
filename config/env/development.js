'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: 'mongodb://localhost/copy-dev',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'dev',
        // Stream defaults to process.stdout
        // Uncomment to enable logging to a log on the file system
        options: {
            //stream: 'access.log'
        }
    },
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    mailer: {
        from: 'Copy UI DEV <copy@copy.com>'
    },
    livereload: true,
    seedDB: process.env.MONGO_SEED || false,
    reportsDebug: true

};