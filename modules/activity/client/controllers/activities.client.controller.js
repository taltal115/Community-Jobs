'use strict';

// activities controller
angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', '$state', '$filter', 'Authentication', 'Activities',
    function ($scope, $stateParams, $location, $state, $filter, Authentication, Activities) {
        $scope.authentication = Authentication;
        $scope.sorter = ['-timestamp'];
        $scope.selectedItemsPerPage = 20;
        $scope.sorterStates = {
            timestamp:2,
            user : 0,
            description: 0
        };

        $scope.buildPager = function () {
            $scope.pagedItems = [];
            $scope.itemsPerPage = $scope.selectedItemsPerPage;
            $scope.currentPage = 1;
            $scope.figureOutItemsToDisplay();
        };

        $scope.figureOutItemsToDisplay = function () {
            $scope.filteredItems = $filter('filter')($scope.activities, {
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

        // Find a list of activities
        $scope.find = function () {
            $scope.loadActivities = Activities.query(function(data){
                $scope.activities = data;
                $scope.buildPager();
            });
        };
    }
]);