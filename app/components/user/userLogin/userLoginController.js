(function () {
    var app = angular.module("pioneerRoad");

    app.controller('userLoginController', ['$scope', '$http', '$location', 'userLoginService', '$rootScope', '$localStorage', 'loginRedirect', 'rememberMeService', function ($scope, $http, $location, userLoginService, $rootScope, $localStorage, loginRedirect, rememberMeService) {

            if (loginRedirect.checkLogin()) {
                $location.path("/profile");
                console.log("i'm logged in, change to /home"); //MAKE SURE TO CHANGE TO /HOME!!!!!
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
                                    token: response.data.token,
                                    expire: response.data.expires,
                                    id: response.data.user.id,
                                    username: response.data.user.username
                                };
                                console.log("logged in");
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