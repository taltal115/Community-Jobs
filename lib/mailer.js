/**
 * Module dependencies.
 */
var //ejs              = require('ejs'),
    // templates        = require('./../mailTemplates'),
    nodemailer       = require('nodemailer'),
    smtp             = require('nodemailer-smtp-transport');

// Private
// var _renderTemplate = function(summary, date, mailBody,avatar) {
//     return ejs.render(templates.dailyReport, {
//         data: summary,
//         mailBody: mailBody,
//         date: date,
//         filename: config.appRoot + '/mailTemplates/dailyReport.ejs',
//         avatar:avatar
//     });
// };

// Public
function Mailer() {
    this._transporter = this._transporter = nodemailer.createTransport();
}

Mailer.prototype.send = function(summary,email,callback) {
        var self = this;
        var options = {
            from: 'tals@positivemobile.com',
            to: 'tals@positivemobile.com',
            subject: 'XXXXXXX',
            // html: _renderTemplate(summary, self.date, mailBody,avatar),
            html: '<h1>test email</h1>',
            // attachments: [{path:reportFile }]
        };
        this._transporter.sendMail(options, function(err) {
            if(err) {
                // logger.error('Mail did not sent to: tals');
                console.error('Mail did not sent to: tals');
                callback(err);
            }
            else {
                // logger.info('Mail sent to: tals');
                console.info('Mail sent to: tals');
                callback();
            }
        });

};

module.exports = Mailer;