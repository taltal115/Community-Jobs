'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', '$location', '$filter', 'Authentication',
  function ($scope, $http, $location, $filter, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.opened = {};
    $scope.timeZone = 'America/New_York';
    $scope.timeFrame = 'Today';
    $scope.fromModel = null;
    $scope.toModel = null;
    $scope.typeModel = {};
    $scope.environmentModel = {};
    $scope.filters = [];

      $scope.user = {
          title: 'Developer',
          email: 'ipsum@lorem.com',
          firstName: '',
          lastName: '',
          company: 'Google',
          address: '1600 Amphitheatre Pkwy',
          city: 'Mountain View',
          state: 'CA',
          biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
          postalCode: '94043'
      };

      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
          return {abbrev: state};
      });
      
      $scope.getDateString = function(utcDateObj) {
          if (utcDateObj) {
              return new Date(utcDateObj - utcDateObj.getTimezoneOffset() * (1000 * 60)).toISOString();
          }
          return null;
      };

      
   $scope.$watch('authentication.user', function() {
       if ($scope.authentication.user) {
         $scope.isPartnerUser = function() {
           return (!($scope.authentication.user.roles.indexOf('user') >= 0 || $scope.authentication.user.roles.indexOf('admin') >= 0));
         };
         $http.get('api/reports/metadata',{ params: {type: 'Supply'} })
           .then(function(response) {
             $scope.metadata = response.data;
             $scope.loadCharts();
           });
       }
   });

      $scope.resetRange = function () {
          $scope.fromModel = null;
          $scope.toModel = null;
          if ($scope.timeFrame !== 'Custom') {
              $scope.loadCharts();
          }
      };

    $scope.open = function($event, element) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened[element] = true;
    };

    $scope.getAllMetricsReport = function () {
        $scope.allMetricsError = null;
        $scope.allMetrics = $scope.metadata.metrics.filter(function(metric){return metric.dashboard;});
        var allMetricsReport = {
            type: 'Supply',
            dimensions : [],
            metrics:$scope.allMetrics.map(function(metric) {return metric.fieldName;}),
            timeZone:$scope.timeZone,
            timeLevel: 'Overall',
            timeFrame: $scope.timeFrame,
            from: $scope.from,
            to : $scope.to,
            filters:$scope.filters
        };

        $scope.loadAllMetrics = $http.post('api/reports/run',allMetricsReport)
            .then(function (response) {
                    $scope.allMetricsResults = [];
                    if (response.data.length) {
                      $scope.allMetricsResults = response.data[0];
                    }
                },
                function (errResponse) {
                    $scope.allMetricsResults = null;
                    $scope.allMetricsError = errResponse.data.message;
                });

    };

    $scope.getIvcOverTimeReport = function () {

        $scope.timeLineMetrics = $scope.metadata.metrics.filter(function(metric){return metric.dashboardTimeLine;});
        $scope.timeLineMetricsFields = $scope.timeLineMetrics.map(function(metric) {return metric.fieldName;});
        $scope.timeLineMetricsDisplayNames = $scope.timeLineMetrics.map(function(metric) {return metric.displayName;});
        $scope.timeLineHeader = $scope.timeLineMetricsDisplayNames.toString();

        $scope.ivcOverTimeError = null;
        var timeLevel;
        if ($scope.timeFrame !== 'Custom') {
            if ($scope.timeFrame === 'Today' || $scope.timeFrame === 'Yesterday') {
                timeLevel = 'Hourly';
            } else {
                timeLevel = 'Daily';
            }
        } else {
            var gap = new Date($scope.toModel) - new Date($scope.fromModel);
            if (gap > 0) {
                timeLevel = 'Daily';
            } else {
                timeLevel = 'Hourly';
            }
        }
        var ivcOverTimeReport = {
            type: 'Supply',
            dimensions : [],
            metrics:$scope.timeLineMetricsFields,
            timeZone:$scope.timeZone,
            timeLevel: timeLevel,
            timeFrame: $scope.timeFrame,
            from: $scope.from,
            to : $scope.to,
            filters: $scope.filters
        };


        $scope.loadIvcOverTime = $http.post('api/reports/run',ivcOverTimeReport)
            .then(function (response) {
                $scope.ivcOverTimeLabels = [0];
                $scope.ivcOverTimeSeries = [0];
                $scope.ivcOverTimeData = [0];
                if (response.data.length) {
                    var sorted =$filter('orderBy')(response.data,'date');
                    $scope.ivcOverTimeLabels = [];
                    $scope.ivcOverTimeSeries = $scope.timeLineMetricsDisplayNames;
                    $scope.ivcOverTimeData = [];
                    $scope.timeLineMetrics.forEach(function(metric){
                      $scope.ivcOverTimeData.push([]);
                    });
                    sorted.forEach(function (item) {
                        $scope.ivcOverTimeLabels.push($filter('dateFormat')(item.date, timeLevel));
                        $scope.timeLineMetricsFields.forEach(function(fieldName,index) {
                          $scope.ivcOverTimeData[index].push(item[fieldName]);
                        });
                    });
                }
                },
                function (errResponse) {
                    $scope.ivcOverTimeLabels = [0];
                    $scope.ivcOverTimeSeries = [0];
                    $scope.ivcOverTimeData = [0];
                    $scope.ivcOverTimeError =  errResponse.data.message;
                });
    };

    $scope.getImpressionsForPublishersReport = function (){
        $scope.impressionsForPublishersError = null;
        var impressionsForPublishersReport = {
            type: 'Supply',
            dimensions : ['pname'],
            metrics:['imp'],
            timeZone:$scope.timeZone,
            timeLevel: 'Overall',
            timeFrame: $scope.timeFrame,
            from: $scope.from,
            to : $scope.to,
            filters:$scope.filters
        };

        $scope.loadImpressionsForPublishers = $http.post('api/reports/run',impressionsForPublishersReport)
            .then(function (response) {
                $scope.impressionsForPublishersLabels = [null];
                $scope.impressionsForPublishersData = [null];
                    var total = 0;
                    response.data.forEach(function(item) {
                        total += item.imp;
                    });
                if (response.data.length) {
                    var sorted = response.data.sort(function (a, b) {
                        return b.imp - a.imp;
                    });
                    $scope.impressionsForPublishersLabels = ['Others'];
                    $scope.impressionsForPublishersData = [0];
                    sorted.forEach(function (item, index) {
                        if (index < 10) {
                            $scope.impressionsForPublishersLabels.push(item.pname + ' ' + (item.imp/total * 100).toFixed(2) + '%');
                            $scope.impressionsForPublishersData.push(item.imp);
                        } else {
                            $scope.impressionsForPublishersData[0]+= item.imp;
                        }
                    });
                    $scope.impressionsForPublishersLabels[0]+= ' ' + ($scope.impressionsForPublishersData[0]/total * 100).toFixed(2) + '%';
                }
                },
                function (errResponse) {
                    $scope.impressionsForPublishersLabels = [null];
                    $scope.impressionsForPublishersData = [null];
                    $scope.impressionsForPublishersError = errResponse.data.message;
                });
    };

    $scope.getViewsForAdvertiserReport = function () {
        $scope.viewsForAdvertisersError = null;
        var viewsForAdvertiserReport = {
            type: 'Demand',
            dimensions : ['advname'],
            metrics:[ 'views'],
            timeZone:$scope.timeZone,
            timeLevel: 'Overall',
            timeFrame: $scope.timeFrame,
            from: $scope.from,
            to : $scope.to,
            filters: $scope.filters
        };

        $scope.loadViewsForAdvertisers = $http.post('api/reports/run',viewsForAdvertiserReport)
            .then(function (response) {
                $scope.viewsForAdvertisersLabels = [null];
                $scope.viewsForAdvertisersData = [null];
                if (response.data.length) {
                    var total = 0;
                    response.data.forEach(function(item) {
                        total += item.views;
                    });
                    var sorted = response.data.sort(function (a, b) {
                        return b.views - a.views;
                    });
                    $scope.viewsForAdvertisersLabels = ['Others'];
                    $scope.viewsForAdvertisersData = [0];
                    sorted.forEach(function (item, index) {
                        if (index < 10) {
                            $scope.viewsForAdvertisersLabels.push(item.advname + ' ' + (item.views/total * 100).toFixed(2) + '%');
                            $scope.viewsForAdvertisersData.push(item.views);
                        } else {
                            $scope.viewsForAdvertisersData[0]+= item.views;
                        }
                    });
                    $scope.viewsForAdvertisersLabels[0]+= ' ' + ($scope.viewsForAdvertisersData[0]/total * 100).toFixed(2) + '%';
                }
                },
                function (errResponse) {
                    $scope.viewsForAdvertisersLabels = [null];
                    $scope.viewsForAdvertisersData = [null];
                    $scope.viewsForAdvertisersError = errResponse.data.message;
                });


    };

    $scope.loadCharts = function () {
        $scope.filters = [];
        var environments = [];
        var types = [];
        if ($scope.environmentModel) {
            Object.keys($scope.environmentModel).forEach(function(key) {
                if ($scope.environmentModel[key]) {
                    environments.push(key);
                }
            });
            if (environments.length) {
                $scope.filters.push({dimension: 'environment', values: environments});
            }
        }
        if ($scope.typeModel) {
            Object.keys($scope.typeModel).forEach(function(key) {
                if ($scope.typeModel[key]) {
                    types.push(key);
                }
            });
            if (types.length) {
                $scope.filters.push({dimension: 'type', values: types});
            }
        }
        $scope.from = $scope.getDateString($scope.fromModel);
        $scope.to = $scope.getDateString($scope.toModel);
        $scope.getIvcOverTimeReport();
        $scope.getAllMetricsReport();
        if (!$scope.isPartnerUser()) {
          $scope.getImpressionsForPublishersReport();
          $scope.getViewsForAdvertiserReport();
        }
    };

  }
]);