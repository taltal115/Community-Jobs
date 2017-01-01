'use strict';

angular.module('core').controller('ModalController', ['$scope','$modalInstance','content',
    function ($scope, $modalInstance, content) {

        $scope.content = content;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

    }
]);