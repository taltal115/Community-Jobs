'use strict';

angular.module('users').controller('PartnerInviteController', ['$scope','$modalInstance','title', 'to', 'availableItems', 'modelName', 'number',
    function ($scope, $modalInstance, title, to, availableItems, modelName, number) {
        $scope.role = 'publisher_CPM';
        $scope.to = to;
        $scope.title = title;
        $scope.modelName = modelName;
        $scope.number = number;
        $scope.availableItems = availableItems;
        $scope.selections = {};
        $scope.selections.items = availableItems.map(function(availableItem) { return availableItem._id;});

        $scope.save = function () {
            var invitation = {};
            invitation.to = $scope.to;
            invitation.items = $scope.selections.items;
            invitation.email = $scope.email;
            invitation.role = $scope.role;
            $modalInstance.close(invitation);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

    }
]);
