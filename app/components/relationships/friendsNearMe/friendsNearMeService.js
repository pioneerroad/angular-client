(function () {
    angular.module("pioneerRoad.RelationShips")
            .factory('friendsNearMeService', ['$http','$localStorage', '$rootScope',
                function ($http, $localStorage,$rootScope ) {
                    var service = {};

                    service.getFriendsNearMe = function () {

                        return $http.get($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/nearby'
                                );
                    };
                    
                    return service;
                }]);

}());