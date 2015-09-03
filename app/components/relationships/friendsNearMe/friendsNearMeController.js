(function () {
    var app = angular.module("pioneerRoad");

    app.controller('friendsNearMeController', ['$scope', 'friendsNearMeService', function ($scope, friendsNearMeService) {

            //get list of friends
            //store in array
            //ng -repeat
            var getFriends = function () {
                friendsNearMeService.getFriendsNearMe()
                        .success(function (response) {
                            for (i = 0; i < response.length; i++) { // for each request
                                friend.nickName = response[i].nickname;
                                friend.checkinTime = response[i].checkinTime;
                                friend.distance = response[i].distance;
                                friend.id = response[i].friend;
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
                        });
            };

            var friend = {};
            $scope.friends = [];
            getFriends();

        }]);
}());