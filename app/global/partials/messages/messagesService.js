(function () {
    var app = angular.module("pioneerRoad");

    app.factory('messagesService', ['$http', '$localStorage', '$rootScope',
        function ($http, $localStorage, $rootScope) {
            var service = {};

            service.getThread = function () {
                return $http.get($rootScope.Api + '/messages/user/' + $localStorage.token.id + '/active-threads'
                        );
            };

            service.createThread = function (recipient) {           
                var body = {
                    recipients: JSON.stringify(recipient)
                };
                return $http.post($rootScope.Api+ '/messages/user/' + $localStorage.token.id + '/create-thread', body
                        );
            };

            service.createMessage = function (threadId, message1) {
                var body = {
                    message: message1
                };
                return $http.post($rootScope.Api + '/messages/user/' + $localStorage.token.id + '/thread/' + threadId + '/new-message', body
                        );
            };

            service.readThread = function (threadId) {
                return $http.get($rootScope.Api + '/messages/user/' + $localStorage.token.id + '/thread/' + threadId + '/view-thread'
                        );
            };
            
            service.unSubscribe = function (threadId) {
                return $http.put($rootScope.Api + '/message/user/' + $localStorage.token.id + '/thread/' + threadId + '/unsubscribe'
                        );
            };

            service.threadRead = function (threadId) {
                return $http.put($rootScope.Api + '/messages/user/' + $localStorage.token.id + '/thread/' + threadId + '/update-status'
                        );
            };

            return service;
        }]);
}());