(function () {
    var app = angular.module("pioneerRoad");

    app.factory('messagesService', ['$http', '$localStorage',
        function ($http, $localStorage) {
            var service = {};

            service.getThread = function () {
                return $http.get('http://pioneerroad.com.au:8081/api/v1/message/user/' + $localStorage.token.id + '/active-threads'
                        );
            };

            service.createThread = function (recipients, message) {
                body = {
                    recipients: recipients,
                    content: message
                };
                return $http.post('http://pioneerroad.com.au:8081/api/v1/message/user/' + $localStorage.token.id + '/new-thread', body
                        );
            };

            service.createMessage = function (threadId, message) {

                body = {
                    content: message
                };
                return $http.put('http://pioneerroad.com.au:8081/api/v1/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/new-message',body
                        );
            };

            service.readThread = function (threadId) {
                return $http.get('http://pioneerroad.com.au:8081/api/v1/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/read-thread'
                        );
            };
            
             service.getFriendList = function () {
                        return $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/friends/active'
                                );
                    };


            return service;
        }]);
}());