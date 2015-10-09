(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messageController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', '$routeParams', '$localStorage', '$anchorScroll', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $routeParams, $localStorage, $anchorScroll) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
           
            
            var threadId = $routeParams.id;
            $rootScope.Title = $sce.trustAsHtml("Todo add nickname");
            $rootScope.Link = $sce.trustAsHtml("");
            $rootScope.messages = [];
            $scope.reply = null;
            $rootScope.participants = [];
            var message = {};
            
            var index = $rootScope.messageNoti.indexOf(parseInt(threadId)); //convert to int as array is ints not string
            if (index > -1) {
                $rootScope.messageNoti.splice(index, 1);
                $localStorage.Notifications = $rootScope.messageNoti;
            } //remove any notifications to do with this thread
            

            var getMessages = function () {
                messagesService.readThread(threadId)
                        .success(function (response) {
                            $rootScope.messages = [];
                            for (i = 0; i < response.threadContent.length; i++) { // for each request
                                var message = response.threadContent[i];
                                if (message.userId === $localStorage.token.id.toString()) {
                                    message.class = "msg-container from-me";
                                }
                                else {
                                    message.class = "msg-container from-them";
                                }
                                $rootScope.messages.push(message);
                                message = {};
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                            $rootScope.messages = [];
                        });
            };

            $scope.sendMessage = function () {

                if ($scope.reply === null) {
                    return; //no message entered
                }
                messagesService.createMessage(threadId, $scope.reply)
                        .success(function (response) {
                            $scope.reply = null;
                            console.log("sent");
                        })
                        .error(function (error) {
                            console.log(error);
                            $scope.reply = null;
                        });
                $scope.reply = null;
            };

            getMessages();

        }]);
}());