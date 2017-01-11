/**
 * Created by tals on 25/10/15.
 */
'use strict';

angular.module('jobs')
    .factory('JobsFactory',  function($http) {
        var factory = {};
        
        factory.requestServices = function(callback) {
            var dataUrl = '/api/jobs/list';
            $http.get(dataUrl)
                .success(function (result) {
                    callback(null, result);
                }).error(function(err){
                    callback(err);
            });
        };

        factory.requestPage = function(id, callback) {
            var dataUrl = '/api/page/'+id;
            $http.get(dataUrl)
                .success(function (result) {
                    callback(null, result);
                }).error(function(err){
                callback(err);
            });
        };

        factory.submitContact = function(form, callback) {
            var dataUrl = '/api/contactus/send';
            $http.post(dataUrl, form)
                .success(function (result) {
                    callback(null, result);
                }).error(function(err){
                callback(err);
            });
        };

        // factory.requestEvents = function(category, callback) {
        //     var dataUrl = '/api/events?flag=false&category='+category;
        //     $http.get(dataUrl)
        //         .success(function (result) {
        //             callback(null, result);
        //         }).error(function(err){
        //             callback(err);
        //     });
        // };
        //
        // factory.reactivate = function(data, callback) {
        //     var dataUrl = '/api/events?flag=false';
        //     $http.post(dataUrl, data)
        //         .success(function (result) {
        //             callback(null, result);
        //         });
        // };
        
        return factory;
    });