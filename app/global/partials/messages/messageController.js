(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messageController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', '$routeParams', '$localStorage', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $routeParams, $localStorage) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            var threadId = $routeParams.id;
            $rootScope.Title = $sce.trustAsHtml("Todo add nickname");
            $rootScope.Link = $sce.trustAsHtml("");
            $scope.messages = [];
            $scope.reply = null;
            var message = {};

            var getMessages = function () {
                messagesService.readThread(threadId)
                        .success(function (response) {
                            $scope.messages = [];
                            for (i = 0; i < response.threadContent.length; i++) { // for each request
                                var message = response.threadContent[i];
                                if (message.userId === $localStorage.token.id.toString()) {
                                    message.class = "msg-container from-me";
                                }
                                else {
                                    message.class = "msg-container from-them";
                                }
                                $scope.messages.push(message);
                                message = {};
                            }

                        })
                        .error(function (error) {
                            console.log(error);
                            $scope.messages = [];
                        });
            };

            $scope.sendMessage = function () {

                if ($scope.reply === null) {
                    return; //no message entered
                }
                console.log("about to send");
                messagesService.createMessage(threadId, $scope.reply)
                        .success(function (response) {
                            console.log("success");
                            getMessages();
                            $scope.reply = null;
                        })
                        .error(function (error) {
                            console.log(error + " bad");
                            $scope.reply = null;
                        });
                $scope.reply = null;
            };

            getMessages();

        }]);
}());