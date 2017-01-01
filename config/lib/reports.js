'use strict';
/*
 * reports.js
 */
var config = require('../config'),
    elasticsearch = require('elasticsearch'),
    moment = require('moment-timezone'),
    _ = require('lodash');

var client = new elasticsearch.Client(config.reporting);


var getInterval = function (timeLevel) {
    var interval;
    switch(timeLevel) {
        case 'Daily':
            interval = 'day';
            break;
        case 'Hourly':
            interval = 'hour';
            break;
        default:
            interval = 'day';
    }
    return interval;
};

var getIndexes = function (timeLevel, seat, from, to, type, timeZone) {
    if (timeZone !== 'UTC') {
        from.subtract(1,'weeks');
        to.add(1,'weeks');
    }
    var indexes = [];
    var intervalPrefix = 'hourly';
    do {
        indexes.push(seat + '-' + type.toLowerCase() + '-' + intervalPrefix + '-' + from.format('YYYY') + '-' + from.isoWeek().toString());
        from.add(1,'weeks');
    } while (from.year() < to.year() || from.isoWeek() <= to.isoWeek());
    return indexes;
};

var buildReportFilters = function (filters, from, to) {
    var and = [];
    and.push({
        range: {
            date: {
                gte: from.format('YYYY-MM-DD-HH'),
                lte: to.format('YYYY-MM-DD-HH')
            }
        }
    });
    filters.forEach(function(filter) {
        var or = [];
        var termsObj = {terms:{}};
        termsObj.terms[filter.dimension] = [];
        if (filter.operator === 'Equal') {
            filter.values.forEach(function(value) {
                if (value.toString().indexOf('*') >= 0) {
                    var wildcard = {};
                    wildcard[filter.dimension] = value.toString().toLowerCase();
                    or.push({wildcard: wildcard});
                } else {
                    termsObj.terms[filter.dimension].push(value.toString().toLowerCase());
                }
           });
           if (or.length) {
               or.push(termsObj);
           } else {
               and.push(termsObj);
           }
           if (or.length) {
                and.push({or:or});
           }
        }
        if (filter.operator === 'Not equal') {
            filter.values.forEach(function(value) {
                if (value.toString().indexOf('*') >= 0) {
                    var wildcard = {};
                    wildcard[filter.dimension] = value.toString().toLowerCase();
                    and.push({not:{wildcard: wildcard}});
                } else {
                    termsObj.terms[filter.dimension].push(value.toString().toLowerCase());
                }
            });
            if (termsObj.terms[filter.dimension].length) {
                and.push({not:termsObj});
            }
        }
    });
    return and;
};

var buildReportMetrics = function  (metrics) {
    var metricsObj = {};
    metrics.forEach(function (metric) {
        var metricObj = {};
        metricObj[metric.func] = {field: metric.fieldName};
        metricsObj[metric.fieldName] = metricObj;
    });
    return metricsObj;
};

var buildReportAggs = function (dimensions , metrics) {
    if (dimensions.length) {
        var dimension = dimensions[dimensions.length - 1];
        var aggregations = {};
        aggregations[dimension] = { terms :{ field: dimension, size: 0  }, aggregations: buildReportAggs (dimensions.slice(0, dimensions.length-1) , metrics) };
        return aggregations;
    } else {
        var metricsObj = buildReportMetrics(metrics);
        if (_.keys(metricsObj).length){
            return  metricsObj;
        } else {
            return null;
        }
    }
};

var flatten = function (elasticResult,timeZone) {
    var keysBlackList = ['key','key_as_string','doc_count'];
    var result = [];
    var offset = 0;
    if (timeZone !== 'UTC') {
        offset = moment.tz(timeZone).utcOffset();
    }

    var handleBucket = function(bucket,dimension,data) {
        var deepest = false;
        var extendedData = _.clone(data);
        extendedData[dimension] = dimension !== 'date' ? bucket.key : bucket.key_as_string;
        _.keys(bucket).forEach(function(key) {
            if (keysBlackList.indexOf(key) < 0) {
                if (bucket[key].buckets) {
                    bucket[key].buckets.forEach(function (bucket) {
                        handleBucket(bucket,key,extendedData);
                    });
                } else {
                    deepest = true;
                    extendedData[key] = bucket[key].value;
                }
            }
        });
        if (deepest) {
            result.push(extendedData);
        }
    };

    handleBucket(elasticResult.aggregations,null,{});
    return result;
};

var getRange = function (timeFrame,from,to,timeZone) {
    var range = {};
    switch(timeFrame) {
        case 'Custom':
            range.from = moment.tz(from.replace('Z',''),timeZone).startOf('day').utc();
            range.to = moment.tz(to.replace('Z',''),timeZone).endOf('day').utc();
            break;
        case 'Today':
            range.from = moment().tz(timeZone).startOf('day').utc();
            range.to = moment().tz(timeZone).startOf('hour').utc();
            break;
        case 'Yesterday':
            range.from = moment().tz(timeZone).subtract(1,'days').startOf('day').utc();
            range.to = moment().tz(timeZone).subtract(1,'days').endOf('day').startOf('hour').utc();
            break;
        case 'Last 7 days':
            range.from = moment().tz(timeZone).subtract(7,'days').startOf('day').utc();
            range.to = moment().tz(timeZone).startOf('hour').utc();
            break;
        case 'Month to date':
            range.from = moment().tz(timeZone).startOf('month').utc();
            range.to = moment().tz(timeZone).startOf('hour').utc();
            break;
        case 'Last month':
            range.from = moment().tz(timeZone).subtract(1,'month').startOf('month').utc();
            range.to = moment().tz(timeZone).subtract(1,'month').endOf('month').startOf('hour').utc();
            break;
    }
    return range;
};

// Public
var self = module.exports = {

    runReport: function runReport (report, key, callback) {
        var range = getRange(report.timeFrame, report.from, report.to,report.timeZone);
        var aggs;
        if (report.timeLevel !== 'Overall') {
            aggs =  {
                date: {
                    date_histogram: {
                        field: 'date',
                        interval: getInterval(report.timeLevel),
                        time_zone: report.timeZone
                    },
                    aggregations: buildReportAggs(report.dimensions, report.metrics)
                }
            };
        } else {
            aggs = buildReportAggs(report.dimensions, report.metrics);
        }
        var body = {
            query : {
                filtered: {
                    filter: {
                        and: buildReportFilters(report.filters, range.from, range.to, report.timeZone, report.timeFrame)
                    }
                }
            },
            aggregations : aggs
        };
        var indexes = getIndexes(report.timeLevel, report.seat, range.from, range.to, report.type, report.timeZone);
        if (config.reportsDebug) {
            console.log(moment().format() + ' Report request: ' + key + ' indexes: ' + indexes);
            console.log(moment().format() + ' Report request: ' + key + ' body: ' + JSON.stringify(body));
        }
        var start = moment();
        client.search({
            index: indexes,
            ignoreUnavailable:true,
            requestTimeout: 60000,
            type: 'aggr_reports_map_' + report.type.toLowerCase(),
            size:0,
            requestCache:true,
            body: body
        }).then(function (res) {
            if (config.reportsDebug) {
                console.log(moment().format() + ' Report request: ' + key + ' Elastic took: ' + res.took + ' include networking: ' + (new Date().getTime() - start));
            }
            //console.log(res.hits.hits);
            start = new Date().getTime();
            callback(null,flatten(res, report.timeZone),key,start);
        }, function (err) {
            callback(err.message);
        });
    },

    getLastSynced:function (seat, type, callback) {
        var from = moment().utc().startOf('hour');
        var to = moment().utc().endOf('hour');
        var body = {
            aggregations : {
                max_ts : { max : { field : 'ts' } }
            }
        };
        var indexes = getIndexes('Hourly',seat, from, to, type, 'UTC');
        client.search({
            index: indexes,
            ignoreUnavailable:true,
            requestTimeout: 60000,
            type: 'aggr_reports_map_' + type.toLowerCase(),
            size:0,
            requestCache:true,
            body: body
        }).then(function (res) {
            callback(null,res.aggregations.max_ts.value_as_string);
        }, function (err) {
            callback(err.message);
        });
    }

};