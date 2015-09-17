(function () {
    var app = angular.module("pioneerRoad");

    app.controller('friendRequestController', ['$scope', '$rootScope', '$http', '$localStorage', 'loginRedirect', 'friendRequestService', function ($scope, $rootScope, $http, $localStorage, loginRedirect, friendRequestService) {
            if (loginRedirect.checkLogin()) {
                //get a current list of friend requests straight away
                $rootScope.getFriendRequests = function () {
                    //call the getFriendRequestList from fRS
                    $rootScope.friends = [];
                    friendRequestService.getFriendRequestList()
                            .success(function (response) {
                                $rootScope.numfriendRequest = response.length;//get number of friend requests

                                for (i = 0; i < response.length; i++) { // for each request
                                    friend.nickName = response[i].nickName;
                                    friend.requestId = response[i].requestId;

                                    if (response[i].profilePhoto === null) {
                                        friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                    }
                                    else {
                                        friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/" + response[i].userAccountId + "/" + response[i].profilePhoto.medium;
                                    }

                                    $rootScope.friends.push(friend);
                                    friend = {};
                                }
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                    setNotification();
                };

                // implemented functions to send accept or block request
                $scope.accept = function (friendId) { //removes friend from the list

                    friendRequestService.acceptRequest(friendId)
                            .success(function (response) {
                                for (var i = $rootScope.friends.length - 1; i >= 0; i--) {
                                    if ($rootScope.friends[i].requestId === friendId) {
                                        $rootScope.friends.splice(i, 1);
                                    }
                                }
                                $rootScope.numfriendRequest--;
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                    setNotification();
                };

                $scope.decline = function (friendId) {
                    friendRequestService.declineRequest(friendId)
                            .success(function (response) {
                                for (var i = $rootScope.friends.length - 1; i >= 0; i--) {
                                    if ($rootScope.friends[i].requestId === friendId) {
                                        $rootScope.friends.splice(i, 1);
                                    }
                                }
                                $rootScope.numfriendRequest--;
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                    setNotification();
                };

                var setNotification = function () {
                    if ($rootScope.numfriendRequest > 0) {
                        $rootScope.areNotifications = true;
                    }
                    else {
                        $rootScope.areNotifications = false;
                    }
                };


                $rootScope.friends = []; //stores all  friend requests
                var friend = {}; //stores a single friend request
                $rootScope.getFriendRequests(); //get friend request list
            }
            else { //not logged in

            }



        }]);
}());