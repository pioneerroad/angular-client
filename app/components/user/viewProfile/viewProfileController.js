(function () {
    var app = angular.module("pioneerRoad.Profile", []);

    app.controller('viewProfileController', ['$scope', '$http', '$location', '$rootScope', '$localStorage', 'loginRedirect', 'viewProfileService', 'geoLocationService', '$sce', function ($scope, $http, $location, $rootScope, $localStorage, loginRedirect, viewProfileService, geoLocationService, $sce) {
            $scope.nickName = false;
            $scope.location = " ";

            
            if ($location.path() === "/home") {
                $rootScope.Title = $sce.trustAsHtml("Home");
                $rootScope.Link = $sce.trustAsHtml("");
            }
            else {
                $rootScope.Title = $sce.trustAsHtml("Profile");
                $rootScope.Link = $sce.trustAsHtml("<h5><a href='#/editprofile'>Edit</a><h5>");
            }

            var getProfile = function () { //get the users profile

                viewProfileService.getData()
                        .success(function (response) {
                            if (response) {
                                $scope.profile = response;
                                setImages(response);
                                setNick(response);
                                getCurrentLocation();
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
                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + $localStorage.token.id + "/background-photo/" + data.profileBackgroundPhoto.medium;
                }

                if (data.profilePhoto === null) {

                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                }
                else {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/user-photos/" + $localStorage.token.id + "/profile-photo/" + data.profilePhoto.large;
                }//ui-images/bg-deafult-img.svg
            };

            var setNick = function (data) {
                if (data.nickName === null) {
                    $scope.nickName = false;
                }
                else {
                    $scope.nickName = true;
                }
            };


            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
                console.log("i'm not logged in");
            }
            else {
                getProfile();
            }

            var getCurrentLocation = function () {
                geoLocationService.returnLocation()
                        .success(function (data, response) {
                            $scope.location = data; //location data
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

        }]);
}());