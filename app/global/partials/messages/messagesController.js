(function () {
    var app = angular.module("pioneerRoad");

    app.controller('messagesController', ['$scope', '$rootScope', '$location', '$sce', 'messagesService', 'loginRedirect', '$localStorage', 'relationshipsService', function ($scope, $rootScope, $location, $sce, messagesService, loginRedirect, $localStorage, relationshipsService) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

            $rootScope.Title = $sce.trustAsHtml("Messages");
            $rootScope.Link = $sce.trustAsHtml("");

            var thread = {}; //current thread got from API response
            $scope.threads = []; //list of threads to display
            $scope.form = false; //display new thread form
            var friendsAdded = []; //friend id's to send to api
            $scope.message = null; //the message to send
            $scope.currFriend = null; //the email/nick name of the current friend
            $scope.friendList = []; //drop down list to choose from
            var friendSelected = null;
            $scope.currentFriendsAdded = []; //displays to the user the friends who will be apart of the thread

            //get list of thread from api
            $rootScope.getThreads = function () {
                messagesService.getThread()
                        .success(function (response) {
                            $scope.threads = [];
                            for (i = 0; i < response.length; i++) { // for each thread
                                thread = response[i];
                                if (response[i].profilePhoto === null) {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    thread.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].senderId + "/profile-photo/" + response[i].profilePhoto.medium;
                                }
                                $scope.threads.push(thread);
                                thread = {};
                            }
                            //sort the thread
                            $scope.threads.sort(function (a, b) {
                                var d1 = new Date(a.date);
                                var d2 = new Date(b.date);
                                if (d1 === d2) {
                                    return 0;
                                }
                                else if (d1 < d2) {
                                    return 1;
                                }
                                else {
                                    return -1;
                                }
                            });
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
                messagesService.createThread(friendsAdded) //only post uid's
                        .success(function (response) {                
                            messagesService.createMessage(response.threadId, $scope.message)
                                    .success(function (response2) {                            
                                        $rootScope.getThreads();
                                    })
                                    .error(function (error) {
                                        console.log(error);
                                    });        
                                    $scope.addNewThreadform();
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
                relationshipsService.getFriendList()
                        .success(function (response) {
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.searchForFriends = function () {

                if ($scope.currFriend.length > 3) {
                    relationshipsService.searchForFriend($scope.currFriend)
                            .success(function (response) {
                                $scope.friendList = [];
                                for (var i = 0; i < response.length; i++) {
                                    $scope.friendList.push(response[i]);
                                }

                            })
                            .error(function (error) {
                                console.log(error);
                            });

                }
                else {
                    $scope.friendList = [];
                }
            };

            $scope.addFriend = function (Friend) {
                $scope.friendList = [];
                friendSelected = Friend;
                $scope.currFriend = Friend.nickName;
            };

            $scope.appendFriend = function () {
                if (friendSelected === null) {
                    return;
                }
                friendsAdded.push(friendSelected.userAccountId);
                $scope.currentFriendsAdded.push(friendSelected.nickName);
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
                            var index = $rootScope.messageNoti.indexOf(id);
                            if (index > -1) {
                                $rootScope.messageNoti.splice(index, 1);
                            } //remove any notifications to do with this thread
                          
                            $rootScope.getThreads();
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.hasNewMessages = function (threadid) {
                var show = false;
                if ($rootScope.messageNoti.indexOf(threadid) > -1) {
                    show = true;
                }
                return show;
            };
            
            $scope.openThread = function(threadP){
                if(threadP.other_subscribers_list !== null)
                    $localStorage.friendList = threadP.other_subscribers_list.split(", ");
                else
                    $localStorage.friendList = null;
                
                $location.path("/message/"+ threadP.threadId);
                
            };

            $rootScope.getThreads();
        }]);
}());