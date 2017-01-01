/**
 * Created by tals on 24/02/16.
 */

'use strict';

var _         = require('lodash'),
    path      = require('path'),
    moment    = require('moment-timezone'),
    request   = require('request'),
    config    = require('./../../../../config/config');

function setSeatName(seat) {
    var seatName;
    switch(seat) {
        case 'Positive Mobile':
            seatName = 'pm';
            break;
        case 'Positive Mobile LATAM':
            seatName = 'pml';
            break;
        default:
            seatName = '';
    }
    return seatName;
}

function apiRequest(url, method, formData, callback) {
    var options = {
        url: url,
        headers: {'Authorization': 'token='+config.alertsApi.token},
        method: method,
        form: formData
    };
    request(options, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            callback(null, body);
        } else {
            callback(error);
        }
    });
}

exports.getAlertsPerSeat = function (req, res) {
    var url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/jobs';
    apiRequest(url,'GET',null,function(err, result){
        if(err) {
            res.status(400).send({message: err});
        } else {
            try {
                res.json(JSON.parse(result));
            } catch(err) {
                res.json({error: 'Error getting jobs per seat.'});
            }
        }
    });
};

exports.getEvents = function (req, res) {
    var url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/events?flag='+req.query.flag+'&category='+req.query.category;
    apiRequest(url,'GET',null,function(err, result){
        if(err) {
            res.status(400).send({message: err});
        } else {
            try {
                res.json(JSON.parse(result));
            } catch(err) {
                res.json({error: 'Error getting events per seat.'});
            }
        }
    });
};

exports.updateEvents = function (req, res) {
    var url = '';
    if(req.body && req.body['programmatic-demand'] || req.body['programmatic-supply'] || req.body.direct) {
        url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/event/category/activate_all';
        var form = { categoryData: req.body };
        apiRequest(url,'POST',form,function(err, result){
            if(err) {
                res.status(400).send({message: err});
            } else {
                res.send(result);
            }
        });
    } else {
        url = 'http://'+config.alertsApi.host+':'+config.alertsApi.port+'/api/seat/'+setSeatName(req.user.seat)+'/event/'+req.body._id+'/activate?manual=true';
        apiRequest(url,'POST',null,function(err, result){
            if(err) {
                res.status(400).send({message: err});
            } else {
                res.send(result);
            }
        });
    }
};

