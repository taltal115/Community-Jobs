'use strict';

// Alerts controller
angular.module('jobs')
    .controller('ContactUsController', ['$scope', '$stateParams', '$location', '$state', '$filter', 'Authentication', 'JobsFactory', 'toastr','$mdDialog',
        function ($scope, $stateParams, $location, $state, $filter, Authentication, JobsFactory, toastr, $mdDialog) {
            $scope.user = {
                
            };

            $scope._submitContact = function(){
                console.log($scope.user);
                JobsFactory.submitContact($scope.user, function(err, res){
                    if(err) {
                        // toastr.
                        console.error(err);
                    } else {
                        console.log(toastr);
                        console.log(res);
                    }
                });
            };

        }
    ]);

