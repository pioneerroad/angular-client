(function () {

    angular.module('pioneerRoad')
            .factory('editProfileService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};

                    service.changeNickName = function (nickname) {

                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/nickname',
                                data = {
                                    nickName: nickname
                                }
                        );
                    };

                    service.getHomeTownSuggestions = function (hometown) {
                        return $http.get('http://pioneerroad.com.au:8081/api/v1/town/select/' + hometown
                                );
                    };

                    service.setHomeTown = function (hometown) {
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/update/hometown',
                                data = {
                                    homeTownId: hometown
                                }
                        );
                    };
                    getLocation();
                    return service;

                    //geolocation stuff

                  //  var x = document.getElementById("location");

                    function getLocation() {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showError);
                        } else {
                           // x.innerHTML = "Geolocation is not supported by this browser.";
                        }
                    }

                   /* function showPosition(position) {
                        x.innerHTML = "Latitude: " + position.coords.latitude +
                                "<br>Longitude: " + position.coords.longitude;
                    } */

                    function showError(error) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                             //   x.innerHTML = "User denied the request for Geolocation."
                                break;
                            case error.POSITION_UNAVAILABLE:
                            //    x.innerHTML = "Location information is unavailable."
                                break;
                            case error.TIMEOUT:
                            //    x.innerHTML = "The request to get user location timed out."
                                break;
                            case error.UNKNOWN_ERROR:
                           //     x.innerHTML = "An unknown error occurred."
                                break;
                        }
                    }
                }
            ]);
}());