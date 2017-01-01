'use strict';

// Alerts controller
angular.module('jobs').controller('PageCtrl', ['$scope', '$stateParams', 'JobsFactory', '$location', '$state', '$filter', 'Authentication', 'toastr',
    function ($scope, $stateParams, JobsFactory, $location, $state, $filter, Authentication, toastr) {
        $scope.initUser = function() {
            console.log("$stateParams: v ",$stateParams);
            console.log("$location: v ",$location);
            var id = $stateParams.id;
            JobsFactory.requestPage(id, function(err, res){
                console.log("res: v ",res[0]);
                $scope.userObj = res[0];
            });
        };

        // $scope.goToPerson = function(person, event) {
        //     $mdDialog.show(
        //         $mdDialog.alert()
        //             .title('Navigating')
        //             .textContent('Inspect ' + person)
        //             .ariaLabel('Person inspect demo')
        //             .ok('Neat!')
        //             .targetEvent(event)
        //     );
        // };
    }
]).config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
        .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});