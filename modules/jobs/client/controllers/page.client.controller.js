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

        // window.marker = null;
        //
        // function initialize() {
        //     var map;
        //
        //     var nottingham = new google.maps.LatLng(31.771959, 35.217018);
        //
        //     var style = [
        //         { "featureType": "road",
        //             "elementType":
        //                 "labels.icon",
        //             "stylers": [
        //                 { "saturation": 1 },
        //                 { "gamma": 1 },
        //                 { "visibility": "on" },
        //                 { "hue": "#e6ff00" }
        //             ]
        //         },
        //         { "elementType": "geometry", "stylers": [
        //             { "saturation": -100 }
        //         ]
        //         }
        //     ];
        //
        //     var mapOptions = {
        //         // SET THE CENTER
        //         center: nottingham,
        //
        //         // SET THE MAP STYLE & ZOOM LEVEL
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         zoom:9,
        //
        //         // SET THE BACKGROUND COLOUR
        //         backgroundColor:"#eeeeee",
        //
        //         // REMOVE ALL THE CONTROLS EXCEPT ZOOM
        //         panControl:false,
        //         zoomControl:true,
        //         mapTypeControl:false,
        //         scaleControl:false,
        //         streetViewControl:false,
        //         overviewMapControl:false,
        //         zoomControlOptions: {
        //             style:google.maps.ZoomControlStyle.SMALL
        //         }
        //
        //     };
        //     map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //
        //     // SET THE MAP TYPE
        //     var mapType = new google.maps.StyledMapType(style, {name:"Grayscale"});
        //     map.mapTypes.set('grey', mapType);
        //     map.setMapTypeId('grey');
        //
        //     //CREATE A CUSTOM PIN ICON
        //     var marker_image ='images/pin.png';
        //     var pinIcon = new google.maps.MarkerImage(marker_image,null,null, null,new google.maps.Size(21, 34));
        //
        //     var marker = new google.maps.Marker({
        //         position: nottingham,
        //         map: map,
        //         icon: pinIcon,
        //         title: 'Absolute Nottingham'
        //     });
        // }
        //
        // google.maps.event.addDomListener(window, 'load', initialize);
    }
]);