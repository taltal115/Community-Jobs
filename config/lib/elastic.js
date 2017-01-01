'use strict';
/*
 *elastic.js
 */

// Private
var config = require('../config'),
    elasticsearch = require('elasticsearch'),
    moment = require('moment');

// Public
var self = module.exports = {

    getLastTenEvents : function getLastTenEvents(seat, id, mapField, e, callback) {
        var elasticsearchClient = new elasticsearch.Client({host: [config.seats[seat].connection]});
        var queryDSL = {
                "index": config.seats[seat].prefix + '-' + moment().utc().format('YYYY-MM-DD'),
                "type": "videomobile-tracking",
                "body": {
                    "query" : {
                        "filtered" : {
                            "query":   { "match_all": {}},
                            "filter" : {
                                "and": [
                                    {
                                        "term":{"e": e}
                                    },
                                    {
                                        "term":{}
                                    }
                                ]
                            }
                        }
                    },
                    "sort": [
                        { "timestamparrival": { "order": "desc" }}
                    ]
                }
        };
        queryDSL.body.query.filtered.filter.and[1].term[mapField] = id;
        elasticsearchClient.search(queryDSL, function (err, results) {
            if (err) {
                elasticsearchClient.close();
                callback(err);
            } else {
                elasticsearchClient.close();
                callback(null, results.hits.hits);
            }
        });
    }

};