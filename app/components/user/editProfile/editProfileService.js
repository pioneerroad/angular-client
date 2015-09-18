(function () {

    angular.module('pioneerRoad.Profile')
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
                    
                    return service;              
                }
            ]);
}());