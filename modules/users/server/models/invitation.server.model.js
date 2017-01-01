'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');


/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return (validator.isEmail(email));
};

var validateDeals = function (deals) {
    if (this.isPartner && this.advertiser) {
        return (deals && deals.length);
    } else {
        return true;
    }
};

var validateTags = function (tags) {
    if (this.isPartner && this.publisher) {
        return (tags && tags.length);
    } else {
        return true;
    }
};

/**
 * Invitation Schema
 */
var InvitationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    to: {
        type: String,
        required: 'Please fill in Recipient Name'
    },
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    seat: {
        type: String,
        trim: true,
        required: 'Please fill in a seat Name'
    },
    token: {
        type: String
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin', 'advertiser', 'publisher','publisher_CPM','publisher_CPV']
        }]
    },
    publisher: {
        type:Schema.ObjectId,
        ref: 'Publisher'
    },
    advertiser: {
        type:Schema.ObjectId,
        ref: 'Advertiser'
    },
    deals:{
        type:[{
            type:Schema.ObjectId,
            ref: 'Deal'
        }],
        validate: [validateDeals, 'Please provide allowed deals']
    },
    tags: {
        type: [{
            type:Schema.ObjectId,
            ref: 'Tag'
        }],
        validate: [validateTags, 'Please provide allowed deals']
    },
    isPartner: {
        type: Boolean
    }
});

mongoose.model('Invitation', InvitationSchema);