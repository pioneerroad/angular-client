(function () {
    var app = angular.module("pioneerRoad");

    app.factory('messagesService', ['$http', '$localStorage', '$rootScope',
        function ($http, $localStorage, $rootScope) {
            var service = {};

            service.getThread = function () {
                return $http.get($rootScope.Api + '/message/user/' + $localStorage.token.id + '/active-threads'
                        );
            };

            service.createThread = function (recipient, message) {           
                var body = {
                    recipients: JSON.stringify(recipient),
                    content: message
                };
                return $http.post($rootScope.Api+ '/message/user/' + $localStorage.token.id + '/new-thread', body
                        );
            };

            service.createMessage = function (threadId, message) {

                var body = {
                    content: message
                };
                return $http.put($rootScope.Api + '/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/new-message', body
                        );
            };

            service.readThread = function (threadId) {
                return $http.get($rootScope.Api + '/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/read-thread'
                        );
            };
            
            service.unSubscribe = function (threadId) {
                return $http.put($rootScope.Api + '/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/unsubscribe'
                        );
            };


            return service;
        }]);
}());