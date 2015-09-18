(function () {
    angular.module("pioneerRoad.RelationShips")
            .factory('friendsNearMeService', ['$http','$localStorage',
                function ($http, $localStorage ) {
                    var service = {};

                    service.getFriendsNearMe = function () {

                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/nearby'
                                );
                    };
                    
                    return service;
                }]);

}());