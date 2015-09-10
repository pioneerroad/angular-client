(function () {
    angular.module('pioneerRoad')
            .factory('relationshipsService', ['$http', '$localStorage',
                function ($http, $localStorage) {
                    var service = {};

                    service.getFriendList = function () {

                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/active'
                                );
                    };

                    service.sendFriendRequest = function (reciver) {
                        return $http.post('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/create', data = {recipientId: reciver}
                        );
                    };

                    service.findFriend = function (reciver) {
                        return $http.post('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/find', data = {username: reciver}
                        );
                    };
                    
                     service.getFriendProfile = function (uid) {
                        return $http.post('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/profile/fetch', data = {resourceOwnerId: uid}
                        );
                    };
                    
                    service.blockFriend = function (uid) {
                        return $http.put('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/block', data = {blockId: uid}
                        );
                    };

                    return service;
                }
            ]);
}());