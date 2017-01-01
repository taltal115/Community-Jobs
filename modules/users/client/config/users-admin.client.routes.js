'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
     .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
            roles: ['admin']
        }
       })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/user-list.client.view.html',
        data: {
            roles: ['admin']
        }
      })
       .state('admin.user-invite', {
        url: '/users/invite',
        templateUrl: 'modules/users/client/views/admin/user-invite.client.view.html',
        data: {
            roles: ['admin']
        }
        })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/user.client.view.html',
        data: {
            roles: ['admin']
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/user-edit.client.view.html',
        data: {
            roles: ['admin']
        }
      });
  }
]);
