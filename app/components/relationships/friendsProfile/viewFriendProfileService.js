(function () {

    angular.module("pioneerRoad.FriendProfile")
            .factory('viewFriendProfileService', ['$http', '$location', '$localStorage',
                function ($http, $location, $localStorage) {
                    var service = {};

                    service.getData = function (id) {
                        return $http.post('http://pioneerroad.com.au:8081/api/v1/user/' + id + '/profile/fetch'
                                );
                    };

                    return service;
                }
            ]);
}());