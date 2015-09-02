(function () {
    angular.module('pioneerRoad')
            .factory('friendRequestService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};

                    service.getFriendRequestList = function () {

                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/pending'
                                );
                    };

                    service.acceptRequest = function (friendId) {

                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/accept', data = {
                            friendRelationshipId: friendId
                        }
                        );
                    };

                    service.declineRequest = function (friendId) {
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/ignore', data = {
                            friendRelationshipId: friendId
                        }
                        );
                    };

                    return service;
                }
            ]);
}());