'use strict';

// Configuring the Demand module
angular.module('jobs').run(['Menus',
    function (Menus) {
        // Add the Demand dropdown item
        Menus.addMenuItem('topbar', {
            type: 'dropdown',
            title: 'משרות',
            state: 'jobs',
            stateHome:'jobs',
            position: 1,
            roles: ['user', 'admin'],
            seats: ['*']
        });

        // Add the dropdown advertisers item
        Menus.addSubMenuItem('topbar', 'jobs', {
            title: 'רשימת משרות',
            state: 'jobs.list',
            roles: ['user', 'admin'],
            seats: ['*']
        });

        // Menus.addSubMenuItem('topbar', 'jobs', {
        //     title: 'Page',
        //     state: 'jobs.page',
        //     roles: ['user', 'admin'],
        //     seats: ['*']
        // });

        // Add the Demand dropdown item
        Menus.addMenuItem('topbar', {
            title: 'קצת עלינו',
            state: 'aboutus',
            stateHome:'aboutus',
            position: 2,
            roles: ['user', 'admin'],
            seats: ['*']
        });

        // Add the Demand dropdown item
        Menus.addMenuItem('topbar', {
            title: 'צור קשר',
            state: 'contactus',
            stateHome:'contactus',
            position: 3,
            roles: ['user', 'admin'],
            seats: ['*']
        });
    }
]);