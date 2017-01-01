'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', '$stateParams', '$location', '$filter', 'Authentication', 'Admin', 'toastr',
  function ($scope, $state, $stateParams ,$location, $filter, Authentication, Admin, toastr) {
    $scope.authentication = Authentication;
    $scope.availableSeats = ['Positive Mobile', 'Ybrant Digital', 'Positive Mobile LATAM', 'Positive Mobile Israel', 'Web3', 'Tabascom', 'Literally','Matomy'];
    $scope.seat = {};


      $scope.buildPager = function () {
          $scope.pagedItems = [];
          $scope.itemsPerPage = 15;
          $scope.currentPage = 1;
          $scope.figureOutItemsToDisplay();
      };

      $scope.figureOutItemsToDisplay = function () {
          $scope.filteredItems = $filter('filter')($scope.users, {
              $: $scope.search
          });
          $scope.filterLength = $scope.filteredItems.length;
          var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
          var end = begin + $scope.itemsPerPage;
          $scope.pagedItems = $scope.filteredItems.slice(begin, end);
      };

      $scope.pageChanged = function () {
          $scope.figureOutItemsToDisplay();
      };

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function () {
      var user = $scope.user;

      $scope.updateUser = user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

      // Invite new User
      $scope.invite = function () {
          var invitation = new Admin({
              to: this.to,
              email: this.email,
              seat: this.seat.selected
          });
          var recipient = this.to;
          // Redirect after save
          $scope.inviteUser = invitation.$save(function (response) {
              $location.path('/admin/users');
              toastr.success('Invitation email to ' + recipient,  'Has been sent successfully');

              // Clear form fields
              $scope.to = '';
              $scope.email = '';
              $scope.seat = '';
          }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
          });
      };


      // Find a list of Users
      $scope.find = function () {
          $scope.loadUsers = Admin.query(function (data) {
              $scope.users = data;
              $scope.buildPager();
          });
      };

      // Find existing User
      $scope.findOne = function () {
          $scope.user = Admin.get({
              userId: $stateParams.userId
          });
      };
  }
]);
