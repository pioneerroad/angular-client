(function () {
    var app = angular.module("pioneerRoad.RelationShips");
    app.controller('addFriendController', ['$scope', '$rootScope', 'relationshipsService', '$localStorage', '$sce','$location' , 'loginRedirect', function ($scope,$rootScope, relationshipsService, $localStorage, $sce, $location ,loginRedirect) {
            
            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            
            $rootScope.Title = $sce.trustAsHtml("Add Friend");
            $rootScope.Link = $sce.trustAsHtml("");
            
            $scope.showFriendConfirmationModal = false;
            
            $scope.friendName = ""; //friend to find
            $scope.addFriendNew = []; //lists all people matching searched name
            var friendId = ""; //id returned from findFriends() function in service
            var friend = {}; //used to hold each friend object and doubles as an error message store
            var friendAddId = null; //
            $scope.message = "";
            $scope.okay = true;
            $scope.error = false;

            $scope.findFriend = function () {
                $scope.addFriendNew = [];
                if ($scope.friendName === "") {
                    friend.error = "Please enter a friends email!";
                    $scope.addFriendNew.push(friend);
                    friend = {};
                }
                else {
                    relationshipsService.findFriend($scope.friendName)
                            .success(function (response) {
                                if (response.error === "NO_MATCHING_USER") { //no people found
                                    friend.error = "Could not find any users by that email!";
                                    $scope.addFriendNew.push(friend);
                                    friend = {};
                                    return;
                                }
                                getFriendProfile(response.id);
                            })
                            .error(function (error) {
                                console.log(error);
                                if (error.error === "NO_MATCHING_USER") { //no people found
                                    friend.error = "Could not find any users by that email!";
                                    $scope.addFriendNew.push(friend);
                                    friend = {};
                                }
                                else { //unknown error
                                    friend.error = "Could not find any users by that email!";
                                    $scope.addFriendNew.push(friend);
                                    friend = {};
                                }
                            });
                }
            };

            $scope.addFriendbtn = function (id) {
                friendAddId = id;
                $scope.showFriendConfirmationModal = true;
                $scope.addFriendNew = null;
            };

            $scope.addFriend = function () {
                friendAddId;
                $scope.showFriendConfirmationModal = false;
                if ($localStorage.token.id === friendAddId) {
                    $scope.message = "You cannot be friends with yourself";
                    $scope.error = true; //show error messages
                    return;
                }

                if (friendAddId === null) {
                    return;
                    $scope.message = "please select friend to add";
                    $scope.error = true; //show error messages
                }
                relationshipsService.sendFriendRequest(friendAddId)
                        .success(function (response) {
                            $scope.message = "Friend request sent";
                            $scope.error = true;
                            friendAddId = null;
                            $scope.friends = [];
                        })
                        .error(function (error) {
                            if (error.message === "Validation error") {
                                $scope.error = true;
                                $scope.message = "You have already sent a friend request";
                                friendAddId = null;
                            }
                            else {
                                $scope.error = true;
                                $scope.message = "could not send request";
                                friendAddId = null;
                            }
                        });
            };

            var getFriendProfile = function (friendId) {
                if (friendId === "") {
                    console.log("friend id is undefined");
                }
                else {
                    relationshipsService.getFriendProfile(friendId)
                            .success(function (response) {
                                friend = response;
                                if (response.profilePhoto === null) {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response.userAccountId + "/profile-photo/" + response.profilePhoto.medium;
                                }
                                $scope.addFriendNew.push(friend);
                                friend = {};
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                }
            };

            $scope.close = function () {
                $scope.showFriendConfirmationModal = false;
                $scope.addFriendNew = []; //lists all people matching searched name
                friendAddId = null; //
                $scope.message = "";
                $scope.okay = true;
            };

        }]);
}());