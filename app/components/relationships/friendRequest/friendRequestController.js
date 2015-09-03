(function () {
    var app = angular.module("pioneerRoad");

    app.controller('friendRequestController', ['$scope', '$rootScope', '$http', '$localStorage', 'loginRedirect', 'friendRequestService', function ($scope, $rootScope, $http, $localStorage, loginRedirect, friendRequestService) {

            if (loginRedirect.checkLogin()) {
                //get a current list of friend requests straight away
                var getFriendRequests = function () {
                    //call the getFriendRequestList from fRS
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

                                    $scope.friends.push(friend);
                                    friend = {};
                                }
                            })
                            .error(function (error) {
                                console.log(error);
                            });

                };

                // implemented functions to send accept or block request
                $scope.accept = function (friendId) { //removes friend from the list

                    friendRequestService.acceptRequest(friendId)
                            .success(function (response) {
                                for (var i = $scope.friends.length - 1; i >= 0; i--) {
                                    if ($scope.friends[i].requestId === friendId) {
                                        $scope.friends.splice(i, 1);
                                    }
                                }
                                $rootScope.numfriendRequest--;
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                };

                $scope.decline = function (friendId) {
                    friendRequestService.declineRequest(friendId)
                            .success(function (response) {

                            })
                            .error(function (error) {
                                console.log(error);
                            });
                };

                $scope.friends = []; //stores all  friend requests
                var friend = {}; //stores a single friend request
                getFriendRequests(); //get friend request list
            }
            else { //not logged in

            }
        }]);
}());