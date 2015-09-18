(function () {
    var app = angular.module('pioneerRoad.Profile');

    app.controller('editProfileController', ['$scope', '$localStorage', 'loginRedirect', '$location', 'editProfileService', 'viewProfileService', 'geoLocationService', function ($scope,$localStorage ,loginRedirect, $location, editProfileService, viewProfileService, geoLocationService) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
            }

            //update the nick name
            $scope.updateNickName = function () {
                editProfileService.changeNickName($scope.nickname)
                        .success(function (response) {
                            console.log("Nick Name changed");
                            tearDown();
                            $scope.tmpNickName = $scope.nickname;
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            //get all the suggestions 
            $scope.getHomeTownSug = function () {
                if (keyPressCount > 2) {
                    //send current $scope.hometown to /town/select/:input
                    editProfileService.getHomeTownSuggestions($scope.hometown)
                            .success(function (response) {
                                $scope.homeTownSuggestions = response;
                                if ($scope.homeTownSuggestions.length === 0) {
                                    $scope.showSave = false;
                                    return;
                                }
                            })
                            .error(function (error) {
                                console.log(error);
                            });


                } else {
                    keyPressCount++;
                }
            };

            //called when user clicks a suggestion
            $scope.chosenTown = function (town) {
                $scope.hometown = town.label; //set the view hometown to the click town
                $scope.chosenHomeTown = town;
                $scope.getHomeTownSug(); // forces update of suggestions
                $scope.showSave = true;

            };

            //updates home town to server
            $scope.updateHomeTown = function () {

               // $scope.chosenHomeTown.label = $scope.hometown;
                $scope.getHomeTownSug(); //now there should only be one entry in $scope.homeTownSuggestions
                if ($scope.homeTownSuggestions.length === 0) {
                    $scope.showSave = false;
                    return;
                }
                var id;
               
                editProfileService.setHomeTown($scope.chosenHomeTown.id)
                        .success(function (response) {
                            console.log("profile: town updated");
                            tearDown();
                        })
                        .error(function (error) {
                            console.log(error);
                            tearDown();
                        });
            };

            $scope.updateLocation = function () {
                geoLocationService.begin();
            };

            var getCurrentProfile = function () { //get the users profile
                
                viewProfileService.getData()
                        .success(function (response) {
                            if (response) {
                                $scope.profile = response;
                                $scope.tmpNickName = $scope.profile.nickName;
                                setViewNickName();
                                setImages($scope.profile);
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });              
            };


            var setViewNickName = function () {
                if ($scope.tmpNickName === "") {
                    $scope.nickName = false;
                }
                else {
                    $scope.nickName = true;
                }
            };


            var setEditProfileView = function () {
                getCurrentProfile();
            };
            
            var setImages = function (data) {

                if (data.profileBackgroundPhoto === null) {

                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/bg-default-img.svg";
                }
                else {
                    $scope.background = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/" + $localStorage.token.id + "/background-photos/" + data.profileBackgroundPhoto.medium;
                }

                if (data.profilePhoto === null) {
                       $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/ui-images/user-profile-default-img.svg";
                }
                else {
                    $scope.profilepic = "https://s3-ap-southeast-2.amazonaws.com/images.pioneerroad.com.au/profile-photos/" + $localStorage.token.id + "/" + data.profilePhoto.large;
                }//ui-images/bg-deafult-img.svg
            };

            //reset all input fields 
            var tearDown = function () {
                $scope.homeTownSuggestions = "";
                $scope.chosenHomeTown = "";
                $scope.hometown = "";
                keyPressCount = 0;
                $scope.nickname="";

                setEditProfileView();
            };

            $scope.tmpNickName = "";
            $scope.chosenHomeTown = ""; //the data that is used to set/update the home town on server
            $scope.homeTownSuggestions = [];
            $scope.nickname = "";
            $scope.nickName = false;
            $scope.showSave = false;

            var keyPressCount = 0;

            setEditProfileView();
        }]);
}());