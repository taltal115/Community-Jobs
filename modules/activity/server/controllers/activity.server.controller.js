'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    Activity = mongoose.model('Activity');


/**
 * Show the current activity
 */
exports.read = function (req, res) {
    res.json(req.activity);
};


/**
 * List of Activities
 */
exports.list = function (req, res) {
    Activity.find({seat: req.user.seat || ''})
        .populate('user')
        .sort({'timestamp': -1})
        .limit(500)
        .exec(function (err, activities) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(activities);
        }
    });
};

/**
 * Activity middleware
 */
exports.activityByID = function (req, res, next, id) {
    if (!req.user) {
        return res.status(401).json({
            message: 'User is not authorized'
        });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Activity is invalid'
        });
    }

    Activity.findById(id).exec(function (err, activity) {
        if (err) {
            return next(err);
        } else if (!activity || (req.user && activity.seat !== req.user.seat)) {
            return res.status(404).send({
                message: 'No activity with that identifier has been found'
            });
        }
        req.activity = activity;
        next();
    });
};
