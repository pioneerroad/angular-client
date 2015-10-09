(function () {

    angular.module("pioneerRoad.FriendProfile")
            .factory('viewFriendProfileService', ['$http', '$location', '$localStorage', '$rootScope',
                function ($http, $location, $localStorage,$rootScope) {
                    var service = {};

                    service.getData = function (id) {
                        return $http.post($rootScope.Api + '/user/' + id + '/profile/fetch'
                                );
                    };

                    return service;
                }
            ]);
}());