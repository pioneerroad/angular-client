(function () {
    angular.module("pioneerRoad.RelationShips")
            .factory('friendRequestService', ['$http', '$localStorage', '$rootScope',
                function ($http, $localStorage, $rootScope) {
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
                    
                    service.updateNum = function(){
                        service.getFriendRequestList()
                            .success(function (response) {
                                $rootScope.numfriendRequest = response.length;//get number of friend requests
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                    };
                    return service;
                }
            ]);
}());