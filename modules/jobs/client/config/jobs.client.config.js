'use strict';

// Configuring the Demand module
angular.module('jobs').run(['Menus',
    function (Menus) {
        // Add the Demand dropdown item
        Menus.addMenuItem('topbar', {
            type: 'dropdown',
            title: 'Jobs',
            state: 'jobs',
            stateHome:'jobs',
            position: 4,
            roles: ['user', 'admin'],
            seats: ['*']
        });

        // Add the dropdown advertisers item
        Menus.addSubMenuItem('topbar', 'jobs', {
            title: 'List',
            state: 'jobs.list',
            roles: ['user', 'admin'],
            seats: ['*']
        });

        Menus.addSubMenuItem('topbar', 'jobs', {
            title: 'Page',
            state: 'jobs.page',
            roles: ['user', 'admin'],
            seats: ['*']
        });
    }
]);