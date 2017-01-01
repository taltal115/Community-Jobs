'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        enum: ['Create', 'Update', 'Delete', 'Link', 'Unlink', 'Waterfall update']
    },
    description: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    username: {
        type: String
    },
    userDisplayName: {
        type: String
    },
    model1: {
        type: String
    },
    entityName1: {
        type: String
    },
    entityNumber1 :{
        type: Number
    },
    entityId1: {
        type: Schema.ObjectId
    },
    model2: {
        type: String
    },
    entityName2: {
        type: String
    },
    entityNumber2 :{
        type: Number
    },
    entityId2: {
        type: Schema.ObjectId
    },
    seat: {
        type: String
    }
});

/**
 * Hook a pre save method to set advertiserId
 */
ActivitySchema.pre('save', function (next) {
    var doc = this;
    if (doc.action === 'Create') {
        doc.description = doc.userDisplayName + ' has created new ' + doc.model1 + ': ' + doc.entityName1;
    } else if (doc.action === 'Update') {
        doc.description = doc.userDisplayName + ' has updated ' + doc.model1 + ': ' + doc.entityName1;
    } else if (doc.action === 'Delete') {
        doc.description = doc.userDisplayName + ' has deleted ' + doc.model1 + ': ' + doc.entityName1;
    } else if (doc.action === 'Link') {
        doc.description = doc.userDisplayName + ' has linked ' + doc.model1 + ': ' + doc.entityName1 + ' to ' + doc.model2 + ': ' + doc.entityName2;
    } else if (doc.action === 'Unlink') {
        doc.description = doc.userDisplayName + ' has unlinked ' + doc.model1 + ': ' + doc.entityName1 + ' from ' + doc.model2 + ': ' + doc.entityName2;
    } else if (doc.action === 'Waterfall update') {
        doc.description = doc.userDisplayName + ' has updated waterfall ' + doc.model1 + ': ' + doc.entityName1;
    }
    next();
});

mongoose.model('Activity', ActivitySchema);