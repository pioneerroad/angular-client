(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messageController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', '$routeParams', '$localStorage', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $routeParams, $localStorage) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }


            var threadId = $routeParams.id;
            $rootScope.Title = $sce.trustAsHtml("Todo add nickname");
            $rootScope.Link = $sce.trustAsHtml("");
            $rootScope.messages = [];
            $scope.reply = null;
            $rootScope.participants = [];
            $scope.curId = $localStorage.token.id;
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
                            for (i = 0; i < response.length; i++) { // for each request                    
                                var message = response[i];
                                if (message.senderId === $localStorage.token.id) {
                                    message.class = "msg-container from-me";
                                }
                                else {
                                    message.class = "msg-container from-them";
                                }
                                if (response[i].sender.profilePhoto === null) {
                                    message.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    message.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].senderId + "/profile-photo/" + response[i].sender.profilePhoto.medium;
                                }
                                //console.log(message);
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
                messagesService.createMessage(threadId, $scope.reply) //should still be the same
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