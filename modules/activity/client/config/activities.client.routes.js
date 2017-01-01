'use strict';

// Setting up route
angular.module('activities').config(['$stateProvider',
    function ($stateProvider) {
        // activities state routing
        $stateProvider
            .state('activities', {
                abstract: true,
                url: '',
                template: '<ui-view/>',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('activities.activities', {
                url: '/activities',
                templateUrl: 'modules/activity/client/views/activities.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
]);