'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * NumberFactory Schema
 */
var NumberFactorySchema = new Schema({
    model: {
        type: String
    },
    seat: {
        type:String
    },
    nextNumber: {
        type: Number
    }
});

mongoose.model('NumberFactory', NumberFactorySchema);