(function () {
    var app = angular.module("pioneerRoad");

    var userLoginController = function ($scope, $http) {
        $scope.Login = function () {
            //authenticate
            $scope.authenticate();
        };

        var authenticate = function () {
            userLoginController.login($scope.username, $scope.password); //some function to pass password and email too
            // if successful return true, else false
        };
    };



    app.controller("userLoginController", userLoginController);
    userLoginController.$inject = ['$scope', '$http'];
}());