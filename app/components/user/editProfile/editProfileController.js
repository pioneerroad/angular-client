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
            
            $scope.getHomeTownSug = function(){
              if(keyPressCount > 3){
                  //send current $scope.hometown to /town/select/:input
                  editProfileService.getHomeTownSuggestions($scope.hometown)
                  .success(function (response) {
                        
                            $scope.homeTownSuggestions = response;
                            console.log(response);
                       
                    })
                    .error(function (error) {
                        console.log(error);
                    });

              }else{
                  keyPressCount++;
              }
            };
            
            $scope.chosenTown= function(town){
              $scope.hometown = town.label;
              $scope.chosenHomeTown.label = $scope.hometown;
              $scope.chosenHomeTown.id = town.id;
              
            };
            
            $scope.updateHomeTown = function(){
                keyPressCount = 0;
                $scope.chosenHomeTown.label = $scope.hometown;
                //call the suggest function to get correct information using the user inputted town, as if they did not use suggestions
                //there will be no town id
                //post/put information to users profile
                //figure out town id -> town name stuff
            };

            var getCurrentProfile = function () { //get the users profile
                
                viewProfileService.getData()
                    .success(function (response) {
                        if (response) {
                            $scope.profile = response;
                            $scope.tmpNickName = $scope.profile.nickName;
                            setViewNickName();
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            
            };
            
            
            var setViewNickName = function(){
                if($scope.tmpNickName === ""){
                    $scope.nickName = false;
                    console.log($scope.tmpNickName);
                }
                else{
                    $scope.nickName = true;
                } 
                
            };
            
            
            var setEditProfileView = function(){
                getCurrentProfile();
                
            };
            $scope.tmpNickName = "";
            $scope.chosenHomeTown;
            $scope.homeTownSuggestions = [];
            $scope.nickname = "";
            $scope.nickName = false;
            var keyPressCount = 0;
            
            setEditProfileView();

        }]);
}());