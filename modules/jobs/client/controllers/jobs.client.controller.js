'use strict';

// Alerts controller
angular.module('jobs')
    .controller('JobsController', ['$scope', '$stateParams', '$location', '$state', '$filter', 'Authentication', 'JobsFactory', 'toastr',
    function ($scope, $stateParams, $location, $state, $filter, Authentication, JobsFactory, toastr) {
        $scope.authentication = Authentication;
        $scope.sorter = ['-displayName'];
        $scope.selectedItemsPerPage = 10;
        $scope.sorterStates = {
            displayName:2,
            profession : 0,
            email : 0,
            age: 0
        };
        $scope.search='';

        $scope.getList = function() {
            JobsFactory.requestServices(function(err, res){
                if(err) {
                    console.error(err);
                } else {
                    console.log(res);
                    $scope.users = res;
                    $scope.buildPager();
                }
            });
        };

        $scope.goToJobPage = function(user) {
            $location.path('/jobs/page/'+user._id);
            // $state.go("page", { id: user._id });

            console.log(user);
            // JobsFactory.requestServices(function(err, res) {
            //     if(err) {
            //         console.error(err);
            //     } else {
            //         console.log(res);
            //         $scope.users = res;
            //         $scope.buildPager();
            //     }
            // });
        };

        $scope.showAlert = function(ev) {
            $scope.usersXX = ev;

            console.log("$scope.usersXX$scope.usersXX$scope.usersXX: ",ev);
            // $mdDialog.show({
            //     controller: DialogController,
            //     contentElement: '#myDialog',
            //     parent: angular.element(document.body),
            //     targetEvent: ev,
            //     clickOutsideToClose: true
            // });
        };
        
        $scope.buildPager = function () {
            $scope.pagedItems = [];
            $scope.itemsPerPage = $scope.selectedItemsPerPage;
            $scope.currentPage = 1;
            $scope.figureOutItemsToDisplay();
        };
        
        $scope.figureOutItemsToDisplay = function () {
            $scope.filteredItems = $filter('filter')($scope.users, {
                $: $scope.search
            });
            $scope.orderedItems = $filter('orderBy')($scope.filteredItems, $scope.sorter);
            $scope.filterLength = $scope.filteredItems.length;
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;
            $scope.pagedItems = $scope.orderedItems.slice(begin, end);
        };

        $scope.pageChanged = function () {
            $scope.figureOutItemsToDisplay();
        };

        $scope.setSorter = function (colName, field) {
            if ($scope.sorterStates[colName] === 0) {
                $scope.sorter.push(field);
                $scope.sorterStates[colName] = 1;
            } else if ($scope.sorterStates[colName] === 1) {
                $scope.sorter[$scope.sorter.indexOf(field)] = '-' + field;
                $scope.sorterStates[colName] = 2;
            } else {
                $scope.sorter.splice($scope.sorter.indexOf('-' + field), 1);
                $scope.sorterStates[colName] = 0;
            }
            $scope.figureOutItemsToDisplay();
        };
    }
]);