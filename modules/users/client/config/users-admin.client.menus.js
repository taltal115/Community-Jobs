'use strict';

// Configuring the Admin module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      stateHome:'admin.users',
      position: 7,
      roles: ['admin'],
      seats: ['*']
    });
  }
]);
