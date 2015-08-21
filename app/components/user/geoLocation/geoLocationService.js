(function () {

    angular.module('pioneerRoad')
            .factory('geoLocationService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};
                    var locationData = {};
                    
                    
                    service.begin = function(){
                        getLocation();
                    };
                    
                    function updateLocation(){
                       $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/current-location',
                         locationData
                        ).success(function(response){console.log("location updated");}).error(function(error){console.log(error);});
                    }
                    
                    function getLocation() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(setPositionData, showError);
                        } else {
                            console.log("Geolocation is not supported by this browser.");
                            alert("Your Browser does not support Geolocation!");
                        }
                    }

                    function setPositionData(position) {
                        locationData = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        };
                        updateLocation();
                    }

                    function showError(error) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.log("User denied the request for Geolocation.");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.log("Location information is unavailable.");
                                break;
                            case error.TIMEOUT:
                                console.log("The request to get user location timed out.");
                                break;
                            case error.UNKNOWN_ERROR:
                                console.log("An unknown error occurred.");
                                break;
                        }
                    }

                    return service;
                }
            ]);
}());