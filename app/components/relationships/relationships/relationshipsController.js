(function () {
    var app = angular.module("pioneerRoad.RelationShips");
    app.controller('relationshipsController', ['$scope', '$rootScope', 'relationshipsService', '$localStorage', '$sce','$location' , 'loginRedirect', function ($scope,$rootScope, relationshipsService, $localStorage, $sce, $location ,loginRedirect) {
            
            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            
            $rootScope.Title = $sce.trustAsHtml("Friends");
            $rootScope.Link = $sce.trustAsHtml("<h5><a href='#/addFriend'>Add Friend</a><h5>");
            
            $scope.showblockFriendConfirmationModal = false;
            $scope.friends = []; //array to hold list of friends
            var friendId = ""; //id returned from findFriends() function in service
            var friend = {}; //used to hold each friend object and doubles as an error message store
            var friendToBlock = null;
            $scope.message = "";
            $scope.okay = true;

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
                                    friend.profilePic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + response[i].friend + "/profile-photo/" + response[i].profilePhoto.medium;
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

            listFriends();

            $scope.close = function () {
                $scope.showblockFriendConfirmationModal = false;
                friendToBlock = null;
                $scope.message = "";
                $scope.okay = true;
            };

        }]);
}());