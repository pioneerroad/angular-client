(function () {
    var app = angular.module("pioneerRoad");

    app.controller('userLoginController', ['$scope', '$http', '$location', 'userLoginService', '$rootScope', '$localStorage','loginRedirect', function ($scope, $http, $location, userLoginService, $rootScope, $localStorage, loginRedirect) {

            if(loginRedirect.checkLogin()){
                $location.path("/login");
                console.log("i'm logged in, change to /home");
            }
            $scope.messageBool = false;
            $scope.closeError = function () {
                $scope.messageBool = false;
            };

            $scope.authenticate = function () {
                //userLoginService.SetCredentials($scope.email, $scope.password);
                userLoginService.Login($scope.email.toLowerCase(), $scope.password)
                        .success(function (response) {
                            if (response) {
                                // add to the location storage
                                $rootScope.token = response;
                                $localStorage.token = {
                                    token: response.data.token,
                                    expire: response.data.expires,
                                    id: response.data.user.id,
                                    username: response.data.user.username
                                };
                                console.log("logged in");
                                console.log($localStorage.token.token);
                                $location.path("/home");
                            }
                        })
                        .error(function (error) {
                            console.log(error);
                        });
            };

            $scope.logOut = function () {
                userLoginService.Logout();
            };

            $scope.tryGet = function () {
                $localStorage.token.id;
                console.log($localStorage.token.token);
                
                $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/account/fetch'
                        ).success(function (response) {
                    console.log("got Account info");
                    
                }).error(function (response) {
                    console.log("could not get Account info");
                    console.log(response.message);
                });
            };
            
        }]);

}());