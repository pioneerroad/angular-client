(function () {
    var app = angular.module("pioneerRoad");

    app.controller('userLoginController', ['$scope', '$http', '$location', 'userLoginService', '$rootScope', '$localStorage', 'loginRedirect', 'rememberMeService', function ($scope, $http, $location, userLoginService, $rootScope, $localStorage, loginRedirect, rememberMeService) {
            
            if (loginRedirect.checkLogin()) {
                $location.path("/home");
                console.log("i'm logged in");
            }


            $scope.email = "";
            $scope.password = "";
            $scope.Error = false;
            $scope.Errors = [];
            $scope.remember = false;


            if (rememberMeService('username') && rememberMeService('password')) {
                $scope.remember = true;
                $scope.email = rememberMeService('username');
                $scope.password = rememberMeService('password');
            }
            $scope.rememberMe = function () {
                if ($scope.remember) {
                    rememberMeService('username', $scope.email);
                    rememberMeService('password', $scope.password);
                } else {
                    rememberMeService('username', '');
                    rememberMeService('password', '');
                }
            };



            $scope.authenticate = function () { //sends form data to userLoginService
                $scope.closeError();
                if (("" === $scope.email) || ("" === $scope.password)) {

                    if ("" === $scope.password) {
                        $scope.Errors.push("Please enter password");
                    }
                    if ("" === $scope.email) {
                        $scope.Errors.push("Please enter Email");
                    }
                    $scope.Error = true;
                    return false;
                }
                userLoginService.Login($scope.email.toLowerCase(), $scope.password)
                        .success(function (response) {
                            if (response) {
                                // add to the location storage
                                $rootScope.token = response;
                                $localStorage.token = {
                                    token: response.token,
                                    id: response.user.id,
                                    username: response.user.username
                                };
                                console.log("logged in");
                                $rootScope.navbar = true;
                                $location.path("/home");
                                
                            }
                        })
                        .error(function (error) {
                            $scope.Errors.push("Your Email or Password is incorrect!");
                            $scope.Error = true;

                        });
            };

            $scope.closeError = function () { // closes error messages
                $scope.Error = false;
                $scope.Errors = [];
            };

            $scope.logOut = function () {
                userLoginService.Logout();
            };
        }]);

}());