(function () {
    var app = angular.module("pioneerRoad.FriendProfile", []);

    app.controller('viewFriendProfileController', ['$scope', '$http', '$location', '$rootScope', '$localStorage', 'loginRedirect', 'viewFriendProfileService', 'geoLocationService', '$sce', '$routeParams', function ($scope, $http, $location, $rootScope, $localStorage, loginRedirect, viewFriendProfileService, geoLocationService, $sce, $routeParams) {

            var getProfile = function () { //get the users profile

                viewFriendProfileService.getData(friendId)
                        .success(function (response) {
                            if (response) {
                                $scope.profile = response;
                                setImages(response);
                                $rootScope.Title = $sce.trustAsHtml($scope.profile.nickName);
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            var setImages = function (data) {
                if (data.profileBackgroundPhoto === null) {

                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/bg-default-img.svg";
                }
                else {
                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + friendId + "/background-photo/" + data.profileBackgroundPhoto.medium;
                }

                if (data.profilePhoto === null) {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                }
                else {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + friendId + "/profile-photo/" + data.profilePhoto.large;
                }//ui-images/bg-deafult-img.svg
            };

            var friendId = $routeParams.id;
            $scope.profile = {};
            $scope.profile.nickName = "";
            
            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }
            else {
                getProfile();
            }

            $rootScope.Title = $sce.trustAsHtml("");
            $rootScope.Link = $sce.trustAsHtml("");

            $scope.location = " ";

            geoLocationService.begin(); //update location

        }]);
}());