(function () {
    var app = angular.module("pioneerRoad");

    app.controller('userLoginController', ['$scope', '$http', '$location', 'userLoginService', '$rootScope', '$localStorage','loginRedirect', function ($scope, $http, $location, userLoginService, $rootScope, $localStorage, loginRedirect) {



            $scope.messageBool = false;
            console.log($localStorage.token);
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
                                console.log("good");
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

                $http.get('http://pioneerroad.com.au:8081/api/v1/user/' + $localStorage.token.id + '/account/fetch'
                        ).success(function (response) {
                    console.log("no error");
                }).error(function (response) {
                    console.log("bad error");
                });
            };
            
            if(loginRedirect.checkLogin()){
                $location.path("/home");
            }
            
        }]);

}());