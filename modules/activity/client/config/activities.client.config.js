'use strict';

// Configuring the Activities module
angular.module('activities').run(['Menus',
    function (Menus) {
        // Add the Activity menu item
        Menus.addMenuItem('topbar', {
            title: 'Activity log',
            state: 'activities',
            stateHome: 'activities.activities',
            position: 6,
            roles: ['user', 'admin'],
            seats: ['*']
        });
    }
]);