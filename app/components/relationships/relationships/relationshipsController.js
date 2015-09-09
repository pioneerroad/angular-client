(function () {
    var app = angular.module("pioneerRoad");
    app.controller('relationshipsController', ['$scope', 'relationshipsService', '$localStorage', function ($scope, relationshipsService, $localStorage) {

            $scope.showblockFriendConfirmationModal = false;
            $scope.showFriendConfirmationModal = false;
            $scope.addFriendsShow = false; //show the menu to add friends
            $scope.symbol = "glyphicon-plus"; //this class controls a glyphicon on the add user button
            $scope.friendName = ""; //friend to find
            $scope.friends = []; //array to hold list of friends
            $scope.addFriendNew = []; //lists all people matching searched name
            var friendId = ""; //id returned from findFriends() function in service
            var friend = {}; //used to hold each friend object and doubles as an error message store
            var friendId = null; //
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
            
            $scope.blockFriendbtn = function(id){
                friendToBlock = id;
                $scope.showblockFriendConfirmationModal = true;
                console.log(friendToBlock);
            };

            var listFriends = function () {
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

                                $scope.friends.push(friend);
                                friend = {};
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                            friend.nickname = error.error;
                            $scope.friends.push(friend);
                            friend = {};
                        });
            };

            $scope.findFriend = function () {
                if ($scope.friendName === "") {
                    friend.error = "Please enter a friends email!";
                    $scope.addFriendNew.push(friend);
                    friend = {};
                }
                else {
                    relationshipsService.findFriend($scope.friendName)
                            .success(function (response) {
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
                finalfriendId = friendAddId;
                console.log(finalfriendId);

                if ($localStorage.token.id === friendAddId) {
                    $scope.message = "You cannot be friends with yourself";
                    $scope.okay = false; //show error messages
                }

                if (friendAddId === null) {
                    return;
                    $scope.message = "please select friend to add";
                    $scope.okay = false; //show error messages
                }
                relationshipsService.sendFriendRequest(finalfriendId)
                        .success(function (response) {
                            $scope.message = "Friend request sent";
                            $scope.okay = false;
                            friendId = null;
                            $scope.friends = [];
                            listFriends();
                            console.log("good");
                        })
                        .error(function (error) {
                            console.log(error);
                            $scope.okay = false;
                            $scope.message = "could not send request";
                            friendId = null;
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
                $scope.message = "";
                $scope.okay = true;
            };

        }]);
}());