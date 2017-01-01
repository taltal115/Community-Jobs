'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Invitation = mongoose.model('Invitation'),
  nodemailer = require('nodemailer'),
  async = require('async'),
  crypto = require('crypto'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));



var smtpTransport = nodemailer.createTransport();
/**
 * Invite user to use the app
 */

exports.invite = function (req, res, next) {
    async.waterfall([
        // Generate random token
        function (done) {
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Create invitation in DB
        function (token, done) {
            var invitation = new Invitation(req.body);
            invitation.token = token;
            invitation.roles = ['user'];
            invitation.isPartner = false;

            invitation.save(function (err) {
                if (err) {
                     return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    done (null, invitation);
                }
            });

        },
        function (invitation, done) {
            res.render(path.resolve('modules/users/server/templates/invite-user'), {
                recipient: invitation.to,
                userDisplayName: req.user.displayName,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/authentication/signup/' + invitation.token
            }, function (err, emailHTML) {
                done(err, emailHTML, invitation);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, invitation, done) {
            var mailOptions = {
                to: invitation.email,
                from: config.mailer.from,
                subject: 'Invitation to join ' + config.app.title,
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                if (!err) {
                    res.send({
                        message: 'An invitation email has been sent.'
                    });
                } else {
                    return res.status(400).send({
                        message: 'Failure sending email'
                    });
                }

                done(err);
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
    });
};


/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.seat = req.body.seat;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({ $or:[{isPartner:false},{isPartner:null}]}, '-salt -password').sort('-created').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
    if (!req.user) {
        return res.status(401).json({
            message: 'User is not authorized'
        });
    }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
