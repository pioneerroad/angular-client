(function () {
    var app = angular.module("pioneerRoad.RelationShips");
    app.controller('relationshipsController', ['$scope', 'relationshipsService', '$localStorage', '$sce', function ($scope, relationshipsService, $localStorage, $sce) {
            
            $rootScope.Title = $sce.trustAsHtml("Home");
            $rootScope.Link = $sce.trustAsHtml("<h5><a>Add Friend</a><h5>");
            
            $scope.showblockFriendConfirmationModal = false;
            $scope.showFriendConfirmationModal = false;
            $scope.addFriendsShow = false; //show the menu to add friends
            $scope.symbol = "glyphicon-plus"; //this class controls a glyphicon on the add user button
            $scope.friendName = ""; //friend to find
            $scope.friends = []; //array to hold list of friends
            $scope.addFriendNew = []; //lists all people matching searched name
            var friendId = ""; //id returned from findFriends() function in service
            var friend = {}; //used to hold each friend object and doubles as an error message store
            var friendAddId = null; //
            var friendToBlock = null;
            $scope.message = "";
            $scope.okay = true;


            $scope.addFriends = function () {
                if ($scope.addFriendsShow) {
                    $scope.addFriendsShow = false;
                    $scope.symbol = "glyphicon-plus";
                }
                else {
                    $scope.addFriendsShow = true;
                    $scope.symbol = "glyphicon-minus";
                }
            };

            $scope.blockFriendsOpen = function (id) {
                $('#' + id).addClass('active').removeClass('inactive');
            };
            $scope.blockFriendsClose = function (id) {
                $('#' + id).addClass('inactive').removeClass('active');
            };

            $scope.blockFriendbtn = function (id) {
                friendToBlock = id;
                $scope.showblockFriendConfirmationModal = true;
                console.log(friendToBlock);
            };

            $scope.blockFriend = function () {
                if (friendToBlock === null) {
                    $scope.message = "Could not block friend";
                    $scope.okay = false;
                    return;
                }
                relationshipsService.blockFriend(friendToBlock)
                        .success(function (response) {
                            $scope.message = "Friend Blocked";
                            $scope.okay = false;
                            friendToBlock = null;
                            $scope.friends = null;
                            listFriends();
                        })
                        .error(function (error) {
                            $scope.message = "Could not block friend";
                            $scope.okay = false;
                            console.log(error);
                        });

            };

            var listFriends = function () {
                $scope.friends = [];
                relationshipsService.getFriendList()
                        .success(function (response) {
                            for (i = 0; i < response.length; i++) { // for each request
                                friend = response[i];

                                if (response[i].profilePhoto === null) {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                                }
                                else {
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/" + response[i].friend + "/" + response[i].profilePhoto.medium;
                                }
                                friend.currentLocation = response[i].currentLocation;
                                $scope.friends.push(friend);
                                friend = {};
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                            friend.nickname = error.error;
                            $scope.friends.push(friend);
                            friend = null;
                        });
            };

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

                if ($localStorage.token.id === friendAddId) {
                    $scope.message = "You cannot be friends with yourself";
                    $scope.okay = false; //show error messages
                    return;
                }

                if (friendAddId === null) {
                    return;
                    $scope.message = "please select friend to add";
                    $scope.okay = false; //show error messages
                }
                relationshipsService.sendFriendRequest(friendAddId)
                        .success(function (response) {
                            $scope.message = "Friend request sent";
                            $scope.okay = false;
                            friendAddId = null;
                            $scope.friends = [];
                            listFriends();
                        })
                        .error(function (error) {
                            if (error.message === "Validation error") {
                                $scope.okay = false;
                                $scope.message = "You have already sent a friend request";
                                friendAddId = null;
                            }
                            else {
                                $scope.okay = false;
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
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/" + response.userAccountId + "/" + response.profilePhoto.medium;
                                }
                                $scope.addFriendNew.push(friend);
                                friend = {};
                            })
                            .error(function (error) {
                                console.log(error);
                            });
                }
            };

            listFriends();

            $scope.close = function () {
                $scope.showblockFriendConfirmationModal = false;
                $scope.showFriendConfirmationModal = false;
                $scope.addFriendNew = []; //lists all people matching searched name
                friendAddId = null; //
                friendToBlock = null;
                $scope.message = "";
                $scope.okay = true;
            };

        }]);
}());