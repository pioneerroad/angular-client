(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messagesController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

            $rootScope.Title = $sce.trustAsHtml("Messages");
            $rootScope.Link = $sce.trustAsHtml("");

            var thread = {};
            $scope.threads = [];
            $scope.form = false;
            var friendsAdded = []; //friend id's to send to api
            var AllFriends = [];
            $scope.message = null;
            $scope.currFriend = null; //the email/nick name of the current friend
            $scope.friendList = []; //drop down list to choose from
            var friendSelected = null;
            $scope.currentFriendsAdded = []; //displays to the user the friends who will be apart of the thread

            var getThreads = function () {
                messagesService.getThread()
                        .success(function (response) {
                             $scope.threads = [];
                            for (i = 0; i < response.length; i++) { // for each request
                                thread = response[i];
                                if (response[i].profilePhoto === null) {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].subscriberid + "/profile-photo/" + response[i].photo.medium;
                                }

                                $scope.threads.push(thread);
                                thread = {};
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                            $scope.threads = [];
                        });
            };

            $scope.createThread = function () {
                if ($scope.message === null || friendsAdded.length === 0) {
                    return;
                }
                messagesService.createThread(friendsAdded, $scope.message)
                        .success(function (response) {
                            $scope.addNewThreadform();
                            console.log("thread created");
                            getThreads();
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.addNewThreadform = function () {
                if ($scope.form) {
                    resetForm();
                }
                $scope.form = !$scope.form;
                messagesService.getFriendList()
                        .success(function (response) {
                            AllFriends = response;
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.searchForFriends = function () {

                if ($scope.currFriend.length > 3) {
                    //do a search for friends like and return that
                    $scope.friendList = AllFriends;
                }
                else {
                    $scope.friendList = [];
                }
            };

            $scope.addFriend = function (Friend) {
                $scope.friendList = [];
                friendSelected = Friend;
                $scope.currFriend = Friend.nickname;
            };

            $scope.appendFriend = function () {
                if (friendSelected === null) {
                    return;
                }
                friendsAdded.push(friendSelected.friend);
                $scope.currentFriendsAdded.push(friendSelected.nickname);
                $scope.currFriend = null;
                friendSelected = null;
            };

            var resetForm = function () {
                $scope.friendList = [];
                $scope.message = null;
                $scope.currFriend = null;
                friendSelected = null;
                $scope.message = null;
                friendsAdded = [];
                $scope.currentFriendsAdded = [];
            };

            $scope.removeThread = function (id) {
                messagesService.unSubscribe(id)
                        .success(function (response) {
                            console.log("thread removed");
                            console.log(response);
                            getThreads();
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            getThreads();
        }]);
}());