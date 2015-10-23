(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messageController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', '$routeParams', '$localStorage', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $routeParams, $localStorage) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            var threadId = $routeParams.id;

            $rootScope.Link = $sce.trustAsHtml("");
            $rootScope.messages = []; //holds all current messages for the thread
            $scope.reply = null;
            $scope.curId = $localStorage.token.id;
            var nicknames = $localStorage.friendList; //nicknames of all friends in message
            var message = {};

            //set title of nav bar to be subscribers names
            if (nicknames !== null) {
                if (nicknames.length > 2) {
                    var string = nicknames[0] + " and " + (nicknames.length - 1) + " others";
                    $rootScope.Title = $sce.trustAsHtml(string);
                }
                else if (nicknames.length > 1) {
                    var string = nicknames[0] + ", " + nicknames[1];
                    $rootScope.Title = $sce.trustAsHtml(string);
                }
                else {
                    $rootScope.Title = $sce.trustAsHtml(nicknames[0]);
                }
            }
            else{
                $rootScope.Title = $sce.trustAsHtml("No one in thread!");
            }

            var index = $rootScope.messageNoti.indexOf(parseInt(threadId)); //convert to int as array is ints not string
            if (index > -1) {
                $rootScope.messageNoti.splice(index, 1);
                $localStorage.Notifications = $rootScope.messageNoti;
            } //remove any notifications to do with this thread

            //get the messages from the API store in messages array
            var getMessages = function () {
                messagesService.readThread(threadId)
                        .success(function (response) {

                            $rootScope.messages = [];
                            for (i = 0; i < response.length; i++) { // for each request                    
                                message = response[i];
                                 
                                if (message.senderId === $localStorage.token.id) { //determines what class to apply for display of message
                                    message.class = "msg-container from-me";
                                }
                                else {
                                    message.class = "msg-container from-them";
                                }
                                //setting the image
                                if (response[i].sender.profilePhoto === null) {
                                    message.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    message.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].senderId + "/profile-photo/" + response[i].sender.profilePhoto.medium;
                                }
                                //working out the time sent
                                var d = new Date(message.createdAt); //convert to epoch
                                message.time = d.valueOf();
                                $rootScope.messages.push(message);
                                message = {};
                                $scope.glued = true;
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