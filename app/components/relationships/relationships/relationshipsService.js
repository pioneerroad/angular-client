(function () {
    angular.module("pioneerRoad.RelationShips")
            .factory('relationshipsService', ['$http', '$localStorage', '$rootScope',
                function ($http, $localStorage, $rootScope) {
                    var service = {};

                    service.getFriendList = function () {

                        return $http.get($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/active'
                                );
                    };

                    service.sendFriendRequest = function (reciver) {
                        return $http.post($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/create', data = {recipientId: reciver}
                        );
                    };

                    service.findFriend = function (reciver) {
                        reciver = reciver.toLowerCase();
                        return $http.get($rootScope.Api + '/user/' + $localStorage.token.id + '/friend-query/%25'+reciver + "%25"
                        );
                    };
                    
                     service.getFriendProfile = function (uid) {
                        return $http.post($rootScope.Api + '/user/' + $localStorage.token.id + '/profile/fetch', data = {resourceOwnerId: uid}
                        );
                    };
                    
                    service.blockFriend = function (uid) {
                        return $http.put($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/block', data = {blockId: uid}
                        );
                    };
                    
                    service.searchForFriend = function(friend){
                        friend = friend.toLowerCase();
                        return $http.get($rootScope.Api + '/user/' + $localStorage.token.id + '/friends/%25' + friend + '%25'
                        );
                    };

                    return service;
                }
            ]);
}());