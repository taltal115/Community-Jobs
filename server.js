'use strict';


if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();
