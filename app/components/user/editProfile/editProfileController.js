(function () {
    var app = angular.module("pioneerRoad");

    app.controller('editProfileController', ['$scope', 'loginRedirect', '$location', 'editProfileService', 'viewProfileService', function ($scope, loginRedirect, $location, editProfileService, viewProfileService) {

            if (!loginRedirect.checkLogin()) {
                $location.path("/login");
                console.log("i'm not logged in");
            }

            $scope.updateNickName = function () {
                console.log($scope.nickname);
                editProfileService.changeNickName($scope.nickname)
                        .success(function (response) {
                            console.log(response);
                            getCurrentProfile();
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.getHomeTownSug = function () {
                if (keyPressCount > 2) {
                    //send current $scope.hometown to /town/select/:input
                    editProfileService.getHomeTownSuggestions($scope.hometown)
                            .success(function (response) {
                                $scope.homeTownSuggestions = response; 

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
                $scope.getHomeTownSug(); // forces update of suggestions

            };

            $scope.updateHomeTown = function () {

                $scope.chosenHomeTown.label = $scope.hometown;
                $scope.getHomeTownSug(); //now there should only be one entry in $scope.homeTownSuggestions
                editProfileService.setHomeTown($scope.homeTownSuggestions[0].id)
                        .success(function (response) {
                            console.log("profile: town updated");
                            tearDown();
                        })
                        .error(function (error) {
                            console.log(error);
                            tearDown();
                        });

               
                 //update the view 


            };

            var getCurrentProfile = function () { //get the users profile
                console.log("getting new data");
                viewProfileService.getData()
                        .success(function (response) {
                            if (response) {
                                $scope.profile = response;
                                
                                setViewNickName();
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                        console.log("got new data");
            };


            var setViewNickName = function () {
                if ($scope.tmpNickName === "") {
                    $scope.nickName = false;
                    console.log($scope.tmpNickName);
                }
                else {
                    $scope.nickName = true;
                }

            };


            var setEditProfileView = function () {
                getCurrentProfile();
            };

            //reset all input fields 
            var tearDown = function () {
                $scope.homeTownSuggestions = "";
                $scope.chosenHomeTown = "";
                $scope.hometown = "";
                keyPressCount = 0;
                
                setEditProfileView();
            };

            $scope.tmpNickName = "";
            $scope.chosenHomeTown = ""; //the data that is used to set/update the home town on server
            $scope.homeTownSuggestions = [];
            $scope.nickname = "";
            $scope.nickName = false;
            var keyPressCount = 0;

            setEditProfileView();


            

        }]);
}());