'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$window', 'Authentication',
  function ($scope, $state, $stateParams, $http, $location, $window, Authentication) {
    $scope.authentication = Authentication;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function () {
      $scope.credentials.token = $stateParams.token;
      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function () {
      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log('klsdfhkljfhasd');
        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        console.log('xxxxxxxxxxxxxxxxx',$scope.credentials);

        $scope.error = response.message;
      });
    };

  }
]);
