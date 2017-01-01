'use strict';

// Setting up route
angular.module('jobs').config(['$stateProvider',
    function ($stateProvider) {
        // Demand state routing
        $stateProvider
            .state('jobs', {
                abstract: true,
                url: '/jobs',
                template: '<ui-view/>',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('jobs.list', {
                url: '/list',
                templateUrl: 'modules/jobs/client/views/list.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('jobs.page', {
                url: '/page/:id',
                templateUrl: 'modules/jobs/client/views/page.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
]);