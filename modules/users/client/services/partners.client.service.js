'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users.admin').factory('Partners', ['$resource',
    function ($resource) {
        return $resource('api/partners/:partnerId', {
            partnerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);