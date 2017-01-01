'use strict';

angular.module('users').controller('PartnerEditController', ['$scope','$modalInstance','availableItems', 'modelName', 'number', 'items',
  function ($scope, $modalInstance, availableItems, modelName, number, items) {
    $scope.modelName = modelName;
    $scope.number = number;
    $scope.availableItems = availableItems;
    $scope.selections = {};
    $scope.selections.items = items;
    $scope.save = function () {
      var uniqueItems = [];
      var newItems = $scope.selections.items.filter(function(item) {
        if (uniqueItems.indexOf(item._id) >= 0) {
          return false;
        } else {
          uniqueItems.push(item._id);
          return true;
        }
      });
      console.log(newItems);
      $modalInstance.close(newItems);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }
]);