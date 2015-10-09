(function () {
    angular.module("pioneerRoad.RelationShips")
            .factory('friendRequestService', ['$http', '$localStorage', '$rootScope',
                function ($http, $localStorage, $rootScope) {
                    var service = {};

                    service.getFriendRequestList = function () {

                        return $http.get($rootScope.Api+ '/user/' + $localStorage.token.id + '/friends/pending'
                                );
                    };

                    service.acceptRequest = function (friendId) {

                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/accept', data = {
                            friendRelationshipId: friendId
                        }
                        );
                    };

                    service.declineRequest = function (friendId) {
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/ignore', data = {
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