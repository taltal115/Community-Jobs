'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * orientJob Schema
 */
var orientJobSchema = new Schema({
    action: {
        type: String
    },
    data: {
        type: String
    },
    created:{
        type:Date,
        default:Date.now
    }
});

orientJobSchema.index({ created: 1});

mongoose.model('OrientJob', orientJobSchema);